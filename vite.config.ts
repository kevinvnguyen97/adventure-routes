import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "url";

const SECTIONS = ["components", "pages"];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: SECTIONS.map((section) => ({
      find: `@${section}`,
      replacement: fileURLToPath(new URL(`./src/${section}`, import.meta.url)),
    })),
  },
});
