import { Link } from "react-router";
import Shot from "./Shot.jsx";
import Reveal from "./Reveal.jsx";
import StackChips from "./StackChips.jsx";

export default function ProjectRow({ project, number, flip = false }) {
  const p = project;
  return (
    <article className={`project-row ${flip ? "flip" : ""}`}>
      <Link to={`/work/${p.slug}/`} className="project-media">
        <Shot src={p.image} alt={`${p.title}: screenshot of the live site`} url={p.live} bare={p.cover === "logo"} logo={p.cover === "logo"} />
      </Link>
      <Reveal className="project-text">
        <p className="label">
          <span className="num">{String(number).padStart(2, "0")}</span> {p.kind}
        </p>
        <h3>
          <Link to={`/work/${p.slug}/`}>{p.title}</Link>
        </h3>
        <p>{p.summary}</p>
        <StackChips items={p.stack} limit={4} />
        <div className="row-links">
          <Link className="btn" to={`/work/${p.slug}/`}>Read more<span className="sr-only"> about {p.title}</span></Link>
          {p.live && <a className="link" href={p.live} target="_blank" rel="noopener">Live site<span className="sr-only"> of {p.title}</span></a>}
          {p.github && <a className="link" href={p.github} target="_blank" rel="noopener">Code<span className="sr-only"> for {p.title} on GitHub</span></a>}
        </div>
      </Reveal>
    </article>
  );
}
