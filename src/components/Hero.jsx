import { useState } from "react";
import { Link } from "react-router";
import { asset, responsive } from "./util.js";
import { person, photos } from "../data/site.js";

const facts = [
  ["Now", "Web developer intern at Blue Nova Tech"],
  ["Studying", "M.E. Computer Engineering, LDRP-ITR"],
  ["Stack", "React, Node.js, Express, MongoDB, PostgreSQL"],
  ["Based in", "Himatnagar, Gujarat"],
  ...(person.availability ? [["Available", person.availability]] : []),
];

// Home page hero. The photo unveils from the bottom, zooms slowly, and moves
// to the next photo when its progress bar fills (hover pauses, click skips).
// Progress is a CSS animation, so reduced-motion users get a still photo.
export default function Hero() {
  // `prev` stays underneath while the new photo wipes up over it (a CSS animation).
  const [{ index, prev }, setShown] = useState({ index: 0, prev: -1 });
  const [paused, setPaused] = useState(false);
  const next = () => setShown(({ index: i }) => ({ index: (i + 1) % photos.length, prev: i }));

  return (
    <section className="wrap hero">
      <div className="hero-copy">
        <p className="label hero-kicker">Full stack developer · Himatnagar, Gujarat</p>
        <h1 className="hero-name">
          <span className="line"><span>Vyom Patel</span></span>
        </h1>
        <p className="hero-role">I build full stack web apps with React, Node.js, Express and MongoDB.</p>
        <p className="hero-text">
          The parts I care about most are the ones people don't see: sign-in that is hard to abuse, APIs that send only
          what a page needs, and layouts that still hold up on a small phone.
        </p>
        <div className="actions">
          <Link className="btn btn-solid" to="/work/">See my work</Link>
          <a className="btn" href={asset(person.resume)} target="_blank" rel="noopener">Resume (PDF)</a>
        </div>
        <ul className="hero-links">
          <li><a href={person.github} target="_blank" rel="noopener me">GitHub @{person.handle}</a></li>
          <li><a href={person.linkedin} target="_blank" rel="noopener me">LinkedIn</a></li>
          <li><a href={`mailto:${person.email}`}>{person.email}</a></li>
        </ul>
      </div>

      <div className="hero-visual">
        <figure
          className={`hero-photo ${paused ? "paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {photos.map((photo, i) =>
            i === index || i === prev ? (
              <div key={photo.src} className={`hero-frame ${i === index ? (prev === -1 ? "is-first" : "is-on") : "is-prev"}`}>
                <img
                  {...responsive(photo.src, "(max-width: 900px) min(400px, calc(100vw - 32px)), 420px")}
                  alt={i === index ? photo.alt : ""}
                  width={photo.width}
                  height={photo.height}
                  fetchPriority={i === 0 ? "high" : undefined}
                />
              </div>
            ) : null
          )}

          <div className="hero-progress" aria-hidden="true">
            {photos.map((p, i) => (
              <span key={p.src}>
                <i
                  key={i === index ? `on-${index}` : `off-${i}`}
                  className={i < index ? "done" : i === index ? "active" : ""}
                  onAnimationEnd={i === index ? next : undefined}
                />
              </span>
            ))}
          </div>
          <button type="button" className="hero-photo-hit" onClick={next} aria-label="Show the next photo" />
        </figure>

        <dl className="hero-card">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
