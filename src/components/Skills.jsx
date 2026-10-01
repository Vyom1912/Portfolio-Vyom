import Reveal from "./Reveal.jsx";
import TechIcon from "./TechIcon.jsx";
import { skills } from "../data/site.js";

export default function Skills() {
  return (
    <div className="skills">
      {skills.map((s, i) => (
        <Reveal key={s.group} className="skill-group" delay={i * 70}>
          <h3 className="label">{s.group}</h3>
          <ul className="plain">
            {s.items.map((item) => (
              <li key={item}>
                <TechIcon name={item} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
