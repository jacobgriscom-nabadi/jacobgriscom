import { NextResponse } from "next/server";
import { z } from "zod";
import { saveSubscriber } from "@/lib/db";

const bodySchema = z.object({
  email: z.string().trim().email().max(320),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  try {
    await saveSubscriber(parsed.data.email.toLowerCase(), "footer");
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Subscriptions are unavailable until the database is connected." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
