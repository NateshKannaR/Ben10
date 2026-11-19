import React, { useState } from "react";
import { aliens } from "../data/aliens";
import { useStore } from "../store/useStore";

export default function HeroesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { transform, selectAlien } = useStore();
  const current = aliens[selectedIndex];

  const handleSelect = (idx) => {
    setSelectedIndex(idx);
    selectAlien(idx);
  };

  const handleTransform = () => {
    transform(selectedIndex);
  };

  return (
    <section id="heroes" className="section">
      <div className="section__header">
        <h2 className="section__title">Heroes</h2>
      </div>

      <div className="heroes" style={{ "--accent": current.accent }}>
        {/* Aliens Thumbnail Rail */}
        <div
          className="heroes__rail"
          data-lenis-prevent="true"
          role="group"
          aria-label="Choose an alien"
        >
          {aliens.map((alien, idx) => (
            <button
              key={alien.id}
              type="button"
              className="thumb"
              aria-pressed={idx === selectedIndex}
              aria-label={alien.name}
              style={{ "--accent": alien.accent }}
              onClick={() => handleSelect(idx)}
            >
              <img
                src={`/images/cast/${alien.id}.webp`}
                alt={alien.name}
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Selected Alien Details Panel */}
        <div className="heroes__panel">
          <div className="heroes__info">
            <div className="block">
              <h3 className="block__title">About</h3>
              <p>{current.bio}</p>
            </div>

            <div className="block">
              <h3 className="block__title">Abilities</h3>
              <ul className="traits">
                {current.powers.map((p, i) => (
                  <li key={i}>
                    <strong>{p.name}</strong>
                    <span>{p.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="block">
              <h3 className="block__title">Homeworld</h3>
              <p>
                <strong>{current.world.name}</strong> — {current.world.blurb}
              </p>
            </div>

            <div className="block">
              <h3 className="block__title">Combat Ratings</h3>
              <div className="stats">
                {Object.entries(current.stats).map(([stat, val]) => (
                  <div key={stat} className="stat-row">
                    <span className="stat-label">{stat}</span>
                    <div className="stat-track">
                      <div
                        className="stat-fill"
                        style={{ width: `${val}%`, backgroundColor: current.accent }}
                      />
                    </div>
                    <span className="stat-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Central Hero Display Card */}
          <div className="heroes__card">
            <div className="heroes__id">
              <h3>{current.name}</h3>
              <p className="heroes__species">{current.species}</p>
              <p className="heroes__homeworld">Planet {current.homeworld}</p>
              <span className="heroes__dna">DNA: {current.dna}</span>
            </div>

            <div className="heroes__figure">
              <img
                key={current.id}
                src={`/images/cast/${current.id}.webp`}
                alt={current.name}
              />
            </div>

            <button
              type="button"
              className="slab slab--accent needs3d"
              onClick={handleTransform}
            >
              Transform into {current.name}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
