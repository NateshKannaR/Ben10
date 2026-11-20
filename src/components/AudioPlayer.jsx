import React, { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
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

  return (
    <div className="audio-dock" role="region" aria-label="Audio controls">
      <button
        type="button"
        className={`audio-dock-btn ${isPlaying ? "audio-dock-btn--active" : ""}`}
        onClick={toggleMusic}
        title={isPlaying ? "Mute Background Theme" : "Play Ben 10 Theme"}
      >
        <span className="audio-dock-icon">
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2.5-1.23L6.5 6.5H3c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h3.5l5 4.5c.67.6 1.5.15 1.5-.74V2.74c0-.89-.83-1.34-1.5-.74zm-1 4.5v10.99l-3.65-3.28-.35-.22H4V10h2.5l.35-.22 3.65-3.28z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          )}
        </span>
        <span className="audio-dock-lbl">{isPlaying ? "Theme Playing" : "Theme Music"}</span>
      </button>
    </div>
  );
}
