"use client";

import * as React from "react";
import { Star, Check, X, Sparkles } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { cn } from "@/lib/utils";

type Review = { id: string; author: string; dish: string; rating: number; body: string; status: "PENDING" | "APPROVED" | "REJECTED"; featured: boolean };

const seed: Review[] = [
  { id: "1", author: "Noor A.", dish: "Royal Lamb Mandi", rating: 5, body: "Absolutely divine — the smoke flavor is unreal.", status: "PENDING", featured: false },
  { id: "2", author: "James T.", dish: "Mixed Grill", rating: 5, body: "Best in the city. Worth every mile of the drive.", status: "APPROVED", featured: true },
  { id: "3", author: "Sara M.", dish: "Saltah", rating: 4, body: "Delicious and authentic, could use a touch more spice.", status: "PENDING", featured: false },
  { id: "4", author: "Anon", dish: "Qishr", rating: 2, body: "Too bitter for me personally.", status: "PENDING", featured: false },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = React.useState(seed);
  const set = (id: string, patch: Partial<Review>) => setReviews((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <Panel title="Review Moderation">
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-ink/8 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink">{r.author}</p>
                  <span className="text-xs text-ink/45">on {r.dish}</span>
                  <span className="inline-flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-gold text-gold" : "text-ink/20"}`} />)}</span>
                </div>
                <p className="mt-1.5 text-sm text-ink/65">{r.body}</p>
                <span className={cn("mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  r.status === "APPROVED" ? "bg-emerald-light/20 text-emerald" : r.status === "REJECTED" ? "bg-clay/15 text-clay" : "bg-ink/10 text-ink/60")}>
                  {r.status}{r.featured && " · Featured"}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => set(r.id, { status: "APPROVED" })} className="inline-flex items-center gap-1 rounded-lg bg-emerald-light/15 px-3 py-1.5 text-xs font-medium text-emerald hover:bg-emerald-light/25"><Check className="h-4 w-4" /> Approve</button>
                <button onClick={() => set(r.id, { status: "REJECTED" })} className="inline-flex items-center gap-1 rounded-lg bg-clay/10 px-3 py-1.5 text-xs font-medium text-clay hover:bg-clay/20"><X className="h-4 w-4" /> Reject</button>
                <button onClick={() => set(r.id, { featured: !r.featured })} className={cn("inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium", r.featured ? "bg-gold text-ink" : "bg-gold/10 text-gold-dark hover:bg-gold/20")}><Sparkles className="h-4 w-4" /> Feature</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
