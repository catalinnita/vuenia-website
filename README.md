# Vuenia website

The public marketing site — `admin`/`agent` are internal tools, this is what a
prospective user sees. Next.js 16 / React 19 / Tailwind v4, same stack conventions
as `admin`.

```
npm install --legacy-peer-deps   # @storyblok/react's peer range hasn't caught up to Next 16 yet
npm run dev
```

## Current state

Every page (`/`, `/features`, `/pricing`, `/faq`, `/beta`) renders real,
hand-authored copy and layout — nothing is a placeholder. The copy originated in
`../_content/*.md`; this app is now the actual presentation of it.

## Connecting Storyblok

Not wired up yet — `src/lib/storyblok.ts` has the client ready to initialize, but
there's no Space to point it at. To make the content actually editable outside code:

1. Create a free Space at [storyblok.com](https://www.storyblok.com).
2. Settings → Access Tokens → copy the Preview (or Public) token.
3. Add it to `.env.local` as `NEXT_PUBLIC_STORYBLOK_TOKEN` (see `.env.example`).
4. Define a Blok per page (`home`, `features`, `pricing`, `faq`) whose fields match
   that page's own section structure (see each `src/app/*/page.tsx` for the exact
   shape — headline, subhead, items, etc.).
5. Push the current copy from `../_content/*.md` into Storyblok as the initial
   content for each.
6. Swap each page from its hardcoded data arrays to a `storyblokApi.get()` call —
   the JSX/layout underneath doesn't change, only where its props come from.

## Design

- **Logo**: `src/components/Logo.tsx`, copied unchanged from `admin` — same mark,
  same blue (`#0077FF`).
- **Accent color**: that same blue, used as the one accent throughout
  (`--color-accent-*` in `globals.css`). Chosen deliberately to match `admin`'s own
  branding, not a placeholder.
- **Type**: Space Grotesk (display/headlines) + Inter (body), loaded via
  `next/font/google` in `layout.tsx`.
- **Layout references**: benchmarked against dropship.io (blue-accent SaaS,
  fanned product-card hero), poetic.com (huge statement headline, black stat
  strip), and whereisrussell.com (two-column label+headline sections, pastel
  card rows) — see `PipelineFan.tsx`/`StatStrip.tsx` for where those patterns
  were adapted to actually diagram Vuenia's own pipeline rather than being
  generic decoration.

## Known gaps

- **`/beta`'s form doesn't submit anywhere yet** (`src/app/beta/BetaForm.tsx`) —
  it's a real UI with a client-side "thanks" state, but nothing is persisted.
  Needs a real backend (a Supabase table, or an email/forms service) before launch.
- **Pricing figures are placeholders** — see `../_content/pricing.md`'s
  `PRICING TBD` notes.
