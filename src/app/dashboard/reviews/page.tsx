"use client";

import * as React from "react";
import { Star, Pencil, Trash2, Send } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

type Review = { id: string; dish: string; rating: number; body: string; date: string };

const initial: Review[] = [
  { id: "r1", dish: "Royal Lamb Mandi", rating: 5, body: "Perfection. The smoke flavor is unmatched and the portion is huge.", date: "2026-05-22" },
  { id: "r2", dish: "Bint Al-Sahn", rating: 5, body: "Best dessert I've had in years. The honey is divine.", date: "2026-05-10" },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = React.useState<Review[]>(initial);
  const [rating, setRating] = React.useState(5);
  const [dish, setDish] = React.useState("");
  const [body, setBody] = React.useState("");
  const [editing, setEditing] = React.useState<string | null>(null);

  function submit() {
    if (!dish || !body) return;
    if (editing) {
      setReviews((p) => p.map((r) => (r.id === editing ? { ...r, dish, rating, body } : r)));
      setEditing(null);
    } else {
      setReviews((p) => [{ id: crypto.randomUUID(), dish, rating, body, date: new Date().toISOString() }, ...p]);
    }
    setDish(""); setBody(""); setRating(5);
  }

  function edit(r: Review) {
    setEditing(r.id); setDish(r.dish); setRating(r.rating); setBody(r.body);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <Panel title={editing ? "Edit Review" : "Write a Review"}>
        <div className="space-y-4">
          <div><Label>Dish</Label><Input value={dish} onChange={(e) => setDish(e.target.value)} placeholder="Which dish?" /></div>
          <div>
            <Label>Rating</Label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setRating(i + 1)} aria-label={`${i + 1} stars`}>
                  <Star className={`h-7 w-7 ${i < rating ? "fill-gold text-gold" : "text-ink/20"}`} />
                </button>
              ))}
            </div>
          </div>
          <div><Label>Your review</Label><Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Tell us about your experience..." /></div>
          <Button className="w-full" onClick={submit}><Send className="h-4 w-4" /> {editing ? "Save Changes" : "Submit Review"}</Button>
        </div>
      </Panel>

      <Panel title={`My Reviews (${reviews.length})`}>
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl border border-ink/8 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-ink">{r.dish}</p>
                  <span className="inline-flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-gold text-gold" : "text-ink/20"}`} />)}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => edit(r)} className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-cream"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => setReviews((p) => p.filter((x) => x.id !== r.id))} className="grid h-8 w-8 place-items-center rounded-lg text-clay hover:bg-clay/10"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <p className="mt-2 text-sm text-ink/65">{r.body}</p>
              <p className="mt-1 text-xs text-ink/40">{formatDate(r.date)}</p>
            </div>
          ))}
          {reviews.length === 0 && <p className="py-8 text-center text-ink/50">No reviews yet.</p>}
        </div>
      </Panel>
    </div>
  );
}
