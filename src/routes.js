// Each page is its own chunk of JavaScript, so a visitor only downloads the code
// for the page they open. The other pages are fetched in the background later.
export const loaders = {
  home: () => import("./pages/Home.jsx"),
  work: () => import("./pages/Work.jsx"),
  project: () => import("./pages/Project.jsx"),
  about: () => import("./pages/About.jsx"),
  contact: () => import("./pages/Contact.jsx"),
  privacy: () => import("./pages/Privacy.jsx"),
  terms: () => import("./pages/Terms.jsx"),
  archive: () => import("./pages/Archive.jsx"),
  notFound: () => import("./pages/NotFound.jsx"),
};

// Which page a path (without the site's base path) belongs to.
export function pageFor(path) {
  const p = path.replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  if (p === "/work") return "work";
  if (/^\/work\/[^/]+$/.test(p)) return "project";
  const top = { "/about": "about", "/contact": "contact", "/privacy": "privacy", "/terms": "terms", "/archive": "archive" };
  return top[p] || "notFound";
}
