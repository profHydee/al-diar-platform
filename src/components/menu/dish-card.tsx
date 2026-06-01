"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Plus, Flame, Leaf } from "lucide-react";
import type { MenuItem } from "@/lib/mock/data";
import { useCart } from "@/components/cart/cart-provider";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";

export function DishCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  const { add } = useCart();
  const isVeg = item.dietaryTags.some((t) => /vegan|vegetarian/i.test(t));

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-luxe"
    >
      <Link href={`/menu/${item.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60" />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {item.isChefPick && <Badge variant="ink"><Flame className="h-3 w-3 text-gold" /> Chef&apos;s Pick</Badge>}
          {item.isPopular && <Badge variant="gold">Popular</Badge>}
        </div>
        {isVeg && (
          <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-emerald-light/90 text-cream">
            <Leaf className="h-4 w-4" />
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg leading-tight text-ink">{item.name}</h3>
            {item.arabicName && <p className="font-arabic text-sm text-gold-dark">{item.arabicName}</p>}
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gold/10 px-2 py-1 text-xs font-semibold text-gold-dark">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {item.rating}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">{item.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.spiceLevel > 0 && (
            <span className="inline-flex items-center gap-0.5 text-xs text-clay">
              {Array.from({ length: item.spiceLevel }).map((_, i) => (
                <Flame key={i} className="h-3 w-3 fill-clay" />
              ))}
            </span>
          )}
          {item.dietaryTags.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full bg-emerald-deep/8 px-2 py-0.5 text-[11px] text-gold-dark">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-xl text-ink">{formatCurrency(item.price)}</span>
          <button
            onClick={() => add({ id: item.id, name: item.name, price: item.price, image: item.image })}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-cream",
              "transition-all hover:bg-emerald hover:shadow-lg active:scale-95"
            )}
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
