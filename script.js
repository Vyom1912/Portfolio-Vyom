// loder
var myVar;

function loder() {
  myVar = setTimeout(showPage, 2500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

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
burger = document.querySelector(".burger");
navbar = document.querySelector(".navbar");
nav_List = document.querySelector(".navlist");

burger.addEventListener("click", () => {
  nav_List.classList.toggle("v-class-resp");
  navbar.classList.toggle("h-nav-resp");
});

const scrollSection = document.getElementById("header");
const brandImg = document.getElementById("brand-img");
const brandTxt = document.getElementById("brand-txt");
const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  var rect = header.getBoundingClientRect();
  var isAtTop = rect.top <= 0;
  if (isAtTop) {
    brandImg.style.display = "none";
    brandTxt.style.opacity = 1;
  } else {
    brandImg.style.display = "block";
    brandTxt.style.opacity = 0;
  }
});
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
// -----------------------------------------------------
// Timeline animation on scroll
const timelineItems = document.querySelectorAll(".info-content, .p-item ");

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

timelineItems.forEach((item) => observer.observe(item));
// ------------------------------------------------
// revel
// animation on scroll
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      // reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
// -----------------------------------------------------------------------
// project filter
// gallery item filter
const filterButtons = document.querySelectorAll("#filter-btns li");
const pItems = document.querySelectorAll(".project .p-item");

function showAllItems() {
  pItems.forEach((item) => {
    item.classList.add("show");
  });
}

// Show all items by default
showAllItems();
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // add active class to the clicked button
    this.classList.add("active");

    const target = this.getAttribute("data-target");

    pItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-id");

      // Show or hide based on filter selection
      if (target === "all" || target === itemCategory) {
        item.classList.add("show");
        // item.style.display = "block";
      } else {
        item.classList.remove("show");
        // item.style.display = "none";
      }
    });
  });
});
