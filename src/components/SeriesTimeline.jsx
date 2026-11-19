import React, { useState } from "react";
import { series, eras } from "../data/timeline";

export default function SeriesTimeline() {
  const [activeEra, setActiveEra] = useState("classic");
  const selectedEra = eras.find((e) => e.id === activeEra) || eras[0];

  return (
    <>
      {/* Series Grid Section */}
      <section id="series" className="section">
        <div className="section__header">
          <h2 className="section__title">The Series</h2>
          <p className="section__subtitle">
            Follow the journey of Ben Tennyson across four eras, 230 episodes, and a decade of cosmic adventures.
          </p>
        </div>

        <div className="series__grid">
          {series.map((s, index) => (
            <div
              key={s.id}
              className="series__row"
              data-side={index % 2 ? "right" : "left"}
            >
              <div className="series__card">
                <div className="series__thumb">
                  <img
                    src={`/images/site/${s.image}.webp`}
                    alt={s.name}
                    loading="lazy"
                  />
                </div>
                <div className="series__info">
                  <div>
                    <h3 className="series__name">{s.name}</h3>
                    <p>{s.blurb}</p>
                  </div>
                  <dl className="series__facts">
                    <div>
                      <dt>Aired</dt>
                      <dd>{s.years}</dd>
                    </div>
                    <div>
                      <dt>Seasons</dt>
                      <dd>{s.seasons}</dd>
                    </div>
                    <div>
                      <dt>Episodes</dt>
                      <dd>{s.episodes}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chronological Lore / Eras Section */}
      <section id="chronology" className="section section--dark">
        <div className="section__header">
          <h2 className="section__title">Timeline & Lore</h2>
        </div>

        {/* Era Tabs */}
        <div className="era-tabs">
          {eras.map((era) => (
            <button
              key={era.id}
              type="button"
              className={`era-tab ${activeEra === era.id ? "era-tab--active" : ""}`}
              onClick={() => setActiveEra(era.id)}
            >
              {era.name}
            </button>
          ))}
        </div>

        {/* Selected Era View */}
        <div className="era" data-tone={selectedEra.tone}>
          <div className="era__banner">
            <img
              src={`/images/site/${selectedEra.banner}.webp`}
              alt={selectedEra.name}
              loading="lazy"
            />
          </div>

          <p className="era__intro">{selectedEra.intro}</p>

          <div className="era__chapters">
            {selectedEra.chapters.map((ch, idx) => (
              <div key={idx} className="chapter-card">
                <span className="chapter-when">{ch.when} ({ch.year})</span>
                <h4 className="chapter-title">{ch.title}</h4>
                <p className="chapter-details">{ch.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
