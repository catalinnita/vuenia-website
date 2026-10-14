import type { NextConfig } from "next";

// The admin app (separate repo + Vercel project) is served at /app on this same
// domain: this project proxies /app/* to the admin's own deployment, whose Next config
// sets basePath "/app" so its pages, assets and API routes all live under that prefix
// (Next.js Multi-Zones). Unset locally unless you run the admin alongside.
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  // Inline the (small, ~17 KB) stylesheet into each page's HTML instead of a separate,
  // render-blocking request — first paint no longer waits on a CSS round trip. Worth it
  // for a marketing site where most visits are one or two pages; production builds only.
  experimental: {
    inlineCss: true,
  },
  // beforeFiles, not the default afterFiles: /app/* must be proxied untouched, before
  // this app's own routing. Otherwise Next 16's segment prefetches (RSC requests with a
  // `next-router-segment-prefetch` header) get rewritten here to this app's
  // `<path>.segments/…` form first, and the admin — which resolves those itself from
  // the original URL — answers every prefetch with a 404.
  async rewrites() {
    if (!ADMIN_ORIGIN) return { beforeFiles: [] };
    return {
      beforeFiles: [
        { source: "/app", destination: `${ADMIN_ORIGIN}/app` },
        { source: "/app/:path*", destination: `${ADMIN_ORIGIN}/app/:path*` },
      ],
    };
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "a.storyblok.com" }],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
