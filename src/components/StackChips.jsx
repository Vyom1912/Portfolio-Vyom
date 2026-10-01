import { useState } from "react";
import TechIcon from "./TechIcon.jsx";

// Shows the first few technologies, with a button for the rest, so long
// stacks don't turn into a tall column on phones.
export default function StackChips({ items, limit = 5, icons = true }) {
  const [open, setOpen] = useState(false);
  const shown = open ? items : items.slice(0, limit);
  const hidden = items.length - limit;

  return (
    <ul className="chips">
      {shown.map((item) => (
        <li key={item} className="chip">
          {icons && <TechIcon name={item} size={14} />}
          {item}
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <button type="button" className="chip chip-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "Show less" : `+${hidden} more`}
          </button>
        </li>
      )}
    </ul>
  );
}
