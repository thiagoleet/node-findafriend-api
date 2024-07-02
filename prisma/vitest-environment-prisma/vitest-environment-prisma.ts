import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

const prisma = new PrismaClient();

/**
 * Generate a database URL with the specified schema.
 *
 * @param {string} schema
 * @return {*}
 */
function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);

  return url.toString();
}

async function dropSchema(schema: string) {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);

  await prisma.$disconnect();
}

export default <Environment>{
  name: "prisma",
  transformMode: "web",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await dropSchema(schema);
      },
    };
  },
};
