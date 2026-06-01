import { DishCard } from "@/components/menu/dish-card";
import { Panel } from "@/components/dashboard/widgets";
import { menuItems } from "@/lib/mock/data";

export default function WishlistPage() {
  const saved = menuItems.filter((m) => m.isChefPick || m.isPopular).slice(0, 6);
  return (
    <Panel title={`Saved Dishes (${saved.length})`}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((item, i) => (
          <DishCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </Panel>
  );
}
