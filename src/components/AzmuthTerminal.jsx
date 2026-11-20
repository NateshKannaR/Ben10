import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { azmuthKnowledgeBase } from "../data/loreDatabase";
import { allAliens } from "../data/alienDatabase";
import sound from "../audio/soundEngine";

export default function AzmuthTerminal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [selectedTopic, setSelectedTopic] = useState(azmuthKnowledgeBase[0]);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typewriterTimeoutRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    if (!selectedTopic) return;
    const fullText = selectedTopic.answer;
    setDisplayedAnswer("");
    setIsTyping(true);
    let charIndex = 0;

    if (typewriterTimeoutRef.current) {
      clearInterval(typewriterTimeoutRef.current);
    }

    typewriterTimeoutRef.current = setInterval(() => {
      charIndex++;
      setDisplayedAnswer(fullText.slice(0, charIndex));
      if (charIndex >= fullText.length) {
        clearInterval(typewriterTimeoutRef.current);
        setIsTyping(false);
      }
    }, 18);

    return () => {
      if (typewriterTimeoutRef.current) {
        clearInterval(typewriterTimeoutRef.current);
      }
    };
  }, [selectedTopic]);

  // Handle custom query search across 63 aliens or knowledge base
  const handleAsk = (e) => {
    e?.preventDefault();
    if (!customInput.trim()) return;

    sound.click();
    const query = customInput.toLowerCase().trim();

    // Check aliens database
    const matchedAlien = allAliens.find(
      (a) => a.name.toLowerCase().includes(query) || a.species.toLowerCase().includes(query)
    );

    if (matchedAlien) {
      setSelectedTopic({
        id: matchedAlien.id,
        question: `Species Profile: ${matchedAlien.name} (${matchedAlien.species})`,
        category: "DNA Codestream",
        answer: `Subject: ${matchedAlien.name}. Species: ${matchedAlien.species} from ${matchedAlien.homeworld}. Height: ${matchedAlien.height}. ${matchedAlien.about} Key abilities include: ${matchedAlien.powers.map((p) => p.name).join(", ")}. Primary weakness: ${matchedAlien.weakness}. Omnitrix Genetic Index: ${matchedAlien.dna}.`
      });
      setCustomInput("");
      return;
    }

    // Check knowledge base
    const matchedKb = azmuthKnowledgeBase.find(
      (k) => k.question.toLowerCase().includes(query) || k.answer.toLowerCase().includes(query)
    );

    if (matchedKb) {
      setSelectedTopic(matchedKb);
    } else {
      setSelectedTopic({
        id: "generic",
        question: customInput,
        category: "Galvan Query",
        answer: `Analysis of '${customInput}': Query processed by Level-20 Galvan Intellect. The Omnitrix codestream contains 1,000,912 distinct sentient species across five galaxies. Continue your inquiry by selecting a classified topic from the index below, or type an alien name such as 'Heatblast', 'Alien X', or 'Feedback'.`
      });
    }
    setCustomInput("");
  };

  // 3D Scene setup for Azmuth GLB
  useEffect(() => {
    if (!isOpen) return;

    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 2.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const greenKey = new THREE.PointLight(0x39ff14, 3.5, 6);
    greenKey.position.set(0, 0.8, 1.2);
    scene.add(greenKey);

    const fillLight = new THREE.DirectionalLight(0x00e5ff, 1.5);
    fillLight.position.set(-2, 2, 2);
    scene.add(fillLight);

    // Hologram circular grid pedestal
    const gridGeo = new THREE.RingGeometry(0.3, 0.75, 32);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x39ff14,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -0.55;
    scene.add(grid);

    // Load Azmuth model with local MeshoptDecoder (100% offline)
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    let azmuthModel = null;
    gltfLoader.load(
      "/models/azmuth.glb",
      (gltf) => {
        azmuthModel = gltf.scene;

        const box = new THREE.Box3().setFromObject(azmuthModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = 1.1 / (size.y || 1);

        azmuthModel.position.x = -center.x * scale;
        azmuthModel.position.y = -box.min.y * scale - 0.55;
        azmuthModel.position.z = -center.z * scale;
        azmuthModel.scale.setScalar(scale);

        scene.add(azmuthModel);
      },
      undefined,
      (err) => console.warn("Failed to load azmuth.glb:", err)
    );

    // Mouse tracking for Azmuth head/body look-at
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Lerp Azmuth rotation towards mouse
      if (azmuthModel) {
        const targetRotY = mouseX * 0.75;
        const targetRotX = -mouseY * 0.2;
        azmuthModel.rotation.y += (targetRotY - azmuthModel.rotation.y) * 0.08;
        azmuthModel.rotation.x += (targetRotX - azmuthModel.rotation.x) * 0.08;
      }

      // Pulse pedestal ring
      grid.rotation.z += 0.01;
      gridMat.opacity = 0.35 + Math.sin(time * 3) * 0.15;

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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="azmuth-modal" role="dialog" aria-modal="true">
      <div className="azmuth-modal__backdrop" onClick={onClose} />
      <div className="azmuth-modal__window">
        {/* Header */}
        <div className="azmuth-header">
          <div className="azmuth-header__title">
            <span className="azmuth-tag">GALVAN INTELLIGENCE TERMINAL</span>
            <h2>Azmuth — First Thinker & Omnitrix Creator</h2>
          </div>
          <button type="button" className="azmuth-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Main Content: 3D Model Viewport & Terminal Response */}
        <div className="azmuth-body">
          {/* 3D Azmuth Canvas */}
          <div className="azmuth-3d-wrapper">
            <div ref={canvasRef} className="azmuth-canvas-mount" />
            <div className="azmuth-3d-tag">INTERACTIVE 3D HOLOGRAPHIC PROJECTION</div>
          </div>

          {/* Typewriter Terminal Output */}
          <div className="azmuth-terminal-panel">
            <div className="terminal-screen">
              <div className="terminal-screen__meta">
                <span>[COMM-LINK: GALVAN PRIME]</span>
                <span>STATUS: LEVEL-20 SYNC</span>
              </div>
              <h3 className="terminal-screen__question">{selectedTopic.question}</h3>
              <div className="terminal-screen__category">Index Category: {selectedTopic.category}</div>
              <p className="terminal-screen__text">
                {displayedAnswer}
                {isTyping && <span className="terminal-cursor">█</span>}
              </p>
            </div>

            {/* Custom Query Search Box */}
            <form className="azmuth-query-form" onSubmit={handleAsk}>
              <input
                type="text"
                placeholder="Query Galvan database (e.g. Alien X, Heatblast, Fail-safe)..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="azmuth-query-input"
              />
              <button type="submit" className="azmuth-query-btn">
                Inquire →
              </button>
            </form>

            {/* Suggested Topic Chips */}
            <div className="azmuth-topics">
              <span className="azmuth-topics__label">Knowledge Matrix:</span>
              <div className="azmuth-topics__list">
                {azmuthKnowledgeBase.map((kb) => (
                  <button
                    key={kb.id}
                    type="button"
                    className={`topic-chip ${selectedTopic.id === kb.id ? "topic-chip--active" : ""}`}
                    onClick={() => {
                      sound.click();
                      setSelectedTopic(kb);
                    }}
                  >
                    {kb.question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
