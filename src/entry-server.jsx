import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";

export { pages, hiddenPages, notFoundMeta, projects, person, SITE_URL } from "./data/site.js";

export function render(url, base) {
  return renderToString(
    <StaticRouter location={base + (url === "/" ? "/" : url)} basename={base}>
      <App />
    </StaticRouter>
  );
}
