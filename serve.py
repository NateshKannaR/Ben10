#!/usr/bin/env python3
"""
Simple local development server for Ben 10: Omnitrix Experience
Run: python3 serve.py [port]
"""

import http.server
import socketserver
import sys
from functools import partial
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow Cross-Origin access for local modules / workers / wasm if needed
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    site = Path(__file__).resolve().parent / "dist"
    if not (site / "index.html").is_file():
        sys.exit("Run npm run build before starting the Python server.")
    handler = partial(Handler, directory=str(site))
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"\n=======================================================")
        print(f" Ben 10: Omnitrix Experience local server running!")
        print(f" Open in browser: {url}")
        print(f" Press Ctrl+C to stop the server.")
        print(f"=======================================================\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    main()
