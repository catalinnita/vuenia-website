import "server-only";

export type PlatformPrice = { label: string; amount: number; currency: string; interval: string | null };

// The platform fee shown on the site is whatever the Stripe Price says — change it in
// Stripe, not here. Plain REST call (no SDK for one read); cached for an hour.
// STRIPE_PLATFORM_PRICE_ID may be a Price (price_…) or the Product (prod_…), in which
// case the product's default price is used.
export async function getPlatformPrice(): Promise<PlatformPrice | null> {
  const key = process.env.STRIPE_SECRET_KEY;
  const id = process.env.STRIPE_PLATFORM_PRICE_ID;
  if (!key || !id) return null;
  try {
    const res = id.startsWith("prod_")
      ? await fetch(`https://api.stripe.com/v1/products/${id}?expand[]=default_price.currency_options`, {
          headers: { Authorization: `Bearer ${key}` },
          next: { revalidate: 3600 },
        })
      : await fetch(`https://api.stripe.com/v1/prices/${id}?expand[]=currency_options`, {
          headers: { Authorization: `Bearer ${key}` },
          next: { revalidate: 3600 },
        });
    if (!res.ok) {
      console.error("Stripe price lookup failed:", res.status, await res.text());
      return null;
    }
    type Price = {
      unit_amount: number | null;
      currency: string;
      currency_options?: Record<string, { unit_amount: number | null }>;
      recurring: { interval: string } | null;
    };
    const body = await res.json();
    let price = (id.startsWith("prod_") ? body.default_price : body) as Price | null;
    // A product whose default price isn't usable in USD: fall back to its active
    // recurring USD price (same rule as api/checkout).
    if (id.startsWith("prod_") && !(price?.currency === "usd" || price?.currency_options?.usd)) {
      const list = await fetch(`https://api.stripe.com/v1/prices?product=${id}&active=true&type=recurring&limit=20`, {
        headers: { Authorization: `Bearer ${key}` },
        next: { revalidate: 3600 },
      });
      const prices = ((await list.json()).data ?? []) as Price[];
      price = prices.find((p) => p.currency === "usd") ?? price;
    }
    // Vuenia charges in USD (credit and provider costs are in dollars): use the price's
    // USD amount — its own, or its USD currency option on a multi-currency price.
    const usdCents = price?.currency === "usd" ? price.unit_amount : price?.currency_options?.usd?.unit_amount;
    if (!price || usdCents == null) {
      console.error("Stripe: no USD amount on the platform price for", id, "— add a USD price or currency option");
      return null;
    }
    const amount = usdCents / 100;
    const label = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
    return { label, amount, currency: "USD", interval: price.recurring?.interval ?? null };
  } catch (e) {
    console.error("Stripe price lookup failed:", e);
    return null;
  }
}
