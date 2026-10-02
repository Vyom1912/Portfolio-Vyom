import { useState } from "react";
import { motion } from "motion/react";
import { asset } from "./util.js";
import { photos } from "../data/site.js";

const spring = { type: "spring", stiffness: 180, damping: 22 };

// Where each print sits, from the front of the pile to the back.
const spots = [
  { x: "0%", y: 0, rotate: -3, scale: 1 },
  { x: "20%", y: 14, rotate: 6, scale: 0.9 },
  { x: "-14%", y: 24, rotate: -9, scale: 0.84 },
  { x: "32%", y: 34, rotate: 11, scale: 0.78 },
];

// Photos laid on top of each other like prints on a desk. Clicking the front one
// sends it to the back of the pile; clicking one at the back brings it forward.
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
          <motion.button
            key={photo.src}
            type="button"
            className="print"
            aria-label={isFront ? `${photo.alt}. Show the next photo` : `Bring forward: ${photo.alt}`}
            onClick={() => (isFront ? toBack(i) : toFront(i))}
            initial={false}
            animate={{ ...spot, zIndex: photos.length - depth }}
            whileHover={isFront ? { rotate: -1.5 } : { rotate: spot.rotate * 1.3, y: spot.y - 6 }}
            transition={spring}
          >
            <span className="print-img">
              <img src={asset(photo.src)} alt="" loading="lazy" decoding="async" />
            </span>
          </motion.button>
        );
      })}
      <p className="photo-note">Tap the photo to shuffle the pile.</p>
    </div>
  );
}
