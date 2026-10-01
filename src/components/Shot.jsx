import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { asset, hostOf } from "./util.js";

// A screenshot inside a plain browser frame. The picture wipes up into view,
// settles from a slight zoom, and drifts slowly when hovered.
// With `parallax`, it also shifts a little against the page while scrolling.
// `bare` drops the browser bar; `logo` shows a logo card instead of a screenshot.
export default function Shot({ src, alt, url, caption, bare = false, logo = false, parallax = false, eager = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const useParallax = parallax && !logo;
  const classes = ["shot", inView && "in", useParallax && "shot-parallax", bare && "shot-bare", logo && "shot-logo"];

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
        {useParallax ? (
          <motion.img src={asset(src)} alt={alt} style={{ y }} loading={eager ? "eager" : "lazy"} decoding="async" />
        ) : (
          <img src={asset(src)} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
        )}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
