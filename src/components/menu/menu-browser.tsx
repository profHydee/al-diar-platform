"use client";

import * as React from "react";
import { Search, SlidersHorizontal, Flame } from "lucide-react";
import { categories, menuItems } from "@/lib/mock/data";
import { DishCard } from "@/components/menu/dish-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const dietary = ["Halal", "Vegan", "Vegetarian", "Gluten-Free", "Keto"];

export function MenuBrowser() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");
  const [tags, setTags] = React.useState<string[]>([]);
  const [popularOnly, setPopularOnly] = React.useState(false);

  const filtered = menuItems.filter((m) => {
    if (category !== "all" && m.category !== category) return false;
    if (popularOnly && !m.isPopular) return false;
    if (tags.length && !tags.every((t) => m.dietaryTags.some((d) => d.toLowerCase().includes(t.toLowerCase())))) return false;
    if (query && !`${m.name} ${m.description} ${m.arabicName ?? ""}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const toggleTag = (t: string) => setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <div className="container-luxe py-14">
      {/* Search + filters */}
      <div className="sticky top-20 z-30 rounded-3xl border border-ink/8 bg-cream/90 p-5 shadow-luxe backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" />
            <Input
              placeholder="Search dishes, e.g. 'mandi' or 'spicy'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12"
            />
          </div>
          <button
            onClick={() => setPopularOnly((v) => !v)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition",
              popularOnly ? "border-gold bg-gold text-ink" : "border-ink/15 text-ink/70 hover:bg-white"
            )}
          >
            <Flame className="h-4 w-4" /> Popular
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCategory("all")}
            className={cn("shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition", category === "all" ? "bg-emerald-deep text-cream" : "bg-white text-ink/70 hover:bg-emerald-deep/5")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.slug)}
              className={cn("shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition", category === c.slug ? "bg-emerald-deep text-cream" : "bg-white text-ink/70 hover:bg-emerald-deep/5")}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-ink/50"><SlidersHorizontal className="h-3.5 w-3.5" /> Dietary:</span>
          {dietary.map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={cn("rounded-full px-3 py-1 text-xs font-medium transition", tags.includes(t) ? "bg-gold text-ink" : "bg-white text-ink/60 ring-1 ring-ink/10 hover:bg-gold/10")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-ink/50">{filtered.length} dishes</p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item, i) => (
          <DishCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-ink/50">
          <p className="font-display text-2xl text-ink">No dishes found</p>
          <p className="mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
