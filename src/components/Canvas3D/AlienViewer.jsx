import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useStore } from "../../store/useStore";
import { ALIEN_SCALE_FACTORS } from "../../data/aliens";

export default function AlienViewer() {
  const containerRef = useRef(null);
  const { currentAlien } = useStore();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Accent Light matching the current Alien
    const accentHex = currentAlien?.accent || "#00ff88";
    const accentColor = new THREE.Color(accentHex);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const accentRim = new THREE.SpotLight(accentColor, 4.5);
    accentRim.position.set(-3, 3, -2);
    scene.add(accentRim);

    const groundGlow = new THREE.PointLight(accentColor, 3, 5);
    groundGlow.position.set(0, -0.2, 0);
    scene.add(groundGlow);

    // Platform ring 1 (outer)
    const ringGeo1 = new THREE.RingGeometry(0.85, 1.25, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = -Math.PI / 2;
    ring1.position.y = -1;
    scene.add(ring1);

    // Platform ring 2 (inner glowing circle)
    const ringGeo2 = new THREE.RingGeometry(0.55, 0.65, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x39ff14,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = -0.98;
    scene.add(ring2);

    // Orbiting DNA particles
    const dnaCount = 120;
    const dnaPositions = new Float32Array(dnaCount * 3);
    for (let i = 0; i < dnaCount; i++) {
      const angle = (i / dnaCount) * Math.PI * 4;
      const radius = 1.35 + Math.sin(i * 0.2) * 0.15;
      dnaPositions[i * 3] = Math.cos(angle) * radius;
      dnaPositions[i * 3 + 1] = (i / dnaCount) * 2.8 - 0.9;
      dnaPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const dnaGeo = new THREE.BufferGeometry();
    dnaGeo.setAttribute("position", new THREE.BufferAttribute(dnaPositions, 3));
    const dnaMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const dnaPoints = new THREE.Points(dnaGeo, dnaMat);
    scene.add(dnaPoints);

    // Load Alien GLB with local MeshoptDecoder (100% offline, zero network)
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    let alienGroup = new THREE.Group();
    scene.add(alienGroup);

    // Determine model path
    const alienId = currentAlien?.id || "heatblast";
    let modelUrl = `/models/aliens/${alienId}.glb`;
    if (alienId === "azmuth") {
      modelUrl = "/models/azmuth.glb";
    }

    gltfLoader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;
        root.traverse((c) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });

        // Compute bounding box for centering and height normalization
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const targetHeight = ALIEN_SCALE_FACTORS[alienId] || 2.0;
        const scale = targetHeight / (size.y || 1);

        root.position.x = -center.x * scale;
        root.position.y = -box.min.y * scale - 1.0;
        root.position.z = -center.z * scale;
        root.scale.setScalar(scale);

        alienGroup.add(root);
      },
      undefined,
      (err) => {
        // Fallback: If specific alien GLB not on disk, load 3D crystals with hologram beam
        console.warn(`Alien model not found for ${alienId}, loading holographic crystal matrix...`);
        gltfLoader.load(
          "/models/crystals.glb",
          (gltf) => {
            const crystalScene = gltf.scene;
            crystalScene.position.set(0, -0.4, 0);
            crystalScene.scale.setScalar(1.5);
            alienGroup.add(crystalScene);
          },
          undefined,
          (err2) => {
            // Procedural geometric hologram if crystals.glb also fails
            const geom = new THREE.OctahedronGeometry(0.8, 0);
            const mat = new THREE.MeshStandardMaterial({
              color: accentColor,
              wireframe: true,
              emissive: accentColor,
              emissiveIntensity: 0.6
            });
            const mesh = new THREE.Mesh(geom, mat);
            mesh.position.set(0, 0.4, 0);
            alienGroup.add(mesh);
          }
        );
      }
    );

    // Mouse drag rotation
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotation = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      targetRotation += deltaX * 0.01;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Render loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Auto slow spin if not dragging
      if (!isDragging) {
        targetRotation += 0.005;
      }
      alienGroup.rotation.y += (targetRotation - alienGroup.rotation.y) * 0.1;

      // Rotate DNA particles around alien
      dnaPoints.rotation.y = time * 0.3;

      // Platform pulse
      ring1.scale.setScalar(1 + Math.sin(time * 2.5) * 0.04);
      ring2.rotation.z += 0.015;

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
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      dnaGeo.dispose();
      dnaMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentAlien?.id]);

  return <div ref={containerRef} className="stage-canvas" />;
}
