import Link from "next/link";
import Logo from "./Logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Built with Vuenia",
    links: [{ href: "https://www.youtube.com/@TheMorningBellAI", label: "The Morning Bell ↗" }],
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col gap-12 border-t border-border pt-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo className="h-6 w-auto" />
          <p className="mt-4 text-sm text-muted">
            Configurable content-generation pipelines — research, script, narrate,
            visualize, publish.
          </p>
        </div>

        <div className="flex flex-wrap gap-16">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-body transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-12 text-xs text-muted">© {new Date().getFullYear()} Vuenia. All rights reserved.</p>
    </footer>
  );
}
