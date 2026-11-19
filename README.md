# Ben 10: Omnitrix Experience

An interactive 3D web experience celebrating Ben 10 and the Omnitrix. Built with **React 18**, **Three.js**, **WebGL**, **Web Audio API**, and **Vite**.

## Features

- **Interactive 3D Omnitrix**: Full WebGL 3D model with rotating bezel, pop-up core, glowing green DNA projector, and click sounds.
- **10 Original Aliens + Ben Tennyson**: 3D GLTF models, species info, planet lore, powers, and combat stat meters.
- **Synthesized Omnitrix Audio**: Pure Web Audio API procedural sound engine with real-time oscillators, noise bursts, filters, and transformation charges (no external audio file dependencies).
- **Parallax Hero Landing**: Dynamic mouse-tilt parallax featuring layered character figures and original series artwork.
- **Complete Timeline & Series Archive**: Chronology covering the Classic Series, Alien Force, Ultimate Alien, and Omniverse with episode counts and lore chapters.
- **Galvan Lab Modules**: Interactive feature showcases for DNA Scanning, Alien Comparison, and Planetary Simulations.

## Quick Start (Development)

Clone the repository and install dependencies:

```bash
git clone https://github.com/NateshKannaR/Ben10.git
cd Ben10
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

Or serve with Python without any node dependencies:

```bash
python3 serve.py 3000
```

## Project Structure

```
├── index.html                   # HTML entry point
├── package.json                 # Scripts and dependencies
├── vite.config.js               # Vite bundler configuration
├── serve.py                     # Zero-dependency Python HTTP server
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application orchestrator
│   ├── index.css                # Base styles, typography, and theme vars
│   ├── audio/
│   │   └── soundEngine.js       # Real-time Web Audio API synthesizer
│   ├── store/
│   │   └── useStore.js          # Reactive store for 3D modes & alien selection
│   ├── data/
│   │   ├── aliens.js            # 10 aliens + Ben specs, stats, and lore
│   │   └── timeline.js          # Series chronology, eras, and lab features
│   ├── components/
│   │   ├── Navigation.jsx       # Header, navigation, and mobile drawer
│   │   ├── Hero.jsx             # Mouse-parallax hero section
│   │   ├── HeroesSection.jsx    # Alien roster, details, and transform button
│   │   ├── OmnitrixSection.jsx  # Omnitrix showcase and activation trigger
│   │   ├── SeriesTimeline.jsx   # Franchise timeline & era cards
│   │   ├── FeaturesGrid.jsx     # Lab and interactive feature cards
│   │   ├── Footer.jsx           # Credits & copyright disclaimer
│   │   ├── ModeUI.jsx           # 3D HUD controls, alien dial, & transform flash
│   │   └── Canvas3D/
│   │       ├── OmnitrixStage.jsx # Three.js 3D Omnitrix interactive canvas
│   │       ├── AlienViewer.jsx   # Three.js 3D Alien inspection viewer
│   │       └── StageManager.jsx  # Mode switcher for 3D scenes
│   └── styles/
│       ├── site.css             # Section, layout, and hero styling
│       └── modeUI.css           # 3D overlay, HUD, and alien strip styling
├── models/                      # 3D GLTF / GLB models
│   ├── omnitrix.glb             # 3D Omnitrix model
│   ├── crystals.glb             # Omnitrix crystal core
│   └── aliens/                  # All 11 character models
├── fonts/                       # Custom typography (.woff2)
└── images/                      # Renders, cast portraits, and era banners
```

## Disclaimer

This is an unofficial, non-commercial fan tribute. Ben 10 and all related characters and elements are trademarks of and © Cartoon Network / Warner Bros. Discovery.
