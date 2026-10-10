import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";
import { contactMessages, subscribers } from "@/db/schema";

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY,
  email text NOT NULL UNIQUE,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
`;

let schemaReady: Promise<void> | null = null;

function databaseUrl() {
  return process.env.DATABASE_URL;
}

export function hasDatabase() {
  return Boolean(databaseUrl());
}

function client() {
  const url = databaseUrl();
  if (!url) return null;
  return neon(url);
}

async function ensureSchema() {
  const sql = client();
  if (!sql) return;
  if (!schemaReady) {
    schemaReady = (async () => {
      const statements = SCHEMA_SQL.split(";").map((statement) => statement.trim()).filter(Boolean);
      for (const statement of statements) {
        await sql.query(statement);
      }
    })();
  }
  await schemaReady;
}

function localFile() {
  return path.join(process.cwd(), ".data", "inbox.json");
}

function saveLocal(kind: "subscriber" | "contact", record: Record<string, string>) {
  const file = localFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const current = fs.existsSync(file)
    ? (JSON.parse(fs.readFileSync(file, "utf8")) as unknown[])
    : [];
  current.push({ kind, ...record, createdAt: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(current, null, 2));
}

export async function saveSubscriber(email: string, source: string) {
  if (!hasDatabase()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL is not configured");
    }
    saveLocal("subscriber", { email, source });
    return { stored: "local" as const };
  }
  await ensureSchema();
  const sql = client()!;
  const db = drizzle(sql);
  const existing = await db
    .select({ id: subscribers.id })
    .from(subscribers)
    .where(eq(subscribers.email, email))
    .limit(1);
  if (existing.length === 0) {
    await db.insert(subscribers).values({
      id: crypto.randomUUID(),
      email,
      source,
    });
  }
  return { stored: "neon" as const };
}

export async function saveContact(input: { name: string; email: string; message: string }) {
  if (!hasDatabase()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL is not configured");
    }
    saveLocal("contact", input);
    return { stored: "local" as const };
  }
  await ensureSchema();
  const sql = client()!;
  const db = drizzle(sql);
  await db.insert(contactMessages).values({
    id: crypto.randomUUID(),
    ...input,
  });
  return { stored: "neon" as const };
}
