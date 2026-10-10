import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { socialLinks } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a question or want to connect? Reach out below.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl" data-testid="text-contact-heading">
        Contact
      </h1>
      <p className="mt-4 text-lg text-muted-foreground" data-testid="text-contact-subtitle">
        Have a question or want to connect? Reach out below.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
      <section className="mt-12">
        <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Connect on Social</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
