"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SearchDialog } from "@/components/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SearchItem } from "@/lib/catalog";

const links = [
  { label: "Stories", href: "/stories" },
  { label: "Work", href: "/work" },
  { label: "Music", href: "/music" },
  { label: "Now", href: "/updates" },
  { label: "Awareness", href: "/library" },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6 sm:px-8">
        <Link href="/" className="font-serif text-lg font-medium tracking-tight" data-testid="link-home-logo">
          Jacob Griscom
        </Link>
        <nav className="ml-auto hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <SearchDialog items={items} />
          <ThemeToggle />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className="md:hidden"
              render={<Button variant="ghost" size="icon" aria-label="Open menu" data-testid="button-mobile-menu" />}
            >
              <Menu />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">Menu</DialogTitle>
              </DialogHeader>
              <nav className="flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2 text-base hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
