import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useStore } from "../../store/useStore";
import { aliens, ALIEN_SCALE_FACTORS } from "../../data/aliens";

// Global cache for loaded GLTF alien scenes to enable instant zero-latency switching
const glbCache = new Map();

export default function OmnitrixStage() {
  const containerRef = useRef(null);
  const { selectedAlienIndex, isTransforming, currentAlien } = useStore();
  const selectedIndexRef = useRef(selectedAlienIndex);
  const isTransformingRef = useRef(isTransforming);
  const currentAlienRef = useRef(currentAlien);

  useEffect(() => {
    selectedIndexRef.current = selectedAlienIndex;
  }, [selectedAlienIndex]);

  useEffect(() => {
    isTransformingRef.current = isTransforming;
  }, [isTransforming]);

  useEffect(() => {
    currentAlienRef.current = currentAlien;
  }, [currentAlien]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera & High-Performance WebGL Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Camera positioned to view both the Omnitrix watch at bottom and the alien hologram above it
    camera.position.set(0, 0.95, 3.6);
    camera.lookAt(0, 0.52, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Dynamic Sci-Fi Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2.5, 4.5, 3.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const frontLight = new THREE.DirectionalLight(0xa3ff8b, 1.4);
    frontLight.position.set(0, 1.0, 3.0);
    scene.add(frontLight);

    const accentColor = new THREE.Color(currentAlien?.accent || "#39ff14");

    const rimLight = new THREE.SpotLight(accentColor, 4.0, 12, Math.PI / 3, 0.4);
    rimLight.position.set(-2.5, 2.8, -2.0);
    scene.add(rimLight);

    const coreLight = new THREE.PointLight(accentColor, 5, 5);
    coreLight.position.set(0, 0.05, 0.25);
    scene.add(coreLight);

    // 3. Omnitrix Watch 3D Model Setup
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    const omnitrixGroup = new THREE.Group();
    omnitrixGroup.position.set(0, -0.62, 0.25);
    // Orient watch horizontally across the screen like resting on a wrist, tilted towards the user
    omnitrixGroup.rotation.set(0.38, Math.PI / 2, 0);
    omnitrixGroup.scale.setScalar(0.85);
    scene.add(omnitrixGroup);

    let dialNodes = [];
    let coreNode = null;
    let initialCoreY = 4.1;

    gltfLoader.load(
      "/models/omnitrix.glb",
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          // Identify dial parts that should rotate when selecting an alien
          if (["face_ring", "face_disc", "wedges", "core", "dome"].includes(child.name)) {
            dialNodes.push(child);
          }
          if (child.name === "core") {
            coreNode = child;
            initialCoreY = child.position.y || 4.1;
          }
        });
        omnitrixGroup.add(model);
      },
      undefined,
      (err) => console.warn("Could not load omnitrix.glb:", err)
    );

    // 4. Holographic Projection Chamber Setup
    const holoChamberGroup = new THREE.Group();
    holoChamberGroup.position.set(0, 0, 0.25);
    scene.add(holoChamberGroup);

    // Ascending Conical Light Beam
    const beamGeo = new THREE.CylinderGeometry(0.72, 0.32, 1.85, 36, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.24,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const holoBeam = new THREE.Mesh(beamGeo, beamMat);
    holoBeam.position.set(0, 0.65, 0);
    holoChamberGroup.add(holoBeam);

    // Hologram Rings floating along the beam
    const ringGeo1 = new THREE.RingGeometry(0.55, 0.65, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const holoRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    holoRing1.rotation.x = -Math.PI / 2;
    holoRing1.position.set(0, 0.3, 0);
    holoChamberGroup.add(holoRing1);

    const ringGeo2 = new THREE.RingGeometry(0.68, 0.74, 48);
    const holoRing2 = new THREE.Mesh(ringGeo2, ringMat1.clone());
    holoRing2.rotation.x = -Math.PI / 2;
    holoRing2.position.set(0, 1.35, 0);
    holoChamberGroup.add(holoRing2);

    // Orbiting Galvan DNA Energy Particles
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 4;
      const radius = 0.45 + (i / particleCount) * 0.3;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = -0.1 + (i / particleCount) * 1.6;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.038,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    holoChamberGroup.add(particles);

    // 5. Active 3D Alien Hologram Container
    const alienHoloGroup = new THREE.Group();
    alienHoloGroup.position.set(0, 0.72, 0.25);
    scene.add(alienHoloGroup);

    // Helper function to load and display the active alien 3D model
    const loadAlienModel = (alienId) => {
      // Clear previous alien model
      while (alienHoloGroup.children.length > 0) {
        alienHoloGroup.remove(alienHoloGroup.children[0]);
      }

      // Check cache first for instant 0ms switching
      if (glbCache.has(alienId)) {
        const cachedScene = glbCache.get(alienId).clone(true);
        alienHoloGroup.add(cachedScene);
        return;
      }

      let modelUrl = `/models/aliens/${alienId}.glb`;
      if (alienId === "azmuth") modelUrl = "/models/azmuth.glb";

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

          // Measure and center model within the holographic beam
          const box = new THREE.Box3().setFromObject(root);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          let targetHeight = 1.35;
          if (alienId === "grey-matter") targetHeight = 0.95;
          else if (alienId === "four-arms") targetHeight = 1.55;
          else if (ALIEN_SCALE_FACTORS[alienId]) {
            targetHeight = ALIEN_SCALE_FACTORS[alienId] * 0.62;
          }

          const scale = targetHeight / (size.y || 1);
          root.scale.setScalar(scale);
          root.position.x = -center.x * scale;
          root.position.y = -center.y * scale;
          root.position.z = -center.z * scale;

          const wrapper = new THREE.Group();
          wrapper.add(root);

          // Store in cache for subsequent instant swaps
          glbCache.set(alienId, wrapper);

          alienHoloGroup.add(wrapper.clone(true));
        },
        undefined,
        () => {
          // Fallback crystal hologram if GLB is missing
          gltfLoader.load("/models/crystals.glb", (gltf) => {
            const crystal = gltf.scene;
            crystal.scale.setScalar(0.9);
            alienHoloGroup.add(crystal);
          });
        }
      );
    };

    // Load initial alien
    loadAlienModel(currentAlien?.id || "heatblast");

    // 6. Interactive Touch & Mouse Rotation for Alien Hologram
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let manualRotY = 0;
    let manualRotX = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerMove = (e) => {
      mouseParallaxX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseParallaxY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      manualRotY += deltaX * 0.012;
      manualRotX = Math.max(-0.35, Math.min(0.35, manualRotX + deltaY * 0.008));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 7. Render Loop
    let animId;
    let clock = new THREE.Clock();
    let currentDialAngle = 0;
    let lastRenderedAlienId = currentAlien?.id;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const transforming = isTransformingRef.current;
      const curIndex = selectedIndexRef.current;
      const curAlien = currentAlienRef.current;

      // Check if active alien changed -> update 3D hologram model & accent colors
      if (curAlien && curAlien.id !== lastRenderedAlienId) {
        lastRenderedAlienId = curAlien.id;
        loadAlienModel(curAlien.id);

        const newAccent = new THREE.Color(curAlien.accent || "#39ff14");
        beamMat.color.copy(newAccent);
        ringMat1.color.copy(newAccent);
        particleMat.color.copy(newAccent);
        rimLight.color.copy(newAccent);
        coreLight.color.copy(newAccent);
      }

      // Smooth camera subtle parallax
      const targetCamX = mouseParallaxX * 0.28;
      const targetCamY = 0.95 - mouseParallaxY * 0.18;
      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;

      // Shake camera if currently transforming
      if (transforming) {
        camera.position.x += (Math.random() - 0.5) * 0.08;
        camera.position.y += (Math.random() - 0.5) * 0.08;
        camera.position.z = 3.2 + Math.sin(time * 35) * 0.06;
      } else {
        camera.position.z += (3.6 - camera.position.z) * 0.06;
      }
      camera.lookAt(0, 0.52, 0);

      // Smoothly rotate ONLY the Omnitrix dial to match selected alien index
      const targetDialAngle = ((curIndex % 10) / 10) * (Math.PI * 2);
      currentDialAngle += (targetDialAngle - currentDialAngle) * 0.12;
      dialNodes.forEach((node) => {
        node.rotation.y = currentDialAngle;
      });

      // Omnitrix core depression animation when transforming
      if (coreNode) {
        const targetCoreY = transforming ? initialCoreY - 1.2 : initialCoreY;
        coreNode.position.y += (targetCoreY - coreNode.position.y) * 0.25;
      }

      // Pulse hologram beam and lights
      const pulse = Math.sin(time * 4.5);
      coreLight.intensity = transforming ? 14 : 4.0 + pulse * 1.5;
      beamMat.opacity = transforming ? 0.85 : 0.22 + (pulse + 1) * 0.06;
      holoBeam.rotation.y += 0.01;

      // Opposing hologram ring rotations
      holoRing1.rotation.z += 0.018;
      holoRing2.rotation.z -= 0.022;
      holoRing1.position.y = 0.3 + Math.sin(time * 2.5) * 0.035;
      holoRing2.position.y = 1.35 + Math.cos(time * 2.5) * 0.045;

      // Ascending energy particles
      const positions = particleGeo.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.007;
        if (positions[i] > 1.6) {
          positions[i] = -0.1;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Alien Hologram Idle Hovering & Rotation
      alienHoloGroup.position.y = 0.72 + Math.sin(time * 2.4) * 0.038;
      if (!isDragging) {
        alienHoloGroup.rotation.y += 0.012;
        alienHoloGroup.rotation.x += (0 - alienHoloGroup.rotation.x) * 0.05;
      } else {
        alienHoloGroup.rotation.y = manualRotY;
        alienHoloGroup.rotation.x = manualRotX;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Viewport Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
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
  }, []);

  return (
    <div
      ref={containerRef}
      className={`stage-canvas ${isTransforming ? "stage-canvas--flashing" : ""}`}
    />
  );
}
