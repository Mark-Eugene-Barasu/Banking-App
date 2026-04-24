import { defineConfig } from "prisma/config";
import { readFileSync } from "fs";
import { resolve } from "path";

// Manually parse .env since Prisma 7 runs this config in an isolated context
function loadEnv() {
  try {
    const envPath = resolve(__dirname, ".env");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {}
}

loadEnv();

export default defineConfig({
  datasourceUrl: process.env.DATABASE_URL!,
});
