import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function PageHeader({
  title,
  subtitle,
  arabic,
  image,
}: {
  title: string;
  subtitle?: string;
  arabic?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[52vh] items-center overflow-hidden pt-24">
      <Image src={image} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/45" />
      <div className="pattern-arabesque absolute inset-0 opacity-10" />
      <Reveal className="container-luxe relative text-cream">
        {arabic && <p className="font-arabic text-2xl text-gold">{arabic}</p>}
        <h1 className="mt-2 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-lg text-cream/75">{subtitle}</p>}
      </Reveal>
    </section>
  );
}

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill={i < Math.round(rating) ? "#c8a658" : "#d6cdb8"}>
          <path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
        </svg>
      ))}
    </span>
  );
}
