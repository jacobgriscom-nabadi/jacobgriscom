import type { Metadata } from "next";
import { EntryCard } from "@/components/entry-card";
import { workList } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Work",
  description: "Professional initiatives and network nodes. Building infrastructure for connection and collaboration.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl font-medium tracking-tight">Work</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Professional initiatives and network nodes. Each represents a real-world application of coordination principles — building infrastructure for connection and collaboration.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workList.map((work) => (
          <EntryCard key={work.href} {...work} />
        ))}
      </div>
    </div>
  );
}
