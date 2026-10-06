import { StrictMode, lazy } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { loaders, pageFor } from "./routes.js";
import "./styles.css";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const root = document.getElementById("root");

// Load the code for the page being opened first, so it is ready before React
// takes over the prerendered HTML. Every other page is lazy and fetched later.
const current = pageFor(location.pathname.slice(base.length));

loaders[current]().then((mod) => {
  const pages = Object.fromEntries(Object.entries(loaders).map(([name, load]) => [name, name === current ? mod.default : lazy(load)]));
  const app = (
    <StrictMode>
      <BrowserRouter basename={base}>
        <App pages={pages} />
      </BrowserRouter>
    </StrictMode>
  );

  // Pages are prerendered at build time, so hydrate when markup is already there.
  if (root.firstElementChild) hydrateRoot(root, app);
  else createRoot(root).render(app);

  // Once the page is idle, fetch the other pages so moving around stays instant.
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
  idle(() => {
    for (const [name, load] of Object.entries(loaders)) if (name !== current && name !== "archive") load();
  });
});
