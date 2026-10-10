import type { Metadata } from "next";
import Link from "next/link";
import { EntryCard } from "@/components/entry-card";
import { allTags, itemsByTag } from "@/lib/catalog";

type Params = { tag: string };

export function generateStaticParams() {
  return allTags().map(([tag]) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Tagged: ${decodeURIComponent(tag)}` };
}

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  const items = itemsByTag(label);
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">
        Back
      </Link>
      <h1 className="mt-8 font-serif text-4xl">Tagged: {label}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "item" : "items"} found
      </p>
      {items.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No content found with this tag.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <EntryCard key={item.href + item.title} href={item.href} title={item.title} summary={item.summary} metadata={item.type} tags={item.tags} />
          ))}
        </div>
      )}
    </div>
  );
}
