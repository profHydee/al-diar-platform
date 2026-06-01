import { Check, Clock, RotateCcw, Download, Truck } from "lucide-react";
import { Panel, StatusBadge } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { customerOrders } from "@/lib/mock/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";

const stages = ["Pending", "Confirmed", "Preparing", "Assigned", "On The Way", "Delivered"];

export default function OrdersPage() {
  const active = customerOrders[0];
  const currentStage = stages.indexOf(active.stage);
  const history = customerOrders.slice(1);

  return (
    <div className="space-y-6">
      {/* Active order tracking */}
      <Panel title={`Tracking Order #${active.id}`} action={<StatusBadge status={active.stage} />}>
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-gold/10 p-4">
          <Truck className="h-6 w-6 text-gold-dark" />
          <div>
            <p className="font-medium text-ink">Estimated arrival: 12 minutes</p>
            <p className="text-sm text-ink/55">Yusuf M. is on the way with your order.</p>
          </div>
        </div>

        {/* Timeline */}
        <ol className="relative grid gap-6 sm:grid-cols-6 sm:gap-0">
          {stages.map((s, i) => {
            const done = i <= currentStage;
            const isCurrent = i === currentStage;
            return (
              <li key={s} className="relative flex items-center gap-3 sm:flex-col sm:text-center">
                {i < stages.length - 1 && (
                  <span className={`absolute left-[15px] top-8 h-full w-0.5 sm:left-1/2 sm:top-4 sm:h-0.5 sm:w-full sm:-translate-x-0 ${done ? "bg-gold" : "bg-ink/10"}`} />
                )}
                <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full ${done ? "bg-gold text-ink" : "bg-ink/10 text-ink/40"} ${isCurrent ? "ring-4 ring-gold/25" : ""}`}>
                  {done ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </span>
                <span className={`text-xs font-medium sm:mt-2 ${done ? "text-ink" : "text-ink/40"}`}>{s}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 rounded-2xl bg-cream/50 p-4">
          <p className="text-sm text-ink/55">{active.items.join(", ")}</p>
          <p className="mt-1 font-display text-lg text-ink">{formatCurrency(active.total)}</p>
        </div>
      </Panel>

      {/* History */}
      <Panel title="Order History">
        <div className="space-y-3">
          {history.map((o) => (
            <div key={o.id} className="flex flex-col gap-3 rounded-2xl border border-ink/8 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink">#{o.id}</p>
                  <StatusBadge status={o.stage} />
                </div>
                <p className="mt-1 text-sm text-ink/55">{o.items.join(", ")}</p>
                <p className="text-xs text-ink/40">{formatDate(o.date)} · {formatCurrency(o.total)}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><RotateCcw className="h-4 w-4" /> Reorder</Button>
                <Button variant="ghost" size="sm"><Download className="h-4 w-4" /> Receipt</Button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
