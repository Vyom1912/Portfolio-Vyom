import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { person } from "../data/site.js";
import { asset } from "./util.js";
import { links, toTopIfCurrent } from "./nav.js";
import ThemeToggle from "./ThemeToggle.jsx";

const icons = {
  Home: "M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z",
  Work: "M4 8h16v11H4zM9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M4 13h16",
  About: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c1-3.8 4-5.5 7.5-5.5s6.5 1.7 7.5 5.5",
  Contact: "M4 6h16v12H4zM4.5 6.5 12 13l7.5-6.5",
  Resume: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  Mail: "M4 6h16v12H4zM4.5 6.5 12 13l7.5-6.5",
  GitHub: "M9 19c-4 1.3-4-2-6-2.5m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.6 2.1 5.6 2.4 5.6 2.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 8.8c0 4.6 2.9 5.7 5.6 6a3 3 0 0 0-.8 2.3V22",
  LinkedIn: "M4 9h3.5v11H4zM5.75 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.3v1.6c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4.1 2.3 4.1 5.3V20h-3.5v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H10z",
  Instagram: "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zM12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zM17.2 6.6h.01",
};

function Icon({ name, size = 22 }) {
  return (
    <svg viewBox='0 0 24 24' width={size} height={size} aria-hidden='true'>
      <path d={icons[name]} fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

// Slots in the dock: two pages, my photo in the middle, two pages.
const slots = [links[0], links[1], null, links[2], links[3]];
const slotOf = (pathname) => {
  const p = pathname.replace(/^\/Portfolio-Vyom/, "") || "/";
  if (p === "/") return 0;
  if (p.startsWith("/work")) return 1;
  if (p.startsWith("/about")) return 3;
  if (p.startsWith("/contact")) return 4;
  return -1;
};

// Phones only: a floating dock fixed to the bottom of the screen.
// - The active page sits in a capsule that glides from item to item.
// - It tucks into a compact icon row while you scroll down to read, and opens up
//   again as soon as you scroll up.
// - My photo in the middle opens quick actions: resume, email, profiles and the theme.
// Everything moves with CSS transitions; the script only sets classes.
export default function Dock() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const sheetRef = useRef(null);
  const active = slotOf(pathname);

  useEffect(() => setOpen(false), [pathname]);

  // Compact while scrolling down, full size when scrolling up or near the top.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) > 6) {
          setCompact(y > last && y > 120);
          last = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the quick actions on Escape or a tap outside them.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onDown = (e) => {
      if (!e.target.closest(".dock")) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    sheetRef.current?.querySelector("a, button")?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const tap = () => navigator.vibrate?.(8);

  return (
    <nav className={`dock ${compact && !open ? "is-compact" : ""} ${open ? "is-open" : ""}`} aria-label='Main (mobile)' style={{ "--slot": active }}>
      <div ref={sheetRef} id='dock-sheet' className='dock-sheet' hidden={!open}>
        <p className='dock-sheet-name'>
          {person.name}
          <span>{person.role} · Himatnagar, Gujarat</span>
        </p>
        <div className='dock-actions'>
          <a className='dock-action is-main' href={asset(person.resume)} target='_blank' rel='noopener' style={{ "--i": 0 }}>
            <Icon name='Resume' size={20} />
            Resume
          </a>
          <a className='dock-action' href={`mailto:${person.email}`} style={{ "--i": 1 }}>
            <Icon name='Mail' size={20} />
            Email
          </a>
          <a className='dock-action' href={person.github} target='_blank' rel='noopener me' style={{ "--i": 2 }}>
            <Icon name='GitHub' size={20} />
            GitHub
          </a>
          <a className='dock-action' href={person.linkedin} target='_blank' rel='noopener me' style={{ "--i": 3 }}>
            <Icon name='LinkedIn' size={20} />
            LinkedIn
          </a>
          <a className='dock-action' href={person.instagram} target='_blank' rel='noopener me' style={{ "--i": 4 }}>
            <Icon name='Instagram' size={20} />
            Instagram
          </a>
          <ThemeToggle className='dock-action dock-theme' label='Theme' style={{ "--i": 5 }} />
        </div>
      </div>

      <ul className='dock-bar'>
        {active >= 0 && <li className='dock-glide' aria-hidden='true' />}
        {slots.map((l, i) =>
          l ? (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className='dock-item'
                onClick={(e) => {
                  tap();
                  toTopIfCurrent(e, l.to, pathname);
                }}>
                <Icon name={l.label} />
                <span className='dock-label'>{l.label}</span>
              </NavLink>
            </li>
          ) : (
            <li key='me'>
              <button
                type='button'
                className='dock-me'
                aria-expanded={open}
                aria-controls='dock-sheet'
                aria-label={open ? "Close quick actions" : "Quick actions: resume, email and profiles"}
                onClick={() => {
                  tap();
                  setOpen((o) => !o);
                }}>
                <img src={asset("images/avatar.webp")} alt='' width='48' height='48' />
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
