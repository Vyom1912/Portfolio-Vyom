export const SITE_URL = "https://vyom1912.github.io/Portfolio-Vyom";

export const person = {
  name: "Vyom Patel",
  role: "Full stack developer",
  email: "vyom1912@gmail.com",
  location: "Himatnagar, Gujarat, India",
  github: "https://github.com/Vyom1912",
  linkedin: "https://www.linkedin.com/in/vyom1912/",
  instagram: "https://www.instagram.com/vyom_1912/",
  resume: "files/Vyom-Patel-Resume.pdf",
};

// Photos of me, shown in the home hero and on the About page (all 4:5).
export const photos = [
  { src: "images/portrait-outdoor.webp", alt: "Vyom Patel outdoors, arms crossed", width: 1000, height: 1250 },
  { src: "images/portrait-sunset.webp", alt: "Vyom Patel at sunset in a striped polo, arms crossed", width: 1000, height: 1250 },
  { src: "images/portrait-wall.webp", alt: "Vyom Patel in a beige t-shirt, arms crossed", width: 1000, height: 1250 },
];

export const projects = [
  {
    slug: "makewell",
    title: "Makewell Agri Equipments",
    kind: "Company website (React)",
    type: "client",
    image: "images/gallery/makewell-home.webp",
    showcase: [
      {
        feature: "Company",
        screens: [
          {
            title: "Home",
            text: "A slider of forged tools, the company's key numbers, and quick routes to the products, dealer enquiries and the PDF catalogue.",
            desktop: "images/gallery/makewell-home.webp",
            mobile: "images/gallery/makewell-mobile-home.webp",
            url: "https://www.makewellagriequipments.com/",
          },
          {
            title: "About",
            text: "The company's story, next to a carousel of the tools it forges.",
            desktop: "images/gallery/makewell-about.webp",
            mobile: "images/gallery/makewell-mobile-about.webp",
            url: "https://www.makewellagriequipments.com/about",
          },
          {
            title: "Export",
            text: "Countries served, grouped by region, and the export documents and shipping options the company handles.",
            desktop: "images/gallery/makewell-export.webp",
            mobile: "images/gallery/makewell-mobile-export.webp",
            url: "https://www.makewellagriequipments.com/export",
          },
        ],
      },
      {
        feature: "Products and quotes",
        screens: [
          {
            title: "Product catalogue",
            text: "Filter chips for every tool type, each with a count, and a card for every product.",
            desktop: "images/gallery/makewell-products.webp",
            mobile: "images/gallery/makewell-mobile-products.webp",
            url: "https://www.makewellagriequipments.com/products",
          },
          {
            title: "Category pages",
            text: "Each tool family has its own page with a description, key specs and its full range.",
            desktop: "images/gallery/makewell-category.webp",
            mobile: "images/gallery/makewell-mobile-category.webp",
            url: "https://www.makewellagriequipments.com/products/shovels-spades",
          },
          {
            title: "Product details",
            text: "Specs and a model reference, with buttons to get a quote or ask on WhatsApp.",
            desktop: "images/gallery/makewell-product.webp",
            mobile: "images/gallery/makewell-mobile-product.webp",
            url: "https://www.makewellagriequipments.com/products/axes-hatchets/forged-hatchet-p17",
          },
          {
            title: "Quote form",
            text: "Name, company, email, phone with country code, country, product and message, sent through Web3Forms.",
            desktop: "images/gallery/makewell-contact.webp",
            mobile: "images/gallery/makewell-mobile-contact.webp",
            url: "https://www.makewellagriequipments.com/contact",
          },
        ],
      },
    ],
    summary:
      "A multi-page website for an agricultural equipment company, with a filterable product catalogue, product details and a contact form.",
    body: [
      "Makewell Agri Equipments needed a website to show its products and take enquiries. I built a multi-page React site with React Router, a product catalogue that can be filtered by type, product detail pages and a contact form connected to Web3Forms, with async email validation before anything is sent.",
      "The layout is mobile-first, with a slide-in navigation drawer on phones. I also bought and set up the company's domain, deployed the site on Vercel with GitHub integration so every push goes live, and added SEO metadata to every page.",
    ],
    features: [
      "Filterable product catalogue and product detail pages",
      "Contact and quotation form through Web3Forms, with async email validation",
      "Mobile-first layout with a slide-in navigation drawer",
      "Custom domain on Vercel with continuous deployment from GitHub",
      "SEO metadata for search engines",
    ],
    stack: ["React", "React Router", "JavaScript", "CSS3", "Web3Forms", "Vercel"],
    github: "",
    live: "https://www.makewellagriequipments.com/",
    host: "Vercel (custom domain)",
    note: "Client project, so the source code is private.",
  },
  {
    slug: "rakhi-store",
    title: "The Maroons: A Rakhi Store",
    kind: "Store for a home business (React)",
    type: "client",
    image: "images/rakhi-store.webp",
    showcase: [
      {
        feature: "Shop",
        screens: [
          {
            title: "Shop",
            text: "69 handmade designs in four types, with a sticky type slider and buy bar on phones.",
            desktop: "images/gallery/rakhi-store-home.webp",
            mobile: "images/gallery/rakhi-store-mobile-home.webp",
            url: "https://vyom1912.github.io/A-Rakhi-Store/",
          },
          {
            title: "Shop by type",
            text: "Each type has its own page, sortable by price, with add to cart right on the card.",
            desktop: "images/gallery/rakhi-store-category.webp",
            mobile: "images/gallery/rakhi-store-mobile-category.webp",
            url: "https://vyom1912.github.io/A-Rakhi-Store/swastik-design",
          },
          {
            title: "Product page",
            text: "Tap-to-zoom photo, quantity, and a shortcut to order the same design with a name.",
            desktop: "images/gallery/rakhi-store-product.webp",
            mobile: "images/gallery/rakhi-store-mobile-product.webp",
            url: "https://vyom1912.github.io/A-Rakhi-Store/product/1",
          },
        ],
      },
      {
        feature: "Custom name rakhi",
        screens: [
          {
            title: "Names to weave",
            text: "Add as many names as you need, each with an optional spelling note and its own quantity.",
            desktop: "images/gallery/rakhi-store-custom-rakhi.webp",
            mobile: "images/gallery/rakhi-store-mobile-custom-rakhi.webp",
            url: "https://vyom1912.github.io/A-Rakhi-Store/custom-rakhi",
          },
          {
            title: "Live bead preview",
            text: "Each name is drawn letter by letter as beads on the maroon thread while you type, then you pick a bead colour from photos of the real beads.",
            desktop: "images/gallery/rakhi-store-custom-preview.webp",
            mobile: "images/gallery/rakhi-store-mobile-custom-preview.webp",
            url: "https://vyom1912.github.io/A-Rakhi-Store/custom-rakhi",
          },
        ],
      },
      {
        feature: "Ordering",
        screens: [
          {
            title: "Cart",
            text: "Ready-made and custom rakhis share one cart, saved in localStorage, next to the order summary and pickup details.",
            desktop: "images/gallery/rakhi-store-cart.webp",
            mobile: "images/gallery/rakhi-store-mobile-cart.webp",
            url: "https://vyom1912.github.io/A-Rakhi-Store/cart",
          },
          {
            title: "How to order",
            text: "The WhatsApp ordering flow, explained with chat bubbles from sending the order to pickup.",
            desktop: "images/gallery/rakhi-store-how-to-order.webp",
            mobile: "images/gallery/rakhi-store-mobile-how-to-order.webp",
            url: "https://vyom1912.github.io/A-Rakhi-Store/how-to-order",
          },
          {
            title: "Order terms",
            text: "Making time, cancellations, pickup and spelling. Customers agree before the order is sent, and the agreement goes into the WhatsApp message.",
            desktop: "images/gallery/rakhi-store-terms.webp",
            mobile: "images/gallery/rakhi-store-mobile-terms.webp",
            url: "https://vyom1912.github.io/A-Rakhi-Store/terms",
          },
          {
            title: "Contact",
            text: "The contact form also sends its message on WhatsApp, where the business already answers.",
            desktop: "images/gallery/rakhi-store-contact.webp",
            mobile: "images/gallery/rakhi-store-mobile-contact.webp",
            url: "https://vyom1912.github.io/A-Rakhi-Store/contact",
          },
        ],
      },
    ],
    summary:
      "A mobile-first online store for a real home business selling handmade rakhis, with custom name rakhis and one-tap ordering on WhatsApp.",
    body: [
      "This is a live store for a small home business in Himatnagar that makes handmade Jeco Moti rakhis. Customers browse 69 designs in four types, add them to a cart and send the whole order to the owner on WhatsApp in one tap. There is no server and no online payment: the order arrives as a ready-written WhatsApp message, which is how the business already works.",
      "Customers can also design a custom name rakhi. They add as many names as they need, see each name drawn letter by letter as beads on the maroon thread, and pick a bead colour from close-up photos of the real beads. Custom and ready-made rakhis share one cart and one order message.",
      "The site also protects the business. An Order Terms page covers making time, cancellations, pickup and spelling, and customers have to agree before the order is sent; the agreement is written into the WhatsApp message itself. The cart is kept in React Context and saved to localStorage, the order message is built by one function that has unit tests, and the 69 product photos were cropped and compressed from about 180 MB to about 2 MB.",
    ],
    features: [
      "Whole cart sent as a ready-written WhatsApp order in one tap",
      "Custom name rakhis with a live bead preview and real bead-colour photos",
      "Order Terms page, with the customer's agreement recorded in every order",
      "Spelling confirmation and an English-only check for custom names",
      "Mobile-first layout with a slide-in menu and a sticky buy bar",
      "Clean URLs on GitHub Pages through a 404 redirect",
      "Unit tests for the cart, the terms check and the order message (Jest + React Testing Library)",
    ],
    stack: ["React 19", "React Router 7", "Context API", "localStorage", "WhatsApp click-to-chat", "CSS3", "Jest", "React Testing Library"],
    github: "",
    live: "https://vyom1912.github.io/A-Rakhi-Store/",
    host: "GitHub Pages",
    note: "Client project, so the source code is private.",
  },
  {
    slug: "publishpro",
    title: "PublishPro",
    kind: "MERN blogging platform",
    image: "images/publishpro.webp",
    type: "fullstack",
    showcase: [
      {
        feature: "Reading and search",
        screens: [
          {
            title: "The feed",
            text: "Paginated on the server and trimmed to the fields a card needs, which took the response from 36 KB to 1.3 KB.",
            desktop: "images/gallery/publishpro-home.webp",
            mobile: "images/gallery/publishpro-mobile-home.webp",
            url: "https://publishpro-a-blogging-platform.onrender.com/",
          },
          {
            title: "Reading a post",
            text: "Author, tags, likes, saves, shares and a view count that counts each signed-in reader once. Article HTML is sanitised with DOMPurify first.",
            desktop: "images/gallery/publishpro-post.webp",
            mobile: "images/gallery/publishpro-mobile-post.webp",
            url: "https://publishpro-a-blogging-platform.onrender.com/blog/6a4143fee4e032aa7031f3d6",
          },
          {
            title: "Comments",
            text: "Signed-in readers comment under every post. Visitors can read the thread and get a prompt to log in to join it.",
            desktop: "images/gallery/publishpro-comments.webp",
            mobile: "images/gallery/publishpro-mobile-comments.webp",
            url: "https://publishpro-a-blogging-platform.onrender.com/blog/6a4143fee4e032aa7031f3d6",
          },
          {
            title: "Author pages",
            text: "Every writer has a page with their bio, latest posts and totals for blogs, likes, views and saves, worked out by an aggregation pipeline.",
            desktop: "images/gallery/publishpro-author.webp",
            mobile: "images/gallery/publishpro-mobile-author.webp",
            url: "https://publishpro-a-blogging-platform.onrender.com/author/6a23c0a7c292066495e7ea77",
          },
          {
            title: "Search",
            text: "Matches titles, tags, categories and author names, with the input escaped before it reaches a regex.",
            desktop: "images/gallery/publishpro-search.webp",
            mobile: "images/gallery/publishpro-mobile-search.webp",
            url: "https://publishpro-a-blogging-platform.onrender.com/",
          },
        ],
      },
      {
        feature: "Accounts",
        screens: [
          {
            title: "Sign up",
            text: "Name, email and a password of at least 8 characters, hashed with bcrypt before it is stored.",
            desktop: "images/gallery/publishpro-signup.webp",
            mobile: "images/gallery/publishpro-mobile-signup.webp",
            url: "https://publishpro-a-blogging-platform.onrender.com/signup",
          },
          {
            title: "Log in",
            text: "JWT access and refresh tokens in httpOnly cookies, each tied to a session that can be revoked, including from every device at once.",
            desktop: "images/gallery/publishpro-login.webp",
            mobile: "images/gallery/publishpro-mobile-login.webp",
            url: "https://publishpro-a-blogging-platform.onrender.com/login",
          },
          {
            title: "Forgot password",
            text: "Emails a reset link through Resend. The link works once and expires after 15 minutes.",
            desktop: "images/gallery/publishpro-forgot-password.webp",
            mobile: "images/gallery/publishpro-mobile-forgot-password.webp",
            url: "https://publishpro-a-blogging-platform.onrender.com/forgot-password",
          },
        ],
      },
    ],
    summary:
      "A blogging platform where people write, publish and discuss articles, with cookie-based login, a rich text editor, image uploads, likes, bookmarks and comments.",
    body: [
      "PublishPro is a complete blogging platform on the MERN stack. Anyone can browse and search articles. Signed-in users write posts in a rich text editor, upload a cover image, pick one of 42 categories and add tags. Readers can like, save and share posts, comment, and open an author's page to see their bio, stats and everything they have published.",
      "Security was a main focus. Login uses a short-lived JWT access token and a 7-day refresh token, both in httpOnly cookies. Every refresh token is tied to a session record in MongoDB, so logging out, \"log out of all devices\" and changing a password all revoke sessions. On the client, an Axios interceptor refreshes an expired token and replays the requests that failed in the meantime, so nobody gets logged out halfway through writing.",
      "The REST API runs on Express 5 and Mongoose. Likes, bookmarks and view counts use atomic MongoDB updates, author stats come from an aggregation pipeline, and article HTML is sanitised with DOMPurify before it is shown. Server-side pagination and field projection cut the home feed response from 36 KB to 1.3 KB, and route-level code splitting made the main JS bundle about 29% smaller.",
    ],
    features: [
      "Write, edit and delete posts in TinyMCE, with cover images, categories and tags",
      "JWT access and refresh tokens in httpOnly cookies, with sessions that can be revoked",
      "Forgot and reset password by email, change password, log out of all devices",
      "Likes, bookmarks, comments and view counts (each signed-in reader counted once)",
      "Author pages and a profile dashboard with stats from an aggregation pipeline",
      "Search across titles, tags, categories and authors, with server-side pagination",
      "Role-based admin API for users, blogs and site stats",
      "Images streamed to Cloudinary through Multer and served as WebP/AVIF thumbnails",
      "Mobile-first layout checked at phone, tablet and desktop widths",
    ],
    stack: ["React 19", "React Router 7", "Node.js", "Express 5", "MongoDB", "Mongoose", "JWT", "bcrypt", "Cloudinary", "Multer", "TinyMCE", "DOMPurify", "Resend", "Vite"],
    github: "https://github.com/Vyom1912/PublishPro-A-Blogging-Platform",
    live: "https://publishpro-a-blogging-platform.onrender.com/",
    host: "Render",
  },
  {
    slug: "url-shortener",
    title: "URL Shortener",
    kind: "Node.js and MongoDB web app",
    image: "images/url-shortener.webp",
    type: "fullstack",
    showcase: [
      {
        feature: "Links",
        screens: [
          {
            title: "Your links",
            text: "Create links with a custom or random code, then copy, share, edit, delete and search them. Every link shows its clicks.",
            desktop: "images/gallery/url-shortener-dashboard.webp",
            mobile: "images/gallery/url-shortener-mobile-dashboard.webp",
            url: "https://urlshortener-1osn.onrender.com/login",
          },
          {
            title: "Missing links",
            text: "A short code that does not exist, or a link that was deleted, opens a clear 404 page instead of an error.",
            desktop: "images/gallery/url-shortener-not-found.webp",
            mobile: "images/gallery/url-shortener-mobile-not-found.webp",
            url: "https://urlshortener-1osn.onrender.com/vyom/this-link-does-not-exist",
          },
        ],
      },
      {
        feature: "Accounts",
        screens: [
          {
            title: "Create an account",
            text: "New accounts verify their email with an 8-digit code or a link before they can log in.",
            desktop: "images/gallery/url-shortener-register.webp",
            mobile: "images/gallery/url-shortener-mobile-register.webp",
            url: "https://urlshortener-1osn.onrender.com/register",
          },
          {
            title: "Log in",
            text: "Passwords are hashed with Argon2 and sessions live in MongoDB, so logging out really ends them.",
            desktop: "images/gallery/url-shortener-login.webp",
            mobile: "images/gallery/url-shortener-mobile-login.webp",
            url: "https://urlshortener-1osn.onrender.com/login",
          },
          {
            title: "Forgot password",
            text: "Sends a single-use reset link that expires after 15 minutes and is stored only as a SHA-256 hash.",
            desktop: "images/gallery/url-shortener-reset-password.webp",
            mobile: "images/gallery/url-shortener-mobile-reset-password.webp",
            url: "https://urlshortener-1osn.onrender.com/reset-password",
          },
        ],
      },
    ],
    summary:
      "A link shortener where every user gets their own link space, with custom short codes, click tracking, cookie-based login and email verification.",
    body: [
      "Paste a long URL, optionally pick a short code like \"portfolio\", and get a link such as yoursite.com/vyom/portfolio. From the dashboard you can copy a link in one tap, share it through the phone's share sheet, edit where it points, delete it and search your links. Every visit is counted, so each link shows its clicks.",
      "Each user has their own namespace. Links are built from a username plus a code, so two people can both own /gh and each one opens the right page. A compound MongoDB index keeps codes unique per user, and the live database was moved over from the old site-wide index on startup without breaking links that were already shared.",
      "Login uses JWT access and refresh tokens in httpOnly cookies backed by MongoDB sessions, and passwords are hashed with Argon2. New accounts verify their email with a code or a link, and password reset links are single-use, expire after 15 minutes and are stored only as SHA-256 hashes. The server follows an MVC layout with Zod validators, and it can also run on Vercel as a serverless Express app.",
    ],
    features: [
      "Create, edit, delete and search short links, with custom or random codes",
      "Per-user namespaces (/username/code), so two users can use the same code",
      "Click tracking per link and total clicks on the profile",
      "One-tap copy and the native Web Share API on phones",
      "Argon2 hashing, email verification and a forgot/reset password flow",
      "Ownership checks on every link action, and only http/https URLs allowed",
      "Zod validation on every form, with friendly error messages",
      "HTML emails built with MJML and sent through Resend",
      "Mobile-first EJS views with a bottom tab bar and automatic dark mode",
    ],
    stack: ["Node.js", "Express 5", "MongoDB", "Mongoose", "EJS", "MVC", "JWT", "Argon2", "Zod", "Resend", "MJML"],
    github: "https://github.com/Vyom1912/urlShortener",
    live: "https://urlshortener-1osn.onrender.com/",
    host: "Render",
  },
  {
    slug: "foodzing",
    title: "FoodZing",
    kind: "React and Firebase food ordering app",
    image: "images/foodzing.webp",
    type: "fullstack",
    showcase: [
      {
        feature: "Browse",
        screens: [
          {
            title: "Home",
            text: "A hero with a call to action, and a navbar that greets you by name once you sign in.",
            desktop: "images/gallery/foodzing-home.webp",
            mobile: "images/gallery/foodzing-mobile-home.webp",
            url: "https://vyom1912.github.io/FoodZing-A-Food-Ordering-Website/",
          },
          {
            title: "Why FoodZing",
            text: "Ordering, delivery and quality at a glance, followed by a short story about the restaurant.",
            desktop: "images/gallery/foodzing-why.webp",
            mobile: "images/gallery/foodzing-mobile-why.webp",
            url: "https://vyom1912.github.io/FoodZing-A-Food-Ordering-Website/",
          },
          {
            title: "Menu categories",
            text: "One tap on a category filters the 36 dishes.",
            desktop: "images/gallery/foodzing-menu.webp",
            mobile: "images/gallery/foodzing-mobile-menu.webp",
            url: "https://vyom1912.github.io/FoodZing-A-Food-Ordering-Website/",
          },
          {
            title: "Dishes",
            text: "Add to cart straight from a dish card, with plus and minus controls for the quantity.",
            desktop: "images/gallery/foodzing-dishes.webp",
            mobile: "images/gallery/foodzing-mobile-dishes.webp",
            url: "https://vyom1912.github.io/FoodZing-A-Food-Ordering-Website/",
          },
        ],
      },
      {
        feature: "Order and contact",
        screens: [
          {
            title: "Cart",
            text: "An itemised bill with subtotal, delivery fee and total, followed by a validated delivery form.",
            desktop: "images/gallery/foodzing-cart.webp",
            mobile: "images/gallery/foodzing-mobile-cart.webp",
            url: "https://vyom1912.github.io/FoodZing-A-Food-Ordering-Website/#/cart",
          },
          {
            title: "Contact form",
            text: "Messages from this form are saved to Firebase Realtime Database.",
            desktop: "images/gallery/foodzing-contact.webp",
            mobile: "images/gallery/foodzing-mobile-contact.webp",
            url: "https://vyom1912.github.io/FoodZing-A-Food-Ordering-Website/",
          },
        ],
      },
    ],
    summary:
      "A responsive food ordering site with Firebase sign-in, a category-filtered menu, a live cart and a full checkout flow.",
    body: [
      "FoodZing is a food ordering website built with React during my internship at The One Web Technology. Visitors browse 36 dishes across 8 categories, such as Salad, Rolls, Desserts and Pasta, and filter the menu with one tap. Dishes go into the cart straight from the menu card, with plus and minus controls that update the quantity and total right away.",
      "Users sign up or log in through Firebase Authentication, and the navbar greets them by name. The cart shows an itemised bill with subtotal, delivery fee and total, followed by a validated delivery form. Messages from the contact form are saved to Firebase Realtime Database.",
      "Cart state lives in a React Context so every component reads it from one place, and auth state is tracked once at the app level. The site uses HashRouter so it runs on GitHub Pages without server rewrites, plus a small custom hook for smooth scrolling to sections from any route.",
    ],
    features: [
      "Category filter across 36 dishes in 8 categories",
      "Add to cart with live quantity controls and a running total",
      "Sign up and login with Firebase Authentication",
      "Itemised cart and a validated checkout form",
      "Contact form that writes to Firebase Realtime Database",
      "Responsive layout with a mobile hamburger menu",
    ],
    stack: ["React 19", "React Router", "Context API", "Firebase Auth", "Firebase Realtime Database", "CSS3"],
    github: "https://github.com/Vyom1912/FoodZing-A-Food-Ordering-Website",
    live: "https://vyom1912.github.io/FoodZing-A-Food-Ordering-Website/",
    host: "GitHub Pages",
  },
];

export const experience = [
  {
    role: "Web Developer Intern",
    org: "Blue Nova Tech",
    when: "Sep 2026 to present",
    // Client and project names are left out on purpose (company policy).
    summary: "Building and shipping live projects for the company's clients as part of the development team.",
    points: [
      "Building responsive, multi-page client websites with React, React Router and Vite, styled with Tailwind CSS.",
      "Contributing to a full stack web app with a Next.js and TypeScript front end and a Fastify API using Drizzle ORM, PostgreSQL and Zod validation.",
      "Turning client requirements and content into pages, then deploying preview builds for client review.",
      "Working on page speed and SEO: compressed images, meta tags and clean, crawlable pages.",
    ],
    note: "Client and project names are not shared because of company policy.",
  },
  {
    role: "React.js Developer Intern",
    org: "The One Web Technology",
    place: "Vadodara",
    when: "Jan 2024 to Apr 2024",
    points: [
      "Built FoodZing, a responsive food ordering web app, with React and Firebase: authentication, a real time database and a mobile-first UI.",
      "Structured the UI as reusable components to cut duplicated code across pages.",
      "Tested across desktop and mobile browsers and fixed the layout and performance issues that came up.",
    ],
  },
];

export const education = [
  {
    degree: "M.E. in Computer Engineering",
    school: "LDRP Institute of Technology and Research",
    when: "2025 to 2027",
    note: "CGPA 9.32 up to semester 2, in progress",
  },
  {
    degree: "B.E. in Computer Engineering",
    school: "Gujarat Technological University (GECM)",
    when: "2020 to 2024",
    note: "CGPA 7.91",
  },
];

// Grouped by what the projects on this site actually use.
export const skills = [
  { group: "Frontend", items: ["React", "React Router", "JavaScript (ES6+)", "HTML5", "CSS", "Tailwind CSS", "Bootstrap"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "EJS", "Zod"] },
  { group: "Auth and security", items: ["JWT", "httpOnly cookies", "bcrypt and Argon2", "DOMPurify"] },
  { group: "Data", items: ["MongoDB", "Mongoose", "MySQL", "Prisma", "Drizzle ORM", "Firebase"] },
  { group: "Tools and hosting", items: ["Git", "GitHub", "Postman", "Vite", "Cloudinary", "Render", "Vercel", "Figma", "Canva"] },
];

// Title and description for every prerendered page. Keep descriptions under ~160 characters.
export const pages = {
  "/": {
    title: "Vyom Patel | Full Stack Developer (React, Node.js, MongoDB)",
    description:
      "Vyom Patel is a full stack developer from Gujarat, India, building web apps with React, Node.js, Express and MongoDB. Projects, resume and GitHub.",
  },
  "/work": {
    title: "Work | Vyom Patel",
    description:
      "Full stack projects by Vyom Patel: PublishPro (MERN blogging platform), a Node.js URL shortener and FoodZing (React + Firebase).",
  },
  "/about": {
    title: "About | Vyom Patel",
    description:
      "About Vyom Patel: web developer intern at Blue Nova Tech, M.E. Computer Engineering student at LDRP-ITR, React and Node.js developer.",
  },
  "/contact": {
    title: "Contact | Vyom Patel",
    description: "Get in touch with Vyom Patel about full stack developer roles or freelance web projects. Email, LinkedIn and GitHub.",
  },
  "/privacy": {
    title: "Privacy Policy | Vyom Patel",
    description: "How this portfolio site handles your data: no cookies, no tracking, and what happens when you use the contact form.",
  },
  "/terms": {
    title: "Terms and Conditions | Vyom Patel",
    description: "Terms for using vyom1912.github.io/Portfolio-Vyom, the portfolio of Vyom Patel.",
  },
};

for (const p of projects) {
  pages[`/work/${p.slug}`] = {
    title: `${p.title}, ${p.kind} | Vyom Patel`,
    description: `${p.summary} Built by Vyom Patel with ${p.stack.slice(0, 4).join(", ")}.`.slice(0, 200),
    image: p.image,
  };
}

// Pages that exist but stay out of the sitemap and search results.
export const hiddenPages = {
  "/archive": {
    title: "All projects (archive) | Vyom Patel",
    description: "Every project by Vyom Patel, including small JavaScript exercises and design work.",
  },
};

export const notFoundMeta = {
  title: "Page not found | Vyom Patel",
  description: "This page does not exist on Vyom Patel's portfolio.",
};
