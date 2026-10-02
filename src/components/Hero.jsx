import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "./util.js";
import { person, photos } from "../data/site.js";

const facts = [
  ["Now", "Web developer intern at Blue Nova Tech"],
  ["Studying", "M.E. Computer Engineering, LDRP-ITR"],
  ["Stack", "React, Node.js, Express, MongoDB"],
  ["Based in", "Himatnagar, Gujarat"],
];

// Home page hero. The photo unveils from the bottom, zooms slowly, and moves
// to the next photo when its progress bar fills (hover pauses, click skips).
// Progress is a CSS animation, so reduced-motion users get a still photo.
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setIndex((i) => (i + 1) % photos.length);
  const photo = photos[index];

  return (
    <section className="wrap hero">
      <div className="hero-copy">
        <p className="label hero-kicker">Full stack developer · Gujarat, India</p>
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
          <li><a href={person.github} target="_blank" rel="noopener me">GitHub</a></li>
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
          <AnimatePresence initial={false}>
            <motion.div
              key={photo.src}
              className="hero-frame"
              initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
              exit={{ opacity: 0, transition: { delay: 1, duration: 0.2 } }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            >
              <img
                src={asset(photo.src)}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                fetchPriority={index === 0 ? "high" : undefined}
              />
            </motion.div>
          </AnimatePresence>

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
