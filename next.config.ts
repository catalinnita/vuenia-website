import type { NextConfig } from "next";

// The admin app (separate repo + Vercel project) is served at /app on this same
// domain: this project proxies /app/* to the admin's own deployment, whose Next config
// sets basePath "/app" so its pages, assets and API routes all live under that prefix
// (Next.js Multi-Zones). Unset locally unless you run the admin alongside.
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!ADMIN_ORIGIN) return [];
    return [
      { source: "/app", destination: `${ADMIN_ORIGIN}/app` },
      { source: "/app/:path*", destination: `${ADMIN_ORIGIN}/app/:path*` },
    ];
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
