import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "url";

const SECTIONS = [
  "components",
  "constants",
  "models",
  "pages",
  "routes",
  "services",
];

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
    resolve: {
      alias: SECTIONS.map((section) => ({
        find: `@${section}`,
        replacement: fileURLToPath(
          new URL(`./src/${section}`, import.meta.url)
        ),
      })),
    },
  };
});
