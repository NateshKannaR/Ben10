/**
 * Global Omnitrix Experience state management
 */
import { useState, useEffect } from "react";
import sound from "../audio/soundEngine";
import { aliens, allAliens } from "../data/aliens";

// Lightweight reactive store without external dependencies
let state = {
  mode: null, // null (Site) | 'omnitrix' | 'viewer'
  selectedAlienIndex: 0,
  soundEnabled: true,
  isTransforming: false,
  coreRaised: false,
  bezelAngle: 0
};

const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener({ ...state }));
}

export const actions = {
  setMode(mode) {
    state.mode = mode;
    if (mode === "omnitrix") {
      sound.rise();
      state.coreRaised = true;
    } else if (mode === "viewer") {
      state.coreRaised = true;
    } else if (mode === null) {
      state.coreRaised = false;
      state.isTransforming = false;
    }
    notify();
  },

  selectAlien(index) {
    if (typeof index !== "number" || isNaN(index)) index = 0;
    if (index < 0) index = aliens.length - 1;
    if (index >= aliens.length) index = 0;
    state.selectedAlienIndex = index;
    state.bezelAngle = (index / aliens.length) * (Math.PI * 2);
    notify();
  },

  nextAlien() {
    actions.selectAlien((state.selectedAlienIndex + 1) % aliens.length);
  },

  prevAlien() {
    actions.selectAlien((state.selectedAlienIndex - 1 + aliens.length) % aliens.length);
  },

  toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    sound.setMuted(!state.soundEnabled);
    notify();
  },

  transform(alienIndex = state.selectedAlienIndex) {
    if (typeof alienIndex === "string") {
      const foundIdx = allAliens.findIndex((a) => a.id === alienIndex);
      alienIndex = foundIdx !== -1 ? foundIdx : 0;
    }
    if (typeof alienIndex !== "number" || isNaN(alienIndex)) {
      alienIndex = 0;
    }
    state.selectedAlienIndex = alienIndex;
    state.isTransforming = true;
    state.mode = "viewer";
    state.coreRaised = true;
    sound.transform();
    notify();

    setTimeout(() => {
      state.isTransforming = false;
      notify();
    }, 1400);
  },

  close3D() {
    state.mode = null;
    state.isTransforming = false;
    state.coreRaised = false;
    sound.timeout();
    notify();
  }
};

export function useStore() {
  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    listeners.add(setCurrentState);
    return () => listeners.delete(setCurrentState);
  }, []);

  const currentAlien =
    allAliens[currentState.selectedAlienIndex] ||
    aliens[currentState.selectedAlienIndex % 10] ||
    allAliens[0];

  return {
    ...currentState,
    currentAlien,
    ...actions
  };
}
