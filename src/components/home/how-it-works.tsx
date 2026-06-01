"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, CreditCard, Truck, UtensilsCrossed, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Search, title: "Browse Menu", points: ["Explore categories", "Search dishes", "View ratings & reviews", "Discover chef picks"] },
  { icon: SlidersHorizontal, title: "Customize Order", points: ["Choose meal options", "Add extras", "Select quantity", "Save favorites"] },
  { icon: CreditCard, title: "Checkout Securely", points: ["Delivery or pickup", "Clover secure payment", "Apply rewards & coupons"] },
  { icon: Truck, title: "Track Your Order", points: ["Real-time status", "Driver notifications", "Estimated arrival time"] },
  { icon: UtensilsCrossed, title: "Enjoy Your Meal", points: ["Receive delivery", "Leave a review", "Earn loyalty points"] },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-sand/30 py-20">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="How It Works"
          title="From Craving to Doorstep in 5 Steps"
          description="A seamless, premium ordering journey designed around you."
        />

        <div className="relative mt-16">
          {/* animated progression line (desktop) */}
          <div className="absolute left-0 right-0 top-10 hidden lg:block">
            <div className="mx-[10%] h-0.5 bg-gold/20">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                style={{ originX: 0 }}
                className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-white shadow-luxe ring-4 ring-gold/10">
                  <step.icon className="h-8 w-8 text-dark" />
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-red-500 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl text-ink">{step.title}</h3>
                <ul className="mt-3 space-y-1 text-sm text-ink/55">
                  {step.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Button href="/order" size="lg" className="bg-red-500 text-white hover:text-ink">
            Start Your Order <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
