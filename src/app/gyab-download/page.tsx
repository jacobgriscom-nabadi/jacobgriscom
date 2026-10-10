import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download — Grow Your Ayurvedic Business",
  description: "Download your copy and schedule the complimentary coaching session.",
};

export default function DownloadPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl">Thank You for Your Purchase!</h1>
      <p className="mt-4 text-muted-foreground">
        Your purchase of Grow Your Ayurvedic Business was successful. Complete these two steps before you leave.
      </p>
      <section className="mt-10 rounded-xl border border-border p-6">
        <p className="text-xs tracking-wider text-muted-foreground uppercase" data-testid="badge-step-1">
          Step 1
        </p>
        <h2 className="mt-2 font-serif text-2xl" data-testid="text-step-1-title">
          Download Your Digital Copy
        </h2>
        <p className="mt-2 text-sm text-muted-foreground" data-testid="text-step-1-description">
          The PDF version of the book.
        </p>
        <a
          href="/media/grow-your-ayurvedic-business.pdf"
          className="mt-4 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm text-primary-foreground"
          data-testid="link-download-pdf"
        >
          Download PDF
        </a>
      </section>
      <section className="mt-6 rounded-xl border border-border p-6">
        <p className="text-xs tracking-wider text-muted-foreground uppercase" data-testid="badge-step-2">
          Step 2
        </p>
        <h2 className="mt-2 font-serif text-2xl" data-testid="text-step-2-title">
          Schedule Your Coaching Session
        </h2>
        <p className="mt-2 text-sm text-muted-foreground" data-testid="text-step-2-description">
          Book your optional complimentary 1-hour Grow Your Ayurvedic Business coaching call.
        </p>
        <a
          href="https://portal.rb-com.com/jacob-griscom"
          className="mt-4 inline-flex text-sm underline underline-offset-4"
          data-testid="link-schedule-call"
        >
          Schedule Call
        </a>
      </section>
    </article>
  );
}
