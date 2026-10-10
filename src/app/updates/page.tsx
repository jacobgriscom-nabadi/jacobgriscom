import type { Metadata } from "next";
import Link from "next/link";
import { RichText } from "@/components/rich-text";
import { Badge } from "@/components/ui/badge";
import { updateList } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Now",
  description: "Notes on what I'm working on, learning, and thinking about.",
};

export default function UpdatesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl">Now</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Notes on what I&apos;m working on, learning, and thinking about. Short dispatches from the current arc.
      </p>
      <div className="mt-12 space-y-16">
        {updateList.map((update) => (
          <article key={update.slug} id={update.slug} className="scroll-mt-24 border-t border-border pt-10">
            <p className="text-xs tracking-wider text-muted-foreground uppercase">{update.date}</p>
            <h2 className="mt-2 font-serif text-3xl">{update.title}</h2>
            <p className="mt-3 text-muted-foreground">{update.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {update.tags.map((tag) => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                  <Badge variant="outline">{tag}</Badge>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <RichText text={update.content} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
