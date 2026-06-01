import { Gift, Coffee, Cake, Percent, Crown } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { rewardHistory } from "@/lib/mock/dashboard";
import { formatDate } from "@/lib/utils";

const rewards = [
  { icon: Coffee, title: "Free Adeni Tea", cost: 100, available: true },
  { icon: Cake, title: "Free Dessert", cost: 200, available: true },
  { icon: Percent, title: "$10 Off Coupon", cost: 300, available: true },
  { icon: Gift, title: "Free Mandi Entrée", cost: 800, available: false },
];

export default function RewardsPage() {
  const balance = 1240;
  const nextTier = 1500;
  const progress = Math.min(100, (balance / nextTier) * 100);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-deep to-emerald p-8 text-cream shadow-luxe">
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm text-gold-light"><Crown className="h-5 w-5" /> Gold Member</p>
            <p className="mt-2 font-display text-5xl">{balance.toLocaleString()}</p>
            <p className="text-cream/70">points available</p>
          </div>
          <div className="text-right text-sm text-cream/70">
            <p>{nextTier - balance} points to Platinum</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="h-2.5 w-full rounded-full bg-white/15">
            <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-cream/60"><span>Gold</span><span>Platinum · {nextTier.toLocaleString()}</span></div>
        </div>
      </div>

      <Panel title="Available Rewards">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rewards.map((r) => (
            <div key={r.title} className="rounded-2xl border border-ink/8 p-5 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold-dark"><r.icon className="h-7 w-7" /></div>
              <p className="mt-3 font-medium text-ink">{r.title}</p>
              <p className="text-sm text-ink/50">{r.cost} points</p>
              <Button size="sm" variant={r.available ? "primary" : "outline"} className="mt-3 w-full" disabled={!r.available}>
                {r.available ? "Redeem" : "Locked"}
              </Button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Redemption History">
        <div className="space-y-2">
          {rewardHistory.map((r, i) => (
            <div key={i} className="flex items-center justify-between border-b border-ink/5 py-2.5 text-sm last:border-0">
              <div><p className="text-ink/80">{r.reason}</p><p className="text-xs text-ink/40">{formatDate(r.date)}</p></div>
              <span className={r.type === "earned" ? "font-medium text-emerald" : "font-medium text-clay"}>{r.points > 0 ? "+" : ""}{r.points} pts</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
