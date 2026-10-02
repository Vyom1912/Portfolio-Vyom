import { Link, useLocation } from "react-router";
import { toTopIfCurrent } from "./Header.jsx";
import { person } from "../data/site.js";

export default function Footer() {
  const { pathname } = useLocation();
  const go = (to) => (e) => toTopIfCurrent(e, to, pathname);
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-name">{person.name}</p>
          <p className="muted">Full stack developer in {person.location}.</p>
          <a className="link" href={`mailto:${person.email}`}>{person.email}</a>
        </div>
        <nav aria-label="Footer">
          <p className="label">Pages</p>
          <ul className="plain">
            <li><Link to="/" onClick={go("/")}>Home</Link></li>
            <li><Link to="/work/" onClick={go("/work/")}>Work</Link></li>
            <li><Link to="/about/" onClick={go("/about/")}>About</Link></li>
            <li><Link to="/contact/" onClick={go("/contact/")}>Contact</Link></li>
          </ul>
        </nav>
        <div>
          <p className="label">Elsewhere</p>
          <ul className="plain">
            <li><a href={person.github} target="_blank" rel="noopener me">GitHub</a></li>
            <li><a href={person.linkedin} target="_blank" rel="noopener me">LinkedIn</a></li>
            <li><a href={person.instagram} target="_blank" rel="noopener me">Instagram</a></li>
          </ul>
        </div>
        <div>
          <p className="label">Legal</p>
          <ul className="plain">
            <li><Link to="/privacy/" onClick={go("/privacy/")}>Privacy policy</Link></li>
            <li><Link to="/terms/" onClick={go("/terms/")}>Terms and conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <span suppressHydrationWarning>© {new Date().getFullYear()} {person.name}</span>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Back to top
        </a>
      </div>
    </footer>
  );
}
