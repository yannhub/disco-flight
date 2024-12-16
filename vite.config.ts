import { defineConfig } from "vite";

export default defineConfig({
  base: "/disco-flight",
  server: {
    https: {
      key: "./certificates/key.pem", // Clé privée
      cert: "./certificates/cert.pem", // Certificat SSL
    },
    host: true,
    port: 3000,
  },
  build: {
    outDir: "docs",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: true,
  },
});
