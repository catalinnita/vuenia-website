import Link from "next/link";
import type { ReactNode } from "react";

const VARIANTS = {
  primary: "bg-accent-500 text-white hover:bg-accent-600",
  outline: "bg-transparent text-ink ring-1 ring-inset ring-border hover:bg-white",
} as const;

// Sign-up and the rest of /app are the separately deployed admin app (proxied via
// next.config.ts rewrites), so those links need a full page load — a plain <a>, not
// client-side <Link> navigation within this app.
export const SIGNUP_URL = "/app/signup";

export function buttonClass(variant: keyof typeof VARIANTS = "primary", className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${VARIANTS[variant]} ${className}`;
}

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
  const classes = buttonClass(variant, className);
  if (href.startsWith("/app")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
