"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, site } from "@/lib/site";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import newLogo from "@/assets/Al-diar-logo.jpg";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { count, setOpen } = useCart();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-dark py-2 shadow-luxe" : "py-4"
      )}
    >
      <nav className="container-luxe flex items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5">
          {/* <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink font-display text-lg font-bold transition-transform group-hover:scale-105">
            ا
          </span>
          <span className="flex flex-col leading-none">
            <span className={cn("font-display text-lg font-semibold", scrolled ? "text-cream" : "text-ink")}>
              {site.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold">Yemeni Cuisine</span>
          </span> */}
          <Image src={newLogo} alt="Al-Diar Logo" className="h-20 w-20 rounded-sm" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  scrolled ? "text-cream/80 hover:text-gold" : "text-cream/80 hover:text-gold",
                  active && (scrolled ? "text-gold" : "text-gold")
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open cart"
            className={cn(
              "relative grid h-11 w-11 place-items-center rounded-full transition-colors",
              scrolled ? "text-cream hover:bg-white/10" : "text-cream hover:bg-ink/5"
            )}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">
                {count}
              </span>
            )}
          </button>

          <Link
            href="/login"
            aria-label="Account"
            className={cn(
              "hidden h-11 w-11 place-items-center rounded-full transition-colors sm:grid",
              scrolled ? "text-cream hover:bg-white/10" : "text-cream hover:bg-ink/5"
            )}
          >
            <User className="h-5 w-5" />
          </Link>

          <Button href="/order" size="sm" className="hidden sm:inline-flex bg-red-500 text-white">
            Order Now
          </Button>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full lg:hidden",
              scrolled ? "text-cream" : "text-cream"
            )}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <div className="container-luxe flex h-20 items-center justify-between">
              <span className="font-display text-xl text-cream">{site.name}</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-cream">
                <X className="h-7 w-7" />
              </button>
            </div>
            <motion.ul
              className="container-luxe mt-6 flex flex-col gap-1"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {mainNav.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-2xl text-cream hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="container-luxe mt-8 flex flex-col gap-3">
              <Button href="/order" size="lg" onClick={() => setMobileOpen(false)}>
                Order Now
              </Button>
              <Button href="/login" variant="outline" size="lg" className="text-cream border-gold/40">
                Sign In
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
