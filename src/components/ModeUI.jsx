import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { aliens } from "../data/aliens";

export default function ModeUI() {
  const {
    mode,
    setMode,
    selectedAlienIndex,
    currentAlien,
    soundEnabled,
    isTransforming,
    nextAlien,
    prevAlien,
    selectAlien,
    transform,
    toggleSound,
    close3D
  } = useStore();

  const [showDossier, setShowDossier] = useState(false);

  if (!mode) return null;

  const accent = currentAlien?.accent || "#39ff14";

  return (
    <div
      className={`mode-overlay ${isTransforming ? "mode-overlay--transforming" : ""}`}
      style={{ "--alien-accent": accent }}
    >
      {/* Sci-Fi Cybernetic Corner Brackets */}
      <div className="hud-corner hud-corner--tl" />
      <div className="hud-corner hud-corner--tr" />
      <div className="hud-corner hud-corner--bl" />
      <div className="hud-corner hud-corner--br" />

      {/* Top Bar Controls */}
      <div className="mode-topbar">
        <button
          type="button"
          className="hud-btn hud-btn--back"
          onClick={close3D}
          aria-label="Back to Website"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Exit Omnitrix</span>
        </button>

        <div className="mode-title">
          <div className="mode-tag-pill">
            <span className="mode-tag-dot" />
            <span className="mode-tag">{mode.toUpperCase()} MODE</span>
          </div>
          <h1 className="mode-alien-name" style={{ color: accent }}>
            {currentAlien.name}
          </h1>
          <span className="mode-alien-sub">
            {currentAlien.species} • Planet {currentAlien.homeworld}
          </span>
        </div>

        <div className="mode-topbar-actions">
          {mode === "viewer" ? (
            <button
              type="button"
              className="hud-btn hud-btn--mode-toggle"
              onClick={() => setMode("omnitrix")}
              title="Return to Omnitrix Dial View"
            >
              <span>Omnitrix Dial</span>
            </button>
          ) : (
            <button
              type="button"
              className="hud-btn hud-btn--mode-toggle"
              onClick={() => transform(selectedAlienIndex)}
              title="Transform to Full 3D Alien"
            >
              <span>Full Alien 3D</span>
            </button>
          )}

          <button
            type="button"
            className={`hud-btn hud-btn--dossier ${showDossier ? "hud-btn--active" : ""}`}
            onClick={() => setShowDossier(!showDossier)}
            title="Toggle Alien DNA Dossier"
          >
            <span>{showDossier ? "✕ Close Stats" : "Alien Stats"}</span>
          </button>

          <button
            type="button"
            className="hud-btn hud-btn--sound"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
            title={soundEnabled ? "Mute audio" : "Unmute audio"}
          >
            {soundEnabled ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Side Holographic Dossier HUD Panel (Collapsible) */}
      {showDossier && (
        <aside className="hud-dossier-panel">
          <div className="dossier-card">
            <div className="dossier-card__header">
              <span className="dossier-dna">DNA: {currentAlien.dna || "N/A"}</span>
              <span className="dossier-era">{currentAlien.series} ERA</span>
            </div>

            <h3 style={{ color: accent }}>{currentAlien.name}</h3>
            <p className="dossier-bio">{currentAlien.bio || currentAlien.about}</p>

            {/* Combat Gauges */}
            {currentAlien.stats && (
              <div className="dossier-stats-list">
                {Object.entries(currentAlien.stats).slice(0, 4).map(([stat, val]) => (
                  <div key={stat} className="dossier-stat-row">
                    <span className="dossier-stat-name">{stat.toUpperCase()}</span>
                    <div className="dossier-stat-track">
                      <div
                        className="dossier-stat-fill"
                        style={{ width: `${val}%`, backgroundColor: accent }}
                      />
                    </div>
                    <span className="dossier-stat-val">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Abilities */}
            {currentAlien.powers && (
              <div className="dossier-powers">
                <h4>SPECIAL ABILITIES</h4>
                <div className="dossier-chips">
                  {currentAlien.powers.map((p, i) => (
                    <span key={i} className="dossier-chip">
                      ✦ {typeof p === "string" ? p : p.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Left/Right Dial Turning Buttons */}
      <div className="mode-dial-controls">
        <button
          type="button"
          className="dial-arrow dial-arrow--prev"
          onClick={prevAlien}
          aria-label="Previous Alien"
          title="Previous Alien"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          className="dial-arrow dial-arrow--next"
          onClick={nextAlien}
          aria-label="Next Alien"
          title="Next Alien"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Bottom Alien Selector Strip & Slam Core Action */}
      <div className="mode-bottombar">
        <div className="alien-strip" role="group" aria-label="Omnitrix Dial Alien Playlist">
          {aliens.map((alien, idx) => {
            const isActive =
              idx === selectedAlienIndex ||
              (selectedAlienIndex >= 10 && idx === selectedAlienIndex % 10);
            return (
              <button
                key={alien.id}
                type="button"
                className={`alien-strip-item ${isActive ? "alien-strip-item--active" : ""}`}
                style={{ "--accent": alien.accent }}
                onClick={() => selectAlien(idx)}
                title={`${alien.slot}. ${alien.name}`}
              >
                <img
                  src={`/images/cast/${alien.id}.webp`}
                  alt={alien.name}
                  onError={(e) => {
                    e.target.src = "/images/cast/heatblast.webp";
                  }}
                />
                <span className="alien-strip-number">{alien.slot}</span>
              </button>
            );
          })}
        </div>

        {/* Slam / Transform Action Button */}
        <div className="mode-action">
          <button
            type="button"
            className="slam-btn"
            style={{ "--accent": accent }}
            onClick={() => {
              if (mode === "omnitrix") {
                transform(selectedAlienIndex);
              } else {
                setMode("omnitrix");
              }
            }}
            disabled={isTransforming}
          >
            <span className="slam-btn__glow" />
            <span className="slam-btn__text">
              {isTransforming
                ? "TRANSFORMING..."
                : mode === "omnitrix"
                ? "SLAM CORE TO TRANSFORM"
                : "⌚ RETURN TO OMNITRIX DIAL"}
            </span>
          </button>
        </div>
      </div>

      {/* Transformation Fullscreen Flash Effect */}
      {isTransforming && (
        <div className="transform-flash" style={{ "--flash-color": accent }}>
          <div className="transform-flash__core" />
          <div className="transform-flash__ring" />
          <div className="transform-flash__callout">HERO TIME!</div>
        </div>
      )}
    </div>
  );
}
