import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HeroesSection from "./components/HeroesSection";
import AlienArchive from "./components/AlienArchive";
import AlienArena from "./components/AlienArena";
import OmnitrixSection from "./components/OmnitrixSection";
import OmnitrixEvolution from "./components/OmnitrixEvolution";
import VillainsSection from "./components/VillainsSection";
import SeriesTimeline from "./components/SeriesTimeline";
import FeaturesGrid from "./components/FeaturesGrid";
import Footer from "./components/Footer";
import StageManager from "./components/Canvas3D/StageManager";
import AzmuthTerminal from "./components/AzmuthTerminal";
import AudioPlayer from "./components/AudioPlayer";
import { useStore } from "./store/useStore";

import "./index.css";
import "./styles/site.css";
import "./styles/modeUI.css";
import "./styles/advancedBen10.css";

export default function App() {
  const { mode } = useStore();
  const [isAzmuthOpen, setIsAzmuthOpen] = useState(false);

  return (
    <div className={`app-root ${mode ? "app-root--mode-active" : ""}`}>
      {/* 3D WebGL Overlay Canvas (Omnitrix & Alien Viewer) */}
      <StageManager />

      {/* Floating 3D Azmuth AI Hologram Terminal */}
      <AzmuthTerminal
        isOpen={isAzmuthOpen}
        onClose={() => setIsAzmuthOpen(false)}
      />

      {/* Persistent Audio Dock for Theme Music & SFX */}
      <AudioPlayer />

      {/* Main Website Presentation */}
      <div className="site-layout">
        <Navigation onOpenAzmuth={() => setIsAzmuthOpen(true)} />
        <main>
          <Hero />
          <HeroesSection />
          <AlienArchive />
          <AlienArena />
          <OmnitrixSection />
          <OmnitrixEvolution />
          <VillainsSection />
          <SeriesTimeline />
          <FeaturesGrid onOpenAzmuth={() => setIsAzmuthOpen(true)} />
        </main>
        <Footer />
      </div>

      {/* Floating Azmuth Summon Pill in bottom-right corner */}
      {!mode && (
        <button
          type="button"
          className="floating-azmuth-pill"
          onClick={() => setIsAzmuthOpen(true)}
          title="Open Galvan AI 3D Terminal"
        >
          <span className="pill-dot" />
          <span className="pill-avatar">🧠</span>
          <span className="pill-text">Azmuth AI (3D)</span>
        </button>
      )}
    </div>
  );
}
