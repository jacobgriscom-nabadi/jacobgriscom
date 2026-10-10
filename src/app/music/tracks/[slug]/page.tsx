import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackPlayer } from "@/components/track-player";
import { Badge } from "@/components/ui/badge";
import { getTrack, neighborTracks, playlist } from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return playlist.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const track = getTrack(slug);
  if (!track) return { title: "Track" };
  return { title: track.title, description: track.summary };
}

export default async function TrackPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const track = getTrack(slug);
  if (!track) notFound();
  const { previous, next } = neighborTracks(slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <Link href="/music" className="text-sm text-muted-foreground hover:underline" data-testid="link-back-music">
        Back to Music
      </Link>
      <p className="mt-8 text-xs tracking-wider text-muted-foreground uppercase">{track.date}</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl" data-testid="text-audio-title">
        {track.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{track.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {track.tags.map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
            <Badge variant="outline">{tag}</Badge>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        AI-generated work shared as a creative journal. Not for commercial distribution.
      </p>
      <div className="mt-8">
        <TrackPlayer key={slug} tracks={playlist} initialSlug={slug} showList={false} />
      </div>
      {track.originalAudio ? (
        <p className="mt-4 text-sm">
          <a href={track.originalAudio} className="underline underline-offset-4" data-testid="link-original-recording">
            Original recording
          </a>
        </p>
      ) : null}
      {track.originalRecordingUrl ? (
        <p className="mt-4 text-sm">
          <a
            href={track.originalRecordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
            data-testid="link-original-recording"
          >
            {track.originalRecordingLabel || "Original recording"}
          </a>
        </p>
      ) : null}
      {track.notes ? <p className="mt-4 text-sm text-muted-foreground">{track.notes}</p> : null}
      {track.lyrics ? (
        <section className="mt-12">
          <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Lyrics</h2>
          <pre className="mt-4 font-serif text-base leading-relaxed whitespace-pre-wrap">{track.lyrics}</pre>
        </section>
      ) : null}
      {track.interpretation ? (
        <section className="mt-12">
          <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Interpretation</h2>
          <p className="mt-4 leading-relaxed">{track.interpretation}</p>
        </section>
      ) : null}
      <div className="mt-12 flex justify-between text-sm">
        {previous ? (
          <Link href={`/music/tracks/${previous.slug}`} className="underline underline-offset-4">
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/music/tracks/${next.slug}`} className="underline underline-offset-4" data-testid="link-next-track">
            {next.title}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
