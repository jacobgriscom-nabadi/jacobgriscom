import type { Metadata } from "next";
import Link from "next/link";
import { RichText } from "@/components/rich-text";
import {
  bookList,
  emotionClusters,
  filmList,
  identityCycles,
  lenses,
  libraryList,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Awareness",
  description: "Explorations of perception, meditation, and the gradual release of interference.",
};

export default function LibraryPage() {
  const essays = libraryList.filter((entry) => "content" in entry && entry.content);
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <h1 className="font-serif text-4xl">Awareness</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Explorations of perception, meditation, and the gradual release of interference.
      </p>
      <p className="mt-4 text-muted-foreground">
        These frameworks and perspectives come from my work with my teacher,{" "}
        <Link href="/network#justin-gold" className="underline underline-offset-4" data-testid="link-library-justin">
          J Jaye Gold (Justin)
        </Link>
        , explored and practiced in the field of my own life and the laboratory of my community of peers in the{" "}
        <Link href="/network#servants-heroes" className="underline underline-offset-4" data-testid="link-library-school">
          School for Servants & Heroes
        </Link>
        .
      </p>

      {essays.map((entry) => (
        <article key={entry.slug} id={entry.slug} className="mt-14 scroll-mt-24">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">{entry.date}</p>
          <h2 className="mt-2 font-serif text-3xl">{entry.title}</h2>
          <p className="mt-3 text-muted-foreground">{entry.summary}</p>
          {"content" in entry && entry.content ? (
            <div className="mt-6">
              <RichText text={entry.content} />
            </div>
          ) : null}
        </article>
      ))}

      <article id="the-i" className="mt-16 scroll-mt-24 border-t border-border pt-10">
        <h2 className="font-serif text-3xl">Humans Are Misrepresented as a Single Thing</h2>
        <p className="mt-3 text-muted-foreground">
          A language for exploration. A human life is expressed through many selves, and each one takes the position of &quot;I&quot; when it is active. These loops name the pattern so it can be seen in real time.
        </p>
        <div className="mt-6 space-y-4">
          {identityCycles.map((cycle) => (
            <details key={cycle.title} className="rounded-xl border border-border p-4">
              <summary className="cursor-pointer font-medium">{cycle.title}</summary>
              <p className="mt-2 text-sm text-muted-foreground">Trigger: {cycle.trigger}</p>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
                {cycle.steps.map((step) => (
                  <li key={step.label}>
                    {step.label}
                    {step.interruptPoint ? " — interrupt point" : ""}
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-sm">
                {cycle.numbers}. Failure mode: {cycle.failureMode}.
              </p>
            </details>
          ))}
        </div>
      </article>

      <article id="negative-emotion-cycles" className="mt-16 scroll-mt-24 border-t border-border pt-10">
        <h2 className="font-serif text-3xl">Real Time Data from Negative Emotion Cycles</h2>
        <p className="mt-3 text-muted-foreground">
          Compound emotional states decompose into a small set of irreducible signals. The formula is the data. The story is optional.
        </p>
        <div className="mt-6 space-y-6">
          {emotionClusters.map((cluster) => (
            <section key={cluster.name}>
              <h3 className="font-serif text-xl">{cluster.name}</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {cluster.compounds.map((compound) => (
                  <li key={compound.name}>
                    <span className="font-medium">{compound.name}.</span> {compound.formula}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>

      <article id="a-list-media" className="mt-16 scroll-mt-24 border-t border-border pt-10">
        <h2 className="font-serif text-3xl">A-List Media</h2>
        <p className="mt-3 text-muted-foreground">
          A canon for people who sense that something essential has gone missing — books and films that invite crossing thresholds with heart.
        </p>
        <h3 className="mt-8 font-serif text-xl">Books</h3>
        <ul className="mt-3 space-y-3 text-sm">
          {bookList.map((author) => (
            <li key={author.author}>
              <span className="font-medium">{author.author}.</span> {author.works.join("; ")}
            </li>
          ))}
        </ul>
        <h3 className="mt-8 font-serif text-xl">Films</h3>
        <ul className="mt-3 columns-1 text-sm sm:columns-2">
          {filmList.map((film) => (
            <li key={film} className="mb-1">
              {film}
            </li>
          ))}
        </ul>
      </article>

      <article className="mt-16 border-t border-border pt-10">
        <h2 className="font-serif text-3xl">Lenses</h2>
        <div className="mt-6 space-y-4">
          {lenses.map((lens) => (
            <div key={lens.name}>
              <h3 className="font-medium">
                {lens.name} <span className="font-normal text-muted-foreground">— {lens.source}</span>
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{lens.description}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
