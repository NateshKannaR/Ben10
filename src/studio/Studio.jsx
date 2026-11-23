import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { asset, roster, sources } from "./catalog";
import "./studio.css";

const Scene = lazy(() => import("./Scene"));
const modes = [
  { id: "device", label: "Device lab", technique: "GLTF animation mixing · timeline scrubbing" },
  { id: "archive", label: "Alien archive", technique: "Meshopt decoding · animated 3D scan plane" },
  { id: "orbit", label: "Planet orbit", technique: "Procedural GLSL terrain · rim lighting" }
];

export default function Studio({ embedded = false, onOpenAzmuth }) {
  const [mode, setMode] = useState("device");
  const [alien, setAlien] = useState(roster[0]);
  const [spin, setSpin] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [progress, setProgress] = useState(0);
  const [reset, setReset] = useState(0);
  const [ready, setReady] = useState(false);
  const animation = useRef(0);
  const viewport = useRef(null);
  const [showScene, setShowScene] = useState(!embedded);
  const Title = embedded ? "h2" : "h1";
  const Content = embedded ? "div" : "main";
  const DetailTitle = embedded ? "h3" : "h2";
  const selectedMode = modes.find((item) => item.id === mode);
  const device = mode === "device";
  const archiveOnly = mode === "archive" && alien.archiveOnly;
  const color = device ? "#b8ff65" : alien.accent;

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const stopMotion = ({ matches }) => { if (matches) setSpin(false); };
    motion.addEventListener("change", stopMotion);
    return () => {
      motion.removeEventListener("change", stopMotion);
      cancelAnimationFrame(animation.current);
    };
  }, []);

  useEffect(() => {
    if (showScene) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShowScene(true);
    }, { rootMargin: "240px" });
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, [showScene]);

  function clearSequence() {
    cancelAnimationFrame(animation.current);
    setProgress(0);
    setReady(false);
  }

  function switchMode(next) {
    if (mode === next) return;
    clearSequence();
    setMode(next);
  }

  function selectAlien(next) {
    if (alien === next) return;
    clearSequence();
    setAlien(next);
  }

  function playSequence() {
    cancelAnimationFrame(animation.current);
    const from = device ? progress : 0;
    const to = device && progress > .5 ? 0 : 1;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(to);
      return;
    }
    const start = performance.now();
    function update(now) {
      const t = Math.min((now - start) / (device ? 850 : 1550), 1);
      const mix = device ? t * t * (3 - 2 * t) : t;
      setProgress(from + (to - from) * mix);
      if (t < 1) animation.current = requestAnimationFrame(update);
    }
    animation.current = requestAnimationFrame(update);
  }

  return (
    <section id="studio-workbench" className={`studio${embedded ? " studio--embedded" : ""}`} aria-labelledby="studio-title" style={{ "--signal": color }}>
      {!embedded && <header className="studio-header">
        <a className="studio-brand" href="./">
          <img src={asset("images/logo.svg")} alt="Ben 10" />
          <span>OMNITRIX<br /><b>3D STUDIO</b></span>
        </a>
        <a className="studio-home" href="./#studio-workbench">Main experience</a>
      </header>}
      <Content className="studio-content">
        <div className="studio-title">
          <div>
            <p className="studio-kicker">BEN 10 CLASSIC CONTINUITY</p>
            <Title id="studio-title">Omnitrix <em>3D Studio</em></Title>
          </div>
          <div className="studio-intro">
            <p>Explore the device, inspect alien forms, and orbit their homeworlds.</p>
            {onOpenAzmuth && <button type="button" className="studio-consult" onClick={onOpenAzmuth}>Consult Azmuth</button>}
          </div>
        </div>
        <nav className="studio-modes" aria-label="Studio scenes">
          {modes.map(({ id, label }) => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => switchMode(id)}>
              {label}
            </button>
          ))}
        </nav>
        {mode !== "device" && (
          <section className="studio-roster" aria-labelledby="roster-heading">
            <DetailTitle id="roster-heading">{mode === "orbit" ? "Choose a homeworld" : "Classic alien roster"}</DetailTitle>
            <div className="studio-tiles">
              {roster.map((entry) => (
                <button type="button" key={entry.id} aria-pressed={entry === alien} style={{ "--tile": entry.accent }} onClick={() => selectAlien(entry)}>
                  {!entry.archiveOnly && (
                    <img loading="lazy" src={asset(`images/cast/${entry.id}.webp`)} alt="" />
                  )}
                  {entry.later && <small>Later unlock</small>}
                  <strong>{mode === "orbit" ? entry.planet : entry.name}</strong>
                </button>
              ))}
            </div>
          </section>
        )}
        <div className="studio-workbench">
          <section ref={viewport} className="studio-stage" aria-label={`${selectedMode.label} 3D viewport`}>
            <div className="stage-label"><span /> {selectedMode.label}</div>
            {device && !ready && <img className="stage-poster" src={asset("images/omnitrix-poster.webp")} alt="" />}
            {!device && mode === "archive" && !alien.archiveOnly && !ready && (
              <img className="stage-poster stage-poster--alien" src={asset(`images/cast/${alien.id}.webp`)} alt="" />
            )}
            {showScene && <Suspense fallback={<p className="scene-status" role="status">Loading 3D studio…</p>}>
              <Scene mode={mode} alien={alien} spin={spin} progress={progress} reset={reset} onLoad={setReady} />
            </Suspense>}
            <div className="stage-controls">
              <button type="button" aria-pressed={spin} disabled={!ready} onClick={() => setSpin(!spin)}>Auto-rotate</button>
              <button type="button" disabled={!ready} onClick={() => setReset(reset + 1)}>Reset camera</button>
            </div>
            {ready && <p className="stage-help">Drag to orbit · Scroll or pinch to zoom</p>}
          </section>
          <section className="studio-panel" aria-label="Scene details">
            <p className="studio-kicker">{device ? "GALVAN TECHNOLOGY" : alien.later ? "LATER UNLOCK" : "ORIGINAL PLAYLIST"}</p>
            <DetailTitle>{device ? "Prototype Omnitrix" : mode === "orbit" ? alien.planet : alien.name}</DetailTitle>
            <p>{device
              ? "Azmuth’s prototype bonds to Ben during a summer road trip. It lets him temporarily take the form of different alien species."
              : mode === "orbit" ? `${alien.planet} is the homeworld of ${alien.species}. This procedural rendering is an artistic interpretation.` : alien.description}</p>

            <dl className="studio-facts">
              {device ? (
                <><div><dt>Creator</dt><dd>Azmuth</dd></div><div><dt>First appearance</dt><dd>And Then There Were 10</dd></div></>
              ) : (
                <><div><dt>Species</dt><dd>{alien.species}</dd></div><div><dt>{mode === "orbit" ? "Transformation" : "Homeworld"}</dt><dd>{mode === "orbit" ? alien.name : alien.planet}</dd></div><div><dt>Transformation debut</dt><dd>{alien.debut}</dd></div></>
              )}
            </dl>

            {device && (
              <div className="studio-slider">
                <label htmlFor="explosion">Assembly separation <output htmlFor="explosion">{Math.round(progress * 100)}%</output></label>
                <input id="explosion" type="range" min="0" max="100" value={Math.round(progress * 100)} disabled={!ready} onChange={(event) => {
                  cancelAnimationFrame(animation.current);
                  setProgress(Number(event.target.value) / 100);
                }} />
              </div>
            )}
            {mode === "archive" && (
              <ul className="studio-abilities" aria-label="Abilities">
                {alien.abilities.map((ability) => <li key={ability}>{ability}</li>)}
              </ul>
            )}
            {mode !== "orbit" && !archiveOnly && (
              <button type="button" className="studio-action" disabled={!ready} onClick={playSequence}>
                {device ? (progress > .5 ? "Reassemble device" : "Explode assembly") : "Run DNA scan"}
              </button>
            )}
            {mode === "archive" && progress === 1 && <p className="scan-complete" role="status">Scan complete · {alien.species} identified</p>}
            <a className="studio-source" href={device ? sources.premiere : alien.source || sources.omnitrix}
              target="_blank" rel="noreferrer">{device ? "Premiere reference" : "Canon reference"}</a>
          </section>
        </div>

        <footer className="studio-footer">
          <p>{selectedMode.technique}</p>
          <p>Unofficial fan project · <a href={sources.episodes} target="_blank" rel="noreferrer">Classic episode guide</a></p>
        </footer>
      </Content>
    </section>
  );
}

