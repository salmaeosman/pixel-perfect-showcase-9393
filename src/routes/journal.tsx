import { createFileRoute } from "@tanstack/react-router";
import editorial from "@/frontend/assets/editorial.jpg";
import atelier from "@/frontend/assets/ATL.png";
import vase from "@/frontend/assets/vase.jpg";
import { journal } from "@/frontend/lib/products";
import { Reveal } from "@/frontend/components/site/Reveal";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Auréa" },
      {
        name: "description",
        content:
          "Atelier notes, material studies and seasonal observations from the Auréa design team.",
      },
      { property: "og:title", content: "Journal — Auréa" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Atelier notes and material studies from Auréa." },
    ],
  }),
  component: Journal,
});

const IMAGES: Record<string, string> = { atelier, editorial, vase };

function Journal() {
  const lead = journal[0]!;
  const rest = journal.slice(1);

  return (
    <>
      <section className="shell grid gap-10 py-20 md:grid-cols-[42fr_58fr] md:py-28">
        <div>
          <p className="label-xs text-burgundy">Journal</p>
          <h1 className="display-xl mt-6">Notes from the house.</h1>
        </div>
        <p className="max-w-lg self-end text-base leading-relaxed text-muted-foreground">
          Slow reporting on the people, materials and light that shape each collection.
        </p>
      </section>

      <section className="shell">
        <Reveal className="grid gap-10 border-t border-border py-14 md:grid-cols-[58fr_42fr] md:items-center">
          <img
            src={IMAGES[lead.image] ?? editorial}
            alt={lead.title}
            loading="lazy"
            className="aspect-[4/3] w-full bg-cream object-cover"
          />
          <div>
            <p className="label-xs text-muted-foreground">{lead.date}</p>
            <h2 className="display-lg mt-5">{lead.title}</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{lead.excerpt}</p>
            <p className="label-xs link-underline mt-8 inline-block text-burgundy">
              Read the article
            </p>
          </div>
        </Reveal>

        <div className="grid gap-12 border-t border-border py-16 pb-28 md:grid-cols-2">
          {rest.map((article, i) => (
            <Reveal key={article.id} delay={i * 100}>
              <img
                src={IMAGES[article.image] ?? editorial}
                alt={article.title}
                loading="lazy"
                className="aspect-[4/3] w-full bg-cream object-cover"
              />
              <p className="label-xs mt-5 text-muted-foreground">{article.date}</p>
              <h3 className="mt-3 font-display text-3xl">{article.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
