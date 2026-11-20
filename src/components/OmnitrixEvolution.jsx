import React, { useState } from "react";
import { omnitrixDevices } from "../data/loreDatabase";
import { useStore } from "../store/useStore";
import sound from "../audio/soundEngine";

export default function OmnitrixEvolution() {
  const [selectedDeviceId, setSelectedDeviceId] = useState("complete");
  const { setMode } = useStore();

  const currentDevice = omnitrixDevices.find((d) => d.id === selectedDeviceId) || omnitrixDevices[0];

  const handleSelect = (id) => {
    sound.click();
    setSelectedDeviceId(id);
  };

  return (
    <section id="evolution" className="section section--dark">
      <div className="section__header">
        <div className="badge-pill">GALVAN HARDWARE EVOLUTION</div>
        <h2 className="section__title">Omnitrix Matrix Generations</h2>
        <p className="section__subtitle">
          Explore the engineering evolution of Azmuth's Level-20 technology, from the recalcitrant prototype to the perfected universal fail-safe matrix.
        </p>
      </div>

      <div className="evolution-container">
        {/* Device Selection Tabs */}
        <div className="evolution-tabs">
          {omnitrixDevices.map((dev) => (
            <button
              key={dev.id}
              type="button"
              className={`evolution-tab ${dev.id === selectedDeviceId ? "evolution-tab--active" : ""}`}
              style={{ "--dev-accent": dev.accent }}
              onClick={() => handleSelect(dev.id)}
            >
              <span className="evolution-tab__era">{dev.era}</span>
              <strong className="evolution-tab__name">{dev.name}</strong>
            </button>
          ))}
        </div>

        {/* Selected Device Showcase Card */}
        <div className="evolution-card" style={{ "--dev-accent": currentDevice.accent }}>
          <div className="evolution-card__left">
            <div className="evolution-card__header">
              <span className="evolution-card__era-tag">{currentDevice.era}</span>
              <h3 className="evolution-card__title">{currentDevice.name}</h3>
              <p className="evolution-card__creator">Architect: {currentDevice.creator}</p>
            </div>

            <p className="evolution-card__desc">{currentDevice.description}</p>

            {/* Performance Gauges */}
            <div className="evolution-specs">
              <div className="spec-row">
                <span className="spec-label">Power Matrix Output</span>
                <div className="spec-track">
                  <div className="spec-fill" style={{ width: `${currentDevice.powerLevel}%`, backgroundColor: currentDevice.accent }} />
                </div>
                <span className="spec-val">{currentDevice.powerLevel}/100</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Codestream Stability</span>
                <div className="spec-track">
                  <div className="spec-fill" style={{ width: currentDevice.stability, backgroundColor: currentDevice.accent }} />
                </div>
                <span className="spec-val">{currentDevice.stability}</span>
              </div>
            </div>

            <div className="evolution-features">
              <div className="feat-block">
                <h4>System Interface</h4>
                <p>{currentDevice.aiInterface}</p>
              </div>
              <div className="feat-block">
                <h4>Genetic Storage</h4>
                <p>{currentDevice.dnaCapacity}</p>
              </div>
            </div>

            {/* Failsafes & Quirks */}
            <div className="evolution-protocols">
              <div className="protocol-box">
                <h4>Active Fail-Safe Protocols</h4>
                <ul>
                  {currentDevice.failsafes.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
              </div>
              <div className="protocol-box protocol-box--quirk">
                <h4>Operational Quirks</h4>
                <p>{currentDevice.quirks}</p>
              </div>
            </div>

            <button
              type="button"
              className="wire-button wire-button--accent"
              onClick={() => {
                sound.rise();
                setMode("omnitrix");
              }}
            >
              Enter 3D WebGL Omnitrix Mode →
            </button>
          </div>

          <div className="evolution-card__right">
            <div className="evolution-preview-frame">
              <img
                src={currentDevice.image}
                alt={currentDevice.name}
                loading="lazy"
              />
              <div className="preview-overlay">
                <span>{currentDevice.name}</span>
                <span className="preview-status">SYSTEM ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
