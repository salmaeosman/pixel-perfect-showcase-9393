import { createFileRoute } from "@tanstack/react-router";
import editorial from "@/assets/editorial.jpg";
import atelier from "@/assets/atelier.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the House — Auréa" },
      {
        name: "description",
        content:
          "Auréa was founded in 1994 around a single Florentine leather workshop. Our approach to materials, makers and pace.",
      },
      { property: "og:title", content: "About the House — Auréa" },
      {
        property: "og:description",
        content: "Founded in 1994 around one Florentine workshop. Few pieces, made properly.",
      },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    title: "Material first",
    text: "We buy from named mills and tanneries and publish them on every label. If a material cannot be traced, we do not use it.",
  },
  {
    title: "Small runs",
    text: "Nothing is produced beyond what the workshop can finish by hand. Most pieces are made in editions of fifty.",
  },
  {
    title: "Made to be repaired",
    text: "Every garment and bag can be returned to the atelier for restoration, for as long as the house exists.",
  },
];

function About() {
  return (
    <>
      <section className="shell grid gap-10 py-20 md:grid-cols-[42fr_58fr] md:py-28">
        <div>
          <p className="label-xs text-burgundy">The house</p>
          <h1 className="display-xl mt-6">Few things, made properly.</h1>
        </div>
        <p className="max-w-xl self-end text-base leading-relaxed text-muted-foreground">
          Auréa began in 1994 with one leather workshop in Florence and a refusal to produce more
          than the hands available could finish. Three decades on, the rule still governs everything:
          the number of pieces, the pace of the collections, and who we work with.
        </p>
      </section>

      <Reveal>
        <img
          src={editorial}
          alt="Mediterranean street with whitewashed walls and olive trees"
          loading="lazy"
          width={1600}
          height={1104}
          className="h-[min(70vh,680px)] w-full object-cover"
        />
      </Reveal>

      <section className="shell grid gap-12 py-24 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <p className="label-xs text-burgundy">0{i + 1}</p>
            <h2 className="mt-5 font-display text-3xl">{p.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </Reveal>
        ))}
      </section>

      <section className="bg-cream">
        <div className="shell grid items-center gap-12 py-24 md:grid-cols-2 md:gap-20">
          <Reveal>
            <img src={atelier} alt="Leatherworker at the bench" loading="lazy" width={1200} height={912} className="w-full object-cover" />
          </Reveal>
          <Reveal delay={120}>
            <p className="label-xs text-burgundy">The makers</p>
            <h2 className="display-lg mt-5">Eleven workshops, four countries.</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Leather in Florence, knitwear in Biella, silk printing in Como, terracotta in Puglia.
              We visit each workshop twice a year and agree prices before quantities — the reverse of
              how most of this industry works.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
