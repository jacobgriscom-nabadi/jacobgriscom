import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getWork, workList } from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return workList
    .map((work) => work.href.replace("/work/", ""))
    .filter((slug) => slug !== "crypto-sovereignty-setup" && !slug.includes("/"))
    .filter((slug) => Boolean(getWork(slug)))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Work" };
  return { title: work.title, description: work.summary };
}

export default async function WorkDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <Link href="/work" className="text-sm text-muted-foreground hover:underline" data-testid="link-back-work">
        Back to Work
      </Link>
      <div className="mt-8 flex flex-wrap gap-2">
        {work.roles.map((role) => (
          <span key={role} className="rounded-full border border-border px-3 py-1 text-xs tracking-wider text-muted-foreground uppercase">
            {role}
          </span>
        ))}
      </div>
      <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight sm:text-5xl">{work.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{work.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {work.tags.map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
            <Badge variant="outline">{tag}</Badge>
          </Link>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">What It Is</h2>
        <p className="mt-3 leading-relaxed">{work.whatItIs}</p>
      </section>
      <section className="mt-10">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">What I Do</h2>
        <p className="mt-3 leading-relaxed">{work.whatIDo}</p>
      </section>
      <section className="mt-10">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Why It Matters</h2>
        <p className="mt-3 leading-relaxed">{work.whyItMatters}</p>
      </section>
      <section className="mt-10">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Current Initiatives</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {work.currentInitiatives.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      {work.externalLinks.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Links</h2>
          <ul className="mt-3 space-y-2">
            {work.externalLinks.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
