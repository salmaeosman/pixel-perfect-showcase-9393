import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useShop } from "@/frontend/lib/shop";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

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
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="p-1"
          >
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
            aria-label={menuOpen ? "Close menu" : "Menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="p-1 lg:hidden"
          >
            {menuOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] overflow-hidden bg-background transition-[opacity,visibility] duration-500 ease-[var(--ease-luxe)] lg:hidden ${
              menuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
            }`}
            onClick={() => setMenuOpen(false)}
            aria-hidden={!menuOpen}
          >
            <div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
              className={`flex h-[100dvh] w-full flex-col overflow-y-auto bg-background transition-transform duration-700 ease-[var(--ease-luxe)] ${
                menuOpen ? "translate-y-0" : "-translate-y-3"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <div
                className="shell grid h-[74px] shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-6"
                onClick={(event) => event.stopPropagation()}
              >
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="min-w-0 truncate font-display text-2xl tracking-[0.18em]"
                >
                  AURÉA
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="shrink-0 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav
                className="shell flex min-h-0 flex-1 flex-col justify-center gap-[clamp(1rem,4vh,2rem)] py-8"
                onClick={(event) => event.stopPropagation()}
              >
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    onClick={() => setMenuOpen(false)}
                    className="w-fit max-w-full font-display text-[clamp(2rem,9vw,3.25rem)] leading-none transition-colors duration-500 hover:text-burgundy"
                    activeProps={{ className: "text-burgundy" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="w-fit max-w-full font-display text-[clamp(2rem,9vw,3.25rem)] leading-none transition-colors duration-500 hover:text-burgundy"
                  activeProps={{ className: "text-burgundy" }}
                >
                  Wishlist
                </Link>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
