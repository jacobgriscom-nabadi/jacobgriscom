import type { Metadata } from "next";
import { EntryCard } from "@/components/entry-card";
import { storyList } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Stories",
  description: "Collections and narratives that weave together themes of meaning, presence, and the pursuit of something greater.",
};

export default function StoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl font-medium tracking-tight">Stories</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Collections and narratives that weave together themes of meaning, presence, and the pursuit of something greater.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {storyList.map((story) => (
          <EntryCard key={story.href} {...story} />
        ))}
      </div>
    </div>
  );
}
