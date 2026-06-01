import { NextResponse } from "next/server";
import { createCharge } from "@/lib/clover";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const orderNumber = "AD-" + Math.floor(Math.random() * 90000 + 10000);
  const amountCents = Math.round((body.total ?? 0) * 100);

  try {
    const charge = await createCharge({
      amountCents,
      source: "tok_demo_card",
      orderNumber,
      email: body.email,
    });

    // In production: persist Order + OrderItems + OrderStatusEvent via Prisma here,
    // award loyalty points, and trigger a Resend confirmation email.

    return NextResponse.json({
      orderNumber,
      payment: { id: charge.id, status: charge.status, receiptUrl: charge.receiptUrl },
    });
  } catch (err) {
    return NextResponse.json({ error: "Payment failed", detail: String(err) }, { status: 402 });
  }
}
