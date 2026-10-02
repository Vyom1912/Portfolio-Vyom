import { Link } from "react-router";
import Page from "../components/Page.jsx";
import Hero from "../components/Hero.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import Reveal from "../components/Reveal.jsx";
import ClientCard from "../components/ClientCard.jsx";
import Skills from "../components/Skills.jsx";
import { person, projects } from "../data/site.js";

export default function Home() {
  return (
    <Page path="/">
      <Hero />

      <section className="wrap section">
        <div className="section-head">
          <h2>Client websites</h2>
          <Link className="link" to="/work/">All projects</Link>
        </div>
        <p className="section-intro">Live websites I built and host for real businesses.</p>
        <div className="client-grid">
          {projects
            .filter((p) => p.type === "client")
            .map((p, i) => (
              <ClientCard key={p.slug} project={p} delay={i * 90} />
            ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Full stack projects</h2>
        </div>
        {projects
          .filter((p) => p.type === "fullstack")
          .map((p, i) => (
            <ProjectRow key={p.slug} project={p} number={i + 1} flip={i % 2 === 1} />
          ))}
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>What I work with</h2>
        </div>
        <Skills />
      </section>

      <section className="wrap section">
        <Reveal className="closing">
          <h2>Hiring, or have a project in mind?</h2>
          <p>
            The quickest way to reach me is email. I usually reply within a day.
          </p>
          <div className="actions">
            <a className="btn btn-solid" href={`mailto:${person.email}`}>{person.email}</a>
            <Link className="btn" to="/contact/">Contact page</Link>
          </div>
        </Reveal>
      </section>
    </Page>
  );
}
