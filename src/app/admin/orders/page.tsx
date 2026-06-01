"use client";

import * as React from "react";
import { XCircle, RefreshCcw } from "lucide-react";
import { Panel, StatusBadge } from "@/components/dashboard/widgets";
import { recentOrders, drivers } from "@/lib/mock/dashboard";
import { formatCurrency, cn } from "@/lib/utils";

const stages = ["Pending", "Confirmed", "Preparing", "Assigned", "On The Way", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState(recentOrders);
  const [filter, setFilter] = React.useState("all");

  const shown = filter === "all" ? orders : orders.filter((o) => o.stage === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {["all", ...stages].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn("rounded-full px-3.5 py-1.5 text-sm font-medium transition", filter === s ? "bg-emerald-deep text-cream" : "bg-white text-ink/70 ring-1 ring-ink/10")}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-ink/50">
                <th className="pb-3 font-medium">Order</th><th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 text-right font-medium">Total</th><th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Driver</th><th className="pb-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((o) => (
                <tr key={o.id} className="border-b border-ink/5">
                  <td className="py-3 font-medium text-ink">#{o.id}<p className="text-xs font-normal text-ink/40">{o.time}</p></td>
                  <td className="py-3 text-ink/70">{o.customer}</td>
                  <td className="py-3 text-right text-ink/80">{formatCurrency(o.total)}</td>
                  <td className="py-3">
                    <select
                      value={o.stage}
                      onChange={(e) => setOrders((p) => p.map((x) => (x.id === o.id ? { ...x, stage: e.target.value } : x)))}
                      className="rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs outline-none focus:border-gold"
                    >
                      {stages.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-3">
                    <select
                      value={o.driver}
                      onChange={(e) => setOrders((p) => p.map((x) => (x.id === o.id ? { ...x, driver: e.target.value } : x)))}
                      className="rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs outline-none focus:border-gold"
                    >
                      <option value="—">Unassigned</option>
                      {drivers.map((d) => <option key={d.name} value={d.name.split(" ")[0]}>{d.name}</option>)}
                    </select>
                  </td>
                  <td className="py-3">
                    <div className="flex justify-end gap-1">
                      <button title="Refund" className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-cream"><RefreshCcw className="h-4 w-4" /></button>
                      <button title="Cancel" onClick={() => setOrders((p) => p.map((x) => (x.id === o.id ? { ...x, stage: "Cancelled" } : x)))} className="grid h-8 w-8 place-items-center rounded-lg text-clay hover:bg-clay/10"><XCircle className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
