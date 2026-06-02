"use client";

import * as React from "react";
import Image from "next/image";
import { Tag, Clock, Copy, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { promotions } from "@/lib/mock/data";

function useCountdown(target: string) {
  // Start at 0 so the server-rendered HTML and the first client render match
  // (computing Date.now() during render causes a hydration mismatch). The real
  // value is filled in immediately after mount.
  const [left, setLeft] = React.useState(0);
  React.useEffect(() => {
    const tick = () => setLeft(Math.max(0, +new Date(target) - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [target]);
  const d = Math.floor(left / 86400000);
  const h = Math.floor((left / 3600000) % 24);
  const m = Math.floor((left / 60000) % 60);
  const s = Math.floor((left / 1000) % 60);
  return { d, h, m, s };
}

function PromoCard({ promo }: { promo: (typeof promotions)[number] }) {
  const { d, h, m, s } = useCountdown(promo.endsAt);
  const [copied, setCopied] = React.useState(false);

  const units = [
    { v: d, l: "Days" },
    { v: h, l: "Hrs" },
    { v: m, l: "Min" },
    { v: s, l: "Sec" },
  ];

  return (
    <div className="group relative overflow-hidden rounded-[2rem] shadow-luxe">
      <Image src={promo.image} alt={promo.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" />
      <div className="relative flex flex-col gap-4 p-8 text-cream sm:p-10">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
          <Tag className="h-3.5 w-3.5" /> {promo.discount}
        </span>
        <h3 className="font-display text-3xl">{promo.title}</h3>
        <p className="max-w-sm text-cream/70">{promo.description}</p>

        <div className="flex items-center gap-2 text-gold-light">
          <Clock className="h-4 w-4" />
          <div className="flex gap-2">
            {units.map((u) => (
              <div key={u.l} className="rounded-lg glass px-2.5 py-1.5 text-center">
                <p className="font-display text-lg leading-none text-cream">{String(u.v).padStart(2, "0")}</p>
                <p className="text-[10px] uppercase text-cream/60">{u.l}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(promo.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-gold/60 px-4 py-2 text-sm font-medium text-cream hover:bg-gold/10"
        >
          {copied ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4" />}
          Code: <span className="font-bold tracking-wider text-gold">{promo.code}</span>
        </button>
      </div>
    </div>
  );
}

export function Promotions() {
  return (
    <section className="container-luxe py-20">
      <SectionHeading eyebrow="Limited Time" title="Featured Promotions" description="Exclusive offers — claim them before the clock runs out." />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {promotions.map((p) => (
          <PromoCard key={p.id} promo={p} />
        ))}
      </div>
    </section>
  );
}
