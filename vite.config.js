import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const certDir = path.resolve("certs");
const keyPath = path.join(certDir, "localhost-key.pem");
const certPath = path.join(certDir, "localhost.pem");
const useHttps = process.env.APP_HTTPS === "true";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["slowly-new-penguin.ngrok-free.app"],
    proxy: {
      "/api": {
        target: `${useHttps ? "https" : "http"}://localhost:3001`,
        changeOrigin: true,
        secure: false
      }
    },
    https:
      useHttps && fs.existsSync(keyPath) && fs.existsSync(certPath)
        ? {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
          }
        : false
  }
});
