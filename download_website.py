#!/usr/bin/env python3
import os
import urllib.request
import urllib.error
import sys

BASE_URL = "https://ben10-omnitrix-experience.vercel.app"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# List of all legitimate assets on the site
ASSET_PATHS = [
    # Core Entry
    "/index.html",

    # CSS Stylesheets
    "/assets/index-Dk4859t6.css",
    "/assets/ModeUI-CuxUH1y6.css",
    "/assets/Site-CCqSytVP.css",

    # JavaScript Bundles & Chunks
    "/assets/index-odouEJXM.js",
    "/assets/vanilla-D1FEyU8v.js",
    "/assets/react-Coptc9AT.js",
    "/assets/fx-LpSvOo3L.js",
    "/assets/AlienViewer-DYefKQR7.js",
    "/assets/ModeScene-Bm1OSRGw.js",
    "/assets/ModeUI-D1HkWp_d.js",
    "/assets/Site-B20HAsbH.js",
    "/assets/Stage-D5Ft3DM9.js",
    "/assets/World-DodUIS2C.js",
    "/assets/alienModel-CNgpwgoe.js",
    "/assets/extends-DugHI0mL.js",
    "/assets/field-BDidAj3K.js",
    "/assets/modeState-_r1WIydb.js",
    "/assets/worlds-Bbf7qwtg.js",

    # 3D GLTF / GLB Models
    "/models/omnitrix.glb",
    "/models/title.glb",
    "/models/crystals.glb",
    "/models/aliens/ben.glb",
    "/models/aliens/heatblast.glb",
    "/models/aliens/four-arms.glb",
    "/models/aliens/xlr8.glb",
    "/models/aliens/diamondhead.glb",
    "/models/aliens/wildmutt.glb",
    "/models/aliens/upgrade.glb",
    "/models/aliens/grey-matter.glb",
    "/models/aliens/stinkfly.glb",
    "/models/aliens/ripjaws.glb",
    "/models/aliens/cannonbolt.glb",

    # Fonts
    "/fonts/big-shoulders-display-latin-600-normal.woff2",
    "/fonts/big-shoulders-display-latin-800-normal.woff2",
    "/fonts/ibm-plex-mono-latin-400-normal.woff2",
    "/fonts/lexend-exa-400.woff2",
    "/fonts/lexend-exa-600.woff2",
    "/fonts/lexend-exa-800.woff2",

    # General Images
    "/images/logo.svg",
    "/images/silhouettes.png",
    "/images/omnitrix-poster.webp",

    # Site Images & Banners
    "/images/site/boy-pose.webp",
    "/images/site/hero-bg.webp",
    "/images/site/era-classic.webp",
    "/images/site/era-force.webp",
    "/images/site/era-ultimate.webp",
    "/images/site/era-omniverse.webp",
    "/images/site/series-classic.webp",
    "/images/site/series-force.webp",
    "/images/site/series-ultimate.webp",
    "/images/site/series-omniverse.webp",
    "/images/site/os-1.webp",
    "/images/site/os-2.webp",
    "/images/site/os-3.webp",
    "/images/site/os-4.webp",
    "/images/site/af-1.webp",
    "/images/site/af-2.webp",
    "/images/site/af-3.webp",
    "/images/site/ua-1.webp",
    "/images/site/ua-2.webp",
    "/images/site/ua-3.webp",
    "/images/site/ov-1.webp",
    "/images/site/ov-2.webp",
    "/images/site/ov-3.webp",

    # Cast / Character Renders
    "/images/cast/ben.webp",
    "/images/cast/heatblast.webp",
    "/images/cast/four-arms.webp",
    "/images/cast/xlr8.webp",
    "/images/cast/diamondhead.webp",
    "/images/cast/wildmutt.webp",
    "/images/cast/upgrade.webp",
    "/images/cast/grey-matter.webp",
    "/images/cast/stinkfly.webp",
    "/images/cast/ripjaws.webp",
    "/images/cast/cannonbolt.webp"
]

def download_file(rel_path, target_dir):
    full_url = BASE_URL + rel_path
    save_path = os.path.join(target_dir, rel_path.lstrip("/"))
    os.makedirs(os.path.dirname(save_path), exist_ok=True)

    req = urllib.request.Request(full_url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            # Double check content-type for non-html assets
            content_type = resp.headers.get("Content-Type", "")
            if rel_path != "/index.html" and "text/html" in content_type:
                print(f"[SKIP/404 HTML fallback] {rel_path}")
                return False
            
            with open(save_path, "wb") as f:
                f.write(content)
            print(f"[DOWNLOADED] {rel_path} ({len(content)} bytes)")
            return True
    except Exception as e:
        print(f"[ERROR] Failed {rel_path}: {e}")
        return False

def main():
    target_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Target directory: {target_dir}")
    print(f"Total assets to download: {len(ASSET_PATHS)}")
    
    success_count = 0
    total_bytes = 0

    for path in ASSET_PATHS:
        save_path = os.path.join(target_dir, path.lstrip("/"))
        if download_file(path, target_dir):
            success_count += 1
            if os.path.exists(save_path):
                total_bytes += os.path.getsize(save_path)

    print("\n" + "="*50)
    print(f"Download complete: {success_count}/{len(ASSET_PATHS)} files successfully retrieved.")
    print(f"Total downloaded size: {total_bytes / (1024*1024):.2f} MB")
    print("="*50)

if __name__ == "__main__":
    main()
