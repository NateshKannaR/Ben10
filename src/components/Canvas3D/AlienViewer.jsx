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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Position camera aimed slightly above origin for optimal alien framing
    camera.position.set(0, 0.45, 3.8);
    camera.lookAt(0, 0.25, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Accent Light matching current Alien
    const accentHex = currentAlien?.accent || "#39ff14";
    const accentColor = new THREE.Color(accentHex);

    // 2. Dynamic Sci-Fi Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.SpotLight(accentColor, 5.0, 15, Math.PI / 4, 0.5);
    rimLight.position.set(-3, 3, -2.5);
    scene.add(rimLight);

    const frontFill = new THREE.DirectionalLight(0xa3ff8b, 1.2);
    frontFill.position.set(0, 0.5, 3);
    scene.add(frontFill);

    const groundGlow = new THREE.PointLight(accentColor, 4, 7);
    groundGlow.position.set(0, -0.6, 0);
    scene.add(groundGlow);

    // 3. Holographic Pedestal Structure
    const pedestalGroup = new THREE.Group();
    scene.add(pedestalGroup);

    // Platform Ring 1 (outer segmented ring)
    const ringGeo1 = new THREE.RingGeometry(0.9, 1.25, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = -Math.PI / 2;
    pedestalGroup.add(ring1);

    // Platform Ring 2 (inner glowing energy ring)
    const ringGeo2 = new THREE.RingGeometry(0.55, 0.65, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x39ff14,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.01;
    pedestalGroup.add(ring2);

    // Platform Ring 3 (dashed glyph ring)
    const ringGeo3 = new THREE.RingGeometry(0.3, 0.35, 36);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.x = -Math.PI / 2;
    ring3.position.y = 0.02;
    pedestalGroup.add(ring3);

    // Ascending Light Cylinder Hologram Beam
    const beamGeo = new THREE.CylinderGeometry(0.7, 0.45, 2.4, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      wireframe: false
    });
    const holoBeam = new THREE.Mesh(beamGeo, beamMat);
    holoBeam.position.y = 0.6;
    pedestalGroup.add(holoBeam);

    // 4. Orbiting DNA Double-Helix Particle Swarm
    const dnaCount = 180;
    const dnaPositions = new Float32Array(dnaCount * 3);
    const dnaSpeeds = new Float32Array(dnaCount);
    for (let i = 0; i < dnaCount; i++) {
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const angle = (i / dnaCount) * Math.PI * 6 + strand;
      const radius = 1.1 + Math.sin(i * 0.15) * 0.15;
      dnaPositions[i * 3] = Math.cos(angle) * radius;
      dnaPositions[i * 3 + 1] = (i / dnaCount) * 3.0 - 0.9;
      dnaPositions[i * 3 + 2] = Math.sin(angle) * radius;
      dnaSpeeds[i] = 0.005 + Math.random() * 0.008;
    }
    const dnaGeo = new THREE.BufferGeometry();
    dnaGeo.setAttribute("position", new THREE.BufferAttribute(dnaPositions, 3));
    const dnaMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const dnaPoints = new THREE.Points(dnaGeo, dnaMat);
    scene.add(dnaPoints);

    // 5. Alien Model Group
    const alienGroup = new THREE.Group();
    scene.add(alienGroup);

    // Setup Meshopt & GLTF Loader
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

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

        // Compute Bounding Box
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Target visual height for balanced viewport framing
        let targetHeight = 2.2;
        if (alienId === "grey-matter") targetHeight = 1.45;
        else if (alienId === "four-arms") targetHeight = 2.6;
        else if (alienId === "azmuth") targetHeight = 1.15;
        else if (ALIEN_SCALE_FACTORS[alienId]) targetHeight = ALIEN_SCALE_FACTORS[alienId];

        const scale = targetHeight / (size.y || 1);
        root.scale.setScalar(scale);

        // Center alien directly at origin with slight vertical elevation to clear HUD
        const offsetY = 0.22;
        root.position.x = -center.x * scale;
        root.position.y = -center.y * scale + offsetY;
        root.position.z = -center.z * scale;

        alienGroup.add(root);

        // Position pedestal rings and beam precisely below the alien's feet!
        const feetY = -center.y * scale + offsetY + box.min.y * scale;
        pedestalGroup.position.y = feetY;
        groundGlow.position.y = feetY + 0.2;
      },
      undefined,
      (err) => {
        // Fallback for aliens without dedicated GLB: Galvan Holographic Matrix Chamber
        console.warn(`Alien model not found on disk for ${alienId}. Generating Galvan DNA Matrix Hologram...`);
        gltfLoader.load(
          "/models/crystals.glb",
          (gltf) => {
            const crystalScene = gltf.scene;
            crystalScene.position.set(0, 0.15, 0);
            crystalScene.scale.setScalar(1.6);
            crystalScene.traverse((c) => {
              if (c.isMesh) {
                c.material = new THREE.MeshStandardMaterial({
                  color: accentColor,
                  emissive: accentColor,
                  emissiveIntensity: 0.65,
                  roughness: 0.2,
                  metalness: 0.8,
                  wireframe: false
                });
              }
            });
            alienGroup.add(crystalScene);
            pedestalGroup.position.y = -0.65;
          },
          undefined,
          () => {
            // Procedural geometric crystal totem
            const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
            const coreMat = new THREE.MeshStandardMaterial({
              color: accentColor,
              emissive: accentColor,
              emissiveIntensity: 0.5,
              wireframe: true
            });
            const coreMesh = new THREE.Mesh(coreGeo, coreMat);
            coreMesh.position.y = 0.25;
            alienGroup.add(coreMesh);
            pedestalGroup.position.y = -0.65;
          }
        );
      }
    );

    // 6. Interactive Touch & Mouse Drag Rotation with Inertia
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let autoRotate = true;

    const onPointerDown = (e) => {
      isDragging = true;
      autoRotate = false;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      targetRotY += deltaX * 0.012;
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX + deltaY * 0.008));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Zoom via wheel
    const onWheel = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.002;
      camera.position.z = Math.max(2.4, Math.min(5.5, camera.position.z + zoomDelta));
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    // 7. Render Loop with Advanced 3D Animations
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Slow elegant auto-spin when idle
      if (!isDragging && autoRotate) {
        targetRotY += 0.006;
      }

      // Smooth damped rotation on model
      alienGroup.rotation.y += (targetRotY - alienGroup.rotation.y) * 0.1;
      alienGroup.rotation.x += (targetRotX - alienGroup.rotation.x) * 0.1;

      // Subtle breathing / floating bobbing animation
      alienGroup.position.y = Math.sin(time * 2.2) * 0.045;

      // Concentric Pedestal Rings counter-rotations & dynamic scaling
      ring1.rotation.z += 0.012;
      ring2.rotation.z -= 0.018;
      ring3.rotation.z += 0.024;
      ring1.scale.setScalar(1 + Math.sin(time * 2.5) * 0.03);

      // Light beam pulsation
      beamMat.opacity = 0.16 + Math.sin(time * 3.0) * 0.07;
      holoBeam.rotation.y += 0.01;

      // Dynamic accent lights breathing
      const pulse = Math.sin(time * 2.0);
      rimLight.intensity = 4.2 + pulse * 1.2;
      groundGlow.intensity = 3.5 + pulse * 0.8;

      // Flowing DNA particles ascending vortex
      const positions = dnaGeo.attributes.position.array;
      for (let i = 0; i < dnaCount; i++) {
        const idx = i * 3 + 1;
        positions[idx] += dnaSpeeds[i];
        if (positions[idx] > 2.3) {
          positions[idx] = -0.9;
        }
      }
      dnaGeo.attributes.position.needsUpdate = true;
      dnaPoints.rotation.y = time * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    // Responsive Canvas Resizing
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
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringGeo3.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      ringMat3.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      dnaGeo.dispose();
      dnaMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentAlien?.id]);

  return <div ref={containerRef} className="stage-canvas" />;
}
