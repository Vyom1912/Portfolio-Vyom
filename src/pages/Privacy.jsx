import { Link } from "react-router";
import Page from "../components/Page.jsx";
import { person } from "../data/site.js";

export default function Privacy() {
  return (
    <Page path="/privacy">
      <section className="wrap page-head">
        <p className="label">Legal</p>
        <h1>Privacy policy</h1>
        <p className="muted small">Last updated: 1 October 2026</p>
      </section>
      <section className="wrap legal prose">
        <p>
          This is the personal portfolio of {person.name}. It is a static website. This page explains what information
          is collected when you visit it and what happens to it.
        </p>

        <h2>Short version</h2>
        <ul className="ticks">
          <li>No cookies. If you pick a light or dark theme, that choice is saved in your own browser.</li>
          <li>No analytics, ads or tracking scripts.</li>
          <li>If you use the contact form, your name, email and message are sent to me so I can reply.</li>
        </ul>

        <h2>Hosting</h2>
        <p>
          The site is hosted on GitHub Pages. Like most web hosts, GitHub may log technical data such as your IP address
          and browser type when your browser requests a page. I do not have access to these logs. See the{" "}
          <a className="link" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">
            GitHub Privacy Statement
          </a>{" "}
          for details.
        </p>

        <h2>Fonts and files</h2>
        <p>
          Fonts, images and the resume PDF are served from the same host as the site. No requests are made to Google
          Fonts or other font services.
        </p>

        <h2>Contact form</h2>
        <p>
          When you submit the <Link className="link" to="/contact">contact form</Link>, the details you enter (name, email
          address and message) are sent through{" "}
          <a className="link" href="https://web3forms.com/privacy" target="_blank" rel="noopener">Web3Forms</a>, which
          forwards them to my email inbox. I use this information only to reply to you. I do not sell it, share it or add
          you to a mailing list. If you would like me to delete our conversation, email me and I will.
        </p>
        <p>
          To catch typos before you send, the form checks that your email address is well formed and that its domain (the
          part after the @, for example gmail.com) can receive mail. For that check, only the domain is looked up through{" "}
          <a className="link" href="https://developers.cloudflare.com/1.1.1.1/privacy/public-dns-resolver/" target="_blank" rel="noopener">
            Cloudflare's public DNS
          </a>
          . Your full address is never sent anywhere until you press Send.
        </p>

        <h2>Theme preference</h2>
        <p>
          The site follows your device's light or dark setting. If you choose a theme with the switch in the header, the
          choice is stored in your browser's local storage under the name "theme" so it stays the same on your next visit.
          It never leaves your device. Switching back to the theme your device uses removes it.
        </p>

        <h2>Live demos</h2>
        <p>
          Project pages can show a live demo of a project inside the page. It only loads when you choose "Live demo", and
          the demo site is then loaded from its own host (GitHub Pages or Render), under that site's own policies.
        </p>

        <h2>Links to other sites</h2>
        <p>
          This site links to GitHub, LinkedIn, Instagram and live project demos hosted elsewhere. Those sites
          have their own privacy policies, and I am not responsible for them.
        </p>

        <h2>Changes</h2>
        <p>If this policy changes, the date at the top of the page will change too.</p>

        <h2>Contact</h2>
        <p>
          Questions about this policy: <a className="link" href={`mailto:${person.email}`}>{person.email}</a>.
        </p>
      </section>
    </Page>
  );
}
