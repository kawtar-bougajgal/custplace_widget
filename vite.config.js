import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true, // هادي باش الـ SVG ياخد العرض والارتفاع من الـ Tailwind بلا مشاكل
      },
    }),
  ],
});