import { Link } from "react-router";
import Reveal from "./Reveal.jsx";
import { asset, hostOf } from "./util.js";

// A client website on the home page: preview, summary, and links to the live
// site and the case study. Client code is private, so there is no code link.
export default function ClientCard({ project: p, delay = 0 }) {
  return (
    <Reveal className="client-card" delay={delay}>
      <Link to={`/work/${p.slug}/`} className="client-main">
        <span className={`client-media ${p.cover === "logo" ? "is-logo" : ""}`}>
          <img src={asset(p.image)} alt={`${p.title} preview`} loading="lazy" decoding="async" />
        </span>
        <span className="label">{p.kind}</span>
        <span className="client-title">{p.title}</span>
        <span className="client-summary">{p.summary}</span>
      </Link>
      {p.live && (
        <p className="client-host">
          Live at <span>{hostOf(p.live)}</span> · {p.host}
        </p>
      )}
      <div className="row-links">
        {p.live && (
          <a className="btn btn-solid" href={p.live} target="_blank" rel="noopener">
            Live site
          </a>
        )}
        <Link className="btn" to={`/work/${p.slug}/`}>Case study</Link>
      </div>
    </Reveal>
  );
}
