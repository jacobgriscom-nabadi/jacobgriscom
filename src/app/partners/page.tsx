import type { Metadata } from "next";
import Link from "next/link";
import { partnerCommunities } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Partners",
  description: "Paths for aligned collaboration across awareness, community, and work.",
};

export default function PartnersPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl" data-testid="text-partners-title">
        Partners
      </h1>
      <p className="mt-4 text-lg text-muted-foreground" data-testid="text-partners-subtitle">
        Paths for aligned collaboration across awareness, community, and work.
      </p>

      <section className="mt-12" data-testid="section-awareness">
        <h2 className="font-serif text-2xl" data-testid="text-awareness-heading">
          1. Awareness
        </h2>
        <p className="mt-3 leading-relaxed">
          This is for people committed to living more completely, honestly, originally, and presently. People engaged in the work of becoming finer human beings. People willing to leave some coarseness behind: fear, anger, blame, pettiness, separation.
        </p>
        <p className="mt-3 leading-relaxed">
          Awareness here is not a belief system or identity. It is a daily practice of attention, responsibility, and inner truthfulness.
        </p>
        <p className="mt-4">
          <Link href="/library" className="underline underline-offset-4" data-testid="link-awareness-library">
            Explore the Awareness Library
          </Link>
        </p>
      </section>

      <section className="mt-12" data-testid="section-communities">
        <h2 className="font-serif text-2xl" data-testid="text-communities-heading">
          2. Communities
        </h2>
        <div className="mt-6 space-y-6">
          {partnerCommunities.map((community) => (
            <div key={community.name}>
              <h3 className="font-medium">{community.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{community.description}</p>
              <p className="mt-2 text-sm">
                <Link href={community.href} className="underline underline-offset-4">
                  On this site
                </Link>
                {"external" in community && community.external ? (
                  <>
                    {" · "}
                    <a href={community.external} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                      Visit
                    </a>
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12" data-testid="section-wealth-work">
        <h2 className="font-serif text-2xl" data-testid="text-wealth-work-heading">
          3. Wealth and Work
        </h2>
        <p className="mt-3 leading-relaxed">
          If you are aligned with any of my active projects or platforms, there are paths to work and earn together.
        </p>
        <p className="mt-3 leading-relaxed">
          Engagement is interest-led and contribution-based. Connections open through shared alignment, demonstrated capability, and mutual value creation.
        </p>
        <p className="mt-3 leading-relaxed">
          Reach out through my socials or reply to any update email with your areas of interest. Relevant doors open from there.
        </p>
        <p className="mt-4">
          <Link href="/contact" className="underline underline-offset-4" data-testid="link-contact-page">
            Get in touch
          </Link>
        </p>
      </section>
    </article>
  );
}
