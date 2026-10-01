# Vyom Patel — Project Details for Portfolio & Resume

Everything below comes from the actual code in this folder. Copy the **Portfolio** sections into your project pages and the **Resume** bullets into your CV.

**How this file is organised**

1. [Skills summary](#1-skills-summary): the skills all of these projects show together
2. [Project index](#2-project-index): every project at a glance
3. [Portfolio pages](#3-portfolio-pages): a full write-up for each project, ordered from strongest to simplest
4. [Resume bullets](#4-resume-bullets): short, factual points per project
5. [Before you publish](#5-before-you-publish): things to fix or fill in first

---

## 1. Skills Summary

| Area | Skills shown in these projects |
|---|---|
| **Languages** | HTML5, CSS3, JavaScript (ES6+) |
| **JavaScript** | DOM manipulation, event handling, event delegation, async/await, Fetch API, Promises, array methods (`map`, `filter`, `findIndex`), destructuring, template literals, regular expressions, IIFE / strict mode |
| **Browser APIs** | localStorage, Web Speech API (SpeechRecognition + SpeechSynthesis), HTML Audio API, HTML5 Drag and Drop, FileReader, Blob / Object URLs, Canvas API, `<template>` element, Clipboard, `window.print()` |
| **External APIs** | OpenWeatherMap, Unsplash, icanhazdadjoke, QR Server, Google Apps Script (Google Sheets) |
| **CSS** | Flexbox, CSS Grid, custom properties (variables), transforms, transitions, keyframe animations, media queries, print styles, `prefers-reduced-motion` |
| **UI / UX** | Responsive design, mobile-first layouts, live preview, autosave, empty states, input validation and feedback, accessibility basics (ARIA labels, focus states) |
| **Libraries** | Bootstrap 4, Font Awesome, Google Fonts |

**Resume "Skills" line:**
> HTML5, CSS3 (Flexbox, Grid, Animations), JavaScript (ES6+, DOM, Fetch API, async/await), REST APIs, localStorage, Web Speech API, Responsive Design, Git & GitHub

---

## 2. Project Index

| # | Project | Category | Level | Key tech |
|---|---|---|---|---|
| 13 | Resume Builder (LaTeX-style) | App | ⭐ Advanced | Templates, live compile, autosave, PDF export |
| 22 | Music Player | Browser API | ⭐ Advanced | Audio API, search, shuffle, localStorage |
| 3 | CodeAchieve Agency Website | Website | ⭐ Advanced | Responsive, infinite carousel, Bootstrap |
| 6 | PatelKeeps (Google Keep Clone) | App | Intermediate | CRUD, localStorage, search, animations |
| 16 | To-Do List | App | Intermediate | CRUD, reorder, localStorage |
| 17 | Weather App | API | Intermediate | OpenWeatherMap, async/await |
| 28 | Image Search Engine | API | Intermediate | Unsplash API, pagination |
| 24 | Form Validation | UI Component | Intermediate | Regex, real-time validation |
| 27 | Drag and Drop | Browser API | Intermediate | Drag & Drop API, FileReader |
| 26 | Email Subscription (Google Sheets) | Website / API | Intermediate | Apps Script, FormData |
| 12 | Online Code Editor (CodePen Clone) | App | Intermediate | iframe live preview |
| 20 | QR Code Generator | API | Intermediate | QR Server API, Canvas |
| 25 | Image Slider Gallery | UI Component | Intermediate | Scroll handling |
| 19 | Notes App | App | Intermediate | contenteditable, localStorage |
| 15 | Text to Speech | Browser API | Beginner | SpeechSynthesis |
| 14 | Speech to Text | Browser API | Beginner | SpeechRecognition |
| 5 | Dad Jokes Generator | API | Beginner | Fetch, async/await |
| 7 | Quiz App | Game | Beginner | Dynamic rendering |
| 9 | Tic Tac Toe | Game | Beginner | Game logic |
| 10 | Calculator | App | Beginner | Event handling |
| 11 | Analog Clock | App | Beginner | Date API, CSS transforms |
| 18 | Random Password Generator | App | Beginner | Randomisation, clipboard |
| 8 | Starbucks Landing Page | Website | Beginner | Image slider, dynamic styling |
| 21 | Toast Notification | UI Component | Beginner | Dynamic elements, timers |
| 23 | Popup Message | UI Component | Beginner | CSS transitions |
| 4 | Light On / Off | UI Component | Beginner | DOM events |

**Suggested portfolio line-up:**
- **Featured:** 13, 22, 3, 6
- **Also worth showing:** 17, 28, 24, 16, 27, 12
- **Mini-projects grid:** everything else

---

## 3. Portfolio Pages

Each page follows the same layout: **Tagline → Overview → Features → Tech stack → How it works → Challenges & learnings**. Add a screenshot or GIF, a **Live Demo** link and a **GitHub** link to each page.

---

### 📄 Resume Builder: A LaTeX-Style Résumé Editor

**Tagline:** *A document you write, not a form you fill.*

**Category:** Web App · **Level:** Advanced

**Overview**
A résumé builder inspired by LaTeX editors. The left pane looks like source code, with `\name`, `\title` and `% comments`, and the right pane shows the compiled, print-ready résumé updating as you type. When you're done, one click exports it as a PDF. It runs entirely in the browser: no sign-up, no server, and your draft is saved automatically.

**Key features**
- Live preview that re-renders shortly after each keystroke (debounced), with a "compiling… / compiled ✓" status
- Sections for personal details, social links, summary, experience, projects, education, skills and certifications
- Unlimited repeatable entries per section, each added and removed individually
- Optional profile photo upload
- Autosave to localStorage, with the draft restored on reload
- One-click PDF export using dedicated print styles
- "Clear all" with a confirmation prompt
- Empty sections are hidden automatically in the output

**Tech stack**
HTML5 · CSS3 (print media styles) · Vanilla JavaScript · `<template>` · localStorage · FileReader · Google Fonts (EB Garamond, IBM Plex)

**How it works**
- Each repeatable section is described by a small **schema object** (which template it uses and which fields it has). One generic `addEntry()` and `collectEntries()` pair handles every section, with no duplicated code.
- Entry cards are cloned from HTML `<template>` elements.
- A single **debounced compile function** reads every field, builds the preview and saves the draft.
- All user input is **HTML-escaped** before rendering, and URLs are normalised, so typed text can't inject markup.
- The photo is read with **FileReader** as a data URL, so it can be saved with the draft.
- The code sits inside an **IIFE in strict mode**, so nothing leaks into the global scope.

**Challenges & learnings**
- Designing a data-driven structure so that adding a new section means adding a schema entry, not new functions
- Debouncing input to keep the live preview smooth
- Writing print CSS so the browser's "Save as PDF" produces a clean single document
- Handling storage failures gracefully (try/catch around localStorage)

---

### 🎵 Music Player: A Feature-Rich Audio Player

**Tagline:** *A fully featured music player built with vanilla JavaScript.*

**Category:** Web App · **Level:** Advanced

**Overview**
A music player with a 17-track playlist, album art and the controls you'd expect from a streaming app: play/pause, next/previous, seek, volume, shuffle, loop, favourites, download and live search. It remembers the last song you played, and on phones it switches to a list view and a separate player view, like a native app.

**Key features**
- Playlist with cover art and a highlighted "now playing" track
- Play / pause, next and previous controls
- Seekable progress bar with current time and duration
- Volume slider
- Shuffle and loop modes with active-state styling
- Favourite songs with a heart toggle
- Download the current track
- Live search by song title or artist
- Remembers the last played song (localStorage)
- Mobile layout: tapping a song opens the player view, and a back button returns to the list

**Tech stack**
HTML5 `<audio>` · CSS3 · Vanilla JavaScript · HTML Audio API · localStorage · Font Awesome

**How it works**
- Songs are stored as an **array of objects** (title, artist, audio path, image path). The playlist and search results are rendered from that array.
- `loadSong()` handles switching tracks, updating the UI, autoplay and saving to localStorage.
- Audio events (`timeupdate`, `loadedmetadata`, `ended`) drive the progress bar and time display.
- Favourites are tracked in a **Set** for fast lookups.
- Shuffle picks a random index, and next/previous use modular arithmetic to wrap around the playlist.
- A download is triggered by creating a temporary `<a download>` element.

**Challenges & learnings**
- Keeping the play/pause icon in sync with the real audio state
- Building two different mobile and desktop experiences from the same markup
- Managing shared player state (current song, shuffle, loop) cleanly

---

### 💼 CodeAchieve: IT Solutions & Freelancing Agency Website

**Tagline:** *A responsive agency website with an infinite, auto-playing project carousel.*

**Category:** Website · **Level:** Advanced

**Overview**
A multi-section landing page for CodeAchieve, an IT solutions and freelancing agency. It introduces the team, services (development, web design, UI/UX) and portfolio work, and ends with a contact form and a detailed footer. It adapts to every screen size with a hamburger menu on mobile.

**Key features**
- Responsive navbar with a hamburger menu
- Hero, About, Services, Projects, Team and Contact sections
- Infinite carousel: autoplay, arrow buttons and mouse drag-to-scroll, pausing on hover
- Contact form with a captcha check
- Scroll-to-top button
- Multi-column footer with social, service and useful links

**Tech stack**
HTML5 · CSS3 (split into main, services and responsive stylesheets) · Vanilla JavaScript · Bootstrap 4 · Font Awesome

**How it works**
- The carousel **clones cards onto both ends** of the track and silently jumps the scroll position at the edges. This makes the loop look seamless in both directions.
- Autoplay uses `setTimeout`, is cleared on hover and is disabled on small screens.
- Drag-to-scroll tracks the mouse position against the starting scroll offset.
- The code is split into small modules: `navbar.js`, `slider.js` and `scroll-top.js`.

**Challenges & learnings**
- Building a truly infinite carousel without a library
- Organising CSS across several files for maintainability
- Making a long, content-heavy page responsive

---

### 📝 PatelKeeps: A Google Keep–Style Notes App

**Tagline:** *Fast, searchable notes that save themselves.*

**Category:** Web App · **Level:** Intermediate

**Overview**
A note-taking app inspired by Google Keep. Create a note and it opens ready to type. Everything saves as you type, and each card shows when it was last edited. A live search box filters your notes instantly, and smooth animations make adding, editing and deleting feel polished.

**Key features**
- Create, edit and delete notes
- Autosave on every keystroke, with a "last edited" timestamp
- Click a note to edit it; **Esc** or **Ctrl + Enter** to finish
- Text area that grows as you type
- Live search
- Pop-in, hover-lift and delete animations, with support for reduced motion
- Empty-state messages
- Responsive grid layout, one column on phones
- Distinctive animated "Add note" button

**Tech stack**
HTML5 · CSS3 (Grid, keyframe animations, media queries) · Vanilla JavaScript · localStorage · Font Awesome · Google Fonts (Poppins)

**How it works**
- Notes are stored as objects (`id`, `text`, `updated`) in localStorage. Notes saved by an older version as plain strings are converted automatically.
- Each card is built by one factory function that wires up its own edit, save and delete behaviour.
- Note text is rendered with `textContent`, **not `innerHTML`**, so typed HTML can't run.
- Deleting plays an exit animation, and the card is removed on `animationend`.

**Challenges & learnings**
- Migrating saved data between versions without losing users' notes
- Getting the animations right, including exit animations before removing an element
- Fixing an XSS risk in an earlier version

---

### ✅ To-Do List: A Task Manager with Reordering

**Tagline:** *Add, complete, edit and reorder your tasks, all saved in your browser.*

**Category:** Web App · **Level:** Intermediate

**Overview**
A to-do app with complete task management. Add tasks with a button or the Enter key, tick them off, edit them, move them up or down, and delete them. The list is saved to localStorage, so it's still there tomorrow.

**Key features**
- Add tasks with the button or the Enter key, with empty-input validation
- Mark a task complete by clicking its checkbox or text
- Edit a task through a prompt
- Move tasks up or down to reorder them
- Delete tasks
- Saved in localStorage

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · localStorage · Font Awesome

**How it works**
- Tasks are an array of `{ id, text, completed }` objects, and the list is re-rendered from that state after every change.
- **Event delegation**: a single click listener on the list uses `closest()` to work out which button was pressed.
- Updates are immutable: `map` to toggle or edit, `filter` to delete, and array destructuring to swap positions.

**Challenges & learnings**
- Structuring an app around a single source of truth
- Using event delegation instead of adding listeners to every task
- Working with immutable array updates

---

### 🌦️ Weather App: Live Weather by City

**Tagline:** *Current weather for any city, in one search.*

**Category:** API Project · **Level:** Intermediate

**Overview**
Type a city and get its current temperature, humidity and wind speed from the OpenWeatherMap API, with an icon that matches the conditions: clear, clouds, rain, drizzle, mist or snow.

**Key features**
- Search by button or the Enter key
- Temperature in °C, humidity and wind speed
- A weather icon for each condition, with a fallback
- "Invalid city name" error message

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · Fetch API · async/await · OpenWeatherMap REST API · Font Awesome

**How it works**
- `async`/`await` fetch to the OpenWeatherMap API, with metric units.
- A 404 response shows the error state instead of stale data.
- One handler serves both the button click and the Enter key.

**Challenges & learnings**
- Working with a real REST API and reading JSON responses
- Handling error responses in the interface
- Keeping API keys out of public code (see section 5)

---

### 🔍 Image Search Engine: Powered by Unsplash

**Tagline:** *Search millions of free, high-quality photos.*

**Category:** API Project · **Level:** Intermediate

**Overview**
A photo search engine built on the Unsplash API. Search any keyword to get a grid of results, load more with "Show more", and click any photo to open it on Unsplash.

**Key features**
- Keyword search
- 12 results per page
- "Show more" loads the next page
- Clicking a photo opens it on Unsplash in a new tab

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · Fetch API · async/await · Unsplash REST API

**How it works**
- Page state is tracked in a variable. A new search resets it to page 1 and clears the grid, and "Show more" increments it and appends results.
- Result elements are created with `createElement`, not HTML strings.

**Challenges & learnings**
- Implementing API pagination
- Managing search state between requests

---

### 📋 Form Validation: Real-Time Contact Form

**Tagline:** *Instant feedback on every field, before you hit submit.*

**Category:** UI Component · **Level:** Intermediate

**Overview**
A contact form that validates each field as you type. It shows a clear message for what's wrong, or a green check when a field is correct, and it won't submit until every field passes.

**Key features**
- Full name: two or more words; hyphens and apostrophes allowed
- Phone: exactly 10 digits
- Email: format check that accepts real-world domains such as `.co.in`
- Password: 8 or more characters with an uppercase letter, a lowercase letter, a number and a special character; each missing rule gets its own message
- Show / hide password toggle
- Message: live "X more characters required" counter
- Submit blocked, with a temporary error message, until everything is valid

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · Regular Expressions · Font Awesome

**How it works**
- Each field has its own validator that runs on `keyup` and returns true or false.
- On submit, all validators run together, and submission is cancelled if any fail.
- The password rules are checked one at a time, so the user always sees the next thing to fix.

**Challenges & learnings**
- Writing regular expressions that are strict without rejecting valid real-world input
- Designing helpful, specific error messages

---

### 🖱️ Drag and Drop: Lists and File Preview

**Tagline:** *Two native drag-and-drop experiences, with no libraries.*

**Category:** Browser API · **Level:** Intermediate

**Overview**
Two demos of the HTML5 Drag and Drop API. The first lets you drag list items between two boxes. The second is a file drop zone: drop any file to preview it, whether it's an image or text, and download it again.

**Key features**
- Drag list items between two containers
- Drop zone that accepts any file type, with a hover highlight
- Image preview, text preview, and file type shown for other files
- Download link for the first dropped file

**Tech stack**
HTML5 Drag and Drop API · CSS3 · Vanilla JavaScript · FileReader · Blob / Object URLs

**How it works**
- `dragstart`, `dragover` and `drop` events move elements between containers.
- `FileReader.readAsDataURL` is used for images, `readAsText` for text files, and `URL.createObjectURL` for everything else.

**Challenges & learnings**
- Understanding the drag event lifecycle and why `preventDefault` is needed on `dragover`
- Handling different file types safely in the browser

---

### 📧 Email Subscription with Google Sheets

**Tagline:** *A "coming soon" page that collects emails into Google Sheets, with no backend.*

**Category:** Website / API · **Level:** Intermediate

**Overview**
A "coming soon" landing page with an email signup form. Submissions go straight into a Google Sheet through a Google Apps Script web app, so there's no server or database to run.

**Key features**
- Hero section with a subscription form
- Email validation
- Saves to a Google Sheet
- Success message that disappears after a few seconds, and the form resets

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · Fetch API · FormData · Google Apps Script · Google Sheets

**How it works**
- The form is sent with `fetch(POST)` and `new FormData(form)` to a deployed Apps Script endpoint, which appends a row to the sheet.

**Challenges & learnings**
- Using Google Sheets as a lightweight backend
- Submitting forms asynchronously without reloading the page

---

### 💻 Online Code Editor: CodePen-Style Playground

**Tagline:** *Write HTML, CSS and JS, and see it run instantly.*

**Category:** Web App · **Level:** Intermediate

**Overview**
A lightweight version of CodePen. Three editors for HTML, CSS and JavaScript feed a live output pane that updates as you type.

**Key features**
- Separate HTML, CSS and JavaScript editors
- Live output that updates on every keystroke
- Output rendered in an `<iframe>`

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · iframe · Font Awesome

**How it works**
- On every keyup, the HTML and CSS are written into the iframe's document and the JavaScript runs in the iframe's window.

**Challenges & learnings**
- Working with an iframe's document and window
- Keeping user code separate from the host page

---

### 🔳 QR Code Generator

**Tagline:** *Turn any text or link into a QR code.*

**Category:** API Project · **Level:** Intermediate

**Overview**
Enter text, a URL, an email or a phone number and get a QR code instantly from the QR Server API. It uses animated reveal effects and shakes the input when it's empty.

**Key features**
- QR code from any text or URL
- Animated reveal of the QR image
- Error shake animation on empty input
- PNG / JPG download buttons (see section 5: these need fixing)

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · QR Server API · Canvas API · Font Awesome

**Challenges & learnings**
- Generating images from an API URL
- Browser security limits (CORS) when exporting images from another domain through a canvas

---

### 🖼️ Image Slider Gallery

**Tagline:** *A horizontal gallery you can scroll with your mouse wheel.*

**Category:** UI Component · **Level:** Intermediate

**Overview**
An image gallery that turns vertical mouse-wheel movement into horizontal scrolling, with next and previous buttons that wrap around at each end.

**Key features**
- Mouse wheel scrolls horizontally
- Smooth next / previous buttons
- Wrap-around at the start and end

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · Font Awesome

**How it works**
- The `wheel` event's `deltaY` is mapped onto `scrollLeft`, and `scroll-behavior` switches between smooth and instant depending on the input.

---

### 🗒️ Notes App

**Tagline:** *Sticky notes you type straight into.*

**Category:** Web App · **Level:** Intermediate

> Note: this project has been merged into **PatelKeeps**. You can list it as an earlier version or leave it out.

**Overview**
A notes app using `contenteditable` paragraphs. Create a note, type directly into it, and delete it with the trash icon. Notes persist in localStorage.

**Tech stack**
HTML5 · CSS3 (Grid, gradients, responsive) · Vanilla JavaScript · localStorage · Font Awesome

---

### 🔊 Text to Speech Converter

**Tagline:** *Type it, and hear it spoken.*

**Category:** Browser API · **Level:** Beginner

**Overview**
Type any text, choose from every voice installed on your device, and hear it read aloud using the browser's Speech Synthesis API.

**Key features**
- Voice selector filled from the system's voices
- Listen button

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · Web Speech API (SpeechSynthesis)

**How it works**
- The voice list loads asynchronously, so it's filled in on `onvoiceschanged`.

---

### 🎤 Speech to Text

**Tagline:** *Speak, and watch your words appear.*

**Category:** Browser API · **Level:** Beginner

**Overview**
Click the button, speak, and your speech is transcribed on screen using the browser's built-in speech recognition. It shows a "Listening…" status while it records.

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · Web Speech API (SpeechRecognition). Works in Chrome and Edge.

---

### 😂 Dad Jokes Generator

**Tagline:** *A fresh dad joke, one click away.*

**Category:** API Project · **Level:** Beginner

**Overview**
Fetches a random dad joke from the icanhazdadjoke API when the page loads and each time you click. The code includes both a Promise-chain version and an async/await version, as a learning reference.

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · Fetch API · async/await · REST API

---

### ❓ Quiz App

**Tagline:** *Test your general knowledge.*

**Category:** Game · **Level:** Beginner

**Overview**
A multiple-choice quiz that loads questions from a data array, tracks your score and ends with a results screen and a "Play Again" button.

**How it works**
- Questions are stored as data (`question`, `options`, `correct`), so adding a question means adding one object.
- Uses destructuring and `findIndex` to read the selected answer.

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript

---

### ❌⭕ Tic Tac Toe

**Tagline:** *The classic game, for two players.*

**Category:** Game · **Level:** Beginner

**Overview**
Two players take turns on a 3×3 board. The game shows whose turn it is, checks all eight winning lines after every move, announces the winner, and can be reset.

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript

---

### 🧮 Calculator

**Tagline:** *A clean calculator for everyday maths.*

**Category:** Web App · **Level:** Beginner

**Overview**
A calculator with addition, subtraction, multiplication, division and percentage, plus AC (clear), DEL (backspace), `00` and decimal buttons.

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript

---

### 🕒 Analog Clock

**Tagline:** *Real time, drawn with CSS.*

**Category:** Web App · **Level:** Beginner

**Overview**
A live analog clock with colour-coded hour, minute and second hands. The numbers are positioned with CSS custom properties, and the hour hand moves gradually as the minutes pass.

**How it works**
- Converts the current time to rotation angles: 30° per hour plus 0.5° per minute for the hour hand, and 6° per minute or second for the others. The angles are applied with CSS `transform: rotate()`.

**Tech stack**
HTML5 · CSS3 (custom properties, transforms) · Vanilla JavaScript (Date API)

---

### 🔐 Random Password Generator

**Tagline:** *Strong passwords in one click.*

**Category:** Web App · **Level:** Beginner

**Overview**
Generates an 8-character password that always includes at least one uppercase letter, one lowercase letter, one number and one symbol, with a one-click copy button.

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript · Font Awesome

---

### ☕ Starbucks Landing Page

**Tagline:** *A product landing page with a drink showcase.*

**Category:** Website · **Level:** Beginner

**Overview**
A Starbucks-inspired landing page. Clicking a drink thumbnail swaps the featured product and changes the background circle's colour to match.

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript

> This is a practice project and is not affiliated with Starbucks.

---

### 🔔 Toast Notification

**Tagline:** *Reusable success, error and warning toasts.*

**Category:** UI Component · **Level:** Beginner

**Overview**
Three types of toast notification (success, error and invalid), each with its own colour and icon. They slide in, stack when several appear, and dismiss themselves after 5 seconds.

**Tech stack**
HTML5 · CSS3 (animations) · Vanilla JavaScript · Font Awesome

---

### ✅ Popup Message

**Tagline:** *An animated "Thank you" confirmation dialog.*

**Category:** UI Component · **Level:** Beginner

**Overview**
A confirmation popup that animates in when a form is submitted and closes with an OK button.

**Tech stack**
HTML5 · CSS3 (transitions) · Vanilla JavaScript · Font Awesome

---

### 💡 Light On / Off

**Tagline:** *Can you turn the light on?*

**Category:** UI Component · **Level:** Beginner

**Overview**
A playful toggle switch that turns a light bulb on and off, with a glow effect when it's lit.

**Tech stack**
HTML5 · CSS3 · Vanilla JavaScript

---

## 4. Resume Bullets

**How to use these:** pick **3–4 projects** for your resume, normally the featured ones plus one API project. Use 2–3 bullets each. Every point below is based on what the code actually does, so you can explain any of them in an interview.

### Resume Builder — *HTML, CSS, JavaScript*
- Built a LaTeX-style résumé editor with a **live, debounced preview** and **one-click PDF export** using print-specific CSS.
- Designed a **schema-driven architecture** in which one set of generic functions handles every repeatable section: experience, projects, education and certifications.
- Added **autosave and restore** with localStorage, photo upload with FileReader, and **HTML escaping** of all user input to prevent injection.

### Music Player — *HTML, CSS, JavaScript*
- Developed a music player with **play/pause, seek, volume, shuffle, loop, favourites, download and live search** across a 17-track playlist.
- Used **HTML5 Audio API** events to sync the progress bar and time display, and **localStorage** to resume the last played track.
- Built a **responsive two-view mobile layout** (playlist and player) from the same markup.

### CodeAchieve Agency Website — *HTML, CSS, JavaScript, Bootstrap*
- Built a **fully responsive, multi-section agency website** with a hamburger navigation menu, contact form and scroll-to-top button.
- Built an **infinite, auto-playing carousel** from scratch, with drag-to-scroll, arrow controls and pause-on-hover, by cloning edge cards and resetting the scroll position.

### PatelKeeps (Google Keep Clone) — *HTML, CSS, JavaScript*
- Built a Google Keep–style notes app with **create, edit, delete, live search and autosave**, storing notes in localStorage with timestamps.
- Added **keyframe animations** for creating and deleting notes and a **responsive CSS Grid** layout, with reduced-motion support.
- **Fixed an XSS risk** by rendering notes with `textContent`, and wrote a **data migration** so notes saved by the old version still load.

### To-Do List — *HTML, CSS, JavaScript*
- Built a task manager with **add, complete, edit, delete and reorder**, kept in localStorage.
- Used **event delegation** and **immutable array updates** (`map`, `filter`, destructuring swaps) around a single state array.

### Weather App — *JavaScript, REST API*
- Integrated the **OpenWeatherMap REST API** with async/await to show live temperature, humidity and wind speed for any city.
- Handled **invalid-city errors** and mapped weather conditions to matching icons.

### Image Search Engine — *JavaScript, REST API*
- Built an image search engine on the **Unsplash API** with **paginated results** and a "Show more" button.

### Form Validation — *JavaScript, Regex*
- Built a contact form with **real-time validation** of five fields using regular expressions, including **step-by-step password strength rules** and a show/hide toggle.
- Blocked invalid submissions and showed **field-specific error messages**.

### Drag and Drop — *JavaScript, HTML5 APIs*
- Built drag-and-drop list sorting and a **file drop zone** with image and text previews, using the **HTML5 Drag and Drop API, FileReader and Blob URLs**.

### Email Subscription — *JavaScript, Google Apps Script*
- Connected an email signup form to **Google Sheets through Google Apps Script**, submitting asynchronously with Fetch and FormData, with no backend server.

### Online Code Editor — *JavaScript*
- Built a CodePen-style editor that **renders HTML, CSS and JavaScript live** in a separate iframe as you type.

### Speech Projects — *Web Speech API*
- Built **speech-to-text** and **text-to-speech** tools with the browser's Web Speech API, including a selector for every voice available on the device.

### Combined bullet (for small projects)
Use this if you want to mention the mini-projects without listing each one:
- Built **25+ front-end projects in vanilla JavaScript**, including games (Tic Tac Toe, Quiz), utilities (Calculator, Password Generator, Analog Clock, QR Generator) and reusable UI components (toast notifications, popups, image slider).

---

## 5. Before You Publish

- [ ] **Fix the QR Code Generator downloads.** `qrCodeUrl` in `script.js` is undefined, so the PNG/JPG buttons don't work. Fix it, or remove the download claim from its page.
- [ ] **Hide the API keys** in the Weather App (`17`) and Image Search Engine (`28`) before pushing to a public repo.
- [ ] **Phone error message** in Form Validation: a 10-character value with letters shows "Phone No. is required" instead of saying only digits are allowed.
- [ ] **Add screenshots or GIFs** to every portfolio page. They're the first thing visitors look at.
- [ ] **Add links** for each project: Live Demo (GitHub Pages) and Source Code (GitHub).
- [ ] **CodeAchieve team section:** the site lists Bhavy Patel and Vyom Patel. If it was a team project, say so and describe your part.
- [ ] **Music Player:** the songs are copyrighted, so mention that they're for demo use only, or replace them with royalty-free tracks before hosting publicly.
