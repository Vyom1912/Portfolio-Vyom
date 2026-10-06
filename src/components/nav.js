// Page links shared by the top bar and the phone dock.
export const links = [
  { to: "/", label: "Home", end: true },
  { to: "/work/", label: "Work" },
  { to: "/about/", label: "About" },
  { to: "/contact/", label: "Contact" },
];

// Clicking a link to the page you are already on scrolls smoothly back to the top.
export function toTopIfCurrent(e, to, pathname) {
  const trim = (p) => p.replace(/\/$/, "") || "/";
  if (trim(pathname) === trim(to)) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
