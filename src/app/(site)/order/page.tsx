import type { Metadata } from "next";
import { Checkout } from "@/components/order/checkout";

export const metadata: Metadata = {
  title: "Order Online",
  description: "Order authentic Yemeni cuisine for delivery or pickup. Secure Clover checkout, loyalty points and coupons.",
};

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-sand/20 pt-24">
      <div className="container-luxe pt-6">
        <h1 className="font-display text-4xl text-ink">Checkout</h1>
        <p className="mt-1 text-ink/60">Almost there — review your order and pay securely.</p>
      </div>
      <Checkout />
    </div>
  );
}
