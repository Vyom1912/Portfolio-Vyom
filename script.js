// {
//   "hosting": {
//     "site": "vyom1912",

//     "public": "public",
//     ...
//   }
// }
// loder
var myVar;

function loader() {
  myVar = setTimeout(showPage, 2500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loader-box").style.height = "0px";
  document.getElementById("myDiv").style.display = "block";

  // Initialize AOS and trigger animation immediately
  AOS.init({ once: true, duration: 800 });
  AOS.refresh();
  myDiv
    .querySelectorAll("[data-aos]")
    .forEach((el) => el.classList.add("aos-animate"));
}
// Call loader when page finishes loading
window.addEventListener("load", loader);
// --------------------------------------------------
// Typing effect

const lines = ["Front end Designer", "Front end Developer"];

const typingText = document.getElementById("typed");
let lineIndex = 0; // Tracks the current line
let charIndex = 0; // Tracks the current character in the line
const typingSpeed = 100; // Speed of typing each character (in ms)
const linePause = 1000; // Pause between lines (in ms)

function typeLine() {
  if (charIndex < lines[lineIndex].length) {
    // Add the next character to the text
    typingText.textContent += lines[lineIndex][charIndex];
    charIndex++;
    setTimeout(typeLine, typingSpeed);
  } else {
    // Pause before starting the next line
    setTimeout(() => {
      charIndex = 0; // Reset character index
      lineIndex++; // Move to the next line
      if (lineIndex < lines.length) {
        typingText.textContent = ""; // Clear the current line
        typeLine(); // Start typing the next line
      } else {
        // Reset after all lines are typed
        lineIndex = 0; // Reset to the first line
        typingText.textContent = ""; // Clear text
        setTimeout(typeLine, linePause); // Restart the animation
      }
    }, linePause);
  }
}
// Start the typing animation
typeLine();
// ------------------------------------------------------------
// navbar
const burger = document.getElementById("burger");
const burgerIcon = document.getElementById("burger-icon");
const navList = document.getElementById("navlist");
const brandImg = document.getElementById("brand-img");
const brandTxt = document.getElementById("brand-txt");
const header = document.getElementById("header");

// if (!burger || !navList || !burgerIcon) {
//   console.error("Burger/navList/brand elements not found in the DOM.");
//   return;
// }

// Toggle menu and icon
burger.addEventListener("click", () => {
  navList.classList.toggle("v-class-resp");
  burgerIcon.classList.toggle("fa-bars");
  burgerIcon.classList.toggle("fa-xmark");
});

// Close menu if clicked outside
document.addEventListener("click", (e) => {
  const isClickInsideNav = navList.contains(e.target);
  const isClickOnBurger = burger.contains(e.target);

  if (
    !isClickInsideNav &&
    !isClickOnBurger &&
    navList.classList.contains("v-class-resp")
  ) {
    navList.classList.remove("v-class-resp");
    burgerIcon.classList.remove("fa-xmark");
    burgerIcon.classList.add("fa-bars");
  }
});

// Close nav on resize
window.addEventListener("resize", () => {
  navList.classList.remove("v-class-resp");
  burgerIcon.classList.remove("fa-xmark");
  burgerIcon.classList.add("fa-bars");
});

// Brand logo/text on scroll
window.addEventListener("scroll", () => {
  const isTop = header.getBoundingClientRect().top <= 0;
  brandImg.style.display = isTop ? "none" : "block";
  brandTxt.style.opacity = isTop ? 1 : 0;
});

// ✅ Close nav when a link is clicked
const navLinks = document.querySelectorAll("#navlist a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("v-class-resp");
    burgerIcon.classList.remove("fa-xmark");
    burgerIcon.classList.add("fa-bars");
  });
});
// ------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  typeLine();
  renderDetailedProjects();
});

// --------------------------------------------------
// scroll top start
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 500px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 200
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// ---------------------------------------------------
// active navlist underline
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var currentScroll = window.pageYOffset;

    // Get all nav links
    var navLinks = document.querySelectorAll(".navlist a");

    // Loop through each nav link
    navLinks.forEach(function (link) {
      var sectionId = link.getAttribute("href").substring(1);
      var section = document.getElementById(sectionId);

      if (section) {
        // Calculate the section's middle position relative to the window
        var sectionMiddle = section.offsetTop + section.offsetHeight / 2;

        if (
          sectionMiddle >= currentScroll &&
          section.offsetTop <= currentScroll + window.innerHeight / 2
        ) {
          // Remove the active class from all nav links
          navLinks.forEach(function (navLink) {
            navLink.classList.remove("active");
          });

          // Add the active class to the corresponding nav link
          link.classList.add("active");
        }
      }
    });
  });
});

// ---------------- Dynamic Skills / Tools and Name ----------------

const categorizedSkills = {
  Frontend: [
    {
      name: "HTML",
      url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
    },
    {
      name: "CSS",
      url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
    },
    {
      name: "JavaScript",
      url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    },
    {
      name: "Bootstrap",
      url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg",
    },
    {
      name: "TailwindCSS",
      url: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    },
    {
      name: "React JS",
      url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
    },
  ],
  "Backend as a Service": [
    {
      name: "Firebase",
      url: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
    },
    {
      name: "Appwrite",
      url: "https://www.vectorlogo.zone/logos/appwriteio/appwriteio-icon.svg",
    },
    {
      name: "Java",
      url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
    },
  ],
  "Version Control / Dev Tools": [
    {
      name: "Git",
      url: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    },
    {
      name: "GitHub",
      url: "https://www.vectorlogo.zone/logos/github/github-icon.svg",
    },
    {
      name: "VSCode",
      url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
    },
  ],
  "Design / UI Tools": [
    {
      name: "Figma",
      url: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
    },
    {
      name: "Canva",
      // url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Canva_Logo.png",
      url: "https://freelogopng.com/images/all_img/1656733637logo-canva-png.png",
    },
  ],
};

const skillsContainer = document.getElementById("skills");

for (const category in categorizedSkills) {
  const catDiv = document.createElement("div");
  catDiv.className = "skill-category";
  catDiv.style.marginBottom = "20px";
  catDiv.setAttribute("data-aos", "fade-right");
  catDiv.setAttribute("data-aos-duration", "500");

  const heading = document.createElement("h3");
  heading.textContent = category;
  heading.style.marginBottom = "10px";

  catDiv.appendChild(heading);

  const itemsDiv = document.createElement("div");
  itemsDiv.style.display = "flex";
  itemsDiv.style.flexWrap = "wrap";
  itemsDiv.style.gap = "10px";

  categorizedSkills[category].forEach((skill) => {
    const item = document.createElement("div");
    item.className = "i-item flex";

    const img = document.createElement("img");
    img.src = skill.url;
    img.alt = skill.name;
    img.width = 25;
    img.height = 25;
    img.style.marginRight = "8px";

    const text = document.createTextNode(skill.name);

    item.appendChild(img);
    item.appendChild(text);
    itemsDiv.appendChild(item);
  });

  catDiv.appendChild(itemsDiv);
  skillsContainer.appendChild(catDiv);
}

// ---------------- Dynamic Projects ----------------
function renderDetailedProjects() {
  const projects = [
    {
      title: "Rakhi Store",
      image: "image/RakhiStore.png",
      tools: ["ReactJs", "CSS", "Javascript", "Figma"],
      description:
        " A multi-page Rakhi-selling website created using React.js, with a responsive layout and a festive UI. Includes category-wise product pages, cart functionality, and smooth routing using React Router. Designed to deliver a seamless user experience across devices.",
      github: "https://github.com/Vyom1912/A-Rakhi-Store.git",
      live: "https://rakhistore.themaroons.in/",
    },
    {
      title: "FoodZing",
      image: "image/FoodZing.png",
      tools: ["ReactJs", "CSS", "Javascript", "Firebase", "Figma"],
      description:
        " A responsive food ordering web app built with React.js, designed to browse and order food from various categories. Includes features like user authentication (Firebase), real-time database, and cart functionality. Focused on delivering a fast and intuitive user experience across all devices.",
      github:
        "https://github.com/Vyom1912/FoodZing-A-Food-Ordering-Website.git",
      live: "https://vyom1912.github.io/FoodZing-A-Food-Ordering-Website/",
    },
    {
      title: "Music Player",
      image: "image/Musicplayer.png",
      tools: ["HTML", "CSS", "Javascript"],
      description:
        "A fully functional, responsive music player built with HTML, CSS, and JavaScript. Includes features like play/pause, next/previous, search, shuffle, loop, volume control, favorites, and download options — all styled with a custom UI similar to Spotify.",
      github: "https://github.com/Vyom1912/Music-Player.git",
      live: "https://vyom1912.github.io/Music-Player/",
    },
    {
      title: "The Maroons: A Landing Page",
      image: "image/TheMaroons.png",
      tools: ["HTML", "CSS", "Javascript"],
      description:
        'A modern, responsive landing page designed for "The Maroons" startup. Built using HTML, CSS, and JavaScript, it includes smooth scroll animations, structured sections like services, about, and contact — ideal for showcasing company branding and engaging visitors.',
      github: "https://github.com/Vyom1912/TheMaroons.git",
      live: "https://vyom1912.github.io/TheMaroons/",
    },
    {
      title: "Notes Maker",
      image: "image/Notes.png",
      tools: ["HTML", "CSS", "Javascript"],
      description:
        "A simple and responsive note-taking web app developed using HTML, CSS, and JavaScript. Users can create, save, and delete notes directly in the browser using localStorage, with a clean UI for easy organization and productivity.",
      github: "https://github.com/Vyom1912/Notes-Maker.git",
      live: "https://vyom1912.github.io/Notes-Maker/",
    },
    {
      title: "Code Editor",
      image: "image/CodeEditor.png",
      tools: ["HTML", "CSS", "Javascript"],
      description:
        "A lightweight CodePen-style playground built with HTML, CSS, and JavaScript. Allows users to write and preview HTML, CSS, and JS code live in the browser. Designed for experimenting, learning, and rapid prototyping with real-time output.",
      github: "https://github.com/Vyom1912/Code-Editor.git",
      live: "https://vyom1912.github.io/Code-Editor/",
    },
    // {
    //   title: "Tic Tac Toe",
    //   image: "image/TicTocToe.png",
    //   tools: ["HTML", "CSS", "Javascript"],
    //   description:
    //     "A classic Tic Tac Toe game implemented using HTML, CSS, and JavaScript, featuring a responsive layout and turn-based logic for two players. Includes win detection and game reset functionality — perfect for showcasing logic implementation and UI skills.",
    //   github: "https://github.com/Vyom1912/TIC-TAC-TOE-GAME.git",
    //   live: "https://vyom1912.github.io/TIC-TAC-TOE-GAME/",
    // },
  ];

  const container = document.getElementById("project");
  if (!container) return;

  projects.forEach((proj) => {
    const div = document.createElement("div");
    div.className = "p-item flex flex-c";
    div.setAttribute("data-aos", "fade-right");
    div.setAttribute("data-aos-duration", "500");

    div.innerHTML = `
            <div class="p-img flex">
              <img src="${proj.image}" alt="${proj.title}" />
            </div>
            <div class="p-info flex flex-c">
              <h3>${proj.title}</h3>
              <div class="p-tool-list flex">
                ${proj.tools
                  .map((tool) => `<div class="p-tool">${tool}</div>`)
                  .join("")}
              </div>
              <p>${proj.description}</p>
              <div class="p-links flex">
                <a href="${
                  proj.github
                }" target="_blank"> Github <i class="fa-brands fa-github"></i></a>
                <a class="flex" href="${
                  proj.live
                }" target="_blank">Live <i class="fa-solid fa-link"></i></a>
              </div>
            </div>
          `;

    container.appendChild(div);

    // Animate when added
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(div);
  });
}
