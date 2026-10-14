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
      ? await fetch(`https://api.stripe.com/v1/products/${id}?expand[]=default_price`, {
          headers: { Authorization: `Bearer ${key}` },
          next: { revalidate: 3600 },
        })
      : await fetch(`https://api.stripe.com/v1/prices/${id}`, {
          headers: { Authorization: `Bearer ${key}` },
          next: { revalidate: 3600 },
        });
    if (!res.ok) {
      console.error("Stripe price lookup failed:", res.status, await res.text());
      return null;
    }
    type Price = { unit_amount: number | null; currency: string; recurring: { interval: string } | null };
    const body = await res.json();
    const price = (id.startsWith("prod_") ? body.default_price : body) as Price | null;
    if (!price || typeof price !== "object" || price.unit_amount == null) {
      console.error("Stripe: no usable price for", id, "— set a default price on the product");
      return null;
    }
    const amount = price.unit_amount / 100;
    const label = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency.toUpperCase(),
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
    return { label, amount, currency: price.currency.toUpperCase(), interval: price.recurring?.interval ?? null };
  } catch (e) {
    console.error("Stripe price lookup failed:", e);
    return null;
  }
}
