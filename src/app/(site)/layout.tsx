import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { RestaurantJsonLd } from "@/components/seo/structured-data";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RestaurantJsonLd />
      <Navbar />
      <CartDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
