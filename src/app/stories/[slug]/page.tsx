import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { getStory, getStoryBody, getStoryRelated, storyList } from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return storyList.map((story) => ({ slug: story.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Story" };
  return { title: story.title, description: story.summary };
}

export default async function StoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const story = getStory(slug);
  const body = getStoryBody(slug);
  if (!story || !body) notFound();
  const related = getStoryRelated(slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <Link href="/stories" className="text-sm text-muted-foreground hover:underline" data-testid="link-back-stories">
        Back to Stories
      </Link>
      <p className="mt-8 text-xs font-medium tracking-wider text-muted-foreground uppercase">{story.metadata}</p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">{story.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{story.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {story.tags.map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
            <Badge variant="outline">{tag}</Badge>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <Markdown>{body}</Markdown>
      </div>
      {related.length > 0 ? (
        <section className="mt-16 border-t border-border pt-8">
          <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Related</h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-medium hover:underline">
                  {item.title}
                </Link>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
