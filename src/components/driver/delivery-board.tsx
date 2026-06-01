"use client";

import * as React from "react";
import { MapPin, Navigation, Phone, Package, ArrowRight, Check } from "lucide-react";
import { Panel, StatusBadge } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { driverAssignments } from "@/lib/mock/dashboard";
import { formatCurrency } from "@/lib/utils";

const flow = ["Assigned", "Picked Up", "On The Way", "Delivered"];

export function DeliveryBoard() {
  const [orders, setOrders] = React.useState(
    driverAssignments.map((o) => ({ ...o, stageIndex: o.stage === "On The Way" ? 2 : 0 }))
  );

  function advance(id: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, stageIndex: Math.min(o.stageIndex + 1, flow.length - 1) } : o))
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((o) => {
        const stage = flow[o.stageIndex];
        const isDone = o.stageIndex === flow.length - 1;
        return (
          <Panel key={o.id}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-deep/8 text-emerald-deep"><Package className="h-6 w-6" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink">#{o.id}</p>
                    <StatusBadge status={stage} />
                  </div>
                  <p className="text-sm text-ink/70">{o.customer} · {o.items} items · {formatCurrency(o.total)}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/55"><MapPin className="h-4 w-4 text-gold-dark" /> {o.address} · {o.distance}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm"><Phone className="h-4 w-4" /> Call</Button>
                <Button variant="ghost" size="sm"><Navigation className="h-4 w-4" /> Navigate</Button>
                {isDone ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-light/20 px-4 py-2 text-sm font-medium text-emerald"><Check className="h-4 w-4" /> Delivered</span>
                ) : (
                  <Button size="sm" onClick={() => advance(o.id)}>
                    Mark {flow[o.stageIndex + 1]} <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Panel>
        );
      })}
    </div>
  );
}
