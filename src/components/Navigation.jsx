import React, { useState } from "react";
import { useStore } from "../store/useStore";
import sound from "../audio/soundEngine";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "heroes", label: "Heroes" },
  { id: "omnitrix", label: "Omnitrix" },
  { id: "series", label: "Series" },
  { id: "chronology", label: "Timeline" },
  { id: "lab", label: "Features" }
];

export default function Navigation({ onOpenAzmuth }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setMode } = useStore();

  const scrollTo = (id) => {
    sound.click();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openOmnitrix = () => {
    sound.rise();
    setMenuOpen(false);
    setMode("omnitrix");
  };

  return (
    <header className="nav">
      <a
        href="#home"
        className="nav__brand"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("home");
        }}
      >
        <img src="/images/logo.svg" alt="Ben 10 Omnitrix Logo" />
      </a>

      <nav className="nav__links">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            className="nav__link-btn"
            onClick={() => scrollTo(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="nav__actions">
        <button
          type="button"
          className="nav-azmuth-pill"
          onClick={() => {
            if (onOpenAzmuth) onOpenAzmuth();
          }}
          title="Open Galvan AI 3D Hologram Terminal"
        >
          <span className="nav-azmuth-dot" />
          <span className="nav-azmuth-text">Azmuth AI</span>
        </button>

        <button
          type="button"
          className="nav-omnitrix-cta"
          onClick={openOmnitrix}
        >
          <span>Omnitrix 3D</span>
        </button>
      </div>

      <button
        type="button"
        className="nav__burger"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => {
          sound.click();
          setMenuOpen(!menuOpen);
        }}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <div className="nav__mobile-menu">
          <div className="nav__mobile-brand">
            <img src="/images/logo.svg" alt="Ben 10 Logo" width="40" height="40" />
            <span>OMNITRIX CODESPREAD</span>
          </div>
          <div className="nav__mobile-links">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                className="nav__mobile-item"
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="nav__mobile-actions">
            <button
              type="button"
              className="nav__mobile-btn nav__mobile-btn--azmuth"
              onClick={() => {
                setMenuOpen(false);
                if (onOpenAzmuth) onOpenAzmuth();
              }}
            >
              Azmuth AI
            </button>
            <button
              type="button"
              className="nav__mobile-btn nav__mobile-btn--omnitrix"
              onClick={openOmnitrix}
            >
              Omnitrix 3D
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
