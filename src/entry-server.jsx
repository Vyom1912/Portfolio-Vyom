import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import Project from "./pages/Project.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Archive from "./pages/Archive.jsx";
import NotFound from "./pages/NotFound.jsx";

const pages = { home: Home, work: Work, project: Project, about: About, contact: Contact, privacy: Privacy, terms: Terms, archive: Archive, notFound: NotFound };

export { pages, hiddenPages, notFoundMeta, projects, person, photos, experience, education, verification, SITE_URL } from "./data/site.js";

// Pages are rendered at the address GitHub Pages serves them from (with a
// trailing slash), so the active links match when the browser takes over.
export function render(url, base) {
  return renderToString(
    <StaticRouter location={base + (url === "/" ? "/" : `${url}/`)} basename={base}>
      <App pages={pages} />
    </StaticRouter>
  );
}
