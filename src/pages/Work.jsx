import Page from "../components/Page.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import { person, projects } from "../data/site.js";

export default function Work() {
  const fullstack = projects.filter((p) => p.type === "fullstack");
  const client = projects.filter((p) => p.type === "client");

  return (
    <Page path="/work">
      <section className="wrap page-head">
        <p className="label">Work</p>
        <h1>Selected projects</h1>
        <p className="lede">
          A short list on purpose: full stack apps where I built both the interface and the data behind it, and websites
          I made for real businesses.
        </p>
      </section>

      <section className="wrap section tight">
        <div className="section-head">
          <h2>Full stack projects</h2>
        </div>
        {fullstack.map((p, i) => (
          <ProjectRow key={p.slug} project={p} number={i + 1} flip={i % 2 === 1} />
        ))}
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Client websites</h2>
        </div>
        {client.map((p, i) => (
          <ProjectRow key={p.slug} project={p} number={fullstack.length + i + 1} flip={i % 2 === 1} />
        ))}
      </section>

      <section className="wrap section">
        <div className="aside-note">
          <p>
            Smaller front end projects, like a music player, a resume builder and a notes app, are on my{" "}
            <a className="link" href={person.github} target="_blank" rel="noopener me">GitHub profile</a>.
          </p>
        </div>
      </section>
    </Page>
  );
}
