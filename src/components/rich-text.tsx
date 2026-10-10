import Link from "next/link";
import { contentLinks } from "@/lib/catalog";

const pattern = new RegExp(
  contentLinks.map((link) => link.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "g",
);

function linkify(text: string) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const found = contentLinks.find((link) => link.pattern === match[0]);
    if (found) {
      nodes.push(
        found.external ? (
          <a key={`${start}-${found.href}`} href={found.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            {match[0]}
          </a>
        ) : (
          <Link key={`${start}-${found.href}`} href={found.href} className="underline underline-offset-4">
            {match[0]}
          </Link>
        ),
      );
    }
    last = start + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function RichText({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  return (
    <div className="prose-jg">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{linkify(paragraph)}</p>
      ))}
    </div>
  );
}
