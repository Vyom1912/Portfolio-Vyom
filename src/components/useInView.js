import { useEffect, useState } from "react";

// True once the element has scrolled into view. One IntersectionObserver per
// margin is shared by every element on the page, which keeps scrolling cheap.
const observers = new Map();
function observe(el, margin, onEnter) {
  let entry = observers.get(margin);
  if (!entry) {
    const callbacks = new Map();
    const io = new IntersectionObserver(
      (items) => {
        for (const it of items) {
          if (!it.isIntersecting) continue;
          const cb = callbacks.get(it.target);
          if (cb) cb();
        }
      },
      { rootMargin: margin }
    );
    entry = { io, callbacks };
    observers.set(margin, entry);
  }
  entry.callbacks.set(el, onEnter);
  entry.io.observe(el);
  return () => {
    entry.callbacks.delete(el);
    entry.io.unobserve(el);
  };
}

export function useInView(ref, margin = "0px 0px -8% 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    let stop = observe(el, margin, () => {
      setInView(true);
      stop();
    });
    return () => stop();
  }, [ref, margin, inView]);
  return inView;
}
