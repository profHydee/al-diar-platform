import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-cream">
      <div className="pattern-arabesque absolute inset-0 opacity-10" />
      <p className="relative font-arabic text-3xl text-gold">عفواً</p>
      <h1 className="relative mt-2 font-display text-7xl">404</h1>
      <p className="relative mt-3 max-w-md text-cream/70">
        This page seems to have wandered off the spice route. Let&apos;s get you back to the table.
      </p>
      <div className="relative mt-8 flex gap-3">
        <Button href="/">Back Home</Button>
        <Button href="/menu" variant="light">Browse Menu</Button>
      </div>
    </div>
  );
}
