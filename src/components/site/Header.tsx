import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/lib/shop";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count, setCartOpen, setSearchOpen } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-background/95 backdrop-blur-[2px] transition-colors duration-500 ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="shell grid h-[74px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6">
        <Link to="/" className="font-display text-2xl tracking-[0.18em]">
          AURÉA
        </Link>

        <nav className="hidden justify-center gap-9 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="label-xs link-underline py-1 text-foreground/80 transition-colors duration-500 hover:text-burgundy"
              activeProps={{ className: "text-burgundy" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} className="p-1">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="hidden p-1 sm:block">
            <Heart className="h-[18px] w-[18px]" />
          </Link>
          <button
            type="button"
            aria-label={`Shopping bag, ${count} items`}
            onClick={() => setCartOpen(true)}
            className="relative p-1"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1 min-w-4 bg-burgundy px-1 text-[10px] leading-4 text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
            className="p-1 lg:hidden"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="shell flex h-[74px] items-center justify-between">
            <span className="font-display text-2xl tracking-[0.18em]">AURÉA</span>
            <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="shell mt-10 flex flex-col gap-7">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="font-display text-4xl">
              Wishlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
