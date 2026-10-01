import { useState } from "react";
import { motion } from "motion/react";
import { asset } from "./util.js";

const photos = [
  { src: "images/portrait-outdoor.webp", alt: "Vyom Patel outdoors, arms crossed" },
  { src: "images/portrait-studio.webp", alt: "Vyom Patel against a plain blue background" },
];

const spring = { type: "spring", stiffness: 180, damping: 22 };

// Two photos laid on top of each other like prints on a desk.
// Clicking brings the one at the back to the front.
export default function PhotoStack() {
  const [front, setFront] = useState(0);

  return (
    <div className="photo-stack">
      {photos.map((photo, i) => {
        const isFront = i === front;
        return (
          <motion.button
            key={photo.src}
            type="button"
            className="print"
            aria-label={isFront ? photo.alt : `Bring forward: ${photo.alt}`}
            onClick={() => setFront(i)}
            initial={false}
            animate={
              isFront
                ? { x: "0%", y: 0, rotate: -3, scale: 1, zIndex: 2 }
                : { x: "18%", y: 14, rotate: 5, scale: 0.88, zIndex: 1 }
            }
            whileHover={isFront ? { rotate: -1.5 } : { x: "24%", rotate: 7 }}
            transition={spring}
          >
            <span className="print-img">
              <img src={asset(photo.src)} alt="" loading="lazy" decoding="async" />
            </span>
          </motion.button>
        );
      })}
      <p className="photo-note">Tap the photo at the back to swap.</p>
    </div>
  );
}
