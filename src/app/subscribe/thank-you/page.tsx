import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Thank You" };

export default function SubscribeThanksPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center" data-testid="container-thank-you">
      <h1 className="font-serif text-4xl" data-testid="text-thank-you-heading">
        Thank You
      </h1>
      <p className="mt-4 text-muted-foreground" data-testid="text-thank-you-message">
        You&apos;re now on the list. I&apos;ll be in touch with updates, reflections, and the occasional piece of music.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button nativeButton={false} render={<Link href="/" />} data-testid="button-back-home">
          Back home
        </Button>
        <Button nativeButton={false} variant="outline" render={<Link href="/updates" />} data-testid="button-explore-updates">
          Explore updates
        </Button>
      </div>
    </div>
  );
}
