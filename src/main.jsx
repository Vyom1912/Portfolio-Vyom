import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./styles.css";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Pages are prerendered at build time, so hydrate when markup is already there.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
