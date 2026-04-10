import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const useHttps = args.includes("--https");
const bin = process.platform === "win32" ? "npx.cmd" : "npx";

const child = spawn(bin, ["vite", "--host"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    APP_HTTPS: useHttps ? "true" : "false"
  }
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
