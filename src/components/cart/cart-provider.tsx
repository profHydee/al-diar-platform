"use client";

import * as React from "react";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  note?: string;
};

type CartState = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = React.createContext<CartState | null>(null);
const STORAGE_KEY = "aldiar.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const add: CartState["add"] = (line, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === line.id);
      if (found) {
        return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { ...line, qty }];
    });
    setOpen(true);
  };

  const remove = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
  const setQty = (id: string, qty: number) =>
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  const clear = () => setLines([]);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);

  return (
    <CartContext.Provider value={{ lines, add, remove, setQty, clear, count, subtotal, isOpen, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
