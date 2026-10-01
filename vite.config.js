import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is served from https://vyom1912.github.io/Portfolio-Vyom/
export default defineConfig({
  base: "/Portfolio-Vyom/",
  plugins: [react()],
});
