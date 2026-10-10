import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this site handles your data.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl">Privacy</h1>
      <p className="mt-4 text-muted-foreground">How this site handles your data.</p>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">No Tracking</h2>
        <p className="mt-3 leading-relaxed">
          This site does not use third-party analytics or advertising cookies. There is no surveillance of ordinary reading.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Contact and subscriptions</h2>
        <p className="mt-3 leading-relaxed">
          If you send a message or subscribe, your name and email are stored in a Neon Postgres database so I can reply or send the occasional update. That information is not sold or shared for marketing.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Payments</h2>
        <p className="mt-3 leading-relaxed">
          Book purchases go through PayPal. Crypto Sovereignty Setup, when checkout is enabled, goes through Stripe. Those companies process payment details on their own sites.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Hosting</h2>
        <p className="mt-3 leading-relaxed">
          The site is hosted on Vercel. Standard request logs may include IP addresses and request times for security and operations. Those logs are not used to build a profile of visitors.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">External links</h2>
        <p className="mt-3 leading-relaxed">
          Some pages link to COMPART, DebateHUB, social platforms, and other sites. Those sites have their own privacy policies.
        </p>
      </section>
      <p className="mt-10 text-sm">
        Questions? <Link href="/contact" className="underline underline-offset-4">Use the contact page</Link>.
      </p>
    </article>
  );
}
