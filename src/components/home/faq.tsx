"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section className="container-luxe py-20">
      <SectionHeading eyebrow="Questions" title="Frequently Asked" />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-lg text-ink">{f.q}</span>
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-dark transition-transform", isOpen && "rotate-45")}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-ink/65">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
