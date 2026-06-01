import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, Star, CalendarDays, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { locations, events } from "@/lib/mock/data";

export function LocationsPreview() {
  return (
    <section className="bg-red-500 py-20 text-cream">
      <div className="container-luxe">
        <SectionHeading light eyebrow="Find Us" title="Three Homes, One Family" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {locations.map((loc, i) => (
            <Reveal key={loc.id} delay={i * 0.08}>
              <div className="group overflow-hidden rounded-3xl bg-ink/40 ring-1 ring-white/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={loc.image} alt={loc.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-ink">
                    <Star className="h-3 w-3 fill-ink" /> {loc.rating}
                  </span>
                </div>
                <div className="space-y-2.5 p-6">
                  <h3 className="font-display text-xl text-cream">{loc.name}</h3>
                  <p className="flex items-start gap-2 text-sm text-cream/70"><MapPin className="h-4 w-4 shrink-0 text-gold" /> {loc.address}, {loc.city}, {loc.state}</p>
                  <p className="flex items-center gap-2 text-sm text-cream/70"><Phone className="h-4 w-4 text-gold" /> {loc.phone}</p>
                  <p className="flex items-center gap-2 text-sm text-cream/70"><Clock className="h-4 w-4 text-gold" /> Open until 11:00 PM</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {loc.services.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-cream/80">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/locations" variant="light" size="lg">View All Locations <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </div>
    </section>
  );
}

export function UpcomingEvents() {
  return (
    <section className="container-luxe py-20">
      <SectionHeading eyebrow="What's On" title="Upcoming Events & Special Nights" />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {events.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.08}>
            <Link href="#" className="group block overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-luxe">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={e.image} alt={e.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:1024px) 100vw, 33vw" />
                <div className="absolute left-4 top-4 rounded-2xl bg-cream px-4 py-2 text-center shadow-lg">
                  <p className="font-display text-2xl leading-none text-emerald-deep">{new Date(e.date).getDate()}</p>
                  <p className="text-[11px] uppercase text-ink/60">{new Date(e.date).toLocaleString("en", { month: "short" })}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gold-dark">
                  <CalendarDays className="h-4 w-4" /> {e.time} · {e.location}
                </div>
                <h3 className="mt-2 font-display text-xl text-ink group-hover:text-emerald-deep">{e.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink/60">{e.description}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
