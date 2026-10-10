import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grow Your Ayurvedic Business",
  description: "A comprehensive guide to building a successful Ayurvedic practice. Includes a digital copy and an optional coaching session.",
};

const contents = [
  "Getting Started",
  "Step 1: Map Your Market",
  "Step 2: The Committed Client Formula",
  "Step 3: The Sales Sadhana System",
  "Step 4: Multiply Your Marketing",
  "Step 5: Advanced Profit Growth",
];

export default function BookPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <div className="aspect-video overflow-hidden rounded-lg" data-testid="embed-promo-video">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/Kw2ZQgUnfDU"
          title="Grow Your Ayurvedic Business: Short Promotion"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="mt-12 grid items-start gap-8 md:grid-cols-[220px_1fr]">
        <div
          className="flex aspect-[3/4] items-end rounded-md bg-foreground p-6 text-background"
          data-testid="img-book-cover"
          role="img"
          aria-label="Grow Your Ayurvedic Business"
        >
          <div>
            <p className="text-xs tracking-widest uppercase opacity-70">Jacob Griscom</p>
            <p className="mt-2 font-serif text-3xl leading-tight">Grow Your Ayurvedic Business</p>
          </div>
        </div>
        <div>
          <h1 className="font-serif text-5xl" data-testid="text-price">
            $20.00
          </h1>
          <p className="mt-4 text-lg text-muted-foreground" data-testid="text-description">
            Includes (1) digital copy and an optional 1-hour complimentary Grow Your Ayurvedic Business coaching session with Jacob Griscom.
          </p>
          <h2 className="mt-8 text-xs font-medium tracking-wider text-muted-foreground uppercase" data-testid="text-contents-label">
            Contents
          </h2>
          <ul className="mt-3 space-y-2" data-testid="list-contents">
            {contents.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground" data-testid="text-contents-note">
            Each section includes detailed homework, worksheets, and templates.
          </p>
        </div>
      </div>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
        className="mt-12 flex justify-center"
        data-testid="form-paypal"
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="UNMMQAWV9YJD4" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
          name="submit"
          alt="PayPal - The safer, easier way to pay online!"
          className="cursor-pointer"
          data-testid="button-paypal-buy"
        />
      </form>
    </article>
  );
}
