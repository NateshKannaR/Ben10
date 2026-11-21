import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { AZMUTH_TOPICS, DIRECTIVES_HELP, queryAzmuthBrain } from "../data/azmuthAI";
import { aliens } from "../data/aliens";
import sound from "../audio/soundEngine";

const HOLO_THEMES = [
  { id: "emerald", label: "Galvan Prime", color: "#39ff14", glow: "rgba(57, 255, 20, 0.45)" },
  { id: "tachyon", label: "Subspace Cyan", color: "#00e5ff", glow: "rgba(0, 229, 255, 0.45)" },
  { id: "ascalon", label: "Ascalon Gold", color: "#ffd700", glow: "rgba(255, 215, 0, 0.45)" },
  { id: "crimson", label: "Threat Alert", color: "#ff3344", glow: "rgba(255, 51, 68, 0.45)" }
];

const CATEGORIES = [
  "All Lore",
  "Omnitrix Systems",
  "Alien Biology",
  "Cosmic Threats",
  "Galvan Secrets"
];

export default function AzmuthTerminal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [activeTheme, setActiveTheme] = useState(HOLO_THEMES[0]);
  const [activeCategory, setActiveCategory] = useState("All Lore");
  const [currentResponse, setCurrentResponse] = useState({
    title: AZMUTH_TOPICS[0].question,
    category: AZMUTH_TOPICS[0].category,
    text: AZMUTH_TOPICS[0].answer,
    alien: null
  });
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const typewriterTimeoutRef = useRef(null);
  const sceneElementsRef = useRef(null);

  // Typewriter text generator
  useEffect(() => {
    if (!currentResponse) return;
    const fullText = currentResponse.text;
    setDisplayedAnswer("");
    setIsTyping(true);
    let charIndex = 0;

    if (typewriterTimeoutRef.current) {
      clearInterval(typewriterTimeoutRef.current);
    }

    typewriterTimeoutRef.current = setInterval(() => {
      charIndex += 2;
      setDisplayedAnswer(fullText.slice(0, charIndex));
      if (charIndex >= fullText.length) {
        clearInterval(typewriterTimeoutRef.current);
        setIsTyping(false);
      }
    }, 14);

    // Voice Speech Synthesis if enabled
    if (voiceEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanSpeech = fullText.replace(/•|\[.*?\]|\n/g, " ");
      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.pitch = 1.22;
      utterance.rate = 1.08;

      // Select natural English voice if present
      const voices = window.speechSynthesis.getVoices();
      const engVoice = voices.find((v) => v.lang.startsWith("en") && !v.name.includes("Google"));
      if (engVoice) utterance.voice = engVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if (typewriterTimeoutRef.current) {
        clearInterval(typewriterTimeoutRef.current);
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentResponse, voiceEnabled]);

  const stopVoice = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleVoice = () => {
    sound.click();
    if (voiceEnabled) {
      stopVoice();
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled(true);
    }
  };

  // Submit query
  const handleAsk = (e) => {
    e?.preventDefault();
    if (!customInput.trim()) return;

    sound.click();
    const result = queryAzmuthBrain(customInput, aliens);
    if (result) {
      setCurrentResponse({
        title: result.title,
        category: result.category,
        text: result.text,
        alien: result.alien || null
      });
    }
    setCustomInput("");
  };

  // Select pre-set topic
  const handleSelectTopic = (topic) => {
    sound.click();
    setCurrentResponse({
      title: topic.question,
      category: topic.category,
      text: topic.answer,
      alien: null
    });
  };

  // Select quick directive command
  const handleRunCommand = (cmd) => {
    sound.click();
    const result = queryAzmuthBrain(cmd, aliens);
    if (result) {
      setCurrentResponse({
        title: result.title,
        category: result.category,
        text: result.text,
        alien: null
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentResponse.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // 3D Scene setup for Azmuth GLB
  useEffect(() => {
    if (!isOpen) return;

    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.45, 2.3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    // Dynamic Color Setup
    const themeColor = new THREE.Color(activeTheme.color);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(themeColor, 4.0, 6);
    keyLight.position.set(0, 0.9, 1.4);
    scene.add(keyLight);

    const rimLight = new THREE.SpotLight(themeColor, 3.5, 8, Math.PI / 3, 0.4);
    rimLight.position.set(-2, 2.2, -1.5);
    scene.add(rimLight);

    // Concentric Galvan Hologram Rings
    const ringGeo1 = new THREE.RingGeometry(0.35, 0.65, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: themeColor,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = -Math.PI / 2;
    ring1.position.y = -0.58;
    scene.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(0.72, 0.78, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = -0.57;
    scene.add(ring2);

    // Orbiting Galvan Bio-Matrix Particles
    const pCount = 80;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const radius = 0.4 + Math.random() * 0.55;
      const theta = Math.random() * Math.PI * 2;
      pPositions[i * 3] = Math.cos(theta) * radius;
      pPositions[i * 3 + 1] = -0.55 + Math.random() * 1.3;
      pPositions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: themeColor,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Load Azmuth model
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
        const scale = 1.15 / (size.y || 1);

        azmuthModel.position.x = -center.x * scale;
        azmuthModel.position.y = -box.min.y * scale - 0.56;
        azmuthModel.position.z = -center.z * scale;
        azmuthModel.scale.setScalar(scale);

        scene.add(azmuthModel);
      },
      undefined,
      (err) => console.warn("Failed to load azmuth.glb:", err)
    );

    // Interactive Drag Rotation + Mouse Track
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevX = 0;
    let manualRotY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevX;
        manualRotY += deltaX * 0.015;
        prevX = e.clientX;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      camera.position.z = Math.max(1.5, Math.min(3.8, camera.position.z + e.deltaY * 0.002));
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    sceneElementsRef.current = { keyLight, ringMat1, pMat, themeColor };

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Dynamic subtle floating bob & mouse look
      if (azmuthModel) {
        const targetRotY = manualRotY + mouseX * 0.55;
        const targetRotX = -mouseY * 0.18;
        azmuthModel.rotation.y += (targetRotY - azmuthModel.rotation.y) * 0.08;
        azmuthModel.rotation.x += (targetRotX - azmuthModel.rotation.x) * 0.08;
        azmuthModel.position.y = -0.56 + Math.sin(time * 2.0) * 0.02;
      }

      ring1.rotation.z += 0.012;
      ring2.rotation.z -= 0.008;

      particles.rotation.y = time * 0.08;

      // Pulse lighting while speaking/typing
      const isLive = isTyping || isSpeaking;
      keyLight.intensity = isLive ? 4.2 + Math.sin(time * 8) * 1.5 : 3.8 + Math.sin(time * 2) * 0.6;

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
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      pGeo.dispose();
      pMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen, activeTheme]);

  if (!isOpen) return null;

  const filteredTopics =
    activeCategory === "All Lore"
      ? AZMUTH_TOPICS
      : AZMUTH_TOPICS.filter((t) => t.category === activeCategory);

  return (
    <div className="azmuth-modal" role="dialog" aria-modal="true" style={{ "--terminal-accent": activeTheme.color }}>
      <div className="azmuth-modal__backdrop" onClick={onClose} />
      <div className="azmuth-modal__window">
        {/* Terminal Header */}
        <div className="azmuth-header">
          <div className="azmuth-header__title">
            <div className="azmuth-sync-badge">
              <span className="azmuth-sync-pulse" />
              <span>GALVAN PRIME CODON RELAY // LEVEL-20 SYNC</span>
            </div>
            <h2>Azmuth — First Thinker of Galvan Prime</h2>
          </div>

          <div className="azmuth-header__controls">
            {/* Hologram Frequency Selector */}
            <div className="holo-theme-picker" title="Switch Hologram Carrier Frequency">
              {HOLO_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={`holo-dot ${activeTheme.id === theme.id ? "holo-dot--active" : ""}`}
                  style={{ backgroundColor: theme.color }}
                  onClick={() => {
                    sound.click();
                    setActiveTheme(theme);
                  }}
                  title={`Frequency: ${theme.label}`}
                />
              ))}
            </div>

            {/* Voice Audio Vocalizer Toggle */}
            <button
              type="button"
              className={`azmuth-vocal-btn ${voiceEnabled ? "azmuth-vocal-btn--active" : ""}`}
              onClick={toggleVoice}
              title={voiceEnabled ? "Disable Galvan Voice Vocalizer" : "Enable Galvan Voice Vocalizer"}
            >
              <span>{voiceEnabled ? "Vocalizer ON" : "Vocalizer OFF"}</span>
            </button>

            <button
              type="button"
              className="azmuth-close-btn"
              onClick={onClose}
              aria-label="Close Galvan Terminal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main Terminal Viewport */}
        <div className="azmuth-body">
          {/* 3D Holographic Stage */}
          <div className="azmuth-3d-wrapper">
            <div ref={canvasRef} className="azmuth-canvas-mount" title="Click & Drag to rotate 3D Azmuth | Scroll to Zoom" />

            <div className="azmuth-3d-hud">
              <span className="azmuth-hud-label">FREQ: {activeTheme.label.toUpperCase()}</span>
              <span className="azmuth-hud-drag">DRAG TO ROTATE 3D</span>
            </div>

            {/* Audio Waveform Visualizer */}
            {isSpeaking && (
              <div className="azmuth-wave-visualizer">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          {/* Terminal Screen & Query Panel */}
          <div className="azmuth-terminal-panel">
            <div className="terminal-screen">
              <div className="terminal-screen__meta">
                <span>[TACHYON LINK: ACTIVE]</span>
                <span>INDEX: {currentResponse.category.toUpperCase()}</span>
                <button
                  type="button"
                  className="terminal-copy-btn"
                  onClick={handleCopy}
                  title="Copy Galvan response"
                >
                  {copied ? "COPIED" : "COPY"}
                </button>
              </div>

              <h3 className="terminal-screen__question">{currentResponse.title}</h3>

              {/* Alien Dossier Card (if querying an alien) */}
              {currentResponse.alien && (
                <div className="terminal-alien-dossier" style={{ "--alien-accent": currentResponse.alien.accent }}>
                  <img
                    src={`/images/cast/${currentResponse.alien.id}.webp`}
                    alt={currentResponse.alien.name}
                    className="dossier-img"
                  />
                  <div className="dossier-info">
                    <h4>{currentResponse.alien.name}</h4>
                    <span className="dossier-species">{currentResponse.alien.species} • Planet {currentResponse.alien.homeworld}</span>
                    <div className="dossier-stats-row">
                      <span>STR: {currentResponse.alien.stats.strength}</span>
                      <span>SPD: {currentResponse.alien.stats.speed}</span>
                      <span>INT: {currentResponse.alien.stats.intelligence}</span>
                      <span>DUR: {currentResponse.alien.stats.durability}</span>
                    </div>
                  </div>
                </div>
              )}

              <p className="terminal-screen__text">
                {displayedAnswer}
                {isTyping && <span className="terminal-cursor">█</span>}
              </p>

              {isSpeaking && (
                <div className="terminal-speech-active">
                  <span>Galvan Vocalizer transmitting audio...</span>
                  <button type="button" onClick={stopVoice} className="speech-stop-btn">
                    Mute Vocalizer
                  </button>
                </div>
              )}
            </div>

            {/* Directives & Quick Commands Strip */}
            <div className="terminal-cmd-bar">
              <span className="cmd-label">DIRECTIVES:</span>
              <div className="cmd-buttons">
                {DIRECTIVES_HELP.map((d) => (
                  <button
                    key={d.cmd}
                    type="button"
                    className="cmd-pill"
                    onClick={() => handleRunCommand(d.cmd)}
                    title={d.desc}
                  >
                    {d.cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Natural Language Inquiry Form */}
            <form className="azmuth-query-form" onSubmit={handleAsk}>
              <input
                type="text"
                placeholder="Inquire Level-20 intellect (e.g. Master Control, Alien X, Heatblast, Vilgax, Malware)..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="azmuth-query-input"
              />
              <button type="submit" className="azmuth-query-btn">
                Inquire →
              </button>
            </form>

            {/* Category Filter Matrix */}
            <div className="azmuth-categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${activeCategory === cat ? "category-pill--active" : ""}`}
                  onClick={() => {
                    sound.click();
                    setActiveCategory(cat);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filtered Topics Knowledge Chips */}
            <div className="azmuth-topics">
              <div className="azmuth-topics__list">
                {filteredTopics.slice(0, 10).map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    className={`topic-chip ${currentResponse.title === topic.question ? "topic-chip--active" : ""}`}
                    onClick={() => handleSelectTopic(topic)}
                  >
                    {topic.question}
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
