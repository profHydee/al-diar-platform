import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getItemBySlug, getItemsByCategory, menuItems } from "@/lib/mock/data";
import { ItemDetail } from "@/components/menu/item-detail";
import { DishCard } from "@/components/menu/dish-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function generateStaticParams() {
  return menuItems.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return { title: "Dish not found" };
  return {
    title: item.name,
    description: item.description,
    openGraph: { images: [item.image], title: item.name, description: item.description },
  };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();

  const recommended = getItemsByCategory(item.category).filter((m) => m.slug !== slug).slice(0, 4);
  const fill = recommended.length < 4 ? menuItems.filter((m) => m.slug !== slug).slice(0, 4 - recommended.length) : [];
  const addons = [...recommended, ...fill];

  return (
    <div className="pt-20">
      <ItemDetail item={item} />
      <section className="container-luxe py-16">
        <SectionHeading align="left" eyebrow="Pairs Well With" title="Recommended Add-ons" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {addons.map((m, i) => (
            <DishCard key={m.id} item={m} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
