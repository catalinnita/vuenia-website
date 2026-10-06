import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="mx-auto max-w-7xl px-6 pt-6">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="Vuenia home" className="relative z-50">
          <Logo className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-[15px] font-medium text-body transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          {/* Plain <a>, not <Link>: /app is the separately deployed admin app (proxied
              via next.config.ts rewrites), so it needs a full page load, not
              client-side navigation within this app. */}
          <a
            href="/app"
            className="font-display text-[15px] font-medium text-body transition-colors hover:text-ink"
          >
            Log in
          </a>
          <Button href="/beta">
            Request beta access
          </Button>
        </div>

        <MobileMenu links={NAV_LINKS} />
      </div>
    </header>
  );
}
