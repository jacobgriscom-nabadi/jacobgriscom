"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { SearchItem } from "@/lib/catalog";

export function SearchDialog({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items
      .filter((item) =>
        [item.title, item.summary, item.type, item.tags.join(" ")].join(" ").toLowerCase().includes(q),
      )
      .slice(0, 20);
  }, [items, query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Search the site" data-testid="button-search" />
        }
      >
        <Search />
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Search</DialogTitle>
          <DialogDescription>Stories, work, music, updates, and the network.</DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Nabadi, COMPART, presence…"
          data-testid="input-search"
          className="h-10"
        />
        <ul className="max-h-80 space-y-1 overflow-y-auto">
          {results.length === 0 ? (
            <li className="px-2 py-6 text-sm text-muted-foreground">Nothing matches that yet.</li>
          ) : (
            results.map((item) => (
              <li key={item.href + item.title}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2 hover:bg-muted"
                >
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {item.type}
                  </span>
                  <span className="block font-medium">{item.title}</span>
                  <span className="line-clamp-2 text-sm text-muted-foreground">{item.summary}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
