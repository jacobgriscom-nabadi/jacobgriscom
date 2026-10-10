import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colophon",
  description: "Notes on how this site is built.",
};

export default function ColophonPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl">Colophon</h1>
      <p className="mt-4 text-muted-foreground">Notes on how this site is built.</p>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Technology</h2>
        <p className="mt-3 leading-relaxed">
          This site is a Next.js application written in TypeScript and styled with Tailwind CSS. The source lives on GitHub. It is hosted on Vercel. Contact messages and newsletter subscriptions are stored in Neon Postgres. Payments, when enabled, use Stripe and PayPal.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Typography</h2>
        <p className="mt-3 leading-relaxed">
          Headlines and longform reading use Lora. Interface text uses Inter. Code samples use JetBrains Mono.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Design Philosophy</h2>
        <p className="mt-3 leading-relaxed">
          The goal is calm, contemplative, intellectually sophisticated. Think literary magazine meets personal notebook. No heavy animations, no cluttered interfaces — just clear hierarchy and ample breathing room.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Content</h2>
        <p className="mt-3 leading-relaxed">
          Writing, music notes, and project descriptions live in the repository as structured content, so the site can be updated without a separate CMS. It is a living document.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Inspiration</h2>
        <p className="mt-3 leading-relaxed">
          Design inspiration draws from Apple&apos;s Human Interface Guidelines, Medium&apos;s editorial approach, and the principle that every element should serve the content.
        </p>
      </section>
      <p className="mt-10 text-sm">
        <Link href="/" className="underline underline-offset-4">Back to Home</Link>
      </p>
    </article>
  );
}
