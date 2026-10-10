import fs from "fs";
import path from "path";
import books from "@/content/data/books.json";
import cryptoOffer from "@/content/data/crypto.json";
import cycles from "@/content/data/cycles.json";
import emotions from "@/content/data/emotions.json";
import films from "@/content/data/films.json";
import frameworks from "@/content/data/frameworks.json";
import homeSections from "@/content/data/home.json";
import libraryEntries from "@/content/data/library.json";
import linkMap from "@/content/data/linkMap.json";
import nav from "@/content/data/nav.json";
import network from "@/content/data/network.json";
import partners from "@/content/data/partners.json";
import related from "@/content/data/related.json";
import social from "@/content/data/social.json";
import stories from "@/content/data/stories.json";
import trackDetails from "@/content/data/trackDetails.json";
import tracks from "@/content/data/tracks.json";
import updates from "@/content/data/updates.json";
import workCards from "@/content/data/workCards.json";
import workPages from "@/content/data/work.json";
import { audioUrl } from "@/lib/media";

type TrackDetail = {
  title?: string;
  date?: string;
  toolsUsed?: string[];
  themes?: string[];
  tags?: string[];
  aiAudioSrc?: string;
  songLyrics?: string;
  lyrics?: string;
  interpretation?: string;
  originalRecordingUrl?: string;
  originalRecordingLabel?: string;
  originalRecordingAudioSrc?: string;
  notes?: string;
  instagramEmbedUrl?: string;
};

const details = trackDetails as Record<string, TrackDetail>;

function localAudio(src?: string) {
  const local = audioUrl(src);
  if (!local || !src) return undefined;
  const file = path.join(process.cwd(), "public", "audio", decodeURIComponent(local.replace("/audio/", "")));
  if (fs.existsSync(file)) return local;
  return `https://jacobgriscom.com${src}`;
}

export type SearchItem = {
  type: string;
  title: string;
  href: string;
  summary: string;
  tags: string[];
};

const storyFiles: Record<string, string> = {
  nabadi: "yN-nabadi.md",
  "life-arc": "yN-life-arc.md",
  "my-political-journey": "yN-my-political-journey.md",
  utopia: "yN-utopia.md",
};

export const siteNav = nav;
export const socialLinks = social;
export const home = homeSections;
export const storyList = stories;
export const workList = workCards;
export const updateList = updates;
export const libraryList = libraryEntries;
export const networkGroups = network;
export const partnerCommunities = partners;
export const bookList = books;
export const filmList = films;
export const emotionClusters = emotions;
export const identityCycles = cycles;
export const lenses = frameworks;
export const contentLinks = [...linkMap].sort((a, b) => b.pattern.length - a.pattern.length);
export const crypto = cryptoOffer;

export const playlist = tracks.map((track) => ({
  ...track,
  src: audioUrl(track.src) ?? track.src,
}));

export function getStory(slug: string) {
  return stories.find((story) => story.href.endsWith(`/${slug}`));
}

export function getStoryBody(slug: string) {
  const file = storyFiles[slug];
  const story = getStory(slug);
  if (!file || !story) return null;
  const full = fs.readFileSync(path.join(process.cwd(), "src/content/stories", file), "utf8");
  let body = full.replace(/^#\s+.+\n+/, "");
  const summary = story.summary.replace(/\s+/g, " ").trim();
  const blocks = body.split(/\n{2,}/);
  if (blocks[0] && blocks[0].replace(/\s+/g, " ").trim() === summary) {
    blocks.shift();
  }
  body = blocks.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
  return body;
}

export function getStoryRelated(slug: string) {
  return related[slug as keyof typeof related] ?? [];
}

export function getWork(slug: string) {
  return workPages[slug as keyof typeof workPages];
}

export function getUpdate(slug: string) {
  return updates.find((update) => update.slug === slug);
}

export function getTrack(slug: string) {
  const play = playlist.find((track) => track.slug === slug);
  const detail = details[slug];
  if (!play && !detail) return null;
  return {
    slug,
    title: detail?.title ?? play?.title ?? slug,
    summary: play?.summary ?? detail?.interpretation ?? "",
    date: detail?.date ?? play?.metadata,
    tags: detail?.tags ?? play?.tags ?? [],
    themes: detail?.themes ?? [],
    toolsUsed: detail?.toolsUsed ?? [],
    src: audioUrl(detail?.aiAudioSrc ?? play?.src) ?? play?.src,
    duration: play?.duration,
    lyrics: detail?.songLyrics || detail?.lyrics || "",
    interpretation: detail?.interpretation ?? "",
    originalRecordingUrl: detail?.originalRecordingUrl,
    originalRecordingLabel: detail?.originalRecordingLabel,
    originalAudio: localAudio(detail?.originalRecordingAudioSrc),
    notes: detail?.notes,
    instagramEmbedUrl: detail?.instagramEmbedUrl,
  };
}

export function neighborTracks(slug: string) {
  const index = playlist.findIndex((track) => track.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: playlist[index - 1],
    next: playlist[index + 1],
  };
}

export function searchIndex(): SearchItem[] {
  const items: SearchItem[] = [
    ...stories.map((story) => ({
      type: "story",
      title: story.title,
      href: story.href,
      summary: story.summary,
      tags: story.tags,
    })),
    ...workCards.map((work) => ({
      type: "work",
      title: work.title,
      href: work.href,
      summary: work.summary,
      tags: work.tags,
    })),
    ...playlist.map((track) => ({
      type: "music",
      title: track.title,
      href: `/music/tracks/${track.slug}`,
      summary: track.summary,
      tags: track.tags,
    })),
    ...updates.map((update) => ({
      type: "update",
      title: update.title,
      href: `/updates#${update.slug}`,
      summary: update.summary,
      tags: update.tags,
    })),
    ...libraryEntries.map((entry) => ({
      type: "library",
      title: entry.title,
      href: `/library#${entry.slug}`,
      summary: entry.summary,
      tags: entry.tags,
    })),
    ...network.communities.map((node) => ({
      type: "network",
      title: node.name,
      href: `/network#${node.id}`,
      summary: node.summary,
      tags: ["community"],
    })),
    ...network.professional.map((node) => ({
      type: "network",
      title: node.name,
      href: `/network#${node.id}`,
      summary: node.summary,
      tags: ["professional"],
    })),
    ...network.collaborators.map((node) => ({
      type: "network",
      title: node.name,
      href: `/network#${node.id}`,
      summary: node.summary,
      tags: ["collaborator"],
    })),
    ...network.familyFriends.map((node) => ({
      type: "network",
      title: node.name,
      href: `/network#${node.id}`,
      summary: node.summary,
      tags: ["family"],
    })),
  ];
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.href + item.title)) return false;
    seen.add(item.href + item.title);
    return true;
  });
}

export function allTags() {
  const counts = new Map<string, number>();
  for (const item of searchIndex()) {
    for (const tag of item.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

export function itemsByTag(tag: string) {
  const needle = decodeURIComponent(tag).toLowerCase();
  return searchIndex().filter((item) => item.tags.some((value) => value.toLowerCase() === needle));
}

export function totalAudioSeconds() {
  return playlist.reduce((sum, track) => sum + (track.duration ?? 0), 0);
}
