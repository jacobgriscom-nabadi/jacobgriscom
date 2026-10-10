import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Message Received" };

export default function ContactThanksPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center" data-testid="container-contact-thank-you">
      <h1 className="font-serif text-4xl" data-testid="text-contact-thank-you-heading">
        Message Received
      </h1>
      <p className="mt-4 text-muted-foreground" data-testid="text-contact-thank-you-message">
        Thank you for reaching out. I&apos;ll review your message and reply when I can.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button nativeButton={false} render={<Link href="/" />} data-testid="button-contact-back-home">
          Back home
        </Button>
        <Button nativeButton={false} variant="outline" render={<Link href="/updates" />} data-testid="button-contact-explore">
          Read Now
        </Button>
      </div>
    </div>
  );
}
