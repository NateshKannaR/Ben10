import React, { useState, useMemo } from "react";
import { allAliens, SERIES_METADATA } from "../data/alienDatabase";
import { useStore } from "../store/useStore";
import sound from "../audio/soundEngine";

const POWER_FILTERS = [
  "All",
  "Fire",
  "Flight",
  "Strength",
  "Speed",
  "Electricity",
  "Energy",
  "Intellect"
];

export default function AlienArchive() {
  const [selectedSeries, setSelectedSeries] = useState("ALL");
  const [selectedPower, setSelectedPower] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalAlien, setActiveModalAlien] = useState(null);

  const { transform, selectAlien } = useStore();

  const filteredAliens = useMemo(() => {
    return allAliens.filter((alien) => {
      // Series filter
      if (selectedSeries !== "ALL" && alien.series !== selectedSeries) {
        return false;
      }

      // Power filter
      if (selectedPower !== "All") {
        const hasPower = alien.powers.some((p) =>
          p.name.toLowerCase().includes(selectedPower.toLowerCase())
        );
        if (!hasPower) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = alien.name.toLowerCase().includes(q);
        const matchesSpecies = alien.species.toLowerCase().includes(q);
        const matchesWorld = alien.homeworld.toLowerCase().includes(q);
        if (!matchesName && !matchesSpecies && !matchesWorld) return false;
      }

      return true;
    });
  }, [selectedSeries, selectedPower, searchQuery]);

  const handleOpenAlienModal = (alien) => {
    sound.click();
    setActiveModalAlien(alien);
  };

  const handleLaunch3D = (alien) => {
    sound.transform();
    // Find index in main aliens array or set to current
    const idx = allAliens.findIndex((a) => a.id === alien.id);
    if (idx !== -1) {
      selectAlien(idx % 10); // Sync dial slot
    }
    setActiveModalAlien(null);
    transform(idx % 10);
  };

  return (
    <section id="archive" className="section section--dark">
      <div className="section__header">
        <div className="badge-pill">GALVAN CODESPREAD DATABASE</div>
        <h2 className="section__title">Omnitrix Alien Archive</h2>
        <p className="section__subtitle">
          Comprehensive DNA registry containing all 63 sentient species unlocked by Ben Tennyson across four eras.
        </p>
      </div>

      {/* Control Bar: Series Tabs & Search */}
      <div className="archive-controls">
        <div className="series-filter-bar">
          <button
            type="button"
            className={`series-tab ${selectedSeries === "ALL" ? "series-tab--active" : ""}`}
            onClick={() => {
              sound.click();
              setSelectedSeries("ALL");
            }}
          >
            All Eras <span className="tab-count">63</span>
          </button>
          {Object.entries(SERIES_METADATA).map(([key, meta]) => (
            <button
              key={key}
              type="button"
              className={`series-tab ${selectedSeries === key ? "series-tab--active" : ""}`}
              style={{ "--tab-accent": meta.color }}
              onClick={() => {
                sound.click();
                setSelectedSeries(key);
              }}
            >
              {meta.name} <span className="tab-count">{meta.count}</span>
            </button>
          ))}
        </div>

        {/* Search Input & Power Filter Pills */}
        <div className="archive-search-row">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Search by alien name, species, or homeworld..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="power-pills">
            {POWER_FILTERS.map((pw) => (
              <button
                key={pw}
                type="button"
                className={`power-pill ${selectedPower === pw ? "power-pill--active" : ""}`}
                onClick={() => {
                  sound.click();
                  setSelectedPower(pw);
                }}
              >
                {pw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Results Count */}
      <div className="archive-results-info">
        <span>Showing {filteredAliens.length} of 63 registered alien species</span>
      </div>

      {/* Grid of Alien Cybernetic Cards */}
      <div className="archive-grid">
        {filteredAliens.map((alien) => (
          <div
            key={alien.id}
            className="archive-card"
            style={{ "--alien-accent": alien.accent }}
            onClick={() => handleOpenAlienModal(alien)}
          >
            {/* Cybernetic Wireframe SVG Corner Accents */}
            <svg className="corner corner--tl" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 15V1H15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <svg className="corner corner--tr" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1H15V15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <svg className="corner corner--bl" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1V15H15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <svg className="corner corner--br" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15 1V15H1" stroke="currentColor" strokeWidth="1.5" />
            </svg>

            {/* Header info */}
            <div className="archive-card__header">
              <span className="archive-card__slot">#{String(alien.slot).padStart(2, "0")}</span>
              <span className={`series-badge series-badge--${alien.series.toLowerCase()}`}>
                {alien.series}
              </span>
            </div>

            {/* Alien Image / Silhouette preview */}
            <div className="archive-card__visual">
              <img
                src={alien.image}
                alt={alien.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/images/cast/heatblast.webp";
                }}
              />
              {alien.has3DModel && (
                <span className="archive-card__3d-badge">3D GLB</span>
              )}
            </div>

            {/* Name and Species */}
            <div className="archive-card__meta">
              <h3 className="archive-card__name">{alien.name}</h3>
              <p className="archive-card__species">{alien.species}</p>
              <p className="archive-card__homeworld">Planet {alien.homeworld}</p>
            </div>

            {/* Mini stat gauges */}
            <div className="archive-card__stats">
              <div className="mini-stat">
                <span className="mini-stat__lbl">STR</span>
                <div className="mini-stat__bar">
                  <div style={{ width: `${alien.stats.strength}%` }} />
                </div>
                <span className="mini-stat__num">{alien.stats.strength}</span>
              </div>
              <div className="mini-stat">
                <span className="mini-stat__lbl">SPD</span>
                <div className="mini-stat__bar">
                  <div style={{ width: `${alien.stats.speed}%` }} />
                </div>
                <span className="mini-stat__num">{alien.stats.speed}</span>
              </div>
            </div>

            {/* Action prompt */}
            <div className="archive-card__footer">
              <span className="archive-card__dna">DNA: {alien.dna}</span>
              <span className="archive-card__inspect">Inspect Details →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Alien DNA Modal */}
      {activeModalAlien && (
        <div className="alien-modal" role="dialog" aria-modal="true">
          <div className="alien-modal__backdrop" onClick={() => setActiveModalAlien(null)} />
          <div className="alien-modal__content" style={{ "--modal-accent": activeModalAlien.accent }}>
            <button
              type="button"
              className="alien-modal__close"
              onClick={() => setActiveModalAlien(null)}
            >
              ✕
            </button>

            <div className="alien-modal__grid">
              {/* Left Column: Image & Debut info */}
              <div className="alien-modal__portrait">
                <div className="alien-modal__img-box">
                  <img
                    src={activeModalAlien.image}
                    alt={activeModalAlien.name}
                    onError={(e) => {
                      e.target.src = "/images/cast/heatblast.webp";
                    }}
                  />
                  <div className="alien-modal__dna-tag">{activeModalAlien.dna}</div>
                </div>

                <div className="alien-modal__debut-box">
                  <span className="debut-label">FIRST APPEARANCE:</span>
                  <div className="debut-series">{activeModalAlien.seriesName}</div>
                  <div className="debut-ep">
                    Episode {activeModalAlien.debut.episode_number || "—"}: "{activeModalAlien.debut.episode_name || "Debut"}"
                  </div>
                </div>

                <button
                  type="button"
                  className="wire-button wire-button--full"
                  onClick={() => handleLaunch3D(activeModalAlien)}
                >
                  ⚡ Transform in 3D WebGL
                </button>
              </div>

              {/* Right Column: In-depth Biology, Powers, Stats */}
              <div className="alien-modal__details">
                <div className="alien-modal__title-row">
                  <div>
                    <h2>{activeModalAlien.name}</h2>
                    <span className="modal-sub">{activeModalAlien.species} • Planet {activeModalAlien.homeworld}</span>
                  </div>
                  <span className={`series-badge series-badge--${activeModalAlien.series.toLowerCase()} modal-badge`}>
                    {activeModalAlien.series} Era
                  </span>
                </div>

                {/* Biology Specifications */}
                <div className="modal-section">
                  <h4 className="modal-section__heading">BIOLOGICAL SPECIFICATIONS</h4>
                  <div className="spec-grid">
                    <div>
                      <dt>Body Type</dt>
                      <dd>{activeModalAlien.bodyType}</dd>
                    </div>
                    <div>
                      <dt>Height</dt>
                      <dd>{activeModalAlien.height}</dd>
                    </div>
                    <div>
                      <dt>Homeworld</dt>
                      <dd>{activeModalAlien.homeworld}</dd>
                    </div>
                    <div>
                      <dt>Color Spectrum</dt>
                      <dd>{activeModalAlien.colorScheme.join(", ")}</dd>
                    </div>
                  </div>
                </div>

                {/* About & Backstory */}
                <div className="modal-section">
                  <h4 className="modal-section__heading">CODEX BACKSTORY</h4>
                  <p className="modal-bio">{activeModalAlien.about}</p>
                </div>

                {/* Powers & Abilities */}
                <div className="modal-section">
                  <h4 className="modal-section__heading">SPECIAL ABILITIES</h4>
                  <div className="ability-tags">
                    {activeModalAlien.powers.map((p, i) => (
                      <span key={i} className="ability-tag">
                        ✦ {p.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Combat Ratings */}
                <div className="modal-section">
                  <h4 className="modal-section__heading">COMBAT & ENERGY GAUGES</h4>
                  <div className="modal-stats">
                    {Object.entries(activeModalAlien.stats).map(([st, val]) => (
                      <div key={st} className="modal-stat-row">
                        <span className="modal-stat-lbl">{st.toUpperCase()}</span>
                        <div className="modal-stat-track">
                          <div
                            className="modal-stat-bar"
                            style={{
                              width: `${val}%`,
                              backgroundColor: activeModalAlien.accent
                            }}
                          />
                        </div>
                        <span className="modal-stat-val">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
