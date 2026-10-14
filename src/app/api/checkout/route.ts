import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CREDIT_OPTIONS } from "@/lib/credit";
import { SIGNUP_URL } from "@/components/Button";

// Pricing-page checkout, before any account exists: the platform subscription with a
// 7-day trial (card required), plus the starting credit as a one-time charge if one was
// picked. Stripe then sends the buyer to admin's sign-up, which claims this session for
// the new account (admin/src/lib/claimCheckout.ts) — metadata.kind "signup" marks it.

// STRIPE_PLATFORM_PRICE_ID is a Price (price_…) or the Product (prod_…). For a product:
// its default price if that can be charged in USD, else its active recurring USD price.
async function platformPriceId(stripe: Stripe): Promise<string | null> {
  const id = process.env.STRIPE_PLATFORM_PRICE_ID?.trim();
  if (!id) {
    console.error("Checkout unavailable: STRIPE_PLATFORM_PRICE_ID is not set");
    return null;
  }
  if (!id.startsWith("prod_")) return id;

  const product = await stripe.products.retrieve(id, { expand: ["default_price.currency_options"] });
  const def = typeof product.default_price === "object" ? product.default_price : null;
  if (def?.active && (def.currency === "usd" || def.currency_options?.usd)) return def.id;

  const prices = await stripe.prices.list({ product: id, active: true, type: "recurring", limit: 20 });
  const usd = prices.data.find((p) => p.currency === "usd");
  if (usd) return usd.id;
  console.error(
    `Checkout unavailable: product ${id} has no active USD price (default: ${def ? `${def.id} ${def.currency}${def.active ? "" : " (archived)"}` : "none"})`,
  );
  return null;
}

function siteOrigin(request: Request): string {
  const h = request.headers;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return host ? `${h.get("x-forwarded-proto") ?? "https"}://${host}` : new URL(request.url).origin;
}

export async function POST(request: Request) {
  const origin = siteOrigin(request);
  const back = (reason: string) => NextResponse.redirect(`${origin}/pricing?checkout=${reason}`, 303);

  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    console.error("Checkout unavailable: STRIPE_SECRET_KEY is not set");
    return back("unavailable");
  }
  const stripe = new Stripe(key);

  const form = await request.formData();
  const amount = Number(form.get("credit"));
  const credit = (CREDIT_OPTIONS as readonly number[]).includes(amount) ? amount : 0;

  try {
    const priceId = await platformPriceId(stripe);
    if (!priceId) return back("unavailable");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      // Everything in USD: the credit line is dollars, and a multi-currency platform price
      // is charged in its USD option (Stripe requires one currency per session).
      currency: "usd",
      payment_method_collection: "always",
      line_items: [
        { price: priceId, quantity: 1 },
        ...(credit
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: credit * 100,
                  product_data: { name: "Vuenia credit", description: "Pays for model and voice usage at provider rates." },
                },
              },
            ]
          : []),
      ],
      subscription_data: { trial_period_days: 7 },
      metadata: { kind: "signup", credit_usd: String(credit) },
      success_url: `${origin}${SIGNUP_URL}?checkout_session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });
    return NextResponse.redirect(session.url!, 303);
  } catch (e) {
    console.error("Stripe checkout failed:", e);
    return back("error");
  }
}
