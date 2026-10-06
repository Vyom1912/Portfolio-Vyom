// Renders every route to static HTML so search engines get full content,
// titles and meta tags without running JavaScript. Also writes sitemap.xml,
// robots.txt, 404.html and .nojekyll for GitHub Pages.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrEntry = pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href;
const { render, pages, hiddenPages, notFoundMeta, projects, person, photos, experience, education, verification, SITE_URL } = await import(ssrEntry);

const BASE = "/Portfolio-Vyom";
// The stylesheet is small (about 10 KB gzipped), so it goes straight into each
// page. The browser can then draw the page without waiting for another request.
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8").replace(
  new RegExp(`<link rel="stylesheet"[^>]*href="${BASE}/assets/([^"]+\\.css)"[^>]*>`),
  (_, file) => `<style>${fs.readFileSync(path.join(dist, "assets", file), "utf8")}</style>`
);
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const urlFor = (route) => `${SITE_URL}${route === "/" ? "/" : `${route}/`}`;

const abs = (p) => `${SITE_URL}/${p}`;
const himatnagar = {
  "@type": "PostalAddress",
  addressLocality: "Himatnagar",
  addressRegion: "Gujarat",
  addressCountry: "IN",
};

// Who the site is about. Google uses this for name searches ("Vyom Patel",
// "Vyom Patel Himatnagar") and to connect the site with the profiles in sameAs.
const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: person.name,
  givenName: "Vyom",
  familyName: "Patel",
  // The GitHub and LinkedIn username, so searches for it find this site too.
  alternateName: [person.handle, person.handle.toLowerCase()],
  identifier: [
    { "@type": "PropertyValue", propertyID: "GitHub", value: person.handle, url: person.github },
    { "@type": "PropertyValue", propertyID: "LinkedIn", value: person.handle.toLowerCase(), url: person.linkedin },
  ],
  url: `${SITE_URL}/`,
  description: `${person.role} from Himatnagar, Gujarat, India, building websites and web apps with React, Node.js, Express and MongoDB.`,
  image: photos.map((ph) => ({ "@type": "ImageObject", url: abs(ph.src), width: ph.width, height: ph.height, caption: ph.alt })),
  jobTitle: person.role,
  email: `mailto:${person.email}`,
  address: himatnagar,
  homeLocation: { "@type": "Place", name: "Himatnagar, Gujarat, India", address: himatnagar },
  nationality: { "@type": "Country", name: "India" },
  knowsLanguage: ["English", "Gujarati"],
  worksFor: { "@type": "Organization", name: experience[0].org },
  hasOccupation: {
    "@type": "Occupation",
    name: "Full stack web developer",
    occupationLocation: { "@type": "City", name: "Himatnagar, Gujarat" },
    skills: "React, Node.js, Express, MongoDB, JavaScript, REST APIs",
  },
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  sameAs: [person.github, person.linkedin, person.instagram],
  knowsAbout: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Firebase", "REST APIs", "Full stack web development"],
};

function structuredData(route) {
  const url = urlFor(route);
  const graph = [personLd];
  graph.push({
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "Vyom Patel",
    description: pages["/"].description,
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#person` },
  });
  // The home and About pages are profile pages: Google reads them as pages about one person.
  if (route === "/" || route === "/about") {
    graph.push({
      "@type": "ProfilePage",
      "@id": `${url}#profilepage`,
      url,
      name: pages[route].title,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      dateModified: today,
    });
  }
  const project = projects.find((p) => route === `/work/${p.slug}`);
  if (project) {
    const common = {
      name: project.title,
      description: project.summary,
      url,
      image: abs(project.image),
      keywords: project.stack.join(", "),
      author: { "@id": `${SITE_URL}/#person` },
      creator: { "@id": `${SITE_URL}/#person` },
      sameAs: project.live || undefined,
    };
    // Client websites have no public code, so they are described as websites.
    graph.push(
      project.github
        ? { "@type": "SoftwareSourceCode", ...common, codeRepository: project.github, programmingLanguage: "JavaScript" }
        : { "@type": "WebSite", ...common }
    );
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: urlFor("/") },
        { "@type": "ListItem", position: 2, name: "Work", item: urlFor("/work") },
        { "@type": "ListItem", position: 3, name: project.title, item: url },
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
    `<meta property="og:locale" content="en_IN" />`,
    route === "/" ? `<meta property="profile:first_name" content="Vyom" />` : "",
    route === "/" ? `<meta property="profile:last_name" content="Patel" />` : "",
    route === "/" && verification.google ? `<meta name="google-site-verification" content="${esc(verification.google)}" />` : "",
    route === "/" && verification.bing ? `<meta name="msvalidate.01" content="${esc(verification.bing)}" />` : "",
    noindex ? "" : `<script type="application/ld+json">${structuredData(route)}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

function write(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const routes = Object.keys(pages);
// Preload hints for the code of each page, so the browser fetches it in
// parallel with the main bundle instead of after it.
const manifest = JSON.parse(fs.readFileSync(path.join(dist, ".vite/manifest.json"), "utf8"));
const pageFile = (route) => {
  if (route === "/") return "src/pages/Home.jsx";
  if (route === "/work") return "src/pages/Work.jsx";
  if (route.startsWith("/work/")) return "src/pages/Project.jsx";
  const name = { "/about": "About", "/contact": "Contact", "/privacy": "Privacy", "/terms": "Terms", "/archive": "Archive" }[route];
  return name ? `src/pages/${name}.jsx` : "src/pages/NotFound.jsx";
};
const chunksFor = (key, seen = new Set()) => {
  const entry = manifest[key];
  if (!entry || seen.has(entry.file)) return seen;
  seen.add(entry.file);
  for (const dep of entry.imports || []) chunksFor(dep, seen);
  return seen;
};
const entryChunks = chunksFor("index.html");
const preloads = (route) =>
  [...chunksFor(pageFile(route))]
    .filter((file) => !entryChunks.has(file))
    .map((file) => `<link rel="modulepreload" crossorigin href="${BASE}/${file}" />`)
    .join("\n    ");

for (const route of routes) {
  const html = template
    .replace("<!--app-head-->", head(route, pages[route]) + "\n    " + preloads(route))
    .replace("<!--app-html-->", render(route, BASE));
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  write(out, html);
  console.log("prerendered", route);
}

// Unlisted pages: an empty shell that the browser renders, marked noindex and left out of the sitemap.
for (const [route, meta] of Object.entries(hiddenPages)) {
  write(path.join(dist, route, "index.html"), template.replace("<!--app-head-->", head(route, meta, { noindex: true }) + "\n    " + preloads(route)).replace("<!--app-html-->", ""));
  console.log("shell", route);
}

// GitHub Pages serves 404.html for unknown paths.
write(
  path.join(dist, "404.html"),
  template
    .replace("<!--app-head-->", head("/404", notFoundMeta, { noindex: true }) + "\n    " + preloads("/404"))
    .replace("<!--app-html-->", render("/404", BASE))
);

// Images listed in the sitemap help them show up in Google Images for name searches.
const imagesFor = (route) => {
  if (route === "/" || route === "/about") return photos.map((ph) => ({ loc: abs(ph.src), title: ph.alt }));
  const p = projects.find((pr) => route === `/work/${pr.slug}`);
  if (!p) return [];
  const shots = p.showcase.flatMap((g) => g.screens).map((sc) => ({ loc: abs(sc.desktop), title: `${p.title}: ${sc.title}` }));
  return [{ loc: abs(p.image), title: `${p.title} by Vyom Patel` }, ...shots];
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map((r) => {
    const priority = r === "/" ? "1.0" : r.startsWith("/work") || r === "/about" ? "0.8" : r === "/contact" ? "0.6" : "0.3";
    const imgs = imagesFor(r)
      .map((i) => `\n    <image:image><image:loc>${i.loc}</image:loc><image:title>${esc(i.title)}</image:title></image:image>`)
      .join("");
    return `  <url><loc>${urlFor(r)}</loc><lastmod>${today}</lastmod><priority>${priority}</priority>${imgs}\n  </url>`;
  })
  .join("\n")}
</urlset>
`;
write(path.join(dist, "sitemap.xml"), sitemap);
write(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write(path.join(dist, ".nojekyll"), "");

fs.rmSync(path.resolve("dist-ssr"), { recursive: true, force: true });
fs.rmSync(path.join(dist, ".vite"), { recursive: true, force: true });
console.log(`done: ${routes.length} pages, sitemap, robots, 404`);
