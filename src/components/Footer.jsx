import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <img src="/images/logo.svg" alt="Ben 10 Logo" className="footer__logo" />
          <p>An unofficial, non-commercial fan tribute to Ben 10 and the Omnitrix.</p>
        </div>

        <div className="footer__disclaimer">
          <p>
            Ben 10 and all related characters, logos, and elements are trademarks of and © Cartoon Network and Warner Bros. Discovery.
            Character artwork and assets sourced from the official franchise and Ben 10 Wiki for non-commercial fan appreciation.
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Ben 10 Omnitrix Experience. Built with Three.js, React & WebGL.</p>
      </div>
    </footer>
  );
}
