import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Checkout is not configured yet. Add STRIPE_SECRET_KEY on Vercel to enable payment." },
      { status: 503 },
    );
  }

  const stripe = new Stripe(secret);
  const origin =
    request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://jacobgriscom.com";

  const lineItem = process.env.STRIPE_PRICE_ID
    ? { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
    : {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: 125000,
          product_data: {
            name: "Crypto Sovereignty Setup — Private 1:1",
            description: "Three sessions covering exchange setup, software wallets, and cold storage.",
          },
        },
      };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [lineItem],
    success_url: `${origin}/work/crypto-sovereignty-setup?success=true`,
    cancel_url: `${origin}/work/crypto-sovereignty-setup?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
