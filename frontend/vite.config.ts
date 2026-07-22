import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "url";

const SECTIONS = [
  "components",
  "constants",
  "hooks",
  "models",
  "pages",
  "providers",
  "routes",
  "services",
  "utils",
];

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: true,
      port: 5173,
      watch: {
        usePolling: true,
      },
      proxy: {
        "/api": {
          target: "http://adventure-routes-backend:8081/",
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          configure: (proxy, _options) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            proxy.on("error", (err, _req, _res) => {
              console.log("proxy error", err);
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            proxy.on("proxyReq", (_proxyReq, req, _res) => {
              console.log("Sending Request to Target:", req.method, req.url);
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      alias: [...SECTIONS.map((section) => ({
        find: `@${section}`,
        replacement: fileURLToPath(
          new URL(`./src/${section}`, import.meta.url)
        ),
      })), {"find": "@models", "replacement": fileURLToPath(new URL("../shared/src/models", import.meta.url))}],
    },
  };
});
