import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { asset, hostOf } from "./util.js";

// Viewport sizes the live demo is rendered at, before being scaled to fit the frame.
const VIEWPORTS = { desktop: [1280, 800], mobile: [390, 844] };
const ease = [0.2, 0.7, 0.2, 1];
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const icons = {
  image: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 9h.01",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.4 2.5 3.5 5.5 3.5 9s-1.1 6.5-3.5 9c-2.4-2.5-3.5-5.5-3.5-9s1.1-6.5 3.5-9z",
  desktop: "M3 4h18v12H3zM8 20h8M12 16v4",
  mobile: "M7 2.5h10v19H7zM11 18.5h2",
  lock: "M7 11h10v9H7zM9 11V8a3 3 0 0 1 6 0v3",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  reload: "M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5",
  prev: "M15 5l-7 7 7 7",
  next: "M9 5l7 7-7 7",
};
function Icon({ name, size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="sc-icon">
      <path d={icons[name]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Segmented({ label, value, options, onChange }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map(([key, text, icon]) => (
        <button key={key} type="button" className={value === key ? "on" : ""} aria-pressed={value === key} onClick={() => onChange(key)}>
          {value === key && <motion.span layoutId={`seg-${label}`} className="seg-bg" transition={{ duration: 0.3, ease }} />}
          <span className="seg-text">
            <Icon name={icon} size={15} />
            {text}
          </span>
        </button>
      ))}
    </div>
  );
}

// Live sites call scrollIntoView() or focus() when you navigate inside them, and the
// browser scrolls this page along with the frame, so the page jumps. While the demo
// is open, only scrolling that starts in this page is allowed (wheel, touch, keys,
// clicks, dragging the scrollbar). Input inside the frame never reaches this page,
// so any other scroll came from the embedded site and is undone.
function useScrollGuard(active) {
  useEffect(() => {
    if (!active) return;
    let y = window.scrollY;
    let allowUntil = 0;
    const allow = (ms) => () => {
      allowUntil = Math.max(allowUntil, Date.now() + ms);
    };
    const onScroll = () => {
      if (Date.now() < allowUntil) {
        y = window.scrollY;
        return;
      }
      if (Math.abs(window.scrollY - y) > 1) window.scrollTo({ top: y, left: window.scrollX, behavior: "instant" });
    };
    const listeners = [
      ["wheel", allow(900)],
      ["touchstart", allow(900)],
      ["touchmove", allow(900)],
      ["keydown", allow(900)],
      ["mousedown", allow(900)],
      ["mousemove", allow(250)],
    ];
    listeners.forEach(([e, fn]) => window.addEventListener(e, fn, { passive: true, capture: true }));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      listeners.forEach(([e, fn]) => window.removeEventListener(e, fn, { capture: true }));
      window.removeEventListener("scroll", onScroll);
    };
  }, [active]);
}

// The real site in an iframe, rendered at a desktop or phone viewport and scaled to fit.
function LiveFrame({ url, device, slow, reload }) {
  const box = useRef(null);
  const [fit, setFit] = useState({ scale: 0, height: 0 });
  const [loaded, setLoaded] = useState(false);
  const vw = VIEWPORTS[device][0];
  useScrollGuard(true);

  useIsoLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    // Keep the site's viewport width fixed (so it picks its desktop or phone layout)
    // and let its height follow the frame, which is shorter on small screens.
    const measure = () => {
      const scale = el.clientWidth / vw;
      setFit({ scale, height: Math.round(el.clientHeight / scale) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [vw]);

  useEffect(() => setLoaded(false), [url, device, reload]);

  return (
    <div ref={box} className="live-viewport">
      {fit.scale > 0 && (
        <iframe
          key={`${url}-${device}-${reload}`}
          src={url}
          title={`Live demo of ${hostOf(url)}`}
          width={vw}
          height={fit.height}
          style={{ transform: `scale(${fit.scale})` }}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
        />
      )}
      <AnimatePresence>
        {!loaded && (
          <motion.div className="live-loading" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <div className="skeleton" aria-hidden="true">
              <i className="sk-bar" />
              <i className="sk-hero" />
              <span className="sk-row">
                <i />
                <i />
                <i />
              </span>
            </div>
            <p className="live-loading-text">
              Loading the live site
              {slow && <span>Render's free plan can take up to a minute to wake up.</span>}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// "See it in action": a project's screens, listed on the left under a heading for
// each feature. Each feature has as many screens as it needs. The list sits next to a device frame that switches between a
// browser window and a phone, and between screenshots and the live site.
export default function Showcase({ project }) {
  const groups = project.showcase;
  // One flat list, so previous and next walk through every screen in order.
  const steps = groups.flatMap((g, group) => g.screens.map((s) => ({ ...s, group })));
  const [index, setIndex] = useState(0);
  const [device, setDevice] = useState("desktop");
  const [mode, setMode] = useState("screens");
  const [reload, setReload] = useState(0);
  const list = useRef(null);

  // Keep the selected screen in view inside the list. The list scrolls down on
  // desktops and sideways on smaller screens; only the list moves, never the page.
  useEffect(() => {
    const box = list.current;
    const el = box && box.querySelector(".step.on");
    if (!el) return;
    const b = box.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const sideways = box.scrollWidth > box.clientWidth;
    box.scrollBy({
      left: sideways ? r.left - b.left - (b.width - r.width) / 2 : 0,
      top: sideways ? 0 : r.top - b.top - 40,
      behavior: "smooth",
    });
  }, [index]);

  // Phones start on the phone view.
  useEffect(() => {
    if (window.matchMedia("(max-width: 720px)").matches) setDevice("mobile");
  }, []);

  if (steps.length === 0) return null;
  const step = steps[index];
  const group = step.group;
  const live = mode === "live";
  const go = (d) => setIndex((i) => (i + d + steps.length) % steps.length);
  const changeMode = (next) => {
    if (next === "screens" && mode === "live") setIndex(0);
    setMode(next);
  };

  return (
    <div className={`showcase is-${device} ${live ? "is-live" : ""}`}>
      <div className="showcase-top">
        <p className="showcase-kicker">
          <span className={`kicker-dot ${live ? "on" : ""}`} aria-hidden="true" />
          {live ? "Live site, running in the page" : "Screens from the live site"}
        </p>
        <div className="showcase-controls">
          <Segmented
            label="View"
            value={mode}
            onChange={changeMode}
            options={[
              ["screens", "Screens", "image"],
              ["live", "Live demo", "globe"],
            ]}
          />
          <Segmented
            label="Device"
            value={device}
            onChange={setDevice}
            options={[
              ["desktop", "Desktop", "desktop"],
              ["mobile", "Phone", "mobile"],
            ]}
          />
        </div>
      </div>

      <div className="showcase-body">
        <div className="step-list">
        <div ref={list} className={`step-groups ${live ? "is-locked" : ""}`}>
          {groups.map((g, gi) => {
            const first = steps.findIndex((st) => st.group === gi);
            return (
              <section key={g.feature} className={`step-group ${gi === group ? "on" : ""}`} aria-labelledby={`feature-${gi}`}>
                {groups.length > 1 && (
                  <h3 className="step-group-title" id={`feature-${gi}`}>
                    <span className="step-group-name">{g.feature}</span>
                    <span className="step-group-count">{g.screens.length}</span>
                  </h3>
                )}
                <ol className="steps" start={first + 1}>
          {g.screens.map((s, j) => {
            const i = first + j;
            return (
            <li key={s.title}>
              <button type="button" aria-pressed={i === index} className={`step ${i === index ? "on" : ""}`} onClick={() => setIndex(i)} disabled={live} aria-disabled={live}>
                <span className="step-thumb" aria-hidden="true">
                  <img src={asset(device === "desktop" ? s.desktop : s.mobile)} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="step-head">
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="step-title">{s.title}</span>
                </span>
                <AnimatePresence initial={false}>
                  {i === index && (
                    <motion.span
                      className="step-text"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <span>{s.text}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
            );
          })}
                </ol>
              </section>
            );
          })}
        </div>
        </div>

        <div className="stage">
          <div className="stage-surface">
            <LayoutGroup>
              <motion.div layout className={`device-shell device-${device}`} transition={{ duration: 0.55, ease }}>
                <div className="device">
                  {device === "desktop" ? (
                    <motion.div layout="position" className="device-bar">
                      <span className="lights" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="address">
                        <Icon name="lock" size={12} />
                        <span>{step.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                      </span>
                      {live ? (
                        <button type="button" className="bar-btn" onClick={() => setReload((r) => r + 1)} aria-label="Reload the live demo">
                          <Icon name="reload" size={14} />
                        </button>
                      ) : (
                        <span className="bar-spacer" />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div layout="position" className="device-notch" aria-hidden="true" />
                  )}
                  <motion.div layout className="device-screen">
                    {live ? (
                      <LiveFrame url={step.url} device={device} slow={project.host === "Render"} reload={reload} />
                    ) : (
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.img
                          key={`${device}-${index}`}
                          src={asset(device === "desktop" ? step.desktop : step.mobile)}
                          alt={`${project.title}: ${step.title} (${device === "desktop" ? "desktop" : "phone"} view)`}
                          initial={{ opacity: 0, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, ease }}
                          decoding="async"
                        />
                      </AnimatePresence>
                    )}
                  </motion.div>
                </div>
                {live && <span className="live-badge">Live</span>}
              </motion.div>
            </LayoutGroup>
          </div>

          {/* On smaller screens the list only shows titles, so the description goes here. */}
          <p className="stage-caption">
            <strong>{step.title}</strong> {step.text}
          </p>

          <div className="stage-foot">
            <div className="stage-nav">
              <button type="button" onClick={() => go(-1)} aria-label="Previous screen" disabled={live}>
                <Icon name="prev" size={18} />
              </button>
              <div className={`dots ${live ? "is-locked" : ""}`} role="group" aria-label="Choose a screen">
                {groups.map((g, gi) => (
                  <span key={g.feature} className={`dot-group ${gi === group ? "on" : ""}`}>
                    {steps.map((s, i) =>
                      s.group === gi ? (
                        <button key={i} type="button" className={i === index ? "on" : ""} aria-label={`Screen ${i + 1}: ${s.title} (${g.feature})`} aria-current={i === index} onClick={() => setIndex(i)} disabled={live} />
                      ) : null
                    )}
                  </span>
                ))}
              </div>
              <span className="stage-count" aria-hidden="true">
                {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Next screen" disabled={live}>
                <Icon name="next" size={18} />
              </button>
            </div>
            <a className="open-tab" href={step.url} target="_blank" rel="noopener">
              Open in a new tab
              <Icon name="external" size={14} />
            </a>
          </div>
          {live && (
            <p className="stage-note">
              You are using the real site, so move around inside it. Screen switching is paused until you go back to Screens.
              Scrolling over the frame scrolls the demo; move the pointer outside it to scroll this page. Signing in works best in a new tab.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
