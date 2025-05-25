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
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: false,
          secure: false,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("proxy error", err);
            });
            proxy.on("proxyReq", (_proxyReq, req, _res) => {
              console.log("Sending Request to Target:", req.method, req.url);
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url
              );
            });
          },
        },
      },
    },
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
