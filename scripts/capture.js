// Re-captures the "See it in action" screenshots from the live sites.
// Run with: npm run capture -- makewell            (one project)
//           npm run capture -- makewell rakhi-store (several)
//           npm run capture                          (every project with a showcase)
// Then run `npm run images` and `npm run build`.
//
// The screens and their URLs come from `showcase` in src/data/site.js: for a screen
// whose desktop image is images/gallery/<folder>-<name>.webp, this saves
// content/images/captured/<folder>/<name>.png (1440x900) and mobile-<name>.png
// (390x844 at 2x). To add a screen, add it to `showcase` first.
//
// Uses the Chrome or Edge already installed on this computer (set CHROME_PATH to
// pick another browser), driven over the DevTools protocol, so no extra packages.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { projects } from "../src/data/site.js";

// Run before each page loads, so pop-ups don't cover the shots. Makewell's cookie
// banner stays hidden once a choice is saved.
const beforeLoad = {
  makewell: `localStorage.setItem("makewell-consent-v1", JSON.stringify({ decided: true, analytics: false, maps: false }))`,
};
const settle = 3500; // ms to wait after load for fonts, hero images and reveal animations

const wanted = process.argv.slice(2);
const folders = fs.readdirSync("content/images/captured");
const jobs = [];
for (const p of projects) {
  for (const screen of (p.showcase || []).flatMap((f) => f.screens)) {
    // "images/gallery/url-shortener-stats.webp" -> folder "url-shortener", name "stats"
    const base = path.basename(screen.desktop, ".webp");
    const folder = folders.filter((f) => base.startsWith(`${f}-`)).sort((a, b) => b.length - a.length)[0] || p.slug;
    const name = base.slice(folder.length + 1);
    if (wanted.length && !wanted.includes(folder) && !wanted.includes(p.slug)) continue;
    jobs.push({ folder, name, url: screen.url });
  }
}
if (!jobs.length) {
  console.error(`No screens found for: ${wanted.join(", ") || "any project"}`);
  process.exit(1);
}

const browser =
  process.env.CHROME_PATH ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].find((p) => fs.existsSync(p));
if (!browser) throw new Error("Chrome or Edge not found. Set CHROME_PATH.");

const port = 9300 + Math.floor(Math.random() * 600);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "capture-"));
const proc = spawn(browser, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--hide-scrollbars", "--no-first-run", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 75 && !target; i++) {
  await sleep(200);
  try {
    target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page");
  } catch {}
}
if (!target) throw new Error("The browser did not start.");

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const waiting = new Map();
const events = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && waiting.has(m.id)) {
    waiting.get(m.id)(m);
    waiting.delete(m.id);
  } else if (m.method) events.push(m.method);
});
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const n = ++id;
    waiting.set(n, (m) => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result)));
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await send("Page.enable");
for (const script of new Set(jobs.map((j) => beforeLoad[j.folder]).filter(Boolean))) {
  await send("Page.addScriptToEvaluateOnNewDocument", { source: `try{${script}}catch(e){}` });
}

const iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const devices = [
  { prefix: "", width: 1440, height: 900, scale: 1, mobile: false },
  { prefix: "mobile-", width: 390, height: 844, scale: 2, mobile: true, ua: iphone },
];
try {
  for (const d of devices) {
    await send("Emulation.setDeviceMetricsOverride", { width: d.width, height: d.height, deviceScaleFactor: d.scale, mobile: d.mobile });
    await send("Emulation.setTouchEmulationEnabled", { enabled: d.mobile });
    await send("Emulation.setUserAgentOverride", { userAgent: d.ua || "" });
    for (const job of jobs) {
      events.length = 0;
      await send("Page.navigate", { url: job.url });
      for (let i = 0; i < 150 && !events.includes("Page.loadEventFired"); i++) await sleep(100);
      await sleep(settle);
      const { data } = await send("Page.captureScreenshot", { format: "png" });
      const file = `content/images/captured/${job.folder}/${d.prefix}${job.name}.png`;
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, Buffer.from(data, "base64"));
      console.log(`saved ${file}  (${job.url})`);
    }
  }
} finally {
  ws.close();
  proc.kill();
}
console.log(`\n${jobs.length * 2} screenshots. Next: npm run images && npm run build`);
