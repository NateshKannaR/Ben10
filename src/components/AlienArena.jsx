import React, { useState } from "react";
import { allAliens } from "../data/alienDatabase";
import sound from "../audio/soundEngine";

export default function AlienArena() {
  const [fighter1Id, setFighter1Id] = useState("heatblast");
  const [fighter2Id, setFighter2Id] = useState("four-arms");
  const [isSimulating, setIsSimulating] = useState(false);
  const [battleResult, setBattleResult] = useState(null);
  const [combatLogs, setCombatLogs] = useState([]);

  const fighter1 = allAliens.find((a) => a.id === fighter1Id) || allAliens[0];
  const fighter2 = allAliens.find((a) => a.id === fighter2Id) || allAliens[5];

  // Calculate overall combat score
  const getScore = (alien) => {
    return (
      alien.stats.strength * 0.35 +
      alien.stats.speed * 0.25 +
      alien.stats.intelligence * 0.2 +
      alien.stats.control * 0.2
    );
  };

  const handleSimulate = () => {
    sound.transform();
    setIsSimulating(true);
    setBattleResult(null);
    setCombatLogs([]);

    const score1 = getScore(fighter1);
    const score2 = getScore(fighter2);

    const logs = [];

    // Round 1: Initiative / Speed
    if (fighter1.stats.speed > fighter2.stats.speed) {
      logs.push(`Round 1 [Speed Advantage]: ${fighter1.name} seizes combat initiative with speed (${fighter1.stats.speed} vs ${fighter2.stats.speed}), landing precision initial strikes.`);
    } else if (fighter2.stats.speed > fighter1.stats.speed) {
      logs.push(`Round 1 [Speed Advantage]: ${fighter2.name} dashes across the arena with lightning reflexes, out-flanking ${fighter1.name}.`);
    } else {
      logs.push(`Round 1 [Stalemate]: Both combatants clash at equal velocity in the center of the arena.`);
    }

    // Round 2: Raw Power / Strength
    if (fighter1.stats.strength > fighter2.stats.strength) {
      logs.push(`Round 2 [Power Surge]: ${fighter1.name} unleashes overpowering kinetic force (${fighter1.stats.strength} STR), shaking the arena foundation.`);
    } else if (fighter2.stats.strength > fighter1.stats.strength) {
      logs.push(`Round 2 [Power Surge]: ${fighter2.name} delivers a devastating counter-strike, breaking through ${fighter1.name}'s defensive guard.`);
    } else {
      logs.push(`Round 2 [Kinetic Clash]: Shockwaves ripple as their blows neutralize each other.`);
    }

    // Round 3: Tactical Intelligence & Control
    if (fighter1.stats.intelligence + fighter1.stats.control > fighter2.stats.intelligence + fighter2.stats.control) {
      logs.push(`Round 3 [Tactical Mastery]: ${fighter1.name} exploits ${fighter2.name}'s vulnerabilities using high-level Galvan tactical analysis.`);
    } else {
      logs.push(`Round 3 [Tactical Mastery]: ${fighter2.name} exerts superior energy discipline, gaining the upper hand.`);
    }

    setTimeout(() => {
      setCombatLogs(logs);
      const winner = score1 >= score2 ? fighter1 : fighter2;
      const loser = score1 >= score2 ? fighter2 : fighter1;
      const margin = Math.abs(score1 - score2).toFixed(1);

      setBattleResult({
        winner,
        loser,
        margin,
        score1: Math.round(score1),
        score2: Math.round(score2)
      });
      setIsSimulating(false);
      sound.rise();
    }, 1200);
  };

  return (
    <section id="arena" className="section section--dark">
      <div className="section__header">
        <div className="badge-pill">GALVAN COMBAT SIMULATOR</div>
        <h2 className="section__title">Alien Battle Arena</h2>
        <p className="section__subtitle">
          Test any two alien genomes head-to-head in a simulated holographic battle arena across physical and tactical parameters.
        </p>
      </div>

      <div className="arena-container">
        {/* Arena Top Selectors & Visual Stage */}
        <div className="arena-stage">
          {/* Fighter 1 Card */}
          <div className="arena-fighter" style={{ "--fighter-accent": fighter1.accent }}>
            <div className="fighter-selector">
              <label htmlFor="f1-select">CHALLENGER 1</label>
              <select
                id="f1-select"
                value={fighter1Id}
                onChange={(e) => {
                  sound.click();
                  setFighter1Id(e.target.value);
                  setBattleResult(null);
                }}
              >
                {allAliens.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.series})
                  </option>
                ))}
              </select>
            </div>

            <div className="fighter-visual">
              <img
                src={fighter1.image}
                alt={fighter1.name}
                onError={(e) => {
                  e.target.src = "/images/cast/heatblast.webp";
                }}
              />
              <div className="fighter-badge">{fighter1.series} ERA</div>
            </div>

            <div className="fighter-meta">
              <h3>{fighter1.name}</h3>
              <p>{fighter1.species} • {fighter1.homeworld}</p>
            </div>

            <div className="fighter-stats">
              <div className="stat-meter">
                <span>STR</span>
                <div className="bar"><div style={{ width: `${fighter1.stats.strength}%`, backgroundColor: fighter1.accent }} /></div>
                <span>{fighter1.stats.strength}</span>
              </div>
              <div className="stat-meter">
                <span>SPD</span>
                <div className="bar"><div style={{ width: `${fighter1.stats.speed}%`, backgroundColor: fighter1.accent }} /></div>
                <span>{fighter1.stats.speed}</span>
              </div>
              <div className="stat-meter">
                <span>INT</span>
                <div className="bar"><div style={{ width: `${fighter1.stats.intelligence}%`, backgroundColor: fighter1.accent }} /></div>
                <span>{fighter1.stats.intelligence}</span>
              </div>
              <div className="stat-meter">
                <span>CTL</span>
                <div className="bar"><div style={{ width: `${fighter1.stats.control}%`, backgroundColor: fighter1.accent }} /></div>
                <span>{fighter1.stats.control}</span>
              </div>
            </div>
          </div>

          {/* Versus Center Hub */}
          <div className="arena-center-hub">
            <div className="vs-emblem">VS</div>
            <button
              type="button"
              className={`simulate-btn ${isSimulating ? "simulate-btn--active" : ""}`}
              onClick={handleSimulate}
              disabled={isSimulating}
            >
              {isSimulating ? "CALCULATING..." : "⚡ RUN SIMULATION"}
            </button>
          </div>

          {/* Fighter 2 Card */}
          <div className="arena-fighter" style={{ "--fighter-accent": fighter2.accent }}>
            <div className="fighter-selector">
              <label htmlFor="f2-select">CHALLENGER 2</label>
              <select
                id="f2-select"
                value={fighter2Id}
                onChange={(e) => {
                  sound.click();
                  setFighter2Id(e.target.value);
                  setBattleResult(null);
                }}
              >
                {allAliens.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.series})
                  </option>
                ))}
              </select>
            </div>

            <div className="fighter-visual">
              <img
                src={fighter2.image}
                alt={fighter2.name}
                onError={(e) => {
                  e.target.src = "/images/cast/heatblast.webp";
                }}
              />
              <div className="fighter-badge">{fighter2.series} ERA</div>
            </div>

            <div className="fighter-meta">
              <h3>{fighter2.name}</h3>
              <p>{fighter2.species} • {fighter2.homeworld}</p>
            </div>

            <div className="fighter-stats">
              <div className="stat-meter">
                <span>STR</span>
                <div className="bar"><div style={{ width: `${fighter2.stats.strength}%`, backgroundColor: fighter2.accent }} /></div>
                <span>{fighter2.stats.strength}</span>
              </div>
              <div className="stat-meter">
                <span>SPD</span>
                <div className="bar"><div style={{ width: `${fighter2.stats.speed}%`, backgroundColor: fighter2.accent }} /></div>
                <span>{fighter2.stats.speed}</span>
              </div>
              <div className="stat-meter">
                <span>INT</span>
                <div className="bar"><div style={{ width: `${fighter2.stats.intelligence}%`, backgroundColor: fighter2.accent }} /></div>
                <span>{fighter2.stats.intelligence}</span>
              </div>
              <div className="stat-meter">
                <span>CTL</span>
                <div className="bar"><div style={{ width: `${fighter2.stats.control}%`, backgroundColor: fighter2.accent }} /></div>
                <span>{fighter2.stats.control}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Combat Outcome Report */}
        {battleResult && (
          <div className="arena-report">
            <div className="winner-announcement" style={{ "--win-color": battleResult.winner.accent }}>
              <span className="win-tag">VICTORY PREDICTION</span>
              <h3>{battleResult.winner.name} Prevails!</h3>
              <p>
                Calculated power rating: <strong>{battleResult.winner.id === fighter1.id ? battleResult.score1 : battleResult.score2}</strong> vs <strong>{battleResult.loser.id === fighter1.id ? battleResult.score1 : battleResult.score2}</strong> (Margin: +{battleResult.margin} pts)
              </p>
            </div>

            <div className="combat-log-ticker">
              <h4>GALVAN COMBAT TELEMETRY LOGS</h4>
              <ul>
                {combatLogs.map((log, i) => (
                  <li key={i}>{log}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
