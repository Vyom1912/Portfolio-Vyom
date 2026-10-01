import Page from "../components/Page.jsx";
import PhotoStack from "../components/PhotoStack.jsx";
import Reveal from "../components/Reveal.jsx";
import { asset } from "../components/util.js";
import Skills from "../components/Skills.jsx";
import { education, experience, person } from "../data/site.js";

export default function About() {
  return (
    <Page path="/about">
      <section className="wrap about-top">
        <div>
          <p className="label">About</p>
          <h1>A little about me</h1>
          <div className="prose">
            <p>
              I'm Vyom Patel, a full stack JavaScript developer from {person.location}. Since September 2026 I've been a
              web developer intern at Blue Nova Tech, working on live projects.
            </p>
            <p>
              Alongside that I'm doing my M.E. in Computer Engineering at LDRP Institute of Technology and Research, after
              a B.E. from Gujarat Technological University.
            </p>
            <p>
              My main stack is React, Node.js, Express and MongoDB, and I have also used Firebase, Prisma, Drizzle, MySQL
              and Tailwind CSS. I like owning a feature end to end: the schema, the API, and the screen on top of it. In my
              own projects I have spent the most time on authentication (access and refresh tokens, revocable sessions,
              email verification and password reset) and on keeping pages light on mobile.
            </p>
            <p>
              I have also built websites for real businesses. For{" "}
              <a className="link" href="https://vyom1912.github.io/Makewell-Agri-Equipments/" target="_blank" rel="noopener">
                Makewell Agri Equipments
              </a>{" "}
              I made a multi-page React site with a filterable product catalogue and a contact form, and deployed it on
              Vercel with a custom domain. For a home business selling handmade rakhis I built a mobile-first store where
              orders go straight to WhatsApp.
            </p>
            <p>I speak English and Gujarati.</p>
          </div>
          <div className="actions">
            <a className="btn btn-solid" href={asset(person.resume)} target="_blank" rel="noopener">Resume (PDF)</a>
            <a className="btn" href={person.linkedin} target="_blank" rel="noopener me">LinkedIn</a>
          </div>
        </div>
        <PhotoStack />
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Experience</h2>
        </div>
        <ol className="timeline">
          {experience.map((job) => (
            <Reveal as="li" key={job.org} className="tl-item">
              <p className="tl-when label">{job.when}</p>
              <div>
                <h3>{job.role}</h3>
                <p className="muted">
                  {job.place ? `${job.org}, ${job.place}` : job.org}
                  {job.when.includes("present") && <span className="now-badge">Current</span>}
                </p>
                {job.summary && <p className="tl-summary">{job.summary}</p>}
                <ul className="ticks">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                {job.note && <p className="tl-note">{job.note}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Education</h2>
        </div>
        <ol className="timeline">
          {education.map((ed) => (
            <Reveal as="li" key={ed.degree} className="tl-item">
              <p className="tl-when label">{ed.when}</p>
              <div>
                <h3>{ed.degree}</h3>
                <p className="muted">{ed.school}</p>
                <p className="small">{ed.note}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Skills</h2>
        </div>
        <Skills />
      </section>
    </Page>
  );
}
