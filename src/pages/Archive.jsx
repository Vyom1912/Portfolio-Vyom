import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import Page from "../components/Page.jsx";
import StackChips from "../components/StackChips.jsx";
import { asset } from "../components/util.js";

// Unlisted page with every project from content/projects.json.
// It is not linked anywhere, is kept out of the sitemap and is marked noindex.
export default function Archive() {
  const [all, setAll] = useState(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    import("../data/archive.json").then((m) => setAll(m.default));
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  const categories = useMemo(() => (all ? ["All", ...new Set(all.map((p) => p.category))] : []), [all]);
  const shown = useMemo(() => {
    if (!all) return [];
    const q = query.trim().toLowerCase();
    return all.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q || [p.title, p.subtitle, p.summary, ...p.stack].join(" ").toLowerCase().includes(q))
    );
  }, [all, category, query]);

  return (
    <Page path="/archive">
      <section className="wrap page-head">
        <p className="label">Archive · not listed on the site</p>
        <h1>Every project</h1>
        <p className="lede">
          All {all ? all.length : ""} projects I have built, from full stack apps to small JavaScript exercises and design
          work. The main site only shows a few of these.
        </p>
      </section>

      <section className="wrap">
        <div className="archive-tools">
          <label className="archive-search">
            <span className="label">Search</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Title or technology" />
          </label>
          <div className="archive-filters" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button key={c} type="button" className={`filter ${c === category ? "on" : ""}`} aria-pressed={c === category} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {!all && <p className="muted">Loading projects...</p>}
        {all && <p className="small muted">{shown.length} shown</p>}

        <ul className="archive-grid">
          {shown.map((p) => (
            <li key={p.slug} className="archive-card">
              <div className="archive-thumb">
                {p.thumb ? <img src={asset(p.thumb)} alt="" loading="lazy" decoding="async" /> : <span />}
              </div>
              <div className="archive-body">
                <p className="label">
                  {p.category}
                  {p.level ? ` · ${p.level}` : ""}
                </p>
                <h2>{p.title}</h2>
                <p className="small muted">{p.summary}</p>
                <StackChips items={p.stack} limit={3} icons={false} />
                <div className="row-links">
                  {p.page && <Link className="link" to={`${p.page}/`}>Case study</Link>}
                  {p.demo && <a className="link" href={p.demo} target="_blank" rel="noopener">Live</a>}
                  {p.github && <a className="link" href={p.github} target="_blank" rel="noopener">Code</a>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
