import React, { useState } from "react";
import { useStore } from "../store/useStore";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "heroes", label: "Heroes" },
  { id: "omnitrix", label: "Omnitrix" },
  { id: "series", label: "Series" },
  { id: "chronology", label: "Timeline" },
  { id: "lab", label: "Features" }
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setMode } = useStore();

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openOmnitrix = () => {
    setMenuOpen(false);
    setMode("omnitrix");
  };

  return (
    <header className="nav">
      <a href="#home" className="nav__brand" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
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

      <button
        type="button"
        className="wire-button nav__cta needs3d"
        onClick={openOmnitrix}
      >
        Omnitrix
      </button>

      <button
        type="button"
        className="nav__burger"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i />
        <i />
      </button>

      <div className="nav__sheet" data-open={menuOpen}>
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => scrollTo(link.id)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
}
