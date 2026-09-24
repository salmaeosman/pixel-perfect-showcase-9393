import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { useShop } from "@/lib/shop";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Auréa" },
      { name: "description", content: "The Auréa pieces you have saved for later." },
      { property: "og:title", content: "Wishlist — Auréa" },
      { property: "og:description", content: "The Auréa pieces you have saved for later." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useShop();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <section className="shell py-20 md:py-28">
      <p className="label-xs text-burgundy">Saved</p>
      <h1 className="display-xl mt-6">Wishlist</h1>

      {saved.length === 0 ? (
        <div className="py-24">
          <p className="font-display text-3xl text-muted-foreground">Nothing saved yet.</p>
          <Link
            to="/collections"
            className="label-xs mt-8 inline-block bg-burgundy px-9 py-4 text-primary-foreground transition-colors duration-500 hover:bg-burgundy-deep"
          >
            Browse collections
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-16 pb-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
