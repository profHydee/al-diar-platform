import { AnimatedCounter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { stats } from "@/lib/mock/data";

export function Stats() {
  return (
    <section className="relative -mt-px bg-red-500 py-14 text-cream">
      <div className="pattern-arabesque absolute inset-0 opacity-[0.08]" />
      <div className="container-luxe relative grid grid-cols-2 gap-8 md:grid-cols-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
              <AnimatedCounter value={s.value} suffix={s.suffix} decimals={(s as { decimals?: number }).decimals ?? 0} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cream/60">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
