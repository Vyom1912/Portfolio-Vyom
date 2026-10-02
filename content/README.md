# Content archive

Everything about my projects, kept in one place. The website only shows a few of these; the rest is here for later.

This folder is **not** deployed. Only `public/` and the built pages go to GitHub Pages.

## What's here

- `projects.json`: all 35 projects (portfolio text, highlights, resume bullets, tech stack, links). Taken from `project/projects-data.js`, plus Makewell from my resume.
- `images/`: every unique image from the old folders, one copy each.
  - `from-project/`: newest screenshots (from `project/image`)
  - `from-03/`: portraits and older screenshots (from `03/image`)
  - `photos/`: my newer photos (originals from the phone)
  - `from-01/`: older screenshots and design work (from `01/image`)
  - `index.json`: where each file came from, and which files were duplicates
- `PROJECTS-PORTFOLIO-RESUME.md`: long write-ups and resume bullets for the smaller projects.
- `Vyom-Patel-Resume.pdf`: the resume the site links to.

## Adding screens to a project page

Each project page has a "See it in action" block. Screens are grouped by feature (for example "Reading and search" and "Accounts"): the features show as tabs, each tab lists its screens next to a device frame, and the frame switches between desktop and phone, and between screenshots and the live site. There is no limit on features or screens, so add a screen for every page or feature worth showing. Every screen needs one desktop and one phone screenshot.

1. Save two PNGs in `content/images/captured/<folder>/`:
   - `<name>.png`: desktop, 1440×900
   - `mobile-<name>.png`: phone, 390×844 (or 780×1688 at 2x)
   Folders: `publishpro`, `url-shortener`, `foodzing`, `rakhi-store`, `makewell`.
2. Run `npm run images`. It creates `public/images/gallery/<folder>-<name>.webp` and `<folder>-mobile-<name>.webp`.
3. Add the screen to a feature in that project's `showcase` list in `src/data/site.js` (or add a new feature):
   ```js
   showcase: [
     {
       feature: "Products",
       screens: [
         {
           title: "Product catalogue",
           text: "One sentence on what this screen shows or how it works.",
           desktop: "images/gallery/makewell-catalogue.webp",
           mobile: "images/gallery/makewell-mobile-catalogue.webp",
           url: "https://<live site>/products", // the page the Live demo opens for this screen
         },
       ],
     },
   ],
   ```
4. Run `npm run archive` too if you want `projects.json` to list the new files.

Two to five screens per feature reads best; split a bigger feature in two. Makewell has none yet: its old GitHub Pages address is gone, so capture the screens from the live domain and the block appears on its own.

## Photos

The originals of my photos are in `content/images/photos/`. `npm run images` crops them to 4:5 and writes `public/images/portrait-*.webp`; the list the site shows (home hero and About page) is `photos` in `src/data/site.js`. The header avatar is cut from `portrait-outdoor.webp`.

## The unlisted archive page

`/archive/` (for example `https://vyom1912.github.io/Portfolio-Vyom/archive/`) lists every project in `projects.json`, with search and category filters. It isn't linked anywhere on the site, it's left out of the sitemap and it's marked noindex, so search engines skip it. It is **not password protected**: anyone who has the link can open it.

## Showing another project on the site

1. Find it in `projects.json`.
2. Add an entry to `projects` in `src/data/site.js` (title, summary, body, features, stack, links).
3. Add its screenshot to `scripts/optimize-images.js` and run `npm run images`.
4. Run `npm run build` and check the new page under `/work/<slug>/`.

## Rebuilding this archive

`npm run archive` copies everything again from `01/`, `03/` and `project/` (those folders must sit next to `04/`).
