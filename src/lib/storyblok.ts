import { storyblokInit, apiPlugin } from "@storyblok/react";

// Not wired into any page yet — there's no Storyblok Space/token to point at until
// one is created (see the website's own README "Connecting Storyblok" section).
// Pages currently render hand-authored copy/JSX directly, sourced from ../../_content
// at build time. Once a Space exists: define a Blok per page (home/features/pricing/
// faq) matching these pages' own section structure, initialize this client for real
// with the token below, and swap each page's data source from local copy to a
// storyblokApi.get() call — the JSX/layout underneath doesn't need to change, only
// where its props come from.
export const storyblokToken = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;

export function initStoryblok() {
  if (!storyblokToken) return;
  storyblokInit({
    accessToken: storyblokToken,
    use: [apiPlugin],
  });
}
