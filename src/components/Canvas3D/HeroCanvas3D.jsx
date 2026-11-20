import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

export default function HeroCanvas3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Dynamic Sci-Fi Lighting
    const ambientLight = new THREE.AmbientLight(0x0a2215, 1.2);
    scene.add(ambientLight);

    const greenKey = new THREE.PointLight(0x39ff14, 4.5, 8);
    greenKey.position.set(0, 0.8, 1.8);
    scene.add(greenKey);

    const cyanRim = new THREE.PointLight(0x00e5ff, 3.0, 7);
    cyanRim.position.set(-2, -1, -1);
    scene.add(cyanRim);

    // 3. Central Holographic Core Group
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0.15, -0.2);
    scene.add(coreGroup);

    // Holographic Energy Rings
    const ringGeo1 = new THREE.RingGeometry(1.35, 1.45, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x39ff14,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(1.65, 1.72, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    coreGroup.add(ring2);

    const ringGeo3 = new THREE.RingGeometry(1.05, 1.12, 48);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x5cff2e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 6;
    coreGroup.add(ring3);

    // Central Floating 3D Omnitrix Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    const watchGroup = new THREE.Group();
    coreGroup.add(watchGroup);

    gltfLoader.load(
      "/models/omnitrix.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.setScalar(0.55);
        model.position.set(0, -0.4, 0);
        model.rotation.set(0.4, Math.PI / 2, 0);
        watchGroup.add(model);
      },
      undefined,
      () => {
        // Fallback procedural crystal totem if model unavailable
        const crystalGeo = new THREE.OctahedronGeometry(0.7, 0);
        const crystalMat = new THREE.MeshStandardMaterial({
          color: 0x39ff14,
          emissive: 0x14a83c,
          emissiveIntensity: 0.5,
          wireframe: true
        });
        const mesh = new THREE.Mesh(crystalGeo, crystalMat);
        watchGroup.add(mesh);
      }
    );

    // 4. Orbiting Cosmic Bio-Energy Particles
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);
      particleScales[i] = Math.random();
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x5cff2e,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 6. Animation Loop with IntersectionObserver Optimization
    let animId;
    let clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      targetX += (mouseX * 0.4 - targetX) * 0.05;
      targetY += (mouseY * 0.3 - targetY) * 0.05;

      coreGroup.rotation.y = time * 0.18 + targetX;
      coreGroup.rotation.x = Math.sin(time * 0.3) * 0.1 - targetY;
      coreGroup.position.y = 0.15 + Math.sin(time * 1.5) * 0.08;

      // Opposing ring spins
      ring1.rotation.z += 0.01;
      ring2.rotation.z -= 0.014;
      ring3.rotation.y += 0.018;

      // Particle subtle rotation
      particles.rotation.y = time * 0.04;
      particles.rotation.x = Math.sin(time * 0.05) * 0.05;

      // Pulse green light
      greenKey.intensity = 4.0 + Math.sin(time * 3.5) * 1.2;

      renderer.render(scene, camera);
    };
    animate();

    // 7. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringGeo3.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      ringMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="hero-3d-canvas" aria-hidden="true" />;
}
