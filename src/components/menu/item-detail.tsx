"use client";

import * as React from "react";
import Image from "next/image";
import { Minus, Plus, Flame, Clock, Flame as Fire, Heart, ShoppingBag } from "lucide-react";
import type { MenuItem } from "@/lib/mock/data";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/page-header";
import { formatCurrency } from "@/lib/utils";

const sampleReviews = [
  { author: "Noor A.", rating: 5, date: "2 weeks ago", body: "Absolutely divine. The smoke flavor is unreal and portions are generous." },
  { author: "James T.", rating: 5, date: "1 month ago", body: "Best in the city. I drive 40 minutes just for this dish." },
  { author: "Sara M.", rating: 4, date: "1 month ago", body: "Delicious and authentic. Would love a touch more spice but still excellent." },
];

export function ItemDetail({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [qty, setQty] = React.useState(1);
  const [selected, setSelected] = React.useState<Record<string, string>>({});
  const [fav, setFav] = React.useState(false);

  const addonTotal = Object.entries(selected).reduce((sum, [group, optName]) => {
    const g = item.addons?.find((a) => a.group === group);
    const o = g?.options.find((x) => x.name === optName);
    return sum + (o?.price ?? 0);
  }, 0);

  const unit = item.price + addonTotal;

  return (
    <div className="container-luxe py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-luxe">
            <Image src={item.image} alt={item.name} fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            {item.isChefPick && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-sm font-semibold text-gold">
                <Flame className="h-4 w-4" /> Chef&apos;s Pick
              </span>
            )}
          </div>
        </div>

        <div>
          {item.arabicName && <p className="font-arabic text-2xl text-gold-dark">{item.arabicName}</p>}
          <h1 className="font-display text-4xl text-ink">{item.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={item.rating} />
            <span className="text-sm text-ink/60">{item.rating} · {item.reviewCount} reviews</span>
          </div>
          <p className="mt-5 leading-relaxed text-ink/70">{item.description}</p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-ink/60">
            {item.calories && <span className="flex items-center gap-1.5"><Fire className="h-4 w-4 text-gold-dark" /> {item.calories} cal</span>}
            {item.prepTime && <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold-dark" /> {item.prepTime} min</span>}
            {item.spiceLevel > 0 && (
              <span className="flex items-center gap-1">
                Spice: {Array.from({ length: item.spiceLevel }).map((_, i) => <Flame key={i} className="h-4 w-4 fill-clay text-clay" />)}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.dietaryTags.map((t) => (
              <span key={t} className="rounded-full bg-emerald-deep/8 px-3 py-1 text-xs font-medium text-emerald-deep">{t}</span>
            ))}
          </div>

          {item.addons?.map((g) => (
            <div key={g.group} className="mt-6">
              <p className="mb-2 font-medium text-ink">
                {g.group} {g.required && <span className="text-xs text-clay">(required)</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.options.map((o) => {
                  const active = selected[g.group] === o.name;
                  return (
                    <button
                      key={o.name}
                      onClick={() => setSelected((p) => ({ ...p, [g.group]: o.name }))}
                      className={`rounded-xl border px-4 py-2 text-sm transition ${active ? "border-gold bg-gold/10 text-ink" : "border-ink/15 text-ink/70 hover:border-gold/50"}`}
                    >
                      {o.name}{o.price > 0 && <span className="ml-1 text-gold-dark">+{formatCurrency(o.price)}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-ink/15 px-3 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"><Minus className="h-4 w-4" /></button>
              <span className="w-6 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"><Plus className="h-4 w-4" /></button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => add({ id: `${item.id}-${JSON.stringify(selected)}`, name: item.name, price: unit, image: item.image }, qty)}
            >
              <ShoppingBag className="h-5 w-5" /> Add to Cart · {formatCurrency(unit * qty)}
            </Button>
            <button
              onClick={() => setFav((f) => !f)}
              className={`grid h-14 w-14 place-items-center rounded-full border transition ${fav ? "border-clay bg-clay/10 text-clay" : "border-ink/15 text-ink/50 hover:border-clay/50"}`}
              aria-label="Save to wishlist"
            >
              <Heart className={`h-6 w-6 ${fav ? "fill-clay" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16 border-t border-ink/10 pt-12">
        <h2 className="font-display text-2xl text-ink">Guest Reviews</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {sampleReviews.map((r, i) => (
            <div key={i} className="rounded-2xl border border-ink/8 bg-white p-5 shadow-luxe">
              <div className="flex items-center justify-between">
                <p className="font-medium text-ink">{r.author}</p>
                <span className="text-xs text-ink/40">{r.date}</span>
              </div>
              <Stars rating={r.rating} className="mt-1" />
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
