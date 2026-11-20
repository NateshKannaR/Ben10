import React, { useRef, useEffect } from "react";
import { useStore } from "../store/useStore";
import sound from "../audio/soundEngine";
import HeroCanvas3D from "./Canvas3D/HeroCanvas3D";
import { aliens } from "../data/aliens";

export default function Hero({ onOpenAzmuth }) {
  const heroRef = useRef(null);
  const { setMode, selectAlien } = useStore();

  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const depthElements = el.querySelectorAll("[data-depth]");

    const handlePointerMove = (e) => {
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;

      depthElements.forEach((node) => {
        const depth = Number(node.dataset.depth) || 0;
        const xOffset = xPct * depth;
        const yOffset = yPct * depth * 0.45;
        node.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const scrollToSection = (id) => {
    sound.click();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLaunchOmnitrix = (alienIndex = 0) => {
    sound.rise();
    selectAlien(alienIndex);
    setMode("omnitrix");
  };

  const heroAliens = aliens.slice(0, 6);

  return (
    <section id="home" className="hero-modern" ref={heroRef}>
      {/* 1. Live 3D WebGL Background Canvas */}
      <HeroCanvas3D />

      {/* 2. Deep Atmospheric Sci-Fi Background Layer */}
      <div className="hero-modern__bg-vignette" />
      <div className="hero-modern__grid-overlay" />

      {/* 3. Hero Main Content Container */}
      <div className="hero-modern__content">
        {/* Cybernetic Status Badge */}
        <div className="hero-badge" data-depth="6">
          <span className="hero-badge__dot" />
          <span className="hero-badge__text">GALVAN PRIME // OMNITRIX CODEX v4.2 • ONLINE</span>
        </div>

        {/* Modernized Grand Title */}
        <h1 className="hero-modern__title" data-depth="12">
          <span className="hero-modern__title-sub">IT'S</span>
          <span className="hero-modern__title-main">HERO TIME</span>
        </h1>

        {/* Futuristic Subtitle */}
        <p className="hero-modern__desc" data-depth="16">
          Wield Level-20 Galvan engineering. Explore <strong>63 sentient alien genomes</strong>,
          real-time 3D DNA holograms, combat arena matchups, and a decade of cosmic history.
        </p>

        {/* Primary Action Buttons */}
        <div className="hero-modern__actions" data-depth="20">
          <button
            type="button"
            className="hero-btn hero-btn--primary"
            onClick={() => handleLaunchOmnitrix(0)}
          >
            <span className="hero-btn__glow" />
            <span className="hero-btn__icon">⚡</span>
            <span>ACTIVATE OMNITRIX 3D</span>
          </button>

          <button
            type="button"
            className="hero-btn hero-btn--secondary"
            onClick={() => scrollToSection("archive")}
          >
            <span>🧬 EXPLORE 63 ALIENS</span>
          </button>

          {onOpenAzmuth && (
            <button
              type="button"
              className="hero-btn hero-btn--ghost"
              onClick={() => {
                sound.click();
                onOpenAzmuth();
              }}
            >
              <span>🧠 AZMUTH AI</span>
            </button>
          )}
        </div>

        {/* Quick 3D Alien Preview Selector Strip */}
        <div className="hero-quick-strip" data-depth="24">
          <span className="hero-quick-strip__label">CORE DNA QUICK DIAL:</span>
          <div className="hero-quick-strip__items">
            {heroAliens.map((alien, idx) => (
              <button
                key={alien.id}
                type="button"
                className="hero-quick-item"
                style={{ "--accent": alien.accent }}
                onClick={() => handleLaunchOmnitrix(idx)}
                title={`Quick launch ${alien.name} in 3D`}
              >
                <img src={`/images/cast/${alien.id}.webp`} alt={alien.name} />
                <span className="hero-quick-item__name">{alien.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Cinematic Character Figures with Parallax Depth */}
      <div className="hero-modern__cast" aria-hidden="true">
        <img
          className="hero-cast-img hero-cast-img--heatblast"
          src="/images/cast/heatblast.webp"
          alt="Heatblast"
          data-depth="-22"
        />
        <img
          className="hero-cast-img hero-cast-img--fourarms"
          src="/images/cast/four-arms.webp"
          alt="Four Arms"
          data-depth="-32"
        />
        <img
          className="hero-cast-img hero-cast-img--ben"
          src="/images/cast/ben.webp"
          alt="Ben Tennyson"
          data-depth="-48"
        />
        <img
          className="hero-cast-img hero-cast-img--xlr8"
          src="/images/cast/xlr8.webp"
          alt="XLR8"
          data-depth="32"
        />
        <img
          className="hero-cast-img hero-cast-img--diamondhead"
          src="/images/cast/diamondhead.webp"
          alt="Diamondhead"
          data-depth="22"
        />
      </div>

      {/* 5. Scroll Prompt Indicator */}
      <button
        type="button"
        className="hero-scroll-btn"
        onClick={() => scrollToSection("heroes")}
        aria-label="Scroll to heroes section"
      >
        <span className="hero-scroll-btn__text">SCROLL TO DISCOVER</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  );
}
