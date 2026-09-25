import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { formatPrice, getProduct, getProductImages, products } from "@/lib/products";
import { useShop } from "@/lib/shop";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Auréa" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Auréa` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — Auréa` },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("description");

  const saved = wishlist.includes(product.id);
  const images = getProductImages(product, color);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const filler = products.filter((p) => p.id !== product.id && p.category !== product.category);
  const recommended = [...related, ...filler].slice(0, 4);

  return (
    <>
      <div className="shell py-6">
        <nav className="label-xs text-muted-foreground">
          <Link to="/collections" className="link-underline">
            Collections
          </Link>
          <span className="px-2">/</span>
          <span>{product.name}</span>
        </nav>
      </div>

      <section className="shell grid gap-12 pb-24 md:grid-cols-[60fr_40fr] md:gap-16">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${product.name} in ${color}${index ? ", alternate view" : ""}`}
              width={1008}
              height={1264}
              loading={index ? "lazy" : undefined}
              className="w-full bg-cream object-cover"
            />
          ))}
        </div>

        <div className="md:sticky md:top-[100px] md:self-start">
          <p className="label-xs text-burgundy">{product.category}</p>
          <h1 className="display-lg mt-4">{product.name}</h1>
          <p className="mt-5 font-display text-2xl tabular-nums">{formatPrice(product.price)}</p>

          <div className="mt-10">
            <p className="label-xs text-muted-foreground">Colour — {color}</p>
            <div className="mt-4 flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  onClick={() => setColor(c.name)}
                  className={`h-8 w-8 border transition-colors duration-500 ${
                    color === c.name ? "border-burgundy" : "border-border"
                  }`}
                >
                  <span className="block h-full w-full border border-background" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="label-xs text-muted-foreground">Size</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={`label-xs border px-5 py-3 transition-colors duration-500 ${
                    size === s ? "border-burgundy text-burgundy" : "border-border hover:border-foreground/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-stretch gap-4">
            <div className="flex items-center border border-border">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="px-4">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-8 text-center text-sm tabular-nums">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="px-4">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product, size, color, qty)}
              className="label-xs flex-1 bg-burgundy px-10 py-4 text-primary-foreground transition-colors duration-500 hover:bg-burgundy-deep"
            >
              Add to bag
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              className="grid w-14 place-items-center border border-border transition-colors duration-500 hover:border-burgundy hover:text-burgundy"
            >
              <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-12 border-t border-border">
            {[
              { key: "description", label: "Description", body: product.description },
              { key: "materials", label: "Materials", body: product.materials },
              { key: "care", label: "Care", body: product.care },
              {
                key: "shipping",
                label: "Shipping & returns",
                body: "Complimentary worldwide shipping above €300, delivered in 2–5 working days. Returns accepted within 30 days in original condition.",
              },
            ].map((row) => (
              <div key={row.key} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(open === row.key ? null : row.key)}
                  aria-expanded={open === row.key}
                  className="label-xs flex w-full items-center justify-between py-5 text-left"
                >
                  {row.label}
                  <span className="text-base leading-none">{open === row.key ? "−" : "+"}</span>
                </button>
                {open === row.key && (
                  <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-28">
        <Reveal>
          <p className="label-xs text-burgundy">You may also like</p>
          <h2 className="display-lg mt-4">Recommended</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-4 lg:gap-x-8">
          {recommended.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
