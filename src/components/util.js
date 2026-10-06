import images from "../data/images.json";

export const asset = (path) => import.meta.env.BASE_URL + path;

// src, srcset and sizes for a site image, so each screen downloads the smallest
// copy that still looks sharp. The copies are made by `npm run images`.
export function responsive(path, sizes) {
  const m = images[path];
  if (!m || m.v.length === 0) return { src: asset(path) };
  const srcSet = [...m.v.map(([p, w]) => `${asset(p)} ${w}w`), `${asset(path)} ${m.w}w`].join(", ");
  return { src: asset(path), srcSet, sizes };
}

export const hostOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
