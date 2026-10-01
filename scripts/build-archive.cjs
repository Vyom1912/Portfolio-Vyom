// One-off: collects every project record and every unique image from the old
// reference folders (01, 03, project) into 04/content, so this folder holds
// everything even though the site only shows a few projects.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..", "..");
const out = path.resolve(__dirname, "..", "content");
const sources = [
  ["project/image", "from-project"], // newest screenshots first, so they win on duplicates
  ["03/image", "from-03"],
  ["01/image", "from-01"],
];
const exts = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : exts.has(path.extname(d.name).toLowerCase()) ? [p] : [];
  });
}

const seen = new Map(); // hash -> archive path
const index = [];
for (const [src, dest] of sources) {
  const base = path.join(root, src);
  for (const file of walk(base)) {
    const hash = crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex");
    const rel = path.relative(base, file).split(path.sep).join("/");
    if (seen.has(hash)) {
      index.push({ source: `${src}/${rel}`, duplicateOf: seen.get(hash) });
      continue;
    }
    const target = `images/${dest}/${rel}`;
    fs.mkdirSync(path.dirname(path.join(out, target)), { recursive: true });
    fs.copyFileSync(file, path.join(out, target));
    seen.set(hash, target);
    index.push({ source: `${src}/${rel}`, archived: target });
  }
}
fs.writeFileSync(path.join(out, "images", "index.json"), JSON.stringify(index, null, 2));

// Project data: projects-data.js is the newest and most complete source.
global.window = {};
require(path.join(root, "project", "projects-data.js"));
const data = window.PORTFOLIO_DATA;

const lookup = (p) => {
  const name = path.basename(p).toLowerCase();
  const hit = [...seen.values()].find((v) => v.startsWith("images/from-project/") && path.basename(v).toLowerCase() === name);
  return hit || [...seen.values()].find((v) => path.basename(v).toLowerCase() === name) || null;
};
for (const p of data.projects) {
  if (p.links && p.links.screenshot) p.links.screenshot = lookup(p.links.screenshot);
}

// Makewell is only described in the resume and folder 03, not in projects-data.js.
data.projects.push({
  id: 35,
  slug: "makewell-agri-equipments",
  title: "Makewell Agri Equipments",
  subtitle: "A Multi-Page Marketing Website for an Agricultural Equipment Company",
  category: "Client Website",
  level: "Advanced",
  featured: false,
  techStack: ["React", "React Router", "JavaScript", "CSS3", "Web3Forms", "Vercel", "Figma"],
  portfolio: {
    shortDescription:
      "A multi-page React website for Makewell Agri Equipments with a filterable product catalogue, product details, quotation requests and a contact form.",
    description: [
      "A multi-page React marketing website with React Router, featuring a filterable product catalogue, a contact form with async email validation, Web3Forms API integration and a responsive mobile-first layout with a slide-in navigation drawer.",
      "Purchased and configured a custom domain, deployed the production site on Vercel with GitHub integration for continuous deployment, and added SEO metadata.",
    ],
    highlights: [
      "Filterable product catalogue and product detail pages",
      "Quotation request and contact form through Web3Forms, with async email validation",
      "Mobile-first layout with a slide-in navigation drawer",
      "Custom domain on Vercel with continuous deployment from GitHub",
      "SEO metadata",
    ],
  },
  resume: {
    heading: "Makewell Agri Equipments - Website | React.js, JavaScript",
    points: [
      "Developed a multi-page React marketing website with React Router, featuring a filterable product catalogue, contact form with async email validation, Web3Forms API integration and responsive mobile-first layout with a slide-in navigation drawer.",
      "Purchased and configured a custom domain, deployed the production website on Vercel with GitHub integration for continuous deployment, and implemented SEO metadata.",
    ],
  },
  links: {
    demo: "https://vyom1912.github.io/Makewell-Agri-Equipments/",
    github: "",
    screenshot: lookup("MakeWell.png"),
  },
});

// Screenshots captured from the live sites (content/images/captured/<folder>).
const capturedFolders = { "publishpro-blogging-platform": "publishpro", "url-shortener": "url-shortener", foodzing: "foodzing", "rakhi-store": "rakhi-store", "makewell-agri-equipments": "makewell" };
for (const p of data.projects) {
  const folder = capturedFolders[p.slug];
  const dir = folder && path.join(out, "images", "captured", folder);
  p.links.gallery = dir && fs.existsSync(dir) ? fs.readdirSync(dir).map((f) => `images/captured/${folder}/${f}`) : [];
}
// The old GitHub Pages address for Makewell returns 404; the site now lives on the client's own domain.
data.projects.find((p) => p.slug === "makewell-agri-equipments").links.demo = "";
// The Vercel deployment of the URL shortener asks visitors to log in to Vercel; the Render one is public.
data.projects.find((p) => p.slug === "url-shortener").links.demo = "https://urlshortener-1osn.onrender.com/";

fs.writeFileSync(path.join(out, "projects.json"), JSON.stringify(data, null, 2) + "\n");
fs.copyFileSync(path.join(root, "project", "PROJECTS-PORTFOLIO-RESUME.md"), path.join(out, "PROJECTS-PORTFOLIO-RESUME.md"));
fs.copyFileSync(path.join(root, "03", "Vyom Resume.pdf"), path.join(out, "Vyom-Patel-Resume.pdf"));

const missing = data.projects.filter((p) => !p.links.screenshot).map((p) => p.title);
console.log(`${[...seen.values()].length} images archived, ${data.projects.length} projects`);
console.log("projects without a screenshot:", missing.join(", ") || "none");
