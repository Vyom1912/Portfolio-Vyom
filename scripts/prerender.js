// Renders every route to static HTML so search engines get full content,
// titles and meta tags without running JavaScript. Also writes sitemap.xml,
// robots.txt, 404.html and .nojekyll for GitHub Pages.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrEntry = pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href;
const { render, pages, hiddenPages, notFoundMeta, projects, person, SITE_URL } = await import(ssrEntry);

const BASE = "/Portfolio-Vyom";
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const urlFor = (route) => `${SITE_URL}${route === "/" ? "/" : `${route}/`}`;

const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: person.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/portrait-outdoor.webp`,
  jobTitle: "Full Stack Developer",
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Himatnagar", addressRegion: "Gujarat", addressCountry: "IN" },
  sameAs: [person.github, person.linkedin, person.instagram],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "LDRP Institute of Technology and Research" },
    { "@type": "CollegeOrUniversity", name: "Gujarat Technological University" },
  ],
  knowsAbout: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Firebase", "REST APIs", "Full stack web development"],
};

function structuredData(route) {
  const graph = [personLd];
  if (route === "/") {
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Vyom Patel",
      author: { "@id": `${SITE_URL}/#person` },
    });
  }
  const project = projects.find((p) => route === `/work/${p.slug}`);
  if (project) {
    graph.push({
      "@type": "SoftwareSourceCode",
      name: project.title,
      description: project.summary,
      codeRepository: project.github,
      url: project.live,
      image: `${SITE_URL}/${project.image}`,
      programmingLanguage: "JavaScript",
      keywords: project.stack.join(", "),
      author: { "@id": `${SITE_URL}/#person` },
    });
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Work", item: urlFor("/work") },
        { "@type": "ListItem", position: 2, name: project.title, item: urlFor(route) },
      ],
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function head(route, meta, { noindex = false } = {}) {
  const url = urlFor(route);
  const image = `${SITE_URL}/${meta.image || "images/og-card.jpg"}`;
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    noindex ? `<meta name="robots" content="noindex, nofollow" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route === "/" ? "profile" : "website"}" />`,
    `<meta property="og:site_name" content="Vyom Patel" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="me" href="${person.github}" />`,
    noindex ? "" : `<script type="application/ld+json">${structuredData(route)}</script>`,
  ].join("\n    ");
}

function write(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const routes = Object.keys(pages);
for (const route of routes) {
  const html = template
    .replace("<!--app-head-->", head(route, pages[route]))
    .replace("<!--app-html-->", render(route, BASE));
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  write(out, html);
  console.log("prerendered", route);
}

// Unlisted pages: an empty shell that the browser renders, marked noindex and left out of the sitemap.
for (const [route, meta] of Object.entries(hiddenPages)) {
  write(path.join(dist, route, "index.html"), template.replace("<!--app-head-->", head(route, meta, { noindex: true })).replace("<!--app-html-->", ""));
  console.log("shell", route);
}

// GitHub Pages serves 404.html for unknown paths.
write(
  path.join(dist, "404.html"),
  template
    .replace("<!--app-head-->", head("/404", notFoundMeta, { noindex: true }))
    .replace("<!--app-html-->", render("/404", BASE))
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => {
    const priority = r === "/" ? "1.0" : r.startsWith("/work") || r === "/about" ? "0.8" : r === "/contact" ? "0.6" : "0.3";
    return `  <url><loc>${urlFor(r)}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
  })
  .join("\n")}
</urlset>
`;
write(path.join(dist, "sitemap.xml"), sitemap);
write(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write(path.join(dist, ".nojekyll"), "");

fs.rmSync(path.resolve("dist-ssr"), { recursive: true, force: true });
console.log(`done: ${routes.length} pages, sitemap, robots, 404`);
