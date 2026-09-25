import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Package, Globe, Leaf, Gem } from "lucide-react";
import hero from "@/assets/hero.jpg";
import editorial from "@/assets/editorial.jpg";
import atelier from "@/assets/atelier.jpg";
import bagAurelia from "@/assets/bag-aurelia.jpg";
import coat from "@/assets/coat.jpg";
import tote from "@/assets/tote.jpg";
import shoes from "@/assets/shoes.jpg";
import vase from "@/assets/vase.jpg";
import { formatPrice, journal, products } from "@/lib/products";
import { useShop } from "@/lib/shop";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auréa — Mediterranean Quiet Luxury" },
      {
        name: "description",
        content:
          "Ready-to-wear, leather goods, shoes and objects from Auréa. Small-atelier craft, ivory and burgundy, made to be kept.",
      },
      { property: "og:title", content: "Auréa — Mediterranean Quiet Luxury" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:description",
        content: "Ready-to-wear, leather goods, shoes and objects, made in small Mediterranean ateliers.",
      },
    ],
  }),
  component: Home,
});

const BENEFITS = [
  { icon: Package, title: "Considered selection", text: "Fewer pieces, chosen slowly" },
  { icon: Globe, title: "Worldwide shipping", text: "Complimentary above €300" },
  { icon: Leaf, title: "Traceable materials", text: "Named mills and tanneries" },
  { icon: Gem, title: "Limited editions", text: "Made in runs of fifty" },
];

const CATEGORY_TILES = [
  { label: "Women", image: coat },
  { label: "Bags", image: tote },
  { label: "Shoes", image: shoes },
  { label: "Objects", image: vase },
] as const;

function Home() {
  const { addToCart } = useShop();
  const featured = products.find((p) => p.id === "aurelia-bag")!;
  const journalImages: Record<string, string> = { atelier, editorial, vase };

  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-10 py-14 md:grid-cols-[40fr_60fr] md:gap-16 md:py-20">
        <div className="rise">
          <p className="label-xs text-burgundy">Spring Collection 2026</p>
          <h1 className="display-xl mt-7">
            Every detail
            <br />
            tells a story.
          </h1>
          <p className="mt-7 max-w-sm text-base leading-relaxed text-muted-foreground">
            Clothing, leather and objects made in small Mediterranean ateliers — cut for a long life,
            not a season.
          </p>
          <Link
            to="/collections"
            className="label-xs mt-10 inline-flex items-center gap-3 bg-burgundy px-9 py-4 text-primary-foreground transition-colors duration-500 hover:bg-burgundy-deep"
          >
            Explore collections
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="rise overflow-hidden bg-cream" style={{ animationDelay: "160ms" }}>
          <img
            src={hero}
            alt="Auréa boutique interior with leather bag and ceramic vessel"
            width={1408}
            height={1600}
            className="h-[min(78vh,780px)] w-full object-cover"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-border bg-cream">
        <div className="shell grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3 px-2 py-8 md:justify-center md:px-6">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" strokeWidth={1.4} />
              <div className="min-w-0">
                <p className="label-xs">{title}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="shell py-24">
        <Reveal className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
          <div className="min-w-0">
            <p className="label-xs text-burgundy">Newly arrived</p>
            <h2 className="display-lg mt-4">The Spring Edit</h2>
          </div>
          <Link to="/collections" className="label-xs link-underline shrink-0 pb-2">
            View all
          </Link>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {products
            .filter((p) => p.isNew)
            .map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
        </div>
      </section>

      {/* Editorial band */}
      <section className="grid md:grid-cols-[58fr_42fr]">
        <div className="bg-cream">
          <img
            src={editorial}
            alt="Woman in ivory linen walking beside a whitewashed Mediterranean wall"
            loading="lazy"
            width={1600}
            height={1104}
            className="h-full max-h-[720px] w-full object-cover"
          />
        </div>
        <div className="flex items-center bg-burgundy-deep px-8 py-20 text-[color-mix(in_oklab,var(--ivory)_94%,transparent)] md:px-16">
          <Reveal>
            <p className="label-xs opacity-70">The philosophy</p>
            <h2 className="display-lg mt-6">Built from light, stone and linen.</h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed opacity-80">
              Our collections begin in the southern afternoon — limewash walls, the shade of an olive
              tree, sun-bleached cotton on a line. We translate that into garments with as little
              between you and the material as possible.
            </p>
            <Link
              to="/about"
              className="label-xs link-underline mt-10 inline-flex items-center gap-3"
            >
              Read our story
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="shell py-24">
        <Reveal>
          <p className="label-xs text-burgundy">Browse</p>
          <h2 className="display-lg mt-4">Categories</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {CATEGORY_TILES.map((tile, i) => (
            <Reveal key={tile.label} delay={i * 90}>
              <Link
                to="/collections"
                search={{ category: tile.label }}
                className="group block overflow-hidden"
              >
                <div className="aspect-[3/4] overflow-hidden bg-cream">
                  <img
                    src={tile.image}
                    alt={tile.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="label-xs mt-4 transition-colors duration-500 group-hover:text-burgundy">
                  {tile.label}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured product */}
      <section className="bg-cream">
        <div className="shell grid items-center gap-12 py-24 md:grid-cols-2 md:gap-20">
          <Reveal>
            <img
              src={bagAurelia}
              alt={featured.name}
              loading="lazy"
              width={1008}
              height={1264}
              className="w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="label-xs text-burgundy">Piece of the season</p>
            <h2 className="display-lg mt-5">{featured.name}</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              {featured.description}
            </p>
            <p className="mt-8 font-display text-3xl tabular-nums">{formatPrice(featured.price)}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => addToCart(featured, featured.sizes[0] ?? "One size", featured.colors[0]?.name ?? "Default")}
                className="label-xs bg-burgundy px-9 py-4 text-primary-foreground transition-colors duration-500 hover:bg-burgundy-deep"
              >
                Add to bag
              </button>
              <Link
                to="/product/$id"
                params={{ id: featured.id }}
                className="label-xs border border-foreground/20 px-9 py-4 transition-colors duration-500 hover:border-burgundy hover:text-burgundy"
              >
                View details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand story */}
      <section className="shell grid items-center gap-12 py-24 md:grid-cols-[42fr_58fr] md:gap-20">
        <Reveal>
          <p className="label-xs text-burgundy">Since 1994</p>
          <h2 className="display-lg mt-5">A house of few things, made properly.</h2>
          <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
            Auréa began with one leather workshop in Florence and a refusal to produce more than the
            hands available could finish. Three decades later the rule holds: every piece is named,
            numbered and repairable, and every maker is credited on the label.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <img
            src={atelier}
            alt="Artisan hand-stitching leather at a workbench"
            loading="lazy"
            width={1200}
            height={912}
            className="w-full object-cover"
          />
        </Reveal>
      </section>

      {/* Journal */}
      <section className="shell pb-24">
        <Reveal className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
          <div className="min-w-0">
            <p className="label-xs text-burgundy">Journal</p>
            <h2 className="display-lg mt-4">Notes from the house</h2>
          </div>
          <Link to="/journal" className="label-xs link-underline shrink-0 pb-2">
            All articles
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {journal.map((article, i) => (
            <Reveal key={article.id} delay={i * 90}>
              <Link to="/journal" className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-cream">
                  <img
                    src={journalImages[article.image] ?? editorial}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="label-xs mt-5 text-muted-foreground">{article.date}</p>
                <h3 className="mt-3 font-display text-2xl">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-burgundy text-primary-foreground">
        <div className="shell grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <h2 className="display-lg">Letters, four times a year.</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed opacity-80">
              Collection previews, atelier notes and private appointments. Nothing else.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
          >
            <label className="flex-1">
              <span className="label-xs opacity-70">Email address</span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="mt-3 w-full border-b border-[color-mix(in_oklab,var(--ivory)_45%,transparent)] bg-transparent pb-3 text-sm outline-none placeholder:opacity-50 focus:border-[var(--ivory)]"
              />
            </label>
            <button
              type="submit"
              className="label-xs border border-[color-mix(in_oklab,var(--ivory)_60%,transparent)] px-9 py-4 transition-colors duration-500 hover:bg-[var(--ivory)] hover:text-burgundy"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
