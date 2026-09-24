import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartLine = {
  key: string;
  id: string;
  size: string;
  color: string;
  qty: number;
};

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeLine: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  count: number;
  subtotal: number;
  lineProduct: (line: CartLine) => Product | undefined;
};

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "aurea.cart";
const WISH_KEY = "aurea.wishlist";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, loaded]);

  useEffect(() => {
    const open = cartOpen || searchOpen;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen]);

  const value = useMemo<ShopState>(() => {
    const lineProduct = (line: CartLine) => products.find((p) => p.id === line.id);
    return {
      cart,
      wishlist,
      cartOpen,
      searchOpen,
      setCartOpen,
      setSearchOpen,
      lineProduct,
      addToCart: (product, size, color, qty = 1) => {
        const key = `${product.id}|${size}|${color}`;
        setCart((prev) => {
          const found = prev.find((l) => l.key === key);
          if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { key, id: product.id, size, color, qty }];
        });
        setCartOpen(true);
      },
      removeLine: (key) => setCart((prev) => prev.filter((l) => l.key !== key)),
      setQty: (key, qty) =>
        setCart((prev) =>
          qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
        ),
      toggleWishlist: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id])),
      count: cart.reduce((n, l) => n + l.qty, 0),
      subtotal: cart.reduce((sum, l) => sum + (lineProduct(l)?.price ?? 0) * l.qty, 0),
    };
  }, [cart, wishlist, cartOpen, searchOpen]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
