import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Asset Risk Disclosure",
  description: "Risks acknowledged by participating in Crypto Sovereignty Setup.",
};

const sections = [
  {
    title: "1. Market Risk",
    body: "Digital assets (including BTC, ETH, SOL, ZEC, USDC, and others) are highly volatile. Prices may fluctuate dramatically over short periods. You may lose part or all of your invested capital.",
  },
  {
    title: "2. Regulatory Risk",
    body: "Digital asset regulation is evolving. Future laws, regulations, or government actions may restrict access, limit transfers, affect taxation, impact exchange operations, or influence asset value. No guarantees are made regarding regulatory stability.",
  },
  {
    title: "3. Custodial Risk",
    body: "Exchanges are third-party custodians. They may freeze accounts, limit withdrawals, experience insolvency, or be hacked. Clients are educated to reduce custodial exposure but assume this risk when using exchanges.",
  },
  {
    title: "4. Self-Custody Risk",
    body: "When using private wallets, loss of a seed phrase means permanent loss of assets. Improper storage may result in theft. Phishing or malware may compromise funds. There is no recovery hotline in decentralized systems. You accept responsibility for secure storage of private keys and seed phrases.",
  },
  {
    title: "5. Stablecoin Risk (USDC)",
    body: "USDC relies on centralized issuance and underlying reserves. Risks include issuer risk, banking partner risk, temporary de-pegging, and regulatory intervention. USDC is not FDIC insured.",
  },
  {
    title: "6. Privacy Asset Risk (ZEC)",
    body: "Privacy-enhanced assets may face exchange delisting, regulatory scrutiny, or reduced liquidity. Clients assume this risk knowingly.",
  },
  {
    title: "7. Technology Risk",
    body: "Blockchain systems may experience software bugs, network congestion, smart contract vulnerabilities, forks, or protocol changes. No system is immune to failure.",
  },
  {
    title: "8. No Guarantees",
    body: "Crypto Sovereignty Setup does not guarantee profit, asset appreciation, regulatory protection, or immunity from loss. The purpose of this program is structural resilience and financial optionality — not performance outcomes.",
  },
  {
    title: "9. Client Responsibility",
    body: "You are solely responsible for all transactions. You control your accounts and wallets. No assets are ever transferred to or held by the consultant. All decisions are yours alone.",
  },
  {
    title: "10. Affirmation",
    body: "By proceeding, you confirm that you understand the risks of digital assets, you are participating voluntarily, you are not relying on this program for investment advice, and you accept full responsibility for custody and asset decisions.",
  },
];

export default function RiskDisclosurePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl" data-testid="text-risk-title">
        Digital Asset Risk Disclosure
      </h1>
      <p className="mt-4 text-muted-foreground">By participating in Crypto Sovereignty Setup, you acknowledge and understand the following.</p>
      <div className="mt-10 space-y-8" data-testid="disclaimer">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-serif text-2xl">{section.title}</h2>
            <p className="mt-2 leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-12">
        <Link href="/work/crypto-sovereignty-setup" className="text-sm underline underline-offset-4" data-testid="link-back-sales">
          Back to Crypto Sovereignty Setup
        </Link>
      </p>
    </article>
  );
}
