import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { asset } from "./catalog";

function dispose(root) {
  const resources = new Set();
  root.traverse((object) => {
    if (object.geometry) resources.add(object.geometry);
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials.filter(Boolean)) {
      resources.add(material);
      for (const value of Object.values(material)) {
        if (value?.isTexture) resources.add(value);
      }
    }
  });
  resources.forEach((resource) => resource.dispose());
}

const terrainTypes = ["volcanic", "banded", "crystal", "terrestrial", "terracotta", "ocean", "circuit", "crater"];

function planetFor(alien) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      tint: { value: new THREE.Color(alien.accent) },
      terrain: { value: terrainTypes.indexOf(alien.terrain) }
    },
    vertexShader: `
      varying vec3 surface;
      varying vec3 normalView;
      void main() {
        surface = position;
        normalView = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }`,
    fragmentShader: `
      uniform vec3 tint;
      uniform int terrain;
      varying vec3 surface;
      varying vec3 normalView;
      float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      float noise(vec3 p) {
        vec3 i = floor(p), f = fract(p);
        f = f * f * (3. - 2. * f);
        return mix(mix(mix(hash(i), hash(i+vec3(1,0,0)),f.x),
                       mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
                   mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                       mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
      }
      void main() {
        vec3 p = normalize(surface);
        vec3 n = normalize(normalView);
        float broad = noise(p*4.);
        float detail = broad*.6 + .27*noise(p*12.) + .13*noise(p*54.);
        vec3 base = mix(tint*.07, tint*.75, smoothstep(.32,.72,detail));
        if (terrain == 0 || terrain == 2) {
          float seam = abs(noise(p*14. + broad) - .47);
          base += tint * (1.-smoothstep(.012,.05,seam)) * .76;
        }
        if (terrain == 1 || terrain == 4) {
          float bands = .5+.5*sin(p.y*39.+broad*5.);
          base = mix(base, tint*.62, bands*.42);
        }
        if (terrain == 3 || terrain == 5) {
          vec3 sea = terrain == 5 ? tint*.25 : vec3(.014,.095,.16);
          base = mix(sea, tint*.54, smoothstep(.47,.52,detail));
          base = mix(base, vec3(.55,.72,.75), smoothstep(.60,.78,noise(p*8.+detail))*.64);
        }
        if (terrain == 6) {
          vec3 grid = abs(fract(p*18.)-.5);
          base += tint * smoothstep(.44,.5,max(grid.x,grid.y)) * .5;
        }
        if (terrain == 7) base = mix(base*.5, tint*.60, smoothstep(.42,.53,noise(p*25.)));
        float lit = max(dot(n,normalize(vec3(-.65,.8,1.))),0.);
        float rim = pow(1.-max(n.z,0.),3.);
        gl_FragColor = vec4(base * (.20+.85*lit) + tint*rim*.36, 1.);
        #include <colorspace_fragment>
      }`
  });
  return new THREE.Mesh(new THREE.SphereGeometry(1.06, 80, 56), material);
}

function addEnvironment(scene, accent, planetary) {
  const rings = new THREE.Group();
  const floor = planetary ? -1.44 : -1.24;
  rings.position.y = floor;
  for (const radius of [1.18, 1.43, 1.53]) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(radius - .012, radius, 96),
      new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: .46, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    rings.add(ring);
  }
  scene.add(rings);
  const grid = new THREE.GridHelper(14, 36, accent, accent);
  grid.position.y = floor - .025;
  grid.material.transparent = true;
  grid.material.opacity = .09;
  scene.add(grid);

  const positions = new Float32Array(720);
  for (let i = 0; i < positions.length; i++) {
    const spread = i % 3 === 1 ? 9 : 15;
    const value = Math.sin((i + 1) * 78.233) * 43758.5453;
    positions[i] = (value - Math.floor(value) - .5) * spread;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(geometry, new THREE.PointsMaterial({
    color: accent, size: .027, transparent: true, opacity: .55, depthWrite: false
  }));
  scene.add(particles);
  return particles;
}

export default function Scene({ mode, alien, spin, progress, reset, onLoad }) {
  const hostRef = useRef(null);
  const sceneRef = useRef(null);
  const live = useRef({ spin, progress });
  const [message, setMessage] = useState("");
  const accent = mode === "device" ? "#b8ff65" : alien.accent;

  useEffect(() => {
    live.current = { spin, progress };
    sceneRef.current?.draw();
  }, [spin, progress]);

  useEffect(() => {
    sceneRef.current?.reset();
  }, [reset]);

  useEffect(() => {
    const node = hostRef.current;
    onLoad(false);
    if (mode === "archive" && alien.archiveOnly) {
      setMessage("Archive record • 3D character model unavailable");
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      setMessage("WebGL is unavailable. Dossiers and sources are still accessible.");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, .1, 50);
    const initial = mode === "device" ? [3.2, 3, 4.4] : [1, 1.25, 5.45];
    camera.position.set(...initial);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute("aria-label", "3D view. Use arrow keys to orbit and plus or minus to zoom.");
    node.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 9;
    controls.maxPolarAngle = Math.PI * .53;
    controls.update();

    scene.add(new THREE.HemisphereLight(0xeaffee, 0x445247, 2.1));
    const key = new THREE.DirectionalLight(0xfffbec, 3.7);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(accent, 4);
    rim.position.set(-3, 2, -3);
    scene.add(rim);
    const particles = addEnvironment(scene, accent, mode === "orbit");

    const pivot = new THREE.Group();
    scene.add(pivot);
    const scanner = new THREE.Mesh(
      new THREE.RingGeometry(1.05, 1.085, 90),
      new THREE.MeshBasicMaterial({ color: accent, side: THREE.DoubleSide, transparent: true, opacity: .87 })
    );
    scanner.rotation.x = -Math.PI / 2;
    scanner.visible = false;
    scene.add(scanner);

    let active = true;
    let ready = false;
    let mixer;
    let clips = [];
    let visible = true;
    let frame = 0;
    let previous;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function draw() {
      if (!visible) return;
      const p = live.current.progress;
      if (mixer) {
        for (const { action, duration } of clips) action.time = (1 - p) * duration;
        mixer.update(0);
      }
      scanner.visible = mode === "archive" && ready && p > 0 && p < 1;
      scanner.position.y = -1.14 + p * 2.28;
      renderer.render(scene, camera);
    }

    function animate(time) {
      const delta = previous === undefined ? 0 : Math.min((time - previous) / 1000, .05);
      previous = time;
      if (visible && live.current.spin && !motion.matches) {
        pivot.rotation.y += delta * (mode === "orbit" ? .48 : .34);
        particles.rotation.y += delta * .035;
        draw();
      }
      frame = requestAnimationFrame(animate);
    }

    sceneRef.current = {
      draw,
      reset() {
        camera.position.set(...initial);
        controls.target.set(0, 0, 0);
        controls.update();
        pivot.rotation.y = 0;
        draw();
      }
    };
    controls.addEventListener("change", draw);
    function onKey(event) {
      const orbit = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
      switch (event.key) {
        case "ArrowLeft": orbit.theta -= .15; break;
        case "ArrowRight": orbit.theta += .15; break;
        case "ArrowUp": orbit.phi -= .12; break;
        case "ArrowDown": orbit.phi += .12; break;
        case "+":
        case "=": orbit.radius *= .9; break;
        case "-": orbit.radius /= .9; break;
        default: return;
      }
      event.preventDefault();
      orbit.phi = Math.min(controls.maxPolarAngle, Math.max(.01, orbit.phi));
      camera.position.setFromSpherical(orbit).add(controls.target);
      controls.update();
    }
    renderer.domElement.addEventListener("keydown", onKey);
    const size = new ResizeObserver(() => {
      const { clientWidth: width, clientHeight: height } = node;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(37 / 2)) / Math.min(camera.aspect, 1)));
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      draw();
    });
    size.observe(node);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) draw();
    });
    intersection.observe(node);
    frame = requestAnimationFrame(animate);

    if (mode === "orbit") {
      pivot.add(planetFor(alien));
      ready = true;
      onLoad(true);
      setMessage("");
    } else {
      setMessage("Loading 3D model…");
      const device = mode === "device";
      const path = device ? "models/omnitrix.glb" : `models/aliens/${alien.id}.glb`;
      new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(asset(path), (gltf) => {
        if (!active) {
          dispose(gltf.scene);
          return;
        }
        const bounds = new THREE.Box3().setFromObject(gltf.scene);
        const center = bounds.getCenter(new THREE.Vector3());
        const dimensions = bounds.getSize(new THREE.Vector3());
        const model = new THREE.Group();
        model.scale.setScalar(2.26 / Math.max(dimensions.x, dimensions.y, dimensions.z));
        gltf.scene.position.sub(center);
        model.add(gltf.scene);
        pivot.add(model);
        if (device && gltf.animations.length) {
          mixer = new THREE.AnimationMixer(gltf.scene);
          clips = gltf.animations.map((clip) => {
            const action = mixer.clipAction(clip).setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
            action.play();
            action.paused = true;
            return { action, duration: clip.duration };
          });
        }
        ready = true;
        onLoad(true);
        setMessage("");
        draw();
      }, undefined, () => {
        if (active) setMessage("The 3D asset could not be loaded.");
      });
    }

    return () => {
      active = false;
      sceneRef.current = null;
      cancelAnimationFrame(frame);
      size.disconnect();
      intersection.disconnect();
      renderer.domElement.removeEventListener("keydown", onKey);
      controls.dispose();
      mixer?.stopAllAction();
      dispose(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [mode, alien, accent, onLoad]);

  return (
    <>
      <div ref={hostRef} className="studio-canvas" />
      {message && <p className="scene-status" role="status">{message}</p>}
    </>
  );
}
