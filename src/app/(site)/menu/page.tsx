import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { IMG } from "@/lib/mock/images";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore Al-Diar's full menu of authentic Yemeni mandi, charcoal grills, mezze and more. Halal, fresh and crafted daily.",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        arabic="قائمة الطعام"
        title="Our Menu"
        subtitle="Authentic Yemeni cuisine, crafted fresh daily with imported spices and family recipes."
        image={IMG.platter}
      />
      <MenuBrowser />
    </>
  );
}
