import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SITE_URL, pages, hiddenPages, notFoundMeta } from "../data/site.js";
import { asset } from "./util.js";

let hasShownFirstPage = false;

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// Keeps <head> in step with client-side navigation. The first load already
// has these tags from the prerender step.
function useHead(path) {
  useEffect(() => {
    const meta = pages[path] || hiddenPages[path] || notFoundMeta;
    const url = `${SITE_URL}${path === "/" ? "/" : `${path}/`}`;
    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", url);
  }, [path]);
}

export default function Page({ path, className = "", children }) {
  // The first page comes from static HTML and should not fade in; later
  // navigations get a short entrance.
  const [animateIn] = useState(() => typeof window !== "undefined" && hasShownFirstPage);
  useEffect(() => {
    hasShownFirstPage = true;
  }, []);
  useHead(path);

  return (
    <motion.main
      id="main"
      className={`page ${className}`}
      initial={animateIn ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.main>
  );
}

export { asset };
