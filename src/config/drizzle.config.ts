import { config } from "dotenv";
config();

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "../../drizzle", // Outputs migrations to project root /drizzle
  schema: ["./src/db/products.schema.ts"], // Points to the schema.ts file
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Loaded from .env
  },
  strict: true,
  verbose: true,
});
