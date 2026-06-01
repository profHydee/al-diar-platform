"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/mock/images";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image src={IMG.heroDish} alt="Al-Diar signature dish" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="pattern-arabesque absolute inset-0 opacity-[0.07]" />

      <div className="container-luxe relative z-10 grid items-center gap-12 pt-28 pb-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-cream"
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </span>
            Rated 4.9 by 2,500+ guests
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl"
          >
            Welcome To
            <br /> <span className="text-gradient-gold">Al-Diar Restaurant</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75"
          >
            Al Diar Restaurant, specializing in Yemeni cuisine, extends an invitation to savor the exquisite flavors of the Yemeni culinary tradition. Al-Diar Restaurant is recognized for its outstanding Food, excellent service, and friendly staff.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/order" size="lg" className="bg-red-500 text-white hover:text-ink" >
              Order Now <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/reservations" size="lg" className="bg-white/90 text-ink border-gold/90 hover:bg-gold/60">
              Reserve a Table
            </Button>
            <button className="group flex items-center gap-3 text-cream">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 transition group-hover:bg-gold group-hover:text-ink">
                <Play className="h-4 w-4 fill-current" />
              </span>
              <span className="text-sm">Watch our story</span>
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="animate-[float_6s_ease-in-out_infinite] glass rounded-3xl p-6 text-cream">
            <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
              <Image src={IMG.mandi} alt="Royal Lamb Mandi" fill className="object-cover" sizes="400px" />
            </div>
            <p className="text-xs uppercase tracking-widest text-gold">Today&apos;s Signature</p>
            <p className="mt-1 font-display text-2xl">Royal Lamb Mandi</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-gold-light">★ 4.9 · 342 reviews</span>
              <span className="font-display text-xl">$28.50</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-cream/30 pt-2">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
