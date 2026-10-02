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

// Header avatar and site icons, all cut from the same close-up of my face.
const face = { left: 250, top: 90, width: 580, height: 580 };
const faceSrc = src("photos/portrait-outdoor.jpg");
await sharp(faceSrc).extract(face).resize(96, 96).webp({ quality: 86 }).toFile(`${outDir}/avatar.webp`);
// Browser tab icons are round (transparent corners); the home-screen icon stays
// square because iOS and Android round it themselves.
const round = (size) => Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`);
for (const size of [32, 192]) {
  await sharp(faceSrc).extract(face).resize(size, size).composite([{ input: round(size), blend: "dest-in" }]).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(`public/favicon-${size}.png`);
}
await sharp(faceSrc).extract(face).resize(180, 180).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile("public/apple-touch-icon.png");

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
