import Image from "next/image";
import { Check, X, Landmark, Leaf, Heart, Flame } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { IMG } from "@/lib/mock/images";

const icons = { Landmark, Leaf, Heart, Flame } as const;

const features = [
  { icon: "Landmark", title: "Authentic Heritage", desc: "Recipes passed through three generations, unchanged and uncompromised." },
  { icon: "Leaf", title: "Fresh Daily", desc: "Spices ground in-house, bread baked to order — nothing frozen, ever." },
  { icon: "Heart", title: "Family First", desc: "Every guest welcomed as family. That's the Yemeni way of hospitality." },
  { icon: "Flame", title: "Crafted with Fire", desc: "Charcoal grills and underground tandoors, the way it's meant to be." },
];

const comparison = [
  { label: "Authentic Yemeni Cuisine", us: true, them: false },
  { label: "Fresh, Halal Ingredients Daily", us: true, them: false },
  { label: "Three-Generation Family Recipes", us: true, them: false },
  { label: "Real-Time Order Tracking", us: true, them: false },
  { label: "Loyalty Rewards & Tiers", us: true, them: true },
  { label: "Premium Catering Service", us: true, them: false },
];

export function WhyChoose() {
  return (
    <section className="container-luxe py-20">
      <SectionHeading eyebrow="Why Al-Diar" title="A Standard of Excellence" />
      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => {
          const Icon = icons[f.icon as keyof typeof icons];
          return (
            <StaggerItem key={f.title}>
              <div className="group h-full rounded-3xl border border-ink/8 bg-white p-7 shadow-luxe transition-transform hover:-translate-y-1.5">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-deep/8 text-dark transition-colors group-hover:bg-red-500 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{f.desc}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

export function WhyDifferent() {
  return (
    <section className="container-luxe py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-luxe">
            <Image src={IMG.chef} alt="Chef plating a dish" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
          <div className="absolute -bottom-6 -right-4 glass-dark rounded-2xl p-5 text-cream">
            <p className="font-display text-3xl text-gold-light">100%</p>
            <p className="text-xs uppercase tracking-widest text-cream/70">Certified Halal</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading align="left" eyebrow="The Difference" title="Why Al-Diar Stands Apart" />
          <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-white">
            <div className="grid grid-cols-[1fr_auto_auto] bg-red-500 px-5 py-3 text-sm font-semibold text-white">
              <span>Feature</span>
              <span className="w-20 text-center text-white">Al-Diar</span>
              <span className="w-20 text-center text-white">Others</span>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_auto_auto] items-center px-5 py-3.5 text-sm ${i % 2 ? "bg-cream/40" : ""}`}
              >
                <span className="text-ink/80">{row.label}</span>
                <span className="grid w-20 place-items-center">
                  {row.us ? <Check className="h-5 w-5 text-emerald-light" /> : <X className="h-5 w-5 text-ink/20" />}
                </span>
                <span className="grid w-20 place-items-center">
                  {row.them ? <Check className="h-5 w-5 text-ink/30" /> : <X className="h-5 w-5 text-clay/50" />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
