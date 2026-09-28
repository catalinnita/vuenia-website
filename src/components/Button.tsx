import Link from "next/link";
import type { ReactNode } from "react";

const VARIANTS = {
  primary: "bg-accent-500 text-white hover:bg-accent-600",
  outline: "bg-transparent text-ink ring-1 ring-inset ring-border hover:bg-white",
} as const;

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
