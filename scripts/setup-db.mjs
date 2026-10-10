import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add the Neon connection string and run this again.");
  process.exit(1);
}

const sql = neon(url);
const statements = [
  `CREATE TABLE IF NOT EXISTS subscribers (
    id uuid PRIMARY KEY,
    email text NOT NULL UNIQUE,
    source text,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
];
for (const statement of statements) {
  await sql.query(statement);
}
console.log("Neon tables are ready: subscribers, contact_messages");
