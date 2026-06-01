import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { DishCard } from "@/components/menu/dish-card";
import { Button } from "@/components/ui/button";
import { popularItems, chefPicks, menuItems } from "@/lib/mock/data";

export function FeaturedDishes() {
  const items = popularItems().slice(0, 4);
  return (
    <section className="container-luxe py-20">
      <SectionHeading
        eyebrow="Crowd Favorites"
        title="Dishes Our Guests Love"
        description="Handcrafted daily with imported spices and the freshest ingredients."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <DishCard key={item.id} item={item} index={i} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/menu" variant="outline" size="lg">
          Explore Full Menu <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

export function ChefRecommendations() {
  const items = chefPicks().slice(0, 4);
  return (
    <section className="relative bg-ink py-20 text-cream">
      <div className="container-luxe">
        <SectionHeading
          light
          eyebrow="Chef's Table"
          title="Recommendations from Chef Khaled"
          description="Personally curated signatures that define the Al-Diar experience."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <DishCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AIRecommendations() {
  // "Recommended for you" — in production driven by order history + collaborative filtering.
  const items = menuItems.slice(2, 6);
  return (
    <section className="container-luxe py-20">
      <div className="rounded-[2rem] border border-gold/20 bg-gradient-to-br from-cream to-sand/40 p-8 sm:p-12">
        <div className="flex items-center gap-2 text-gold-dark">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em]">Smart Picks</span>
        </div>
        <div className="mt-3 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="max-w-lg font-display text-3xl text-ink sm:text-4xl">
            Recommended for You
          </h2>
          <p className="max-w-md text-sm text-ink/60">
            Our recommendation engine learns your taste — pairing dishes you love with ones
            you&apos;re about to. <span className="text-gold-dark">Frequently ordered together &amp; trending now.</span>
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <DishCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
