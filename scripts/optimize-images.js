// Builds the web-ready images in public/images from the originals in content/images.
// Run with: npm run images
import fs from "node:fs";
import sharp from "sharp";

const src = (p) => `content/images/${p}`;
const outDir = "public/images";

// Screenshots used on the site.
const shots = [
  ["from-project/publishpro.png", "publishpro", 1600],
  ["from-project/urlshortner.png", "url-shortener", 1600],
  ["from-project/urlshortener.png", "url-shortener-devices", 1800],
  ["from-project/foodzing.png", "foodzing", 1600],
];
for (const [file, name, width] of shots) {
  await sharp(src(file)).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${outDir}/${name}.webp`);
}

// Main images for the client projects.
await sharp(src("from-project/rakhistore.png")).resize({ width: 1600 }).webp({ quality: 82 }).toFile(`${outDir}/rakhi-store.webp`);
await sharp(src("from-03/MakeWell.png")).webp({ quality: 88 }).toFile(`${outDir}/makewell.webp`);

// Gallery screenshots, captured from the live sites into content/images/captured.
// Add a file there, list it here, run `npm run images`, then add it to `gallery` in src/data/site.js.
const captured = "content/images/captured";
fs.mkdirSync(`${outDir}/gallery`, { recursive: true });
for (const dir of fs.readdirSync(captured)) {
  for (const file of fs.readdirSync(`${captured}/${dir}`)) {
    const phone = file.startsWith("mobile");
    await sharp(`${captured}/${dir}/${file}`)
      .resize({ width: phone ? 600 : 1440, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`${outDir}/gallery/${dir}-${file.replace(/\.png$/, ".webp")}`);
  }
}

// Small thumbnails for every project in content/projects.json (used by the unlisted archive page).
const archive = JSON.parse(fs.readFileSync("content/projects.json", "utf8"));
fs.mkdirSync(`${outDir}/archive`, { recursive: true });
for (const p of archive.projects) {
  if (!p.links.screenshot) continue;
  await sharp(`content/${p.links.screenshot}`)
    .resize({ width: 720, height: 450, fit: "cover", position: "top" })
    .webp({ quality: 74 })
    .toFile(`${outDir}/archive/${p.slug}.webp`);
}

// The portrait originals are round crops with transparent corners. Cut the
// largest 4:5 rectangle that fits inside the circle, so the photos can be shown
// as normal rectangles. For a circle of radius r, a 4:5 box fits when its
// width is at most r / 0.8.
async function rectPortrait(file, name, outWidth) {
  const { width } = await sharp(src(file)).metadata();
  const r = width / 2;
  const w = Math.floor((r / 0.8) * 0.97);
  const h = Math.round(w * 1.25);
  await sharp(src(file))
    .extract({ left: Math.round(r - w / 2), top: Math.round(r - h / 2), width: w, height: h })
    .resize({ width: Math.min(outWidth, w) })
    .webp({ quality: 84 })
    .toFile(`${outDir}/${name}.webp`);
}
await rectPortrait("from-03/hero-img.png", "portrait-outdoor", 1000);

// Phone photos in content/images/photos, cropped to 4:5 around me. The boxes are
// in pixels of the upright photo (after applying the camera's rotation).
const photos = [
  ["vyom-3.jpg", "portrait-sunset", { left: 1173, top: 0, width: 1837, height: 2296 }],
  ["vyom-4.jpg", "portrait-wall", { left: 115, top: 1290, width: 1952, height: 2440 }],
];
for (const [file, name, box] of photos) {
  const upright = await sharp(src(`photos/${file}`)).rotate().toBuffer();
  await sharp(upright).extract(box).resize({ width: 1000 }).webp({ quality: 82 }).toFile(`${outDir}/${name}.webp`);
}

// Header avatar and site icons, all cut from the same photo of me.
const faceSrc = src("photos/portrait-outdoor.jpg");

// Site icons show more than the face: head, shoulders, chest and a little of the
// background. Browser tab icons are round (transparent corners); the home-screen
// icon stays square because iOS and Android round it themselves.
const iconCrop = { left: 60, top: 40, width: 920, height: 920 };
// The header and dock photo uses the same crop as the icons.
await sharp(faceSrc).extract(iconCrop).resize(128, 128).webp({ quality: 84 }).toFile(`${outDir}/avatar.webp`);
const round = (size) => Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`);
for (const size of [32, 192]) {
  await sharp(faceSrc).extract(iconCrop).resize(size, size).composite([{ input: round(size), blend: "dest-in" }]).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(`public/favicon-${size}.png`);
}
await sharp(faceSrc).extract(iconCrop).resize(180, 180).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile("public/apple-touch-icon.png");

// Social preview card (1200x630).
const ogFace = await sharp(src("from-03/hero-img.png")).resize(470, 470).png().toBuffer();
const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="14" height="630" fill="#7a1f1f"/>
  <text x="600" y="250" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="700" fill="#141414">Vyom Patel</text>
  <text x="600" y="320" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#444">Full stack developer</text>
  <text x="600" y="370" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#7a1f1f">React, Node.js, Express, MongoDB</text>
  <text x="600" y="470" font-family="Courier New, monospace" font-size="24" fill="#666">github.com/Vyom1912</text>
</svg>`);
await sharp(text).composite([{ input: ogFace, left: 80, top: 80 }]).jpeg({ quality: 88 }).toFile(`${outDir}/og-card.jpg`);

console.log("images done");

// Trimmed project list for the unlisted /archive page (loaded on demand, not in the main bundle).
// Client websites: show the live site, never a code link.
const clientSites = { "rakhi-store": "https://vyom1912.github.io/A-Rakhi-Store/", "makewell-agri-equipments": "https://www.makewellagriequipments.com/" };
const onSite = { "publishpro-blogging-platform": "publishpro", "url-shortener": "url-shortener", foodzing: "foodzing", "rakhi-store": "rakhi-store", "makewell-agri-equipments": "makewell" };
const slim = archive.projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  category: p.category,
  level: p.level,
  summary: p.portfolio.shortDescription,
  stack: p.techStack,
  demo: p.links.demo || clientSites[p.slug] || "",
  github: clientSites[p.slug] ? "" : p.links.github || "",
  thumb: p.links.screenshot ? `images/archive/${p.slug}.webp` : "",
  page: onSite[p.slug] ? `/work/${onSite[p.slug]}` : "",
}));
fs.writeFileSync("src/data/archive.json", JSON.stringify(slim, null, 1) + "\n");
console.log(`archive data: ${slim.length} projects`);

// Smaller copies of the site's photos and screenshots, so phones don't download
// desktop-sized files: "-sm" (720px wide) and, for screenshots, "-xs" (240px, used
// for thumbnails). The widths of every file go into src/data/images.json, which
// the components turn into srcset lists.
const variants = { sm: 720, xs: 240 };
const manifest = {};
const isVariant = (f) => /-(sm|xs)\.webp$/.test(f);
const sources = [
  ...fs.readdirSync(outDir).filter((f) => f.endsWith(".webp") && f !== "avatar.webp").map((f) => `images/${f}`),
  ...fs.readdirSync(`${outDir}/gallery`).filter((f) => f.endsWith(".webp")).map((f) => `images/gallery/${f}`),
].filter((p) => !isVariant(p));
for (const rel of sources) {
  const file = `public/${rel}`;
  const { width, height } = await sharp(file).metadata();
  const entry = { w: width, h: height, v: [] };
  for (const [key, w] of Object.entries(variants)) {
    if (key === "xs" && !rel.includes("/gallery/")) continue;
    if (width < w * 1.25) continue; // the original is already small enough
    const out = rel.replace(/\.webp$/, `-${key}.webp`);
    await sharp(file).resize({ width: w }).webp({ quality: 78 }).toFile(`public/${out}`);
    entry.v.push([out, w]);
  }
  manifest[rel] = entry;
}
fs.writeFileSync("src/data/images.json", JSON.stringify(manifest) + "\n");
console.log(`responsive images: ${Object.keys(manifest).length} files`);
