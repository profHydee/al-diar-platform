"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { menuItems, categories } from "@/lib/mock/data";
import { formatCurrency, cn } from "@/lib/utils";

export default function AdminMenuPage() {
  const [items, setItems] = React.useState(menuItems.map((m) => ({ ...m, available: true })));
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("all");

  const filtered = items.filter(
    (m) => (cat === "all" || m.category === cat) && m.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-4">
        <StatMini label="Total Items" value={String(items.length)} />
        <StatMini label="Categories" value={String(categories.length)} />
        <StatMini label="Available" value={String(items.filter((i) => i.available).length)} />
        <StatMini label="Chef Picks" value={String(items.filter((i) => i.isChefPick).length)} />
      </div>

      <Panel
        title="Menu Items"
        action={<Button size="sm"><Plus className="h-4 w-4" /> Add Item</Button>}
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items..." className="pl-10" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-12 rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-gold">
            <option value="all">All categories</option>
            {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-ink/50">
                <th className="pb-3 font-medium">Item</th><th className="pb-3 font-medium">Category</th>
                <th className="pb-3 text-right font-medium">Price</th><th className="pb-3 text-center font-medium">Available</th>
                <th className="pb-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-ink/5">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-lg"><Image src={m.image} alt={m.name} fill className="object-cover" sizes="44px" /></div>
                      <div><p className="font-medium text-ink">{m.name}</p><p className="text-xs text-ink/45">{m.dietaryTags.join(", ")}</p></div>
                    </div>
                  </td>
                  <td className="py-3 text-ink/60">{categories.find((c) => c.slug === m.category)?.name}</td>
                  <td className="py-3 text-right text-ink/80">{formatCurrency(m.price)}</td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => setItems((p) => p.map((x) => (x.id === m.id ? { ...x, available: !x.available } : x)))}
                      className={cn("relative h-6 w-11 rounded-full transition-colors", m.available ? "bg-emerald" : "bg-ink/20")}
                    >
                      <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform", m.available ? "translate-x-5" : "translate-x-0.5")} />
                    </button>
                  </td>
                  <td className="py-3">
                    <div className="flex justify-end gap-1">
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-cream"><Pencil className="h-4 w-4" /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-clay hover:bg-clay/10"><Trash2 className="h-4 w-4" /></button>
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

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-luxe">
      <p className="text-sm text-ink/55">{label}</p>
      <p className="mt-1 font-display text-2xl text-ink">{value}</p>
    </div>
  );
}
