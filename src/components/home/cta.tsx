import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/mock/images";
import { site } from "@/lib/site";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-28">
      <Image src={IMG.grill} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="pattern-arabesque absolute inset-0 opacity-10" />
      <Reveal className="container-luxe relative text-center text-cream">
        <p className="font-arabic text-2xl text-gold">أهلاً وسهلاً</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Your Table at Al-Diar Awaits
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/75">
          Whether it&apos;s dinner for two or a feast for two hundred, we&apos;d be honored to host you.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/order" size="lg" className="bg-red-500 text-white">Order Now <ArrowRight className="h-5 w-5" /></Button>
          <Button href="/reservations" size="lg" variant="light">Reserve a Table</Button>
        </div>
      </Reveal>
    </section>
  );
}
