import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { person } from "../data/site.js";
import { asset } from "./util.js";
import ThemeToggle from "./ThemeToggle.jsx";
import Dock from "./Dock.jsx";
import { links, toTopIfCurrent } from "./nav.js";

// Top bar on every screen. On phones the page links move to the dock at the
// bottom of the screen, and the top bar keeps only the name and the theme switch.
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className='wrap header-inner'>
          <Link to='/' className='brand' aria-label='Vyom Patel, home' onClick={(e) => toTopIfCurrent(e, "/", pathname)}>
            <img className='brand-avatar' src={asset("images/avatar.webp")} alt='' width='36' height='36' />
            <span className='brand-name'>{person.name}</span>
          </Link>

          <nav className='site-nav' aria-label='Main'>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className='nav-link' onClick={(e) => toTopIfCurrent(e, l.to, pathname)}>
                {l.label}
                <span className='nav-underline' aria-hidden='true' />
              </NavLink>
            ))}
            <a className='nav-link nav-resume' href={asset(person.resume)} target='_blank' rel='noopener'>
              Resume <span aria-hidden='true'>(PDF)</span>
            </a>
          </nav>

          <div className='header-tools'>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <Dock />
    </>
  );
}
