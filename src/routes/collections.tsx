import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { CATEGORIES, products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

type Search = {
  category?: string | undefined;
  sort?: string | undefined;
  color?: string | undefined;
  size?: string | undefined;
  maxPrice?: number | undefined;
};

export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: typeof search.category === "string" ? search.category : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
    color: typeof search.color === "string" ? search.color : undefined,
    size: typeof search.size === "string" ? search.size : undefined,
    maxPrice: typeof search.maxPrice === "number" ? search.maxPrice : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Collections — Auréa" },
      {
        name: "description",
        content:
          "Browse the full Auréa collection: ready-to-wear, bags, shoes, accessories and objects, filtered by size, colour and price.",
      },
      { property: "og:title", content: "Collections — Auréa" },
      {
        property: "og:description",
        content: "Ready-to-wear, bags, shoes, accessories and objects from Auréa.",
      },
    ],
  }),
  component: Collections,
});

const COLORS = ["Ivory", "Burgundy", "Camel", "Stone"];
const SIZES = ["XS", "S", "M", "L", "36", "37", "38", "39", "40", "41", "One size"];
const PRICE_STEPS = [500, 1000, 2500];

function Collections() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/collections" });

  const set = (patch: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const list = useMemo(() => {
    let out = products.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (search.color && !p.colors.some((c) => c.name === search.color)) return false;
      if (search.size && !p.sizes.includes(search.size)) return false;
      if (search.maxPrice && p.price > search.maxPrice) return false;
      return true;
    });
    if (search.sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    if (search.sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    if (search.sort === "new") out = [...out].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return out;
  }, [search]);

  const hasFilters = Boolean(search.category || search.color || search.size || search.maxPrice);

  return (
    <>
      <section className="shell grid gap-8 py-16 md:grid-cols-[42fr_58fr] md:py-24">
        <div>
          <p className="label-xs text-burgundy">The collection</p>
          <h1 className="display-lg mt-5">
            {search.category ? search.category : "Everything we make"}
          </h1>
        </div>
        <p className="max-w-lg self-end text-sm leading-relaxed text-muted-foreground">
          Twelve pieces, produced in limited runs and restocked only when the workshops allow. Each
          one is photographed as it arrives, unretouched.
        </p>
      </section>

      <div className="shell">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 border-y border-border py-5">
          <Filter
            label="Category"
            value={search.category}
            options={CATEGORIES as unknown as string[]}
            onChange={(v) => set({ category: v as Category | undefined })}
          />
          <Filter label="Size" value={search.size} options={SIZES} onChange={(v) => set({ size: v })} />
          <Filter
            label="Colour"
            value={search.color}
            options={COLORS}
            onChange={(v) => set({ color: v })}
          />
          <Filter
            label="Price"
            value={search.maxPrice ? String(search.maxPrice) : undefined}
            options={PRICE_STEPS.map((p) => String(p))}
            format={(v) => `Under €${v}`}
            onChange={(v) => set({ maxPrice: v ? Number(v) : undefined })}
          />
          <div className="ml-auto flex items-center gap-6">
            {hasFilters && (
              <button
                type="button"
                onClick={() => set({ category: undefined, color: undefined, size: undefined, maxPrice: undefined })}
                className="label-xs text-burgundy"
              >
                Clear
              </button>
            )}
            <Filter
              label="Sort"
              value={search.sort}
              options={["new", "price-asc", "price-desc"]}
              format={(v) =>
                v === "new" ? "Newest" : v === "price-asc" ? "Price ↑" : "Price ↓"
              }
              onChange={(v) => set({ sort: v })}
            />
          </div>
        </div>

        <p className="label-xs py-6 text-muted-foreground">
          {list.length} {list.length === 1 ? "piece" : "pieces"}
        </p>

        {list.length === 0 ? (
          <p className="py-24 text-center font-display text-3xl text-muted-foreground">
            Nothing matches these filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-16 pb-28 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
  format,
}: {
  label: string;
  value?: string | undefined;
  options: string[];
  onChange: (v: string | undefined) => void;
  format?: ((v: string) => string) | undefined;
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="label-xs text-muted-foreground">{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="label-xs cursor-pointer border-0 bg-transparent py-1 pr-2 outline-none focus:text-burgundy"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {format ? format(o) : o}
          </option>
        ))}
      </select>
    </label>
  );
}
