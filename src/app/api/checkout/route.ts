import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { plan, resumeData } = await request.json();
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "https://resumeai.site";

    const priceId = plan === "pro" ? PRICES.PRO_MONTHLY : PRICES.ONE_TIME;
    const mode = plan === "pro" ? "subscription" : "payment";

    const session = await stripe.checkout.sessions.create({
      mode: mode as "payment" | "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/builder?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${origin}/builder?canceled=true`,
      metadata: {
        resumeData: JSON.stringify(resumeData).slice(0, 500),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
