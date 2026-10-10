import { NextResponse } from "next/server";
import { z } from "zod";
import { saveContact } from "@/lib/db";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Name, email, and a message are required." }, { status: 400 });
  }
  try {
    await saveContact({ ...parsed.data, email: parsed.data.email.toLowerCase() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Messages are unavailable until the database is connected." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
