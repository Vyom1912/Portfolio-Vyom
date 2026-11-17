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

1. Add the screen to `showcase` first (step 3), then run `npm run capture -- <folder>` to take both screenshots from the live site. Or save two PNGs by hand in `content/images/captured/<folder>/`:
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

Two to five screens per feature reads best; split a bigger feature in two.

## Photos

The originals of my photos are in `content/images/photos/`. `npm run images` crops them to 4:5 and writes `public/images/portrait-*.webp`; the list the site shows (home hero and About page) is `photos` in `src/data/site.js`. The header avatar is cut from `portrait-outdoor.webp`.

## The unlisted archive page

`/archive/` (for example `https://vyom1912.github.io/Portfolio-Vyom/archive/`) lists every project in `projects.json`, with search and category filters. It isn't linked anywhere on the site, it's left out of the sitemap and it's marked noindex, so search engines skip it. It is **not password protected**: anyone who has the link can open it.

## Showing another project on the site

1. Find it in `projects.json`.
2. Add an entry to `projects` in `src/data/site.js` (title, summary, body, features, stack, links).
3. Add its screenshot to `scripts/optimize-images.js` and run `npm run images`.
4. Run `npm run build` and check the new page under `/work/<slug>/`.

## Monthly update

The site has details that go stale: client sites change, and the internship keeps adding work. Once a month:

1. **Client sites changed?** Look at each live site (Makewell: makewellagriequipments.com). If pages were added, renamed or removed, update that project's `showcase` in `src/data/site.js` (titles, one-line texts, `url`s), then retake every screenshot:
   ```
   npm run capture -- makewell
   npm run images
   ```
   `npm run capture` reads the screens and URLs from `showcase`, so a new screen only needs its entry there. Check the PNGs in `content/images/captured/<folder>/` before building (no pop-ups, nothing half-loaded). If a site adds a new pop-up, add a line for it to `beforeLoad` in `scripts/capture.js`.
2. **Same project, new features?** Update its `summary`, `body`, `features` and `stack` in `src/data/site.js`, and the matching entry in `content/projects.json` and `scripts/build-archive.cjs` (they feed the archive page and the resume bullets). Numbers like "121 models" appear in the summary, body, features and screen texts.
3. **Internship.** Update `experience[0]` in `src/data/site.js` (summary, points, stack). Keep client and project names out (company policy): describe work by industry and by stack only. If the job title or dates change, also check the hero "Now" line (`src/components/Hero.jsx`), the first paragraph of `src/pages/About.jsx` and the `/about` description in `pages` (`src/data/site.js`).
4. **New tools learned?** Add them to `skills` in `src/data/site.js` and, if worth it, to `knowsAbout` in `scripts/prerender.js`. Tools without a logo in `src/components/TechIcon.jsx` show a plain box; add the Simple Icons logo there.
5. **Proof (optional, real data only).** Each project in `src/data/site.js` can take `results` (measured scores with their source and date, e.g. from pagespeed.web.dev) and `quote` (a client's own words, with their permission); `person` can take `availability` and `codingProfiles`. Empty ones stay hidden. Re-measure `results` each month and update the date, or remove them; never keep old numbers under a new date.
6. **Resume.** Update the PDF (`public/files/Vyom-Patel-Resume.pdf`) so it matches the site.
7. `npm run build`, check `/`, `/about/` and the changed `/work/<slug>/` pages with `npm run preview`, then `npm run deploy`.

## Rebuilding this archive

`npm run archive` copies everything again from `01/`, `03/` and `project/` (those folders must sit next to `04/`).

## Search engines (Google, Bing)

The build already gives every page a title, description, canonical link, social preview tags and structured data (Person, ProfilePage, WebSite, projects, breadcrumbs), plus `sitemap.xml` with images. What only I can do:

1. **Google Search Console** (search.google.com/search-console): add a *URL prefix* property for `https://vyom1912.github.io/Portfolio-Vyom/`, choose the *HTML tag* method, and paste only the `content` value into `verification.google` in `src/data/site.js`. Deploy, then click Verify.
2. In Search Console, submit the sitemap `https://vyom1912.github.io/Portfolio-Vyom/sitemap.xml`, then use *URL inspection* on the home page and *Request indexing*.
3. Bing Webmaster Tools works the same way (`verification.bing`), and can import the site from Search Console.
4. Link the site from my profiles: GitHub (profile *Website* field and the profile README), LinkedIn (*Contact info → Website* and a *Featured* link) and the Instagram bio. These links are what connect searches for my name and for "Vyom1912" to this site.

`robots.txt` in this build sits under `/Portfolio-Vyom/`, where search engines don't read it (they only read one at the domain root). That's harmless, because the sitemap is submitted directly in step 2.
