import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Absolute base for share-preview URLs (og:image etc.) — Slack, X and LinkedIn
  // ignore relative ones. The share image itself is app/opengraph-image.png.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.vuenia.com"),
  title: "Vuenia — Podcasts and videos without a production team",
  description:
    "Vuenia is a configurable content-generation platform. Point it at a topic, a brief, or a live data source, and it researches, writes, narrates, and assembles a finished audio episode, multi-voice podcast, or video.",
  // No og:title/og:description here, so each page's own <title> and description are
  // what unfurls show rather than the home page's on every link.
  openGraph: { type: "website", siteName: "Vuenia", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
