import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";
import { socialLinks } from "@/lib/catalog";

const explore = [
  { label: "Stories", href: "/stories" },
  { label: "Work", href: "/work" },
  { label: "Music", href: "/music" },
];

const more = [
  { label: "Now", href: "/updates" },
  { label: "Awareness", href: "/library" },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="mb-12 max-w-md border-b border-border pb-12">
          <h3 className="font-serif text-xl font-medium" data-testid="text-stay-connected">
            Stay Connected
          </h3>
          <p className="mt-2 mb-6 text-sm text-muted-foreground" data-testid="text-stay-connected-description">
            Occasional updates on work, music, and reflections. No spam, just meaningful connection.
          </p>
          <SubscribeForm />
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-lg font-medium" data-testid="link-footer-home">
              Jacob Griscom
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Stories, work, music, networks, and awareness — a living map of interconnected ideas.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">More</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {more.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">Connect</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/partners" className="hover:text-foreground hover:underline" data-testid="link-footer-partners">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span>© {2026} Jacob Griscom</span>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/colophon" className="hover:underline">
            Colophon
          </Link>
        </div>
      </div>
    </footer>
  );
}
