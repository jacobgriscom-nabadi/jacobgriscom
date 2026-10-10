import Link from "next/link";
import { home } from "@/lib/catalog";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24">
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Root identity node</p>
      <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight font-medium tracking-tight sm:text-5xl lg:text-6xl">
        Stories, work, music, and networks — a living map of interconnected ideas.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Welcome. This is a root identity node, a place where threads come together.
      </p>
      <h2 className="mt-16 text-xs font-medium tracking-wider text-muted-foreground uppercase">Explore</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {home.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
          >
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-2xl">{section.title}</h3>
              <span className="text-xs tracking-wider text-muted-foreground uppercase">{section.metadata}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{section.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
