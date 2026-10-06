import { useState } from "react";
import { responsive } from "./util.js";
import { photos } from "../data/site.js";

// Where each print sits, from the front of the pile to the back.
const spots = [
  { x: "0%", y: "0px", r: -3, s: 1 },
  { x: "20%", y: "14px", r: 6, s: 0.9 },
  { x: "-14%", y: "24px", r: -9, s: 0.84 },
  { x: "32%", y: "34px", r: 11, s: 0.78 },
];

// Photos laid on top of each other like prints on a desk. Clicking the front one
// sends it to the back of the pile; clicking one at the back brings it forward.
// The moves are CSS transitions with a springy curve.
export default function PhotoStack() {
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const toFront = (i) => setOrder((o) => [i, ...o.filter((j) => j !== i)]);
  const toBack = (i) => setOrder((o) => [...o.filter((j) => j !== i), i]);

  return (
    <div className="photo-stack">
      {photos.map((photo, i) => {
        const depth = order.indexOf(i);
        const spot = spots[Math.min(depth, spots.length - 1)];
        const isFront = depth === 0;
        return (
          <button
            key={photo.src}
            type="button"
            className={`print ${isFront ? "is-front" : ""}`}
            aria-label={isFront ? `${photo.alt}. Show the next photo` : `Bring forward: ${photo.alt}`}
            onClick={() => (isFront ? toBack(i) : toFront(i))}
            style={{ "--x": spot.x, "--y": spot.y, "--r": `${spot.r}deg`, "--s": spot.s, zIndex: photos.length - depth }}
          >
            <span className="print-img">
              <img {...responsive(photo.src, "290px")} alt="" loading="lazy" decoding="async" />
            </span>
          </button>
        );
      })}
      <p className="photo-note">Tap the photo to shuffle the pile.</p>
    </div>
  );
}
