import {
  siAxios,
  siBootstrap,
  siCloudinary,
  siCss,
  siDrizzle,
  siEjs,
  siExpress,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJest,
  siJsonwebtokens,
  siMongodb,
  siMongoose,
  siMysql,
  siNodedotjs,
  siPostman,
  siPrisma,
  siReact,
  siReactrouter,
  siRender,
  siResend,
  siTailwindcss,
  siTestinglibrary,
  siVercel,
  siVite,
  siWhatsapp,
  siZod,
} from "simple-icons";

// Brand icons come from Simple Icons (CC0). Names are matched loosely, so
// "React 19" and "Express 5" still find their icon.
const brands = [
  [/^react router/i, siReactrouter],
  [/^react testing|^testing library/i, siTestinglibrary],
  [/^react/i, siReact],
  [/^javascript/i, siJavascript],
  [/^html/i, siHtml5],
  [/^css/i, siCss],
  [/^tailwind/i, siTailwindcss],
  [/^bootstrap/i, siBootstrap],
  [/^node/i, siNodedotjs],
  [/^express/i, siExpress],
  [/^ejs/i, siEjs],
  [/^zod/i, siZod],
  [/^jwt|json web/i, siJsonwebtokens],
  [/^mongodb/i, siMongodb],
  [/^mongoose/i, siMongoose],
  [/^mysql/i, siMysql],
  [/^prisma/i, siPrisma],
  [/^drizzle/i, siDrizzle],
  [/^firebase/i, siFirebase],
  [/^git$/i, siGit],
  [/^github/i, siGithub],
  [/^postman/i, siPostman],
  [/^vite/i, siVite],
  [/^cloudinary/i, siCloudinary],
  [/^render/i, siRender],
  [/^vercel/i, siVercel],
  [/^figma/i, siFigma],
  [/^jest/i, siJest],
  [/^whatsapp/i, siWhatsapp],
  [/^axios/i, siAxios],
  [/^resend/i, siResend],
];

// Simple line icons for things that have no logo.
const generic = {
  api: "M8 4 3 12l5 8M16 4l5 8-5 8M13.5 3l-3 18",
  lock: "M6 11h12v10H6zM8.5 11V7.5a3.5 3.5 0 0 1 7 0V11",
  cookie: "M20 12.5A8 8 0 1 1 11.5 4a3 3 0 0 0 4 3.5 3 3 0 0 0 4.5 5ZM9 10h.01M8 15h.01M13 15h.01",
  shield: "M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6Z M9 12l2 2 4-4",
  box: "M4 7.5 12 3l8 4.5v9L12 21l-8-4.5Z M4 7.5l8 4.5 8-4.5M12 12v9",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  store: "M4 9h16v11H4zM3 5h18l-1 4H4ZM9 20v-6h6v6",
  design: "M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1.2-1.8-.5-1 .2-2.2 1.3-2.2H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10ZM7.5 11.5h.01M9.5 7.5h.01M14.5 7.5h.01",
};
const genericFor = [
  [/canva/i, "design", "00C4CC"],
  [/rest|api/i, "api"],
  [/bcrypt|argon|hash/i, "lock"],
  [/cookie/i, "cookie"],
  [/dompurify|sanitis|xss/i, "shield"],
  [/web3forms|mail/i, "mail"],
  [/localstorage|context/i, "box"],
];

function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export default function TechIcon({ name, size = 18 }) {
  const brand = brands.find(([re]) => re.test(name))?.[1];
  if (brand) {
    // Hover shows the official brand colour. Black logos (Express, Vercel, GitHub...)
    // switch to white on the dark theme, as those brands do on dark backgrounds.
    const isBlack = luminance(brand.hex) < 0.08;
    return (
      <svg
        className={`tech-icon ${isBlack ? "brand-black" : ""}`}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        aria-hidden="true"
        style={{ "--brand": `#${brand.hex}` }}
      >
        <path d={brand.path} fill="currentColor" />
      </svg>
    );
  }
  const match = genericFor.find(([re]) => re.test(name));
  const key = match?.[1] || "box";
  const color = match?.[2];
  return (
    <svg
      className="tech-icon generic"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      style={color ? { "--brand": `#${color}` } : undefined}
    >
      <path d={generic[key]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
