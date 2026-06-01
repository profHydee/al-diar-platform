import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { StatCard, Panel, StatusBadge } from "@/components/dashboard/widgets";
import { customerOrders, rewardHistory } from "@/lib/mock/dashboard";
import { popularItems } from "@/lib/mock/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomerOverview() {
  const favorites = popularItems().slice(0, 3);
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value="42" delta="+3 this month" icon="Package" accent="emerald" />
        <StatCard label="Loyalty Points" value="1,240" delta="Gold tier" icon="Award" accent="gold" />
        <StatCard label="Active Orders" value="1" delta="On the way" icon="Truck" accent="clay" />
        <StatCard label="Favorite Meals" value="8" icon="Heart" accent="ink" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Recent Orders" className="lg:col-span-2" action={<Link href="/dashboard/orders" className="text-sm text-gold-dark hover:underline">View all</Link>}>
          <div className="space-y-3">
            {customerOrders.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-2xl bg-cream/50 p-4">
                <div>
                  <p className="font-medium text-ink">#{o.id}</p>
                  <p className="text-sm text-ink/55">{o.items.join(", ")}</p>
                  <p className="text-xs text-ink/40">{formatDate(o.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg text-ink">{formatCurrency(o.total)}</p>
                  <StatusBadge status={o.stage} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Rewards Activity">
          <div className="space-y-3">
            {rewardHistory.slice(0, 5).map((r, i) => (
              <div key={i} className="flex items-center justify-between border-b border-ink/5 pb-2 text-sm last:border-0">
                <div>
                  <p className="text-ink/80">{r.reason}</p>
                  <p className="text-xs text-ink/40">{formatDate(r.date)}</p>
                </div>
                <span className={r.type === "earned" ? "font-medium text-emerald" : "font-medium text-clay"}>
                  {r.points > 0 ? "+" : ""}{r.points}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Order Your Favorites Again" action={<Link href="/menu" className="flex items-center gap-1 text-sm text-gold-dark hover:underline">Full menu <ArrowRight className="h-4 w-4" /></Link>}>
        <div className="grid gap-4 sm:grid-cols-3">
          {favorites.map((f) => (
            <Link key={f.id} href={`/menu/${f.slug}`} className="group flex items-center gap-3 rounded-2xl bg-cream/50 p-3 hover:bg-cream">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={f.image} alt={f.name} fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <p className="font-medium text-ink group-hover:text-emerald-deep">{f.name}</p>
                <p className="text-sm text-gold-dark">{formatCurrency(f.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Panel>
    </div>
  );
}
