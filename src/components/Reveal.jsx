import { useRef } from "react";
import { useInView } from "./useInView.js";

// Fades content up once it scrolls into view. Hidden state only applies when
// JavaScript is running (html.js), so the static HTML is always readable.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
