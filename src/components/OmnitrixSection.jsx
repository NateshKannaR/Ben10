import React from "react";
import { useStore } from "../store/useStore";

export default function OmnitrixSection() {
  const { setMode } = useStore();

  return (
    <section id="omnitrix" className="section section--dark">
      <div className="section__header">
        <h2 className="section__title">The Omnitrix</h2>
        <p className="section__subtitle">
          Level 20 Galvan Technology created by Azmuth to promote galactic peace and archive over 1,000,000 alien species.
        </p>
      </div>

      <div className="omnitrix-showcase">
        <div className="omnitrix-showcase__media">
          <img
            src="/images/omnitrix-poster.webp"
            alt="The Omnitrix, black and green wrist device with a glowing hourglass core"
            className="omnitrix-poster"
          />
        </div>

        <div className="omnitrix-showcase__content">
          <div className="feature-spec">
            <h3>Active Mode & Pop-up Core</h3>
            <p>
              When activated, the hourglass silhouette bezel pops up, rotating clockwise or counter-clockwise through DNA samples stored in the Codon Stream.
            </p>
          </div>

          <div className="feature-spec">
            <h3>Genetic Transformation</h3>
            <p>
              Slamming down the core rewires the host's DNA on a cellular level, instantly transforming the user into the selected alien while preserving identity and consciousness.
            </p>
          </div>

          <div className="feature-spec">
            <h3>Fail-Safe Protocol</h3>
            <p>
              Prevents the host's death by triggering emergency transformations into suitable alien species when facing lethal physical damage or atmospheric vacuum.
            </p>
          </div>

          <div className="showcase-cta">
            <button
              type="button"
              className="slab slab--glow needs3d"
              onClick={() => setMode("omnitrix")}
            >
              Activate 3D Omnitrix Mode
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
