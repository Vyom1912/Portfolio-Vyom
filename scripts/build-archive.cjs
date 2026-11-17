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
  subtitle: "A Prerendered Catalogue and Export Website for a Forged Hand Tool Manufacturer",
  category: "Client Website",
  level: "Advanced",
  featured: false,
  techStack: ["React","React Router","Vite","JavaScript","CSS3","Web3Forms","WhatsApp","Vercel","Figma"],
  portfolio: {
    "shortDescription": "A prerendered React website for Makewell Agri Equipments with a 121-model catalogue, category and product pages, Custom & OEM ordering, and quotes by email or WhatsApp.",
    "description": [
      "A multi-page React website for a forged hand tool manufacturer and exporter, redesigned with a dark, product-first look: a catalogue of 121 models in seven tool families with search, filters and a PDF catalogue, a page for every family and product, and Custom & OEM and How to Order pages for importers.",
      "Every page is prerendered at build time with its own SEO metadata, share image and structured data, pages are code-split, and the sitemap lists product images. The quote form sends through Web3Forms or opens WhatsApp with the enquiry filled in, and a cookie banner keeps analytics and maps off until allowed. Purchased and configured the custom domain and deployed on Vercel from GitHub."
    ],
    "highlights": [
      "121-model catalogue with search, filters by tool family and a PDF catalogue",
      "Category and product pages with quote and WhatsApp buttons",
      "Custom & OEM and How to Order pages",
      "Quote form by email (Web3Forms) or WhatsApp, with a spam trap",
      "Prerendered pages with per-page SEO, share images and structured data",
      "Cookie consent for Google Analytics and Google Maps, with Privacy and Terms pages",
      "Custom domain on Vercel with continuous deployment from GitHub"
    ]
  },
  resume: {
    "heading": "Makewell Agri Equipments - Website | React.js, Vite, JavaScript",
    "points": [
      "Built and redesigned a multi-page React website for a forged hand tool exporter: a 121-model catalogue with search and filters, category and product pages, Custom & OEM and How to Order pages, and a quote form that sends through Web3Forms or WhatsApp.",
      "Prerendered every page at build time with per-page SEO, Open Graph images and JSON-LD structured data, code-split routes, added cookie consent for analytics and maps, and deployed on Vercel with a custom domain and continuous deployment from GitHub."
    ]
  },
  links: {
    demo: "https://www.makewellagriequipments.com/",
    github: "",
    // The redesigned home page, captured from the live site.
    screenshot: "images/captured/makewell/home.png",
  },
});

// Screenshots captured from the live sites (content/images/captured/<folder>).
const capturedFolders = { "publishpro-blogging-platform": "publishpro", "url-shortener": "url-shortener", foodzing: "foodzing", "rakhi-store": "rakhi-store", "makewell-agri-equipments": "makewell" };
for (const p of data.projects) {
  const folder = capturedFolders[p.slug];
  const dir = folder && path.join(out, "images", "captured", folder);
  p.links.gallery = dir && fs.existsSync(dir) ? fs.readdirSync(dir).map((f) => `images/captured/${folder}/${f}`) : [];
}
// The Vercel deployment of the URL shortener asks visitors to log in to Vercel; the Render one is public.
data.projects.find((p) => p.slug === "url-shortener").links.demo = "https://urlshortener-1osn.onrender.com/";

fs.writeFileSync(path.join(out, "projects.json"), JSON.stringify(data, null, 2) + "\n");
fs.copyFileSync(path.join(root, "project", "PROJECTS-PORTFOLIO-RESUME.md"), path.join(out, "PROJECTS-PORTFOLIO-RESUME.md"));
fs.copyFileSync(path.join(root, "03", "Vyom Resume.pdf"), path.join(out, "Vyom-Patel-Resume.pdf"));

const missing = data.projects.filter((p) => !p.links.screenshot).map((p) => p.title);
console.log(`${[...seen.values()].length} images archived, ${data.projects.length} projects`);
console.log("projects without a screenshot:", missing.join(", ") || "none");
