import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useShop } from "@/lib/shop";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, lineProduct, setQty, removeLine, subtotal } = useShop();

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-burgundy-deep/25 transition-opacity duration-700 ease-[var(--ease-luxe)] ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Shopping bag"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[440px] flex-col bg-background transition-transform duration-700 ease-[var(--ease-luxe)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="label-xs">Shopping bag</h2>
          <button type="button" aria-label="Close bag" onClick={() => setCartOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {cart.length === 0 ? (
            <p className="mt-16 font-display text-2xl text-muted-foreground">Your bag is empty.</p>
          ) : (
            <ul className="divide-y divide-border">
              {cart.map((line) => {
                const product = lineProduct(line);
                if (!product) return null;
                return (
                  <li key={line.key} className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 py-6">
                    <Link to="/product/$id" params={{ id: product.id }} onClick={() => setCartOpen(false)}>
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-[105px] w-[84px] object-cover"
                      />
                    </Link>
                    <div className="min-w-0">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                        <h3 className="truncate font-display text-lg">{product.name}</h3>
                        <span className="text-sm tabular-nums">{formatPrice(product.price * line.qty)}</span>
                      </div>
                      <p className="label-xs mt-1 text-muted-foreground">
                        {line.color} · {line.size}
                      </p>
                      <div className="mt-4 flex items-center gap-5">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="px-3 py-1 text-sm"
                            onClick={() => setQty(line.key, line.qty - 1)}
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center text-sm tabular-nums">{line.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="px-3 py-1 text-sm"
                            onClick={() => setQty(line.key, line.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.key)}
                          className="label-xs text-muted-foreground transition-colors hover:text-burgundy"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-6">
          <div className="flex items-baseline justify-between">
            <span className="label-xs">Subtotal</span>
            <span className="font-display text-2xl tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Shipping and duties calculated at checkout.
          </p>
          <button
            type="button"
            disabled={cart.length === 0}
            className="label-xs mt-5 w-full bg-burgundy py-4 text-primary-foreground transition-colors duration-500 hover:bg-burgundy-deep disabled:opacity-40"
          >
            Proceed to checkout
          </button>
        </div>
      </aside>
    </>
  );
}
