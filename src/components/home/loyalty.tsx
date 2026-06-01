import { Award, Gift, Crown, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const tiers = [
  { name: "Bronze", icon: Star, points: "New Members", color: "from-clay/20 to-clay/5", accent: "text-clay", perks: ["Welcome reward", "Birthday treat"] },
  { name: "Silver", icon: Award, points: "500 pts", color: "from-slate-300/30 to-slate-200/10", accent: "text-slate-500", perks: ["Free drink monthly", "Early access"] },
  { name: "Gold", icon: Gift, points: "1,500 pts", color: "from-gold/30 to-gold/5", accent: "text-gold-dark", perks: ["Free dessert weekly", "Priority booking"] },
  { name: "Platinum", icon: Crown, points: "5,000 pts", color: "from-emerald/25 to-emerald/5", accent: "text-emerald", perks: ["Chef's table", "Concierge line"] },
];

export function LoyaltyPreview() {
  return (
    <section className="container-luxe py-20">
      <SectionHeading
        eyebrow="Rewards"
        title="The More You Savor, The More You Earn"
        description="Earn a point for every dollar. Climb four tiers of exclusive rewards."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.08}>
            <div className={`h-full rounded-3xl border border-ink/8 bg-gradient-to-b ${tier.color} p-7 transition-transform hover:-translate-y-1.5`}>
              <tier.icon className={`h-9 w-9 ${tier.accent}`} />
              <h3 className="mt-4 font-display text-2xl text-ink">{tier.name}</h3>
              <p className={`text-sm font-medium ${tier.accent}`}>{tier.points}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink/65">
                {tier.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/dashboard/rewards" size="lg" variant="red">Join the Rewards Program</Button>
      </div>
    </section>
  );
}
