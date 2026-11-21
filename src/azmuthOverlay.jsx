import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import AzmuthTerminal from "./components/AzmuthTerminal";
import "./styles/advancedBen10.css";

function AzmuthOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="azmuth-floating-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Consult Azmuth AI"
        title="Consult Azmuth AI (Level-20 Galvan Intelligence)"
      >
        <span className="azmuth-trigger-dot" />
        <span className="azmuth-trigger-text">Azmuth AI</span>
      </button>

      <AzmuthTerminal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

const container = document.getElementById("azmuth-app");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<AzmuthOverlay />);
}
