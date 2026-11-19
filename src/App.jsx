import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HeroesSection from "./components/HeroesSection";
import OmnitrixSection from "./components/OmnitrixSection";
import SeriesTimeline from "./components/SeriesTimeline";
import FeaturesGrid from "./components/FeaturesGrid";
import Footer from "./components/Footer";
import StageManager from "./components/Canvas3D/StageManager";
import { useStore } from "./store/useStore";

import "./index.css";
import "./styles/site.css";
import "./styles/modeUI.css";

export default function App() {
  const { mode } = useStore();

  return (
    <div className={`app-root ${mode ? "app-root--mode-active" : ""}`}>
      {/* 3D WebGL Overlay Canvas (Omnitrix & Alien Viewer) */}
      <StageManager />

      {/* Main Website Presentation */}
      <div className="site-layout">
        <Navigation />
        <main>
          <Hero />
          <HeroesSection />
          <OmnitrixSection />
          <SeriesTimeline />
          <FeaturesGrid />
        </main>
        <Footer />
      </div>
    </div>
  );
}
