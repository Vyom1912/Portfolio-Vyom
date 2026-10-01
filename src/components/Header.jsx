import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { person } from "../data/site.js";
import { asset } from "./util.js";
import ThemeToggle from "./ThemeToggle.jsx";

// Clicking a link to the page you are already on scrolls smoothly back to the top.
export function toTopIfCurrent(e, to, pathname) {
  const here = pathname.replace(/\/$/, "") || "/";
  if (here === to) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // The drawer is portalled to <body>: the header's backdrop-filter would otherwise trap it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { pathname } = useLocation();
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the drawer is open: lock page scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("no-scroll");
    drawerRef.current?.querySelector("a")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && drawerRef.current) {
        const items = drawerRef.current.querySelectorAll("a, button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const onResize = () => window.innerWidth > 820 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <div className="wrap header-inner">
        <Link to="/" className="brand" aria-label="Vyom Patel, home" onClick={(e) => toTopIfCurrent(e, "/", pathname)}>
          <img className="brand-avatar" src={asset("images/avatar.webp")} alt="" width="36" height="36" />
          <span className="brand-name">{person.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav-link" onClick={(e) => toTopIfCurrent(e, l.to, pathname)}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <motion.span layoutId="nav-underline" className="nav-underline" />}
                </>
              )}
            </NavLink>
          ))}
          <a className="nav-link nav-resume" href={asset(person.resume)} target="_blank" rel="noopener">
            Resume <span aria-hidden="true">(PDF)</span>
          </a>
        </nav>

        <div className="header-tools">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className={`burger ${open ? "is-open" : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  className="drawer-backdrop"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.div
                  id="mobile-menu"
                  ref={drawerRef}
                  className="drawer"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menu"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <nav aria-label="Mobile">
                    <ul className="drawer-links">
                      {links.map((l, i) => (
                        <motion.li
                          key={l.to}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                        >
                          <NavLink to={l.to} end={l.end} className="drawer-link" onClick={(e) => { toTopIfCurrent(e, l.to, pathname); setOpen(false); }}>
                            <span className="drawer-num">{String(i + 1).padStart(2, "0")}</span>
                            {l.label}
                          </NavLink>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                  <div className="drawer-foot">
                    <a className="btn btn-solid" href={asset(person.resume)} target="_blank" rel="noopener">
                      Download resume
                    </a>
                    <a className="drawer-mail" href={`mailto:${person.email}`}>{person.email}</a>
                    <div className="drawer-social">
                      <a href={person.github} target="_blank" rel="noopener me">GitHub</a>
                      <a href={person.linkedin} target="_blank" rel="noopener me">LinkedIn</a>
                      <a href={person.instagram} target="_blank" rel="noopener me">Instagram</a>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
