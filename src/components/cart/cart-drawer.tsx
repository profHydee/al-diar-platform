"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const { lines, isOpen, setOpen, setQty, remove, subtotal, count } = useCart();
  const deliveryFee = subtotal > 0 ? 3.99 : 0;
  const tax = subtotal * 0.06;
  const total = subtotal + deliveryFee + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream shadow-luxe"
          >
            <div className="flex items-center justify-between border-b border-ink/10 p-5">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                <ShoppingBag className="h-5 w-5 text-gold-dark" /> Your Order
                <span className="text-sm text-ink/50">({count})</span>
              </h2>
              <button onClick={() => setOpen(false)} aria-label="Close cart" className="text-ink/60 hover:text-ink">
                <X className="h-6 w-6" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-gold/10">
                  <ShoppingBag className="h-9 w-9 text-gold-dark" />
                </div>
                <p className="font-display text-xl text-ink">Your cart is empty</p>
                <p className="text-sm text-ink/60">Add something delicious to get started.</p>
                <Button href="/menu" onClick={() => setOpen(false)}>Browse Menu</Button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                  {lines.map((l) => (
                    <div key={l.id} className="flex gap-3 rounded-2xl bg-white/70 p-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image src={l.image} alt={l.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-ink">{l.name}</p>
                          <button onClick={() => remove(l.id)} aria-label="Remove" className="text-ink/40 hover:text-clay">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gold-dark">{formatCurrency(l.price)}</p>
                        <div className="mt-auto flex items-center gap-2">
                          <button
                            onClick={() => setQty(l.id, l.qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full border border-ink/15 hover:bg-ink/5"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                          <button
                            onClick={() => setQty(l.id, l.qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full border border-ink/15 hover:bg-ink/5"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-ink/10 bg-white/50 p-5">
                  <div className="space-y-1.5 text-sm text-ink/70">
                    <Row label="Subtotal" value={formatCurrency(subtotal)} />
                    <Row label="Delivery" value={formatCurrency(deliveryFee)} />
                    <Row label="Tax" value={formatCurrency(tax)} />
                    <div className="flex justify-between border-t border-ink/10 pt-2 text-base font-semibold text-ink">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                  <Button href="/order" size="lg" className="w-full" onClick={() => setOpen(false)}>
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
