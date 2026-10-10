import type { Metadata } from "next";
import Link from "next/link";
import { TrackPlayer } from "@/components/track-player";
import { formatDuration } from "@/lib/media";
import { playlist, totalAudioSeconds } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Music",
  description: "A creative journal exploring poetry, rap, and AI-generated sound.",
};

export default function MusicPage() {
  const seconds = totalAudioSeconds();
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl font-medium tracking-tight">Music</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        A creative journal exploring the intersection of poetry, rap, and AI-generated sound. This is a personal process, not a commercial endeavor.
      </p>
      <p className="mt-4 text-sm text-muted-foreground" data-testid="text-music-stats">
        {playlist.length} tracks · {playlist.filter((track) => track.src).length} with audio · {formatDuration(seconds)} total
      </p>
      <div className="mt-10">
        <TrackPlayer tracks={playlist} />
      </div>
      <section className="mt-16">
        <h2 className="font-serif text-3xl">Selected Works</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          AI-generated works shared as a creative journal. These pieces are not offered for commercial distribution.
        </p>
        <ul className="mt-6 divide-y divide-border">
          {playlist.map((track) => (
            <li key={track.slug} className="py-4">
              <Link href={`/music/tracks/${track.slug}`} className="font-medium hover:underline">
                {track.title}
              </Link>
              <p className="text-sm text-muted-foreground">{track.summary}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/music/playlists" className="text-sm underline underline-offset-4">
            Playlists
          </Link>
        </p>
      </section>
      <section className="mt-16">
        <h2 className="font-serif text-3xl">The Process</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["Poetry", "It starts with words. Observations, insights, fragments of meaning distilled into verse."],
            ["Rap", "The poetry finds rhythm. Voice recordings capture the flow and intent of the words."],
            ["AI Generation", "AI tools transform the recordings into full productions, adding musical landscapes."],
            ["Curation", "Listen, feel, experiment and curate. The ideas in one poem can be explored in many ways."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-xl border border-border p-5">
              <h3 className="font-serif text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
