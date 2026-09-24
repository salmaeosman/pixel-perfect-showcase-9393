import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatPrice, products } from "@/lib/products";
import { useShop } from "@/lib/shop";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter((p) => `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q))
    : [];

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
      <div className="shell flex h-[74px] items-center justify-between">
        <span className="label-xs text-muted-foreground">Search</span>
        <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="shell pb-24 pt-10">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          aria-label="Search products"
          className="w-full border-b border-border bg-transparent pb-5 font-display text-[clamp(2rem,5vw,3.5rem)] outline-none placeholder:text-muted-foreground/50 focus:border-burgundy"
        />

        {q && (
          <p className="label-xs mt-6 text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {(q ? results : products.slice(0, 4)).map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              onClick={() => setSearchOpen(false)}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-cream">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-3 font-display text-lg">{p.name}</h3>
              <p className="text-sm text-muted-foreground tabular-nums">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
        {!q && <p className="label-xs mt-10 text-muted-foreground">Suggested pieces</p>}
      </div>
    </div>
  );
}
