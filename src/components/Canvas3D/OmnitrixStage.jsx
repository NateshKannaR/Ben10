import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useStore } from "../../store/useStore";
import { aliens } from "../../data/aliens";

export default function OmnitrixStage() {
  const containerRef = useRef(null);
  const { selectedAlienIndex, isTransforming } = useStore();
  const sceneRef = useRef(null);
  const bezelRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, 3.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa3ff8b, 2.5);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00ff88, 1.8);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const coreLight = new THREE.PointLight(0x39ff14, 4, 6);
    coreLight.position.set(0, 0.35, 0);
    scene.add(coreLight);

    // Holographic Projection Beam (rising cylinder from core)
    const beamGeo = new THREE.CylinderGeometry(0.35, 0.12, 1.8, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x39ff14,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      wireframe: false
    });
    const holoBeam = new THREE.Mesh(beamGeo, beamMat);
    holoBeam.position.set(0, 0.9, 0);
    scene.add(holoBeam);

    // Hologram Rings floating above dial
    const ringGeo1 = new THREE.RingGeometry(0.42, 0.45, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const holoRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    holoRing1.rotation.x = -Math.PI / 2;
    holoRing1.position.set(0, 1.2, 0);
    scene.add(holoRing1);

    const ringGeo2 = new THREE.RingGeometry(0.28, 0.30, 32);
    const holoRing2 = new THREE.Mesh(ringGeo2, ringMat1.clone());
    holoRing2.rotation.x = -Math.PI / 2;
    holoRing2.position.set(0, 1.6, 0);
    scene.add(holoRing2);

    // Ambient floating energy particles
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 3;
      particlePositions[i * 3 + 1] = Math.random() * 2.5 - 0.3;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x39ff14,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // GLTF / Draco Loader setup
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // Load Omnitrix Model
    let omnitrixModel = null;
    gltfLoader.load(
      "/models/omnitrix.glb",
      (gltf) => {
        omnitrixModel = gltf.scene;
        omnitrixModel.position.set(0, -0.2, 0);
        omnitrixModel.scale.setScalar(1.2);

        omnitrixModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.name.toLowerCase().includes("dial") || child.name.toLowerCase().includes("ring")) {
              bezelRef.current = child;
            }
            if (child.name.toLowerCase().includes("core") || child.name.toLowerCase().includes("glass")) {
              coreRef.current = child;
            }
          }
        });

        scene.add(omnitrixModel);
      },
      undefined,
      (err) => console.warn("Could not load omnitrix.glb:", err)
    );

    // Pointer interaction for subtle tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove);

    // Render loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Camera position with smooth mouse parallax
      targetRotY = mouseX * 0.45;
      targetRotX = 1.8 - mouseY * 0.35;
      camera.position.x += (targetRotY * 2 - camera.position.x) * 0.05;
      camera.position.y += (targetRotX - camera.position.y) * 0.05;

      // Shake camera if currently transforming
      if (isTransforming) {
        camera.position.x += (Math.random() - 0.5) * 0.08;
        camera.position.y += (Math.random() - 0.5) * 0.08;
        camera.position.z = 2.6 + Math.sin(time * 30) * 0.05;
      } else {
        camera.position.z += (3.2 - camera.position.z) * 0.05;
      }
      camera.lookAt(0, 0, 0);

      // Pulse core light & hologram beam
      const pulse = Math.sin(time * 5);
      coreLight.intensity = isTransforming ? 12 : 3.2 + pulse * 1.2;
      beamMat.opacity = isTransforming ? 0.8 : 0.25 + (pulse + 1) * 0.08;
      holoBeam.rotation.y += 0.015;

      // Rotate hologram rings in opposing directions
      holoRing1.rotation.z += 0.02;
      holoRing2.rotation.z -= 0.025;
      holoRing1.position.y = 1.2 + Math.sin(time * 2) * 0.05;
      holoRing2.position.y = 1.6 + Math.cos(time * 2) * 0.06;

      // Slowly float particles upwards
      const positions = particleGeo.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.005;
        if (positions[i] > 2.5) {
          positions[i] = -0.3;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Rotate Omnitrix dial towards target angle smoothly
      if (omnitrixModel) {
        const targetAngle = (selectedAlienIndex / aliens.length) * (Math.PI * 2);
        omnitrixModel.rotation.y += (targetAngle - omnitrixModel.rotation.y) * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      dracoLoader.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedAlienIndex, isTransforming]);

  return (
    <div
      ref={containerRef}
      className={`stage-canvas ${isTransforming ? "stage-canvas--flashing" : ""}`}
    />
  );
}
