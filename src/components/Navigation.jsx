import React, { useState } from "react";
import { useStore } from "../store/useStore";
import sound from "../audio/soundEngine";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "heroes", label: "Heroes" },
  { id: "archive", label: "Archive (63)" },
  { id: "arena", label: "Battle Arena" },
  { id: "omnitrix", label: "Omnitrix" },
  { id: "evolution", label: "Matrix Evolution" },
  { id: "threats", label: "Villains" },
  { id: "series", label: "Series" },
  { id: "chronology", label: "Timeline" }
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
            onClick={() => scrollTo(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="nav__actions">
        <button
          type="button"
          className="wire-button azmuth-nav-btn"
          onClick={() => {
            sound.click();
            if (onOpenAzmuth) onOpenAzmuth();
          }}
          title="Open Galvan AI 3D Hologram Terminal"
        >
          ✦ Azmuth AI (3D)
        </button>

        <button
          type="button"
          className="wire-button nav__cta needs3d"
          onClick={openOmnitrix}
        >
          Omnitrix 3D
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
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            className="wire-button"
            onClick={() => {
              setMenuOpen(false);
              if (onOpenAzmuth) onOpenAzmuth();
            }}
          >
            ✦ Azmuth AI (3D)
          </button>
          <button
            type="button"
            className="wire-button wire-button--accent"
            onClick={openOmnitrix}
          >
            Omnitrix 3D
          </button>
        </div>
      )}
    </header>
  );
}
