export function audioUrl(src?: string | null) {
  if (!src) return undefined;
  if (src.startsWith("http")) return src;
  const file = src.split("/").pop();
  if (!file) return undefined;
  return `/audio/${encodeURIComponent(file)}`;
}

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
