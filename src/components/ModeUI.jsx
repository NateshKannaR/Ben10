import React from "react";
import { useStore } from "../store/useStore";
import { aliens } from "../data/aliens";

export default function ModeUI() {
  const {
    mode,
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

  if (!mode) return null;

  return (
    <div className={`mode-overlay ${isTransforming ? "mode-overlay--transforming" : ""}`}>
      {/* Top Bar Controls */}
      <div className="mode-topbar">
        <button
          type="button"
          className="hud-btn hud-btn--back"
          onClick={close3D}
          aria-label="Back to Website"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Exit Omnitrix</span>
        </button>

        <div className="mode-title">
          <span className="mode-tag">{mode.toUpperCase()} MODE</span>
          <span className="mode-alien-name" style={{ color: currentAlien.accent }}>
            {currentAlien.name}
          </span>
        </div>

        <button
          type="button"
          className="hud-btn hud-btn--sound"
          onClick={toggleSound}
          aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
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

      {/* Left/Right Dial Controls */}
      <div className="mode-dial-controls">
        <button
          type="button"
          className="dial-arrow dial-arrow--prev"
          onClick={prevAlien}
          aria-label="Previous Alien"
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
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Bottom Alien Selector Strip */}
      <div className="mode-bottombar">
        <div className="alien-strip">
          {aliens.map((alien, idx) => (
            <button
              key={alien.id}
              type="button"
              className={`alien-strip-item ${idx === selectedAlienIndex ? "alien-strip-item--active" : ""}`}
              style={{ "--accent": alien.accent }}
              onClick={() => selectAlien(idx)}
              title={alien.name}
            >
              <img src={`/images/cast/${alien.id}.webp`} alt={alien.name} />
              <span className="alien-strip-number">{alien.slot}</span>
            </button>
          ))}
        </div>

        {/* Slam / Transform Button */}
        <div className="mode-action">
          <button
            type="button"
            className="slam-btn"
            style={{ "--accent": currentAlien.accent }}
            onClick={() => transform(selectedAlienIndex)}
            disabled={isTransforming}
          >
            {isTransforming ? "TRANSFORMING..." : "SLAM CORE TO TRANSFORM"}
          </button>
        </div>
      </div>

      {/* Transformation Fullscreen Flash Effect */}
      {isTransforming && (
        <div className="transform-flash" style={{ "--flash-color": currentAlien.accent }}>
          <div className="transform-flash__core" />
        </div>
      )}
    </div>
  );
}
