import { Suspense, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Every page change glides back to the top. The first load is left alone so
// links to a spot further down a page still work.
function ScrollToTop() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    // Links to "/" give "/Portfolio-Vyom" without the slash GitHub Pages serves
    // the home page at; add it so a refresh doesn't redirect.
    const base = import.meta.env.BASE_URL;
    if (location.pathname === base.replace(/\/$/, "")) history.replaceState(history.state, "", base + location.search + location.hash);
    if (first.current) {
      first.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [pathname]);
  return null;
}

// `pages` maps each page name to its component. The prerender step passes the
// real components; the browser passes lazy ones (see main.jsx and routes.js).
export default function App({ pages: P }) {
  return (
    <>
      <ScrollToTop />
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <Suspense fallback={<main id="main" className="page page-loading" />}>
        <Routes>
          <Route path="/" element={<P.home />} />
          <Route path="/work" element={<P.work />} />
          <Route path="/work/:slug" element={<P.project />} />
          <Route path="/about" element={<P.about />} />
          <Route path="/contact" element={<P.contact />} />
          <Route path="/privacy" element={<P.privacy />} />
          <Route path="/terms" element={<P.terms />} />
          <Route path="/archive" element={<P.archive />} />
          <Route path="*" element={<P.notFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
