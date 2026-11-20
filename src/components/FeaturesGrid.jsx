import React from "react";
import { features } from "../data/timeline";
import { useStore } from "../store/useStore";
import sound from "../audio/soundEngine";

export default function FeaturesGrid({ onOpenAzmuth }) {
  const { setMode } = useStore();

  const handleFeatureClick = (id) => {
    sound.click();
    if (id === "archive") {
      const el = document.getElementById("archive");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "compare") {
      const el = document.getElementById("arena");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "scanner" || id === "lab") {
      if (onOpenAzmuth) onOpenAzmuth();
    } else if (id === "planets" || id === "moments") {
      const el = document.getElementById("evolution");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      setMode("omnitrix");
    }
  };

  return (
    <section id="lab" className="section">
      <div className="section__header">
        <h2 className="section__title">Galvan Lab & Archives</h2>
        <p className="section__subtitle">
          Interactive modules to inspect alien biology, compare species stats, and explore planetary origins.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feat) => (
          <div
            key={feat.id}
            className="feature-card"
            onClick={() => handleFeatureClick(feat.id)}
          >
            <div className="feature-card__image">
              <img src={feat.image} alt={feat.name} loading="lazy" />
            </div>
            <div className="feature-card__body">
              <h3 className="feature-card__title">{feat.name}</h3>
              <p className="feature-card__desc">{feat.line}</p>
              <span className="feature-card__action">Launch Module →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
