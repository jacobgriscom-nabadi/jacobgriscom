import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function EntryCard({
  href,
  title,
  summary,
  metadata,
  tags,
}: {
  href: string;
  title: string;
  summary: string;
  metadata?: string;
  tags?: string[];
}) {
  return (
    <Link href={href} className="group block rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted/40">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="font-serif text-2xl leading-tight group-hover:underline">{title}</h2>
        {metadata ? <span className="shrink-0 text-xs tracking-wider text-muted-foreground uppercase">{metadata}</span> : null}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
      {tags && tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
