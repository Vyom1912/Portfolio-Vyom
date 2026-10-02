import { Link, useParams } from "react-router";
import Page from "../components/Page.jsx";
import Shot from "../components/Shot.jsx";
import Reveal from "../components/Reveal.jsx";
import StackChips from "../components/StackChips.jsx";
import Showcase from "../components/Showcase.jsx";
import MoreProjects from "../components/MoreProjects.jsx";
import NotFound from "./NotFound.jsx";
import { projects } from "../data/site.js";

export default function Project() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFound />;

  const p = projects[index];

  return (
    <Page key={p.slug} path={`/work/${p.slug}`}>
      <section className="wrap page-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/work/">Work</Link> <span aria-hidden="true">/</span> <span>{p.title}</span>
        </nav>
        <h1>{p.title}</h1>
        <p className="lede">{p.summary}</p>
        <div className="actions">
          {p.live && <a className="btn btn-solid" href={p.live} target="_blank" rel="noopener">Open live site</a>}
          {p.github && <a className="btn" href={p.github} target="_blank" rel="noopener">Source on GitHub</a>}
        </div>
        {p.note && <p className="small muted">{p.note}</p>}
        {p.host === "Render" && (
          <p className="small muted">
            Hosted on Render's free plan, so the first visit can take up to a minute while the server wakes up.
          </p>
        )}
      </section>

      <section className="wrap">
        <Shot src={p.image} alt={`${p.title} running in the browser`} url={p.live} bare={p.cover === "logo"} logo={p.cover === "logo"} parallax eager />
      </section>

      <section className="wrap section case">
        <div className="case-body">
          {p.body.map((para, i) => (
            <Reveal as="p" key={i}>{para}</Reveal>
          ))}
          <Reveal>
            <h2>What it does</h2>
            <ul className="ticks">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <aside className="case-side">
          <dl>
            <dt className="label">Type</dt>
            <dd>{p.kind}</dd>
            <dt className="label">Stack</dt>
            <dd>
              <StackChips items={p.stack} limit={8} />
            </dd>
            <dt className="label">Hosting</dt>
            <dd>{p.host}</dd>
          </dl>
        </aside>
      </section>

      {p.showcase.length > 0 && (
        <section className="wrap section">
          <div className="section-head">
            <h2>See it in action</h2>
          </div>
          <Showcase project={p} />
        </section>
      )}

      <MoreProjects current={p.slug} />
    </Page>
  );
}
