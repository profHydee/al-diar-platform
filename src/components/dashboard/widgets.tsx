import * as React from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  icon,
  accent = "gold",
}: {
  label: string;
  value: string;
  delta?: string;
  icon: keyof typeof Icons;
  accent?: "gold" | "emerald" | "clay" | "ink";
}) {
  const Icon = (Icons[icon] ?? Icons.Circle) as React.ComponentType<{ className?: string }>;
  const accents = {
    gold: "bg-gold/15 text-gold-dark",
    emerald: "bg-emerald-deep/10 text-emerald-deep",
    clay: "bg-clay/15 text-clay",
    ink: "bg-ink/10 text-ink",
  };
  return (
    <div className="rounded-3xl border border-ink/8 bg-white p-6 shadow-luxe">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink/55">{label}</p>
          <p className="mt-2 font-display text-3xl text-ink">{value}</p>
        </div>
        <div className={cn("grid h-12 w-12 place-items-center rounded-2xl", accents[accent])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {delta && <p className="mt-3 text-xs text-emerald">{delta}</p>}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-ink/8 bg-white p-6 shadow-luxe", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="font-display text-xl text-ink">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

const stageStyles: Record<string, string> = {
  Pending: "bg-ink/10 text-ink/70",
  Confirmed: "bg-blue-100 text-blue-700",
  Preparing: "bg-amber-100 text-amber-700",
  Assigned: "bg-purple-100 text-purple-700",
  "On The Way": "bg-gold/20 text-gold-dark",
  Delivered: "bg-emerald-light/20 text-emerald",
  Cancelled: "bg-clay/15 text-clay",
  Active: "bg-emerald-light/20 text-emerald",
  New: "bg-blue-100 text-blue-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", stageStyles[status] ?? "bg-ink/10 text-ink/70")}>
      {status}
    </span>
  );
}
