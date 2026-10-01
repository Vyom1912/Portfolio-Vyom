import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const KEY = "theme";
const query = () => window.matchMedia("(prefers-color-scheme: dark)");
const deviceTheme = () => (query().matches ? "dark" : "light");
const readSaved = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const save = (value) => {
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    /* private mode: the choice just won't be remembered */
  }
};
const apply = (theme) => {
  document.documentElement.dataset.theme = theme;
};

// Light/dark switch. By default the site follows the device setting and keeps
// following it live. Picking the other theme saves that choice; picking the one
// that matches the device clears it, so the site goes back to following the device.
export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || deviceTheme());
    const mq = query();
    const onDeviceChange = () => {
      const device = deviceTheme();
      const saved = readSaved();
      if (saved === device) save(null);
      if (!saved || saved === device) {
        apply(device);
        setTheme(device);
      }
    };
    // Keep several open tabs in step.
    const onStorage = (e) => {
      if (e.key !== KEY) return;
      const next = e.newValue || deviceTheme();
      apply(next);
      setTheme(next);
    };
    mq.addEventListener("change", onDeviceChange);
    window.addEventListener("storage", onStorage);
    return () => {
      mq.removeEventListener("change", onDeviceChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    save(next === deviceTheme() ? null : next);
    apply(next);
    setTheme(next);
  };

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" className={`theme-toggle ${className}`} onClick={toggle} aria-label={label} title={label}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={isDark ? "moon" : "sun"}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
          initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? (
            <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          ) : (
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
            </g>
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}
