"use client";

import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/media";

export type Playable = {
  slug: string;
  title: string;
  src: string;
  duration?: number;
  summary?: string;
};

export function TrackPlayer({
  tracks,
  initialSlug,
  showList = true,
}: {
  tracks: Playable[];
  initialSlug?: string;
  showList?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const slugIndex = Math.max(
    0,
    tracks.findIndex((track) => track.slug === initialSlug),
  );
  const [picked, setPicked] = useState<number | null>(null);
  const index = picked ?? (initialSlug ? slugIndex : 0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(tracks[0]?.duration ?? 0);
  const [muted, setMuted] = useState(false);
  const current = tracks[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    audio.src = current.src;
    audio.load();
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, current]);

  if (!current) return null;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play();
      setPlaying(true);
    }
  }

  function go(next: number) {
    const wrapped = (next + tracks.length) % tracks.length;
    setPicked(wrapped);
    setTime(0);
    setPlaying(true);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <audio
        ref={audioRef}
        preload="metadata"
        muted={muted}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setLength(event.currentTarget.duration || current.duration || 0)}
        onEnded={() => go(index + 1)}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-playlist-header">
            Now playing
          </p>
          <h2 className="font-serif text-2xl" data-testid="text-current-title">
            <Link href={`/music/tracks/${current.slug}`} className="hover:underline">
              {current.title}
            </Link>
          </h2>
          {current.summary ? (
            <p className="mt-1 text-sm text-muted-foreground" data-testid="text-current-summary">
              {current.summary}
            </p>
          ) : null}
        </div>
        <p className="text-xs text-muted-foreground" data-testid="text-total-duration">
          {tracks.length} tracks
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Previous track" data-testid="button-previous" onClick={() => go(index - 1)}>
          <SkipBack />
        </Button>
        <Button size="icon" aria-label={playing ? "Pause" : "Play"} data-testid="button-play-pause" onClick={toggle}>
          {playing ? <Pause /> : <Play />}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Next track" data-testid="button-next" onClick={() => go(index + 1)}>
          <SkipForward />
        </Button>
        <span className="w-12 text-xs tabular-nums text-muted-foreground" data-testid="text-time-current">
          {formatDuration(time)}
        </span>
        <input
          aria-label="Seek"
          data-testid="slider-seek"
          className="h-1 flex-1 accent-primary"
          type="range"
          min={0}
          max={length || 0}
          step={0.1}
          value={Math.min(time, length || 0)}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (audioRef.current) audioRef.current.currentTime = value;
            setTime(value);
          }}
        />
        <span className="w-12 text-right text-xs tabular-nums text-muted-foreground" data-testid="text-time-duration">
          {formatDuration(length || current.duration || 0)}
        </span>
        <Button variant="ghost" size="icon" aria-label={muted ? "Unmute" : "Mute"} data-testid="button-mute" onClick={() => setMuted((value) => !value)}>
          {muted ? <VolumeX /> : <Volume2 />}
        </Button>
      </div>
      {showList ? (
        <ol className="mt-4 max-h-72 divide-y divide-border overflow-y-auto border-t border-border">
          {tracks.map((track, trackIndex) => (
            <li key={track.slug}>
              <button
                type="button"
                onClick={() => {
                  setPicked(trackIndex);
                  setTime(0);
                  setPlaying(true);
                }}
                className={`flex w-full items-center justify-between gap-3 px-1 py-2 text-left text-sm hover:bg-muted ${
                  trackIndex === index ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span>
                  {trackIndex + 1}. {track.title}
                </span>
                <span className="tabular-nums" data-testid={`text-duration-${track.slug}`}>
                  {track.duration ? formatDuration(track.duration) : ""}
                </span>
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
