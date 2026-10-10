import type { MetadataRoute } from "next";
import { libraryList, playlist, storyList, updateList, workList } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jacobgriscom.com";
  const staticRoutes = [
    "",
    "/stories",
    "/work",
    "/music",
    "/music/playlists",
    "/network",
    "/updates",
    "/library",
    "/contact",
    "/privacy",
    "/colophon",
    "/partners",
    "/grow-your-ayurvedic-business",
    "/work/crypto-sovereignty-setup",
    "/work/crypto-sovereignty-setup/risk-disclosure",
  ];
  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path || "/"}` })),
    ...storyList.map((story) => ({ url: `${base}${story.href}` })),
    ...workList.map((work) => ({ url: `${base}${work.href}` })),
    ...playlist.map((track) => ({ url: `${base}/music/tracks/${track.slug}` })),
    ...updateList.map((update) => ({ url: `${base}/updates#${update.slug}` })),
    ...libraryList.map((entry) => ({ url: `${base}/library#${entry.slug}` })),
  ];
}
