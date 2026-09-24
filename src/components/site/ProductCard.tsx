import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useShop } from "@/lib/shop";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const saved = wishlist.includes(product.id);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-cream">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          aria-label={product.name}
          className="block aspect-[4/5]"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-[1.03] group-hover:opacity-0"
          />
          <img
            src={product.hover}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-0 transition-all duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        {product.isNew && (
          <span className="label-xs absolute left-4 top-4 text-burgundy">New</span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          aria-pressed={saved}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center text-foreground/70 transition-colors duration-500 hover:text-burgundy"
        >
          <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
        </button>

        <button
          type="button"
          onClick={() => addToCart(product, product.sizes[0] ?? "One size", product.colors[0]?.name ?? "Default")}
          className="label-xs absolute inset-x-0 bottom-0 translate-y-full bg-burgundy py-3.5 text-primary-foreground opacity-0 transition-all duration-500 ease-[var(--ease-luxe)] group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          Quick add
        </button>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg leading-tight">
            <Link to="/product/$id" params={{ id: product.id }} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="label-xs mt-1.5 text-muted-foreground">{product.category}</p>
        </div>
        <p className="shrink-0 text-sm tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
