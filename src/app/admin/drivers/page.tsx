import { Star, Plus, TrendingUp } from "lucide-react";
import { Panel, StatusBadge } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { drivers } from "@/lib/mock/dashboard";
import { formatCurrency } from "@/lib/utils";

export default function AdminDriversPage() {
  return (
    <div className="space-y-6">
      <Panel title="Drivers" action={<Button size="sm"><Plus className="h-4 w-4" /> Add Driver</Button>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drivers.map((d) => (
            <div key={d.name} className="rounded-2xl border border-ink/8 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gold font-display text-ink">{d.name.charAt(0)}</span>
                  <div><p className="font-medium text-ink">{d.name}</p><p className="text-xs text-ink/45">{d.area}</p></div>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-cream/60 p-2"><p className="font-display text-lg text-ink">{d.deliveries}</p><p className="text-[11px] text-ink/50">Deliveries</p></div>
                <div className="rounded-xl bg-cream/60 p-2"><p className="flex items-center justify-center gap-0.5 font-display text-lg text-ink"><Star className="h-3.5 w-3.5 fill-gold text-gold" />{d.rating}</p><p className="text-[11px] text-ink/50">Rating</p></div>
                <div className="rounded-xl bg-cream/60 p-2"><p className="font-display text-lg text-ink">{formatCurrency(d.earnings)}</p><p className="text-[11px] text-ink/50">Earnings</p></div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">Assign Order</Button>
                <Button size="sm" variant="ghost"><TrendingUp className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
