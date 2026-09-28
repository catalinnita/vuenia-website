import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="mx-auto max-w-7xl px-6 pt-6">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="Vuenia home">
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

        <Button href="/beta">
          Request beta access
        </Button>
      </div>
    </header>
  );
}
