import type { Metadata } from "next";
import Link from "next/link";
import { TrackPlayer } from "@/components/track-player";
import { playlist } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Playlists",
  description: "The full creative journal, in catalog order.",
};

export default function PlaylistsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <Link href="/music" className="text-sm text-muted-foreground hover:underline">
        Back to Music
      </Link>
      <h1 className="mt-8 font-serif text-4xl">Playlists</h1>
      <p className="mt-4 text-muted-foreground">
        Curated listening lives on this site. The complete works play in catalog order — a personal journal, not a commercial release.
      </p>
      <div className="mt-10">
        <TrackPlayer tracks={playlist} />
      </div>
    </div>
  );
}
