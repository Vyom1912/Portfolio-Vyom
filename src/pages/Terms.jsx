import { Link } from "react-router";
import Page from "../components/Page.jsx";
import { person } from "../data/site.js";

export default function Terms() {
  return (
    <Page path="/terms">
      <section className="wrap page-head">
        <p className="label">Legal</p>
        <h1>Terms and conditions</h1>
        <p className="muted small">Last updated: 30 September 2026</p>
      </section>
      <section className="wrap legal prose">
        <p>
          By using this website you agree to these terms. If you do not agree, please do not use the site.
        </p>

        <h2>What this site is</h2>
        <p>
          This is the personal portfolio of {person.name}. It exists to show my work and to let people contact me about
          jobs and projects. Nothing here is an offer of services on fixed terms.
        </p>

        <h2>Content and ownership</h2>
        <p>
          The text, photos and design of this site belong to {person.name} unless stated otherwise. You may link to any
          page and quote short parts with credit. Please do not copy the photos or reuse the site as your own portfolio.
        </p>
        <p>
          Source code for the projects shown here is on GitHub. Each repository's own license (if it has one) applies to
          that code.
        </p>

        <h2>Project demos and external links</h2>
        <p>
          Live demos run on third-party hosting such as Render and GitHub Pages. They are sample projects, may be slow to
          start or offline at times, and should not be used to store real personal data. Links to other websites are
          provided for convenience and I am not responsible for their content.
        </p>

        <h2>No warranty</h2>
        <p>
          The site and demos are provided as they are. I try to keep the information accurate, but I cannot promise it is
          complete or always up to date. To the extent allowed by law, I am not liable for any loss arising from use of the
          site.
        </p>

        <h2>Contact form</h2>
        <p>
          Please do not send spam, abusive messages or sensitive personal information through the form. How form data is
          handled is described in the <Link className="link" to="/privacy">privacy policy</Link>.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India.</p>

        <h2>Contact</h2>
        <p>
          Questions about these terms: <a className="link" href={`mailto:${person.email}`}>{person.email}</a>.
        </p>
      </section>
    </Page>
  );
}
