import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
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
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Accent Light matching the current Alien
    const accentColor = new THREE.Color(currentAlien.accent || "#00ff88");

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const accentRim = new THREE.SpotLight(accentColor, 4);
    accentRim.position.set(-3, 3, -2);
    scene.add(accentRim);

    const groundGlow = new THREE.PointLight(accentColor, 2, 4);
    groundGlow.position.set(0, -0.2, 0);
    scene.add(groundGlow);

    // Platform ring
    const ringGeo = new THREE.RingGeometry(0.8, 1.2, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1;
    scene.add(ring);

    // Load Alien GLB
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let alienGroup = new THREE.Group();
    scene.add(alienGroup);

    const modelUrl = `/models/aliens/${currentAlien.id}.glb`;
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

        const targetHeight = ALIEN_SCALE_FACTORS[currentAlien.id] || 2.0;
        const scale = targetHeight / (size.y || 1);

        root.position.x = -center.x * scale;
        root.position.y = -box.min.y * scale - 1.0;
        root.position.z = -center.z * scale;
        root.scale.setScalar(scale);

        alienGroup.add(root);
      },
      undefined,
      (err) => console.warn(`Could not load ${modelUrl}:`, err)
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

      // Platform pulse
      ring.scale.setScalar(1 + Math.sin(time * 2) * 0.04);

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
      dracoLoader.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentAlien.id]);

  return <div ref={containerRef} className="stage-canvas" />;
}
