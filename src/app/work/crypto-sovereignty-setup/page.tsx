import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CheckoutButton } from "@/components/checkout-button";
import { crypto } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Crypto Sovereignty Setup",
  description: "Private 1:1 consulting for durable financial optionality.",
};

const thisIs = [
  "Systems-level financial education",
  "Hands-on, step-by-step setup",
  "Self-custody and security literacy",
  "Redundancy across multiple failure modes",
];

const thisIsNot = ["Trading advice", "Speculation coaching", "Yield strategies", "Asset management", "Custody of your funds"];

const empire = ["Currency debasement", "Capital controls", "Asset seizure", "Politicized finance", "Restricted movement of money"];

const audience = [
  "Founders and operators",
  "High-trust professionals",
  "Families seeking resilience",
  "Anyone sensing systemic instability who wants clarity, not noise",
];

export default function CryptoPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  return (
    <Suspense fallback={<CryptoOffer success={false} canceled={false} />}>
      <CryptoGate searchParams={searchParams} />
    </Suspense>
  );
}

async function CryptoGate({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const query = await searchParams;
  return <CryptoOffer success={query.success === "true"} canceled={query.canceled === "true"} />;
}

function CryptoOffer({ success, canceled }: { success: boolean; canceled: boolean }) {
  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="font-serif text-4xl" data-testid="text-success-title">
          Payment Successful
        </h1>
        <p className="mt-4 text-muted-foreground" data-testid="text-success-message">
          Thank you for your purchase. Book your initial session to get started.
        </p>
        <a
          href="https://calendar.app.google/edCrB3nVBTLVwXEK8"
          className="mt-8 inline-flex h-11 items-center rounded-lg bg-primary px-5 text-primary-foreground"
          data-testid="link-book-session"
        >
          Book Initial Session
        </a>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      {canceled ? (
        <p className="mb-8 rounded-lg border border-border bg-card p-4 text-sm" data-testid="card-payment-canceled">
          Your checkout was canceled. You can try again when you are ready.
        </p>
      ) : null}
      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="badge-offer-type">
        Private 1:1 Consulting
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl" data-testid="text-page-title">
        Crypto Sovereignty Setup
      </h1>
      <p className="mt-4 text-lg text-muted-foreground" data-testid="text-tagline">
        Private 1:1 consulting for durable financial optionality.
      </p>

      <div className="mt-10 aspect-video overflow-hidden rounded-lg">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/gbo0W_QiJyo?si=cFYItmfK7layAmgZ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          data-testid="video-context"
        />
      </div>

      <section className="mt-16">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-section-context">
          The Context
        </h2>
        <p className="mt-4 text-lg" data-testid="text-context-intro">
          Modern wealth exists inside permissioned systems.
        </p>
        <p className="mt-4 text-muted-foreground">
          Banks, brokers, payment rails, and currencies function only while institutional trust holds. History shows what happens late in empire cycles:
        </p>
        <Image
          src="/media/crypto-blueprint.png"
          alt="From Permissioned to Sovereign: The Crypto Setup Blueprint — a visual overview of the 3-session execution roadmap"
          width={2752}
          height={1536}
          className="mt-6 h-auto w-full rounded-lg"
          data-testid="img-crypto-blueprint"
        />
        <ul className="mt-6 space-y-2">
          {empire.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6">Crypto is not primarily an investment thesis.</p>
        <p className="mt-2 text-lg font-medium" data-testid="text-value-prop">
          It is an exit rail, a parallel financial system, and a sovereignty upgrade.
        </p>
        <p className="mt-4 text-muted-foreground">This service exists to move you from abstract awareness to correct execution.</p>
      </section>

      <section className="mt-16">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-section-what">
          What This Is — and Is Not
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border p-6" data-testid="card-this-is">
            <h3 className="font-medium">This Is</h3>
            <ul className="mt-3 space-y-2 text-sm">{thisIs.map((item) => <li key={item}>• {item}</li>)}</ul>
          </div>
          <div className="rounded-xl border border-border p-6" data-testid="card-this-is-not">
            <h3 className="font-medium">This Is Not</h3>
            <ul className="mt-3 space-y-2 text-sm">{thisIsNot.map((item) => <li key={item}>• {item}</li>)}</ul>
          </div>
        </div>
        <p className="mt-6 text-center italic" data-testid="text-goal">
          The goal is independence, not performance.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-section-assets">
          The Asset Stack
        </h2>
        <p className="mt-4 text-muted-foreground">This stack is designed for coverage, not convenience. No single asset solves every problem.</p>
        <div className="mt-6 space-y-4">
          {crypto.assets.map((asset) => (
            <div key={asset.name} className="rounded-xl border border-border p-5">
              <p className="text-xs tracking-wider text-muted-foreground uppercase">{asset.label}</p>
              <h3 className="mt-1 font-serif text-2xl">{asset.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{asset.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-section-wallets">
          Wallet Architecture
        </h2>
        <p className="mt-4 text-muted-foreground">There is no universal wallet. Security comes from separation, not consolidation.</p>
        <div className="mt-6 rounded-xl border border-border p-5" data-testid="card-hardware-wallet">
          <h3 className="font-medium">Hardware Wallet (Ledger or Trezor)</h3>
          <ul className="mt-3 list-disc pl-5 text-sm">
            {crypto.hardware.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4 rounded-xl border border-border p-5" data-testid="card-software-wallets">
          <h3 className="font-medium">Software Wallets</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {crypto.wallets.map((wallet) => (
              <li key={wallet.name}>
                <span className="font-medium">{wallet.name}.</span> {wallet.purpose}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-muted-foreground" data-testid="card-limitation">
          Important limitation: ZEC privacy cannot currently be combined with hardware cold storage. Privacy and cold isolation are separate threat models.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-section-sessions">
          How the Setup Works
        </h2>
        <ol className="mt-6 space-y-6">
          {crypto.sessions.map((session) => (
            <li key={session.number} className="rounded-xl border border-border p-5">
              <p className="text-xs tracking-wider text-muted-foreground uppercase">
                Session {session.number} · {session.duration}
              </p>
              <h3 className="mt-1 font-serif text-2xl">{session.title}</h3>
              <ul className="mt-3 list-disc pl-5 text-sm">
                {session.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium">{session.coreLesson}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-section-security">
          Security Is Explicitly Taught
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border p-5" data-testid="card-threats">
            <h3 className="font-medium">Threats Addressed</h3>
            <ul className="mt-3 list-disc pl-5 text-sm">
              {crypto.threats.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border p-5" data-testid="card-practices">
            <h3 className="font-medium">Practices Installed</h3>
            <ul className="mt-3 list-disc pl-5 text-sm">
              {crypto.practices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Security is treated as engineering, not paranoia.</p>
      </section>

      <section className="mt-16 rounded-xl border border-border p-6 text-center" data-testid="card-offer">
        <h2 className="font-serif text-3xl">Crypto Sovereignty Setup — Private 1:1</h2>
        <p className="mt-3 font-serif text-4xl" data-testid="text-price">
          $1,250 <span className="text-base text-muted-foreground">all-in</span>
        </p>
        <div className="mt-6 flex justify-center">
          <CheckoutButton />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">No upsells. No custody of your assets. No ongoing dependency.</p>
        <p className="mt-4">
          <a href="/media/sovereign-wealth-architecture.pdf" className="text-sm underline underline-offset-4" data-testid="link-slide-deck">
            View Slide Deck (PDF)
          </a>
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-section-who">
          Who This Is For
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {audience.map((item) => (
            <div key={item} className="rounded-xl border border-border p-4 text-sm">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          This is not for day traders or maximalists. It is for people who value optionality.
        </p>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-section-positioning">
          Positioning
        </h2>
        <p className="mt-4 text-lg">This service does not predict the future.</p>
        <p className="mt-2 text-xl font-medium">It prepares you for multiple futures simultaneously.</p>
        <p className="mt-4 text-muted-foreground">Financial sovereignty is not radical. It is structural.</p>
      </section>

      <footer className="mt-16 border-t border-border pt-8 text-xs leading-relaxed text-muted-foreground">
        <h3 className="text-xs font-medium tracking-wider uppercase" data-testid="text-compliance-heading">
          Educational Purpose Only
        </h3>
        <p className="mt-3">
          Crypto Sovereignty Setup is an educational and implementation service. It provides systems-level financial education and guided technical setup for digital asset self-custody. This program does not provide investment advice, trading recommendations, tax advice, legal advice, portfolio management, or asset custody services. No fiduciary relationship is created.
        </p>
        <p className="mt-3">
          All decisions to purchase, sell, transfer, or hold digital assets are made solely by the client. Clients maintain exclusive control over exchange accounts, wallets, private keys, seed phrases, and all digital assets. Digital assets are volatile and involve significant risk.
        </p>
        <p className="mt-4">
          <Link href="/work/crypto-sovereignty-setup/risk-disclosure" className="underline underline-offset-4" data-testid="link-risk-disclosure">
            Full Risk Disclosure
          </Link>
          {" · "}
          <Link href="/work" className="underline underline-offset-4">
            Back to Work
          </Link>
        </p>
      </footer>
    </article>
  );
}
