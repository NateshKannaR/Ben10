/**
 * Global Omnitrix Experience state management
 */
import { useState, useEffect } from "react";
import sound from "../audio/soundEngine";
import { aliens } from "../data/aliens";

// Lightweight reactive store without external dependencies
let state = {
  mode: null, // null (Site) | 'omnitrix' | 'viewer' | 'archive' | 'scanner' | 'compare' | 'planets' | 'moments' | 'lab'
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
    } else if (mode === null) {
      state.coreRaised = false;
    }
    notify();
  },

  selectAlien(index) {
    if (index < 0) index = aliens.length - 1;
    if (index >= aliens.length) index = 0;
    state.selectedAlienIndex = index;
    state.bezelAngle = (index / aliens.length) * (Math.PI * 2);
    sound.click();
    notify();
  },

  nextAlien() {
    actions.selectAlien(state.selectedAlienIndex + 1);
  },

  prevAlien() {
    actions.selectAlien(state.selectedAlienIndex - 1);
  },

  toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    sound.setMuted(!state.soundEnabled);
    notify();
  },

  transform(alienIndex = state.selectedAlienIndex) {
    state.selectedAlienIndex = alienIndex;
    state.isTransforming = true;
    sound.transform();
    notify();

    setTimeout(() => {
      state.isTransforming = false;
      state.mode = "viewer";
      notify();
    }, 2100);
  },

  close3D() {
    state.mode = null;
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

  return {
    ...currentState,
    currentAlien: aliens[currentState.selectedAlienIndex],
    ...actions
  };
}
