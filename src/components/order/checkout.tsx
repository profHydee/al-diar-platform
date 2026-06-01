"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, Store, Clock, Tag, Award, CreditCard, Check, ShieldCheck, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { formatCurrency, cn } from "@/lib/utils";

const COUPONS: Record<string, { type: "percent" | "fixed"; value: number }> = {
  WELCOME10: { type: "fixed", value: 10 },
  FAMILY25: { type: "percent", value: 25 },
};

export function Checkout() {
  const { lines, subtotal, setQty, remove, clear, count } = useCart();
  const [type, setType] = React.useState<"DELIVERY" | "PICKUP">("DELIVERY");
  const [schedule, setSchedule] = React.useState("asap");
  const [couponInput, setCouponInput] = React.useState("");
  const [coupon, setCoupon] = React.useState<{ code: string; amount: number } | null>(null);
  const [usefPoints, setUsePoints] = React.useState(false);
  const [placed, setPlaced] = React.useState<null | { orderNumber: string }>(null);
  const [loading, setLoading] = React.useState(false);

  const pointsBalance = 1240; // mock logged-in customer
  const pointsValue = usefPoints ? Math.min(pointsBalance / 100, subtotal * 0.5) : 0;
  const deliveryFee = type === "DELIVERY" && subtotal > 0 ? 3.99 : 0;
  const discount = (coupon?.amount ?? 0) + pointsValue;
  const tax = Math.max(0, subtotal - (coupon?.amount ?? 0)) * 0.06;
  const total = Math.max(0, subtotal + deliveryFee + tax - discount);

  function applyCoupon() {
    const c = COUPONS[couponInput.toUpperCase()];
    if (!c) { setCoupon({ code: "INVALID", amount: 0 }); return; }
    const amount = c.type === "percent" ? (subtotal * c.value) / 100 : c.value;
    setCoupon({ code: couponInput.toUpperCase(), amount });
  }

  async function placeOrder() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, schedule, total, items: lines }),
    }).then((r) => r.json()).catch(() => ({ orderNumber: "AD-" + Math.floor(Math.random() * 90000 + 10000) }));
    setLoading(false);
    setPlaced({ orderNumber: res.orderNumber ?? "AD-" + Math.floor(Math.random() * 90000 + 10000) });
    clear();
  }

  if (placed) {
    return (
      <div className="container-luxe flex min-h-[60vh] items-center justify-center py-16">
        <div className="max-w-md rounded-[2rem] border border-ink/8 bg-white p-10 text-center shadow-luxe">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-light/15">
            <Check className="h-10 w-10 text-emerald" />
          </div>
          <h1 className="mt-6 font-display text-3xl text-ink">Order Confirmed!</h1>
          <p className="mt-2 text-ink/60">Your order <span className="font-semibold text-emerald-deep">#{placed.orderNumber}</span> has been received and paid via Clover.</p>
          <p className="mt-1 text-sm text-ink/50">You earned {Math.floor(total)} loyalty points.</p>
          <div className="mt-8 flex flex-col gap-3">
            <Button href="/dashboard/orders" size="lg">Track Your Order</Button>
            <Button href="/menu" variant="outline">Order More</Button>
          </div>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="container-luxe flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="font-display text-3xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink/60">Add some dishes to begin your order.</p>
        <Button href="/menu" size="lg" className="mt-6">Browse Menu</Button>
      </div>
    );
  }

  return (
    <div className="container-luxe grid gap-8 py-14 lg:grid-cols-[1.4fr_1fr]">
      {/* Left: options */}
      <div className="space-y-6">
        {/* Order type */}
        <Card title="How would you like your order?">
          <div className="grid grid-cols-2 gap-3">
            {([["DELIVERY", Truck, "Delivery"], ["PICKUP", Store, "Pickup"]] as const).map(([val, Icon, label]) => (
              <button
                key={val}
                onClick={() => setType(val)}
                className={cn("flex items-center gap-3 rounded-2xl border p-4 text-left transition", type === val ? "border-gold bg-gold/10" : "border-ink/12 hover:border-gold/40")}
              >
                <Icon className={cn("h-6 w-6", type === val ? "text-gold-dark" : "text-ink/50")} />
                <span className="font-medium text-ink">{label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Schedule */}
        <Card title="When?">
          <div className="flex flex-wrap gap-3">
            {[["asap", "As soon as possible"], ["schedule", "Schedule for later"]].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setSchedule(v)}
                className={cn("inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition", schedule === v ? "border-gold bg-gold/10 text-ink" : "border-ink/12 text-ink/70")}
              >
                <Clock className="h-4 w-4" /> {l}
              </button>
            ))}
          </div>
          {schedule === "schedule" && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div><Label>Date</Label><Input type="date" /></div>
              <div><Label>Time</Label><Input type="time" /></div>
            </div>
          )}
        </Card>

        {type === "DELIVERY" && (
          <Card title="Delivery address">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label>Street address</Label><Input placeholder="123 Main St" /></div>
              <div><Label>City</Label><Input placeholder="Dearborn" /></div>
              <div><Label>ZIP</Label><Input placeholder="48126" /></div>
            </div>
          </Card>
        )}

        {/* Payment */}
        <Card title="Payment">
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-deep/5 px-4 py-3 text-sm text-emerald-deep">
            <ShieldCheck className="h-5 w-5" /> Secured by Clover Payments · PCI-compliant
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2"><Label>Card number</Label><Input placeholder="4242 4242 4242 4242" /></div>
            <div><Label>Expiry</Label><Input placeholder="MM / YY" /></div>
            <div><Label>CVC</Label><Input placeholder="123" /></div>
          </div>
          <p className="mt-2 text-xs text-ink/40">Demo mode — no real charge is made. Uses Clover sandbox credentials.</p>
        </Card>
      </div>

      {/* Right: summary */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[2rem] border border-ink/8 bg-white p-6 shadow-luxe">
          <h2 className="font-display text-2xl text-ink">Order Summary</h2>

          <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
            {lines.map((l) => (
              <div key={l.id} className="flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image src={l.image} alt={l.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">{l.name}</p>
                  <p className="text-sm text-gold-dark">{formatCurrency(l.price)}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <button onClick={() => setQty(l.id, l.qty - 1)} className="grid h-6 w-6 place-items-center rounded-full border border-ink/15"><Minus className="h-3 w-3" /></button>
                    <span className="text-sm">{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)} className="grid h-6 w-6 place-items-center rounded-full border border-ink/15"><Plus className="h-3 w-3" /></button>
                    <button onClick={() => remove(l.id)} className="ml-auto text-ink/40 hover:text-clay"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="mt-5 border-t border-ink/10 pt-5">
            <Label>Coupon code</Label>
            <div className="flex gap-2">
              <Input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="WELCOME10" />
              <Button variant="red" onClick={applyCoupon}><Tag className="h-4 w-4" /> Apply</Button>
            </div>
            {coupon && coupon.code !== "INVALID" && <p className="mt-2 text-xs text-emerald">Applied {coupon.code} · −{formatCurrency(coupon.amount)}</p>}
            {coupon?.code === "INVALID" && <p className="mt-2 text-xs text-clay">Invalid coupon code</p>}
          </div>

          {/* Loyalty */}
          <button
            onClick={() => setUsePoints((v) => !v)}
            className={cn("mt-4 flex w-full items-center justify-between rounded-xl border p-3 text-sm transition", usefPoints ? "border-gold bg-gold/10" : "border-ink/12")}
          >
            <span className="flex items-center gap-2 text-ink/80"><Award className="h-4 w-4 text-gold-dark" /> Redeem {pointsBalance} points</span>
            <span className="font-medium text-emerald">−{formatCurrency(Math.min(pointsBalance / 100, subtotal * 0.5))}</span>
          </button>

          <div className="mt-5 space-y-2 border-t border-ink/10 pt-5 text-sm text-ink/65">
            <Row label="Subtotal" value={formatCurrency(subtotal)} />
            {deliveryFee > 0 && <Row label="Delivery" value={formatCurrency(deliveryFee)} />}
            {discount > 0 && <Row label="Discount" value={`−${formatCurrency(discount)}`} accent />}
            <Row label="Tax" value={formatCurrency(tax)} />
            <div className="flex justify-between border-t border-ink/10 pt-3 text-lg font-semibold text-ink">
              <span>Total</span><span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button size="lg" className="mt-5 w-full" onClick={placeOrder} disabled={loading}>
            <CreditCard className="h-5 w-5" /> {loading ? "Processing..." : `Pay ${formatCurrency(total)}`}
          </Button>
          <p className="mt-3 text-center text-xs text-ink/40">
            By placing this order you agree to our <Link href="#" className="underline">terms</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-ink/8 bg-white p-6 shadow-luxe">
      <h2 className="mb-4 font-display text-xl text-ink">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={accent ? "text-emerald" : ""}>{value}</span>
    </div>
  );
}
