import fs from "node:fs";
import path from "node:path";

function stripQuotes(value) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseEnvLine(line) {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith("#")) {
    return null;
  }

  const equalsIndex = trimmed.indexOf("=");

  if (equalsIndex <= 0) {
    return null;
  }

  const key = trimmed.slice(0, equalsIndex).trim();
  const value = stripQuotes(trimmed.slice(equalsIndex + 1));

  if (!key) {
    return null;
  }

  return { key, value };
}

export function loadEnvFile(filename = ".env") {
  const envPath = path.resolve(process.cwd(), filename);

  if (!fs.existsSync(envPath)) {
    return;
  }

  const raw = fs.readFileSync(envPath, "utf8");

  raw.split(/\r?\n/).forEach((line) => {
    const parsed = parseEnvLine(line);

    if (!parsed) {
      return;
    }

    if (process.env[parsed.key] == null) {
      process.env[parsed.key] = parsed.value;
    }
  });
}

loadEnvFile();

