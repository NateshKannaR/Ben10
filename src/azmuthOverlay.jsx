import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import AzmuthTerminal from "./components/AzmuthTerminal";
import Studio from "./studio/Studio";
import "./styles/advancedBen10.css";

function HomepageTools() {
  const [slots, setSlots] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const homepage = document.getElementById("root");
    const studio = document.createElement("div");
    const action = document.createElement("div");
    action.className = "studio-hero-entry";

    function placeStudio() {
      const hero = homepage.querySelector("main > #home");
      if (!hero) return;
      hero.after(studio);
      const controls = hero.querySelector(".hero__actions");
      if (controls?.classList.contains("needs3d")) {
        controls.classList.remove("needs3d");
        controls.querySelector("button")?.classList.add("needs3d");
      }
      (controls || hero).appendChild(action);
      setSlots({ studio, action });
      return true;
    }

    const observer = new MutationObserver(() => {
      if (placeStudio()) observer.disconnect();
    });
    if (!placeStudio()) observer.observe(homepage, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      action.remove();
      studio.remove();
    };
  }, []);

  useEffect(() => {
    if (slots && location.hash === "#studio-workbench") {
      document.getElementById("studio-workbench")?.scrollIntoView();
    }
  }, [slots]);

  return (
    <>
      {slots && createPortal(
        <a className="studio-hero-link" href="#studio-workbench">Explore 3D Studio</a>,
        slots.action
      )}
      {slots && createPortal(
        <Studio embedded onOpenAzmuth={() => setIsOpen(true)} />,
        slots.studio
      )}
      <AzmuthTerminal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

const container = document.getElementById("azmuth-app");
if (container) createRoot(container).render(<HomepageTools />);
