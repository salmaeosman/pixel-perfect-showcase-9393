import { Link } from "@tanstack/react-router";

type NavTo = "/" | "/collections" | "/about" | "/journal" | "/contact" | "/wishlist";

export function Footer() {
  return (
    <footer className="bg-burgundy-deep text-[color-mix(in_oklab,var(--ivory)_92%,transparent)]">
      <div className="shell grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl tracking-[0.18em]">AURÉA</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-70">
            Considered pieces made in small ateliers across the Mediterranean. Designed to be kept.
          </p>
        </div>
        <FooterCol
          title="Shop"
          links={[
            { to: "/collections", label: "All collections" },
            { to: "/wishlist", label: "Wishlist" },
          ]}
        />
        <FooterCol
          title="House"
          links={[
            { to: "/about", label: "About" },
            { to: "/journal", label: "Journal" },
            { to: "/contact", label: "Contact" },
          ]}
        />
        <div>
          <p className="label-xs opacity-60">Client care</p>
          <ul className="mt-5 space-y-3 text-sm opacity-80">
            <li>Complimentary worldwide shipping</li>
            <li>Extended 30-day returns</li>
            <li>care@aurea.com</li>
          </ul>
        </div>
      </div>
      <div className="shell flex flex-col gap-3 border-t border-[color-mix(in_oklab,var(--ivory)_18%,transparent)] py-7 text-xs opacity-60 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Auréa. All rights reserved.</p>
        <p>Terms · Privacy · Accessibility</p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: NavTo; label: string }[];
}) {
  return (
    <div>
      <p className="label-xs opacity-60">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="link-underline opacity-85 hover:opacity-100">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
