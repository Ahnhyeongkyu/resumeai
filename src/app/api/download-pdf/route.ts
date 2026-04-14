import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, resume, template, watermark } = await request.json();

    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== "paid") {
        return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
      }
    }

    return NextResponse.json({
      success: true,
      resume,
      template,
      watermark: sessionId ? false : watermark !== false,
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
