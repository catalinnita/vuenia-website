import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CREDIT_OPTIONS } from "@/lib/credit";
import { SIGNUP_URL } from "@/components/Button";

// Pricing-page checkout, before any account exists: the platform subscription with a
// 7-day trial (card required), plus the starting credit as a one-time charge if one was
// picked. Stripe then sends the buyer to admin's sign-up, which claims this session for
// the new account (admin/src/lib/claimCheckout.ts) — metadata.kind "signup" marks it.

async function platformPriceId(stripe: Stripe): Promise<string | null> {
  const id = process.env.STRIPE_PLATFORM_PRICE_ID;
  if (!id) return null;
  if (!id.startsWith("prod_")) return id;
  const product = await stripe.products.retrieve(id);
  return typeof product.default_price === "string" ? product.default_price : (product.default_price?.id ?? null);
}

function siteOrigin(request: Request): string {
  const h = request.headers;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return host ? `${h.get("x-forwarded-proto") ?? "https"}://${host}` : new URL(request.url).origin;
}

export async function POST(request: Request) {
  const origin = siteOrigin(request);
  const back = (reason: string) => NextResponse.redirect(`${origin}/pricing?checkout=${reason}`, 303);

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return back("unavailable");
  const stripe = new Stripe(key);

  const form = await request.formData();
  const amount = Number(form.get("credit"));
  const credit = (CREDIT_OPTIONS as readonly number[]).includes(amount) ? amount : 0;

  try {
    const priceId = await platformPriceId(stripe);
    if (!priceId) return back("unavailable");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
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
