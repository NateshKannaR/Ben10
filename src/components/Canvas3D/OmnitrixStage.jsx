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
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa3ff8b, 2.5);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00ff88, 1.5);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const coreLight = new THREE.PointLight(0x39ff14, 3, 5);
    coreLight.position.set(0, 0.4, 0);
    scene.add(coreLight);

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

        // Find dial / bezel parts to animate
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

      // Smooth camera tilt
      targetRotY = mouseX * 0.4;
      targetRotX = 1.8 - mouseY * 0.3;
      camera.position.x += (targetRotY * 2 - camera.position.x) * 0.05;
      camera.position.y += (targetRotX - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Pulse core light
      coreLight.intensity = 2.5 + Math.sin(time * 4) * 0.8;

      // Rotate dial smoothly towards target angle
      if (omnitrixModel) {
        const targetAngle = (selectedAlienIndex / aliens.length) * (Math.PI * 2);
        omnitrixModel.rotation.y += (targetAngle - omnitrixModel.rotation.y) * 0.1;
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
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedAlienIndex]);

  return (
    <div
      ref={containerRef}
      className={`stage-canvas ${isTransforming ? "stage-canvas--flashing" : ""}`}
    />
  );
}
