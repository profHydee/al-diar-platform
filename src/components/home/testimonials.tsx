"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/mock/data";

export function Testimonials() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[active];

  return (
    <section className="bg-gradient-to-b from-cream to-sand/30 py-20">
      <div className="container-luxe">
        <SectionHeading eyebrow="Guest Love" title="What Our Family Says" />
        <div className="relative mx-auto mt-12 max-w-3xl">
          <Quote className="mx-auto h-12 w-12 text-gold/30" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="mt-4 font-display text-2xl leading-relaxed text-ink sm:text-3xl">
                &ldquo;{t.body}&rdquo;
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-gold/40">
                  <Image src={t.avatar} alt={t.author} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="font-semibold text-ink">{t.author}</p>
                  <p className="text-sm text-ink/55">{t.role}</p>
                </div>
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink/60 hover:bg-white"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-gold" : "w-2 bg-ink/20"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((a) => (a + 1) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink/60 hover:bg-white"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
