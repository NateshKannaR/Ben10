import React, { useState, useRef, useEffect } from "react";
import sound from "../audio/soundEngine";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundFxEnabled, setSoundFxEnabled] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/audio/bgm.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    sound.click();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Autoplay blocked or audio unavailable:", err);
      });
    }
  };

  const toggleSfx = () => {
    const next = !soundFxEnabled;
    setSoundFxEnabled(next);
    sound.setMuted(!next);
  };

  return (
    <div className="audio-dock" role="region" aria-label="Audio controls">
      <button
        type="button"
        className={`audio-dock-btn ${isPlaying ? "audio-dock-btn--active" : ""}`}
        onClick={toggleMusic}
        title={isPlaying ? "Mute Background Theme" : "Play Ben 10 Theme"}
      >
        <span className="audio-dock-icon">{isPlaying ? "🔊" : "🔇"}</span>
        <span className="audio-dock-lbl">{isPlaying ? "Theme Playing" : "Theme Music"}</span>
      </button>

      <button
        type="button"
        className={`audio-dock-btn ${soundFxEnabled ? "audio-dock-btn--active" : ""}`}
        onClick={toggleSfx}
        title={soundFxEnabled ? "Mute SFX" : "Enable SFX"}
      >
        <span className="audio-dock-icon">⚡</span>
        <span className="audio-dock-lbl">{soundFxEnabled ? "SFX On" : "SFX Off"}</span>
      </button>
    </div>
  );
}
