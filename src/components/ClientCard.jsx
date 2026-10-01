import { Link } from "react-router";
import Reveal from "./Reveal.jsx";
import { asset } from "./util.js";

export default function ClientCard({ project: p, delay = 0 }) {
  return (
    <Reveal className="client-card" delay={delay}>
      <Link to={`/work/${p.slug}`}>
        <span className={`client-media ${p.cover === "logo" ? "is-logo" : ""}`}>
          <img src={asset(p.image)} alt={`${p.title} preview`} loading="lazy" decoding="async" />
        </span>
        <span className="label">{p.kind}</span>
        <span className="client-title">{p.title}</span>
        <span className="client-summary">{p.summary}</span>
      </Link>
    </Reveal>
  );
}
