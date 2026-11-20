import React, { useState } from "react";

// Archetype icons & descriptions for aliens in the Omnitrix codex
const ARCHETYPE_ICONS = {
  // OS Aliens
  ghostfreak: { icon: "👻", label: "Spectral Phantom" },
  wildvine: { icon: "🌿", label: "Chlorokinetic" },
  spitter: { icon: "💧", label: "Acid Propulsion" },
  buzzshock: { icon: "⚡", label: "Bio-Electric Megawatt" },
  arctiguana: { icon: "❄", label: "Sub-Zero Cryo" },
  blitzwolfer: { icon: "🐺", label: "Ultrasonic Loboan" },
  "perk-upchuck": { icon: "👅", label: "Matter Ingestion" },
  "murk-upchuck": { icon: "👅", label: "Matter Ingestion" },
  "snare-oh": { icon: "📜", label: "Mummy Pharaonic" },
  frankenstrike: { icon: "⚡", label: "Electromagnetic Dynamo" },
  "eye-guy": { icon: "👁", label: "Multi-Optic Laser" },
  "way-big": { icon: "🪐", label: "To'kustar Colossus" },
  ditto: { icon: "👥", label: "Cellular Replicator" },

  // AF Aliens
  "echo-echo": { icon: "🔊", label: "Sonic Duplicator" },
  humungousaur: { icon: "🦖", label: "Vaxasaurian Titan" },
  jetray: { icon: "✈", label: "Aerokinetic Speed" },
  brainstorm: { icon: "🧠", label: "Level-19 Synapse" },
  spidermonkey: { icon: "🕷", label: "Arachnichimp" },
  goop: { icon: "🧪", label: "Polymorph Slime" },
  lodestar: { icon: "🧲", label: "Magnetokinetic" },
  rath: { icon: "🐯", label: "Appoplexian Brawler" },
  nanomech: { icon: "🔬", label: "Nano-Cybernetic" },

  // UA Aliens
  "water-hazard": { icon: "🌊", label: "Hydro-Pressurized" },
  ampfibian: { icon: "⚡", label: "Amperi Neuro-Current" },
  armodrillo: { icon: "🔨", label: "Seismic Jackhammer" },
  terraspin: { icon: "🌪", label: "Geochelone Vortex" },
  nrg: { icon: "☢", label: "Prypiatosian Reactor" },
  fasttrack: { icon: "💨", label: "Citrakayah Hyper-Speed" },
  chamalien: { icon: "🦎", label: "Camouflage Phantom" },
  eatle: { icon: "🪲", label: "Metal Ingestion" },
  clockwork: { icon: "⏳", label: "Chronosapien Temporal" },
  juryrigg: { icon: "⚙", label: "Planchaküle Tinkerer" },
  shocksquatch: { icon: "⚡", label: "Gimlinopithecus Volt" },

  // OV Aliens
  bloxx: { icon: "🧱", label: "Segmentasapien" },
  gravattack: { icon: "🪐", label: "Galilean Graviton" },
  crashhopper: { icon: "🦗", label: "Orthopteran Leaper" },
  "ball-weevil": { icon: "🔮", label: "Plasma Ball Roller" },
  walkatrout: { icon: "🐟", label: "Ickthyperambuloid" },
  "pesky-dust": { icon: "✨", label: "Nemuina Dreamweaver" },
  "mole-stache": { icon: "🦡", label: "Prehensile Whiskers" },
  "the-worst": { icon: "🛡", label: "Indestructible Atrocian" },
  "kickin-hawk": { icon: "🦅", label: "Melee Avian" },
  toepick: { icon: "😱", label: "Nightmare Visage" },
  astrodactyl: { icon: "🚀", label: "Star-Sail Pterosaur" },
  bullfrag: { icon: "🐸", label: "Incursean Infiltrator" },
  atomix: { icon: "⚛", label: "Nuclear Fusion" },
  gutrot: { icon: "☣", label: "Chemical Synthesis" },
  whampire: { icon: "🦇", label: "Vladat Corruptor" }
};

// Known valid images on disk
const VALID_IMAGE_MAP = {
  heatblast: "/images/cast/heatblast.webp",
  wildmutt: "/images/cast/wildmutt.webp",
  diamondhead: "/images/cast/diamondhead.webp",
  xlr8: "/images/cast/xlr8.webp",
  "grey-matter": "/images/cast/grey-matter.webp",
  "four-arms": "/images/cast/four-arms.webp",
  stinkfly: "/images/cast/stinkfly.webp",
  ripjaws: "/images/cast/ripjaws.webp",
  upgrade: "/images/cast/upgrade.webp",
  cannonbolt: "/images/cast/cannonbolt.webp",
  swampfire: "/images/aliens/swampfire_af.png",
  bigchill: "/images/aliens/bigchill_af.webp",
  chromastone: "/images/aliens/chromastone_af.png",
  alienx: "/images/aliens/alienX.webp",
  feedback: "/images/aliens/feedback_ov.webp",
  ben: "/images/cast/ben.webp"
};

export default function AlienVisual({ alien, className = "", style = {} }) {
  const [imageFailed, setImageFailed] = useState(false);

  const mappedSrc = VALID_IMAGE_MAP[alien.id] || (imageFailed ? null : alien.image);
  const archetype = ARCHETYPE_ICONS[alien.id] || { icon: "✦", label: "Galvan DNA Sample" };

  if (mappedSrc && !imageFailed) {
    return (
      <img
        src={mappedSrc}
        alt={alien.name}
        className={className}
        style={style}
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }

  // Bespoke Galvan DNA Hologram Badge
  const accent = alien.accent || "#39ff14";

  return (
    <div
      className={`alien-hologram-card-visual ${className}`}
      style={{
        ...style,
        "--alien-glow": accent
      }}
      title={`${alien.name} — ${alien.species}`}
    >
      <div className="holo-matrix-grid" />
      <div className="holo-reticle-ring">
        <svg viewBox="0 0 100 100" className="holo-svg-ring">
          <circle cx="50" cy="50" r="44" stroke={accent} strokeWidth="1.5" strokeDasharray="4 6" fill="none" opacity="0.6" />
          <circle cx="50" cy="50" r="38" stroke="#39ff14" strokeWidth="1" strokeDasharray="12 4" fill="none" opacity="0.4" />
          <polygon points="50,14 82,32 82,68 50,86 18,68 18,32" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.5" />
        </svg>
        <span className="holo-archetype-icon">{archetype.icon}</span>
      </div>

      <div className="holo-dna-tag">
        <span className="holo-dna-code">{alien.dna || "DNA-GALVAN"}</span>
        <span className="holo-archetype-lbl">{archetype.label}</span>
      </div>

      <div className="holo-scanline" />
    </div>
  );
}
