import type { Metadata } from "next";
import { networkGroups } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Network",
  description: "People, communities, and connections.",
};

const groups = [
  { key: "communities" as const, title: "Communities" },
  { key: "professional" as const, title: "Professional" },
  { key: "collaborators" as const, title: "Collaborators" },
  { key: "familyFriends" as const, title: "Family & Friends" },
];

export default function NetworkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl">Network</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        People, communities, and connections. The relationships that shape the work.
      </p>
      {groups.map((group) => (
        <section key={group.key} className="mt-14">
          <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">{group.title}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {networkGroups[group.key].map((node) => (
              <article key={node.id} id={node.id} className="scroll-mt-24 rounded-xl border border-border p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-2xl">{node.name}</h3>
                  {node.relationship ? (
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">{node.relationship}</span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{node.summary}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  {"websiteUrl" in node && node.websiteUrl ? (
                    <a href={node.websiteUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" data-testid="link-website">
                      Website
                    </a>
                  ) : null}
                  {"additionalLinks" in node
                    ? node.additionalLinks?.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                          {link.label}
                        </a>
                      ))
                    : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
