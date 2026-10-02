import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { asset } from "./util.js";
import { projects } from "../data/site.js";

const arrow = (d) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d={d === "prev" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Bottom of a project page: previous / next links plus a row of the other
// projects, starting with the next one. On phones the row becomes a swipeable
// rail, so it stays one card tall no matter how many projects there are.
export default function MoreProjects({ current }) {
  const at = projects.findIndex((p) => p.slug === current);
  const prev = projects[(at - 1 + projects.length) % projects.length];
  const next = projects[(at + 1) % projects.length];
  const others = [...projects.slice(at + 1), ...projects.slice(0, at)];

  const rail = useRef(null);
  const [active, setActive] = useState(0);

  // Track which card is in view on the phone rail, for the position dots.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.firstElementChild;
      if (!card) return;
      const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0);
      setActive(Math.min(others.length - 1, Math.round(el.scrollLeft / step)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [others.length]);

  const goTo = (i) => {
    const card = rail.current?.children[i];
    if (card) rail.current.scrollTo({ left: card.offsetLeft - rail.current.offsetLeft, behavior: "smooth" });
  };

  return (
    <section className="wrap section more" aria-labelledby="more-title">
      <div className="more-head">
        <h2 id="more-title">More projects</h2>
        <nav className="pager" aria-label="Previous and next project">
          <Link to={`/work/${prev.slug}/`} className="pager-link prev">
            {arrow("prev")}
            <span>
              <span className="pager-dir">Previous</span>
              <span className="pager-name">{prev.title}</span>
            </span>
          </Link>
          <Link to={`/work/${next.slug}/`} className="pager-link next">
            <span>
              <span className="pager-dir">Next</span>
              <span className="pager-name">{next.title}</span>
            </span>
            {arrow("next")}
          </Link>
        </nav>
      </div>

      <ul className="more-rail" ref={rail}>
        {others.map((p, i) => (
          <li key={p.slug}>
            <Link to={`/work/${p.slug}/`} className={`more-card ${i === 0 ? "is-next" : ""}`}>
              <span className={`more-thumb ${p.cover === "logo" ? "is-logo" : ""}`}>
                <img src={asset(p.image)} alt="" loading="lazy" decoding="async" />
                {i === 0 && <span className="more-tag">Up next</span>}
              </span>
              <span className="more-meta">
                <span className="more-type">{p.type === "client" ? "Client website" : "Full stack"}</span>
                <span className="more-name">{p.title}</span>
                <span className="more-kind">{p.kind}</span>
              </span>
              <span className="more-go" aria-hidden="true">
                {arrow("next")}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="more-dots" aria-hidden="true">
        {others.map((p, i) => (
          <button key={p.slug} type="button" tabIndex={-1} className={i === active ? "on" : ""} onClick={() => goTo(i)} />
        ))}
      </div>

      <p className="more-all">
        <Link className="link" to="/work/">See all work</Link>
      </p>
    </section>
  );
}
