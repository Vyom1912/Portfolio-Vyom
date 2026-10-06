import { useRef } from "react";
import { useInView } from "./useInView.js";
import { hostOf, responsive } from "./util.js";

// A screenshot inside a plain browser frame. The picture wipes up into view,
// settles from a slight zoom, and drifts slowly when hovered.
// With `parallax`, it also shifts a little against the page while scrolling
// (a CSS scroll-driven animation, so it costs no JavaScript).
// `eager` is for the first screenshot on a page: it loads first and reveals with
// CSS alone, so it shows before the JavaScript has loaded.
// `bare` drops the browser bar; `logo` shows a logo card instead of a screenshot.
export default function Shot({ src, alt, url, caption, bare = false, logo = false, parallax = false, eager = false, sizes = "(max-width: 900px) calc(100vw - 32px), 620px" }) {
  const ref = useRef(null);
  const inView = useInView(ref, "0px 0px -10% 0px");
  const classes = ["shot", inView && "in", eager && "shot-eager", parallax && !logo && "shot-parallax", bare && "shot-bare", logo && "shot-logo"];

  return (
    <figure ref={ref} className={classes.filter(Boolean).join(" ")}>
      {!bare && (
        <div className="shot-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          {url && <span>{hostOf(url)}</span>}
        </div>
      )}
      <div className="shot-view">
        <img {...responsive(src, sizes)} alt={alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} decoding="async" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
