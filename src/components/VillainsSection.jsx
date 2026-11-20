import React, { useState } from "react";
import { cosmicThreats } from "../data/loreDatabase";
import sound from "../audio/soundEngine";

export default function VillainsSection() {
  const [selectedVillainId, setSelectedVillainId] = useState("vilgax");

  const activeVillain = cosmicThreats.find((v) => v.id === selectedVillainId) || cosmicThreats[0];

  const handleSelect = (id) => {
    sound.click();
    setSelectedVillainId(id);
  };

  return (
    <section id="threats" className="section section--dark">
      <div className="section__header">
        <div className="badge-pill badge-pill--red">PLUMBERS THREAT MATRIX</div>
        <h2 className="section__title">Cosmic Adversaries & Villains</h2>
        <p className="section__subtitle">
          Classified intelligence dossiers on the most dangerous warlords, genetic mutants, and rogue entities encountered by Ben Tennyson.
        </p>
      </div>

      <div className="threats-container">
        {/* Threat Navigation Rail */}
        <div className="threats-rail">
          {cosmicThreats.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`threat-btn ${v.id === selectedVillainId ? "threat-btn--active" : ""}`}
              style={{ "--threat-color": v.color }}
              onClick={() => handleSelect(v.id)}
            >
              <div className="threat-btn__indicator" />
              <div className="threat-btn__info">
                <strong>{v.name}</strong>
                <span>Threat: {v.threatLevel} ({v.threatScore}/100)</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Villain Dossier Card */}
        <div className="threat-dossier" style={{ "--threat-color": activeVillain.color }}>
          <div className="dossier-header">
            <div>
              <span className="dossier-level">LEVEL: {activeVillain.threatLevel} CLASS THREAT</span>
              <h3 className="dossier-name">{activeVillain.name}</h3>
              <p className="dossier-title">{activeVillain.title}</p>
            </div>
            <div className="threat-score-box">
              <span className="score-num">{activeVillain.threatScore}</span>
              <span className="score-lbl">THREAT INDEX</span>
            </div>
          </div>

          <div className="dossier-body">
            {/* Origin & Bio */}
            <div className="dossier-block">
              <h4>DOSSIER BRIEFING</h4>
              <p>{activeVillain.bio}</p>
              <div className="dossier-facts">
                <span>Species: <strong>{activeVillain.species}</strong></span>
                <span>Origin: <strong>{activeVillain.homeworld}</strong></span>
                <span>Arch-Enemy: <strong>{activeVillain.archEnemy}</strong></span>
              </div>
            </div>

            {/* Powers and Weakness */}
            <div className="dossier-block">
              <h4>LETHAL CAPABILITIES</h4>
              <ul className="threat-powers-list">
                {activeVillain.powers.map((p, i) => (
                  <li key={i}>⚠ {p}</li>
                ))}
              </ul>
            </div>

            <div className="dossier-block dossier-block--weakness">
              <h4>EXPLOITABLE VULNERABILITIES</h4>
              <p>{activeVillain.weakness}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
