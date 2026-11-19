# Ben 10: Omnitrix Experience

Complete offline clone of [ben10-omnitrix-experience.vercel.app](https://ben10-omnitrix-experience.vercel.app/).

## Overview

- **3D Omnitrix Model & Animation**: High-detail 3D Omnitrix model (`models/omnitrix.glb`) and alien crystals (`models/crystals.glb`).
- **11 Full 3D Alien / Character Models**: Ben Tennyson, Heatblast, Four Arms, XLR8, Diamondhead, Wildmutt, Upgrade, Grey Matter, Stinkfly, Ripjaws, and Cannonbolt.
- **Custom Shaders & Alien Worlds**: Procedural terrain, sky, and ground shaders for alien planets.
- **Synthesized Audio**: Dynamic real-time sound effects powered by the Web Audio API (no external sound file dependencies).
- **Interactive UI**: Dial turning, character transformations, series timeline, alien database, and lore viewer.
- **Custom Fonts & Vector Graphics**: Includes all offline font assets (`woff2`) and SVG graphics.

## How to Run Locally

Because the experience uses JavaScript ES Modules (`type="module"`) and WebGL / Three.js assets (`.glb` models and `.woff2` fonts), it must be served through an HTTP server rather than opened as a `file://` URL.

### Option 1: Using Python (Recommended - No dependencies needed)

```bash
python3 serve.py
```
or:
```bash
python3 -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Using Node.js (npx serve)

```bash
npx serve . -p 3000
```
or:
```bash
npm start
```

## Directory Structure

```
├── index.html                   # Main entry point HTML
├── serve.py                     # Python local server script
├── download_website.py          # Asset manifest & re-downloader
├── package.json                 # Optional npm scripts
├── assets/                      # JS bundles and CSS stylesheets
│   ├── index-*.js
│   ├── Stage-*.js
│   ├── alienModel-*.js
│   ├── Site-*.js
│   ├── worlds-*.js
│   ├── fx-*.js
│   └── *.css
├── models/                      # 3D GLTF / GLB models
│   ├── omnitrix.glb
│   ├── crystals.glb
│   ├── title.glb
│   └── aliens/
│       ├── ben.glb
│       ├── heatblast.glb
│       ├── four-arms.glb
│       ├── xlr8.glb
│       ├── diamondhead.glb
│       ├── wildmutt.glb
│       ├── upgrade.glb
│       ├── grey-matter.glb
│       ├── stinkfly.glb
│       ├── ripjaws.glb
│       └── cannonbolt.glb
├── fonts/                       # Custom typography (WOFF2)
│   ├── big-shoulders-display-*.woff2
│   ├── ibm-plex-mono-*.woff2
│   └── lexend-exa-*.woff2
└── images/                      # Renders, silhouettes, and banners
    ├── logo.svg
    ├── silhouettes.png
    ├── omnitrix-poster.webp
    ├── cast/                    # High-res alien & Ben portraits
    └── site/                    # Timeline and series banner art
```
