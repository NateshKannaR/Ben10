import React, { useRef, useEffect } from "react";
import { useStore } from "../store/useStore";

export default function Hero() {
  const heroRef = useRef(null);
  const { setMode } = useStore();

  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const depthElements = el.querySelectorAll("[data-depth]");

    const handlePointerMove = (e) => {
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;

      depthElements.forEach((node) => {
        const depth = Number(node.dataset.depth) || 0;
        const xOffset = xPct * depth;
        const yOffset = yPct * depth * 0.5;
        node.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const scrollToHeroes = () => {
    document.getElementById("heroes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <img
        className="hero__bg"
        src="/images/site/hero-bg.webp"
        alt=""
        data-depth="-26"
      />

      <h1 className="hero__title" data-depth="14">
        <span>It's</span>
        <span>Hero time</span>
      </h1>

      <div className="hero__cast" aria-hidden="true">
        <img
          className="hero__figure hero__figure--a"
          src="/images/cast/heatblast.webp"
          alt="Heatblast"
          data-depth="-34"
        />
        <img
          className="hero__figure hero__figure--b"
          src="/images/cast/four-arms.webp"
          alt="Four Arms"
          data-depth="-46"
        />
        <img
          className="hero__figure hero__figure--c"
          src="/images/cast/xlr8.webp"
          alt="XLR8"
          data-depth="46"
        />
        <img
          className="hero__figure hero__figure--d"
          src="/images/cast/diamondhead.webp"
          alt="Diamondhead"
          data-depth="34"
        />
        <img
          className="hero__figure hero__figure--ben"
          src="/images/cast/ben.webp"
          alt="Ben Tennyson"
          data-depth="-70"
        />
      </div>

      <div className="hero__actions needs3d">
        <button
          type="button"
          className="slab"
          onClick={() => setMode("omnitrix")}
        >
          Activate the Omnitrix
        </button>
      </div>

      <button
        type="button"
        className="hero__down"
        aria-label="Scroll to heroes"
        onClick={scrollToHeroes}
      >
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
          <path d="M16 20l8 8 8-8" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </section>
  );
}
