/* ============================================================
   DATA
============================================================ */
const skills = [
  {
    icon: "⚛️",
    title: "Frontend Development",
    tags: [
      {
        name: "React.js",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
      },
      {
        name: "JavaScript",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      },
      {
        name: "Tailwind CSS",
        img: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
      },
      {
        name: "HTML5",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
      },
      {
        name: "CSS3",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
      },
      {
        name: "Bootstrap",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original-wordmark.svg",
      },
    ],
  },
  {
    icon: "🖥️",
    title: "Backend Development",
    tags: [
      {
        name: "Node.js",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
      },
      {
        name: "Express.js",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg",
      },
    ],
  },
  {
    icon: "☁️",
    title: "Backend as a Service",
    tags: [
      {
        name: "Firebase",
        // img: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
      },
      {
        name: "Appwrite",
        img: "https://www.vectorlogo.zone/logos/appwriteio/appwriteio-icon.svg",
      },
    ],
  },
  {
    icon: "🗄️",
    title: "Databases & ORM",
    tags: [
      {
        name: "MongoDB",
        // img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
        img: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
      },
      {
        name: "MySQL",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
        // img: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg",
      },
      {
        name: "Prisma",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg",
      },
      {
        name: "Drizzle",
        img: "https://avatars.githubusercontent.com/u/108468352?s=200&v=4",
      },
    ],
  },
  {
    icon: "🛠️",
    title: "Dev Tools & Version Control",
    tags: [
      {
        name: "Git",
        img: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
      },
      {
        name: "GitHub",
        img: "https://www.vectorlogo.zone/logos/github/github-icon.svg",
      },
      {
        name: "VS Code",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
      },
    ],
  },
  {
    icon: "🎨",
    title: "UI / Design Tools",
    tags: [
      {
        name: "Figma",
        img: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
      },
      {
        name: "Canva",
        img: "https://freelogopng.com/images/all_img/1656733637logo-canva-png.png",
      },
    ],
  },
];

const projects = [
  {
    title: "URL Shortener",
    type: "fullstack",
    label: "Full Stack",
    img: "image/UrlShortener.png",
    tools: ["Node.js", "Express.js", "MongoDB", "EJS", "Zod", "JWT", "Argon2"],
    desc: "Full-stack URL shortener with custom shortcodes, JWT authentication, email-based verification & password reset using Nodemailer/MJML, and a complete link management dashboard.",
    github: "https://github.com/Vyom1912/urlShortener.git",
    live: "https://urlshortener-1osn.onrender.com/",
  },
  {
    title: "FoodZing",
    type: "fullstack",
    label: "Full Stack",
    img: "image/FoodZing.png",
    tools: ["React.js", "Firebase", "CSS", "Figma"],
    desc: "Responsive food ordering web app with Firebase authentication, real-time Firestore database, cart management, and a clean category-based menu UI across all devices.",
    github: "https://github.com/Vyom1912/FoodZing-A-Food-Ordering-Website.git",
    live: "https://vyom1912.github.io/FoodZing-A-Food-Ordering-Website/",
  },
  {
    title: "Rakhi Store",
    type: "frontend",
    label: "Frontend",
    img: "image/RakhiStore.png",
    tools: ["React.js", "CSS", "React Router", "Figma"],
    desc: "Freelance e-commerce website for handmade rakhis with multi-page routing, cart functionality, SEO-friendly meta tags, and live deployment on a custom domain via Hostinger.",
    github: "https://github.com/Vyom1912/A-Rakhi-Store.git",
    live: "https://vyom1912.github.io/A-Rakhi-Store/",
  },
  {
    title: "Music Player",
    type: "frontend",
    label: "Frontend",
    img: "image/Musicplayer.png",
    tools: ["HTML", "CSS", "JavaScript"],
    desc: "Spotify-inspired custom music player with play/pause, shuffle, repeat, volume control, favorites list, and MP3 download — fully responsive with a custom-built UI.",
    github: "https://github.com/Vyom1912/Music-Player.git",
    live: "https://vyom1912.github.io/Music-Player/",
  },
  {
    title: "The Maroons — Landing Page",
    type: "frontend",
    label: "Frontend",
    img: "image/TheMaroons.png",
    tools: ["HTML", "CSS", "JavaScript"],
    desc: 'Modern, animated startup landing page for "The Maroons" with smooth scroll animations, service/contact sections, and immersive Diwali-themed particle background.',
    github: "https://github.com/Vyom1912/TheMaroons.git",
    live: "https://vyom1912.github.io/TheMaroons/",
  },
  {
    title: "Notes Maker (PatelKeeps)",
    type: "frontend",
    label: "Frontend",
    img: "image/Notes.png",
    tools: ["HTML", "CSS", "JavaScript", "localStorage"],
    desc: "Google Keep-inspired note-taking web app with create, edit, and delete functionality. Notes persist via localStorage with a clean, minimal UI for productive organization.",
    github: "https://github.com/Vyom1912/Notes-Maker.git",
    live: "https://vyom1912.github.io/Notes-Maker/",
  },
];

/* ============================================================
   LOADER
============================================================ */
const loaderName = document.getElementById("loader-name");
const nameLetters = "VYOM PATEL".split("");
nameLetters.forEach((l, i) => {
  const span = document.createElement("span");
  span.textContent = l === " " ? "\u00A0" : l;
  span.style.animationDelay = `${i * 80}ms`;
  loaderName.appendChild(span);
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader-overlay").classList.add("hidden");
    AOS.init({ once: true, duration: 700, offset: 60 });
  }, 2000);
});

/* ============================================================
   THEME TOGGLE
============================================================ */
const html = document.documentElement;
let isDark = localStorage.getItem("theme") !== "light";
html.setAttribute("data-theme", isDark ? "dark" : "light");

function toggleTheme() {
  isDark = !isDark;
  html.setAttribute("data-theme", isDark ? "dark" : "light");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document
    .querySelectorAll(".toggle-thumb")
    .forEach((t) => (t.textContent = isDark ? "☾" : "☀"));
}
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
document
  .getElementById("theme-toggle-mobile")
  .addEventListener("click", toggleTheme);

// Sync thumb icons on load
document
  .querySelectorAll(".toggle-thumb")
  .forEach((t) => (t.textContent = isDark ? "☾" : "☀"));

/* ============================================================
   NAVBAR — mobile burger
============================================================ */
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");
const navbar = document.getElementById("navbar");

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  mobileNav.classList.toggle("open");
});

// Close when a nav link is clicked
// mobileNav.querySelectorAll("a").forEach((a) => {
//   a.addEventListener("click", () => {
//     burger.classList.remove("open");
//     mobileNav.classList.remove("open");
//   });
// });

mobileNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(a.getAttribute("href"));

    burger.classList.remove("open");
    mobileNav.classList.remove("open");

    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300); // wait for menu close animation
  });
});

// Close when clicking outside the navbar
document.addEventListener("click", (e) => {
  if (mobileNav.classList.contains("open") && !navbar.contains(e.target)) {
    burger.classList.remove("open");
    mobileNav.classList.remove("open");
  }
});

// Close on resize back to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    burger.classList.remove("open");
    mobileNav.classList.remove("open");
  }
});

/* ============================================================
   ACTIVE NAV ON SCROLL + PROGRESS BAR
============================================================ */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
const progressBar = document.getElementById("progress-bar");
const scrollTopBtn = document.getElementById("scrollTop");
const brandImg = document.getElementById("brand-img");
const brandTxt = document.getElementById("brand-txt");

// Detect when navbar is stuck (hero has scrolled out of view)
const heroSection = document.getElementById("hero");
const stickyObserver = new IntersectionObserver(
  ([entry]) => {
    // When hero is NOT intersecting, navbar is stuck at top
    const isStuck = !entry.isIntersecting;
    navbar.classList.toggle("scrolled", isStuck);
    if (brandImg) brandImg.style.display = isStuck ? "none" : "block";
    if (brandTxt) brandTxt.style.opacity = isStuck ? "1" : "0";
  },
  { threshold: 0, rootMargin: "0px 0px 0px 0px" },
);
stickyObserver.observe(heroSection);

window.addEventListener("scroll", () => {
  // Progress bar
  const scrolled =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrolled + "%";

  // Scroll top button
  scrollTopBtn.classList.toggle("visible", window.scrollY > 500);

  // Active nav
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id");
  });
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
  mobileNavLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

scrollTopBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* ============================================================
   STICKY BAR (after hero) — guard against missing elements
============================================================ */
const stickyBar = document.getElementById("stickybar");
const sbImg = document.getElementById("sb-img");
const sbTxt = document.getElementById("sb-txt");
const sbBurger = document.getElementById("sbBurger");
const sbMobileNav = document.getElementById("sbMobileNav");
const sbLinks = document.querySelectorAll(".sb-links a");
const sbThemeBtn = document.getElementById("sb-theme-toggle");
const sbThumb = document.querySelector(".sb-toggle-thumb");

// Sync theme thumb on load
if (sbThumb) sbThumb.textContent = isDark ? "☾" : "☀";
if (sbThemeBtn)
  sbThemeBtn.addEventListener("click", () => {
    toggleTheme();
    if (sbThumb) sbThumb.textContent = isDark ? "☾" : "☀";
  });

// Stuck detection — when hero leaves viewport, bar is stuck
if (stickyBar) {
  const sbObserver = new IntersectionObserver(
    ([entry]) => {
      const stuck = !entry.isIntersecting;
      stickyBar.classList.toggle("sb-stuck", stuck);
      if (sbImg) sbImg.style.display = stuck ? "none" : "block";
      if (sbTxt) sbTxt.style.opacity = stuck ? "1" : "0";
    },
    { threshold: 0 },
  );
  sbObserver.observe(heroSection);
}

// Active link highlight (reuse scroll listener)
if (sbLinks.length) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id");
    });
    sbLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });
}

// Burger toggle
if (sbBurger && sbMobileNav) {
  sbBurger.addEventListener("click", () => {
    sbBurger.classList.toggle("open");
    sbMobileNav.classList.toggle("open");
  });

  // Close on link click
  sbMobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      sbBurger.classList.remove("open");
      sbMobileNav.classList.remove("open");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (
      sbMobileNav.classList.contains("open") &&
      !stickyBar.contains(e.target)
    ) {
      sbBurger.classList.remove("open");
      sbMobileNav.classList.remove("open");
    }
  });

  // Close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sbBurger.classList.remove("open");
      sbMobileNav.classList.remove("open");
    }
  });
}

/* ============================================================
   TYPING EFFECT
============================================================ */
const lines = [
  "Full Stack Developer",
  "React.js Enthusiast",
  "UI/UX Designer",
  "Problem Solver",
];
let li = 0,
  ci = 0,
  deleting = false;
const typedEl = document.getElementById("typed-text");

function tick() {
  const line = lines[li];
  const cursor = '<span class="cursor"></span>';
  if (!deleting) {
    ci++;
    typedEl.innerHTML = line.slice(0, ci) + cursor;
    if (ci === line.length) {
      deleting = true;
      setTimeout(tick, 1800);
      return;
    }
  } else {
    ci--;
    typedEl.innerHTML = line.slice(0, ci) + cursor;
    if (ci === 0) {
      deleting = false;
      li = (li + 1) % lines.length;
    }
  }
  setTimeout(tick, deleting ? 50 : 90);
}
tick();

/* ============================================================
   RENDER SKILLS
============================================================ */
const grid = document.getElementById("skillsGrid");
skills.forEach((cat, i) => {
  const card = document.createElement("div");
  card.className = "skill-card";
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-delay", String(i * 80));

  card.innerHTML = `
    <div class="skill-card-header">
      <div class="skill-card-icon">${cat.icon}</div>
      <div class="skill-card-title">${cat.title}</div>
    </div>
    <div class="skill-tags">
      ${cat.tags
        .map(
          (t) => `
        <div class="skill-tag">
          <img src="${t.img}" alt="${t.name}" />
          ${t.name}
        </div>
      `,
        )
        .join("")}
    </div>
  `;
  grid.appendChild(card);
});

/* ============================================================
   RENDER PROJECTS
============================================================ */
const pgrid = document.getElementById("projectsGrid");

function renderProjects(filter) {
  pgrid.innerHTML = "";
  projects
    .filter((p) => filter === "all" || p.type === filter)
    .forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", String(i * 80));

      card.innerHTML = `
      <div class="project-thumb">
        <img src="${p.img}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'" />
        <div class="project-thumb-overlay"></div>
        <div class="project-badge badge-${p.type}">${p.label}</div>
      </div>
      <div class="project-body">
        <div class="project-title">${p.title}</div>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tools">
          ${p.tools.map((t) => `<span class="tool-chip">${t}</span>`).join("")}
        </div>
        <div class="project-links">
          <a href="${p.github}" target="_blank" rel="noopener" class="project-link">
            <i class="fa-brands fa-github"></i> Code
          </a>
          <a href="${p.live}" target="_blank" rel="noopener" class="project-link primary">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>
        </div>
      </div>
    `;
      pgrid.appendChild(card);
    });
  AOS.refresh();
}

renderProjects("all");

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

/* ============================================================
   CONTACT FORM
============================================================ */
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("form-msg");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending… <i class="fa-solid fa-spinner fa-spin"></i>';

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    });
    const data = await res.json();
    if (data.success) {
      formMsg.textContent = "✓ Message sent! I'll get back to you soon.";
      formMsg.className = "success";
      form.reset();
    } else throw new Error();
  } catch {
    formMsg.textContent = "✕ Something went wrong. Please try again.";
    formMsg.className = "error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML =
      'Send Message <i class="fa-solid fa-paper-plane"></i>';
  }
});
