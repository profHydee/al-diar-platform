"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, LogOut, ChevronLeft } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; href: string; icon: keyof typeof Icons };

export function DashboardShell({
  nav,
  title,
  role,
  user,
  children,
}: {
  nav: NavItem[];
  title: string;
  role: string;
  user: { name: string; email: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const SidebarContent = (
    <>
      <Link href="/" className="flex items-center gap-2.5 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gold font-display text-lg font-bold text-ink">ا</span>
        <div className="leading-none">
          <p className="font-display text-lg text-cream">Al-Diar</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{role}</p>
        </div>
      </Link>

      <nav className="mt-8 flex-1 space-y-1">
        {nav.map((item) => {
          const Icon = (Icons[item.icon] ?? Icons.Circle) as React.ComponentType<{ className?: string }>;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-gold text-ink" : "text-cream/70 hover:bg-white/5 hover:text-cream"
              )}
            >
              <Icon className="h-5 w-5" /> {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 pt-4">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream/60 hover:bg-white/5">
          <ChevronLeft className="h-5 w-5" /> Back to site
        </Link>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream/60 hover:bg-white/5">
          <LogOut className="h-5 w-5" /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[270px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col bg-ink p-5 lg:flex">{SidebarContent}</aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-ink/60 lg:hidden" />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-ink p-5 lg:hidden">
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink/8 bg-cream/90 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-ink/10 lg:hidden"><Menu className="h-5 w-5" /></button>
            <h1 className="font-display text-2xl text-ink">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink/60 hover:bg-white">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-deep font-display text-cream">{user.name.charAt(0)}</div>
              <div className="hidden text-sm sm:block">
                <p className="font-medium text-ink">{user.name}</p>
                <p className="text-xs text-ink/50">{user.email}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-5 sm:p-7">{children}</main>
      </div>
    </div>
  );
}
