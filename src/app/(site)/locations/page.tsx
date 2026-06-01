import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Clock, Navigation, Star } from "lucide-react";
import { PageHeader, Stars } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { locations } from "@/lib/mock/data";
import { IMG } from "@/lib/mock/images";

export const metadata: Metadata = {
  title: "Locations",
  description: "Visit Al-Diar in Dearborn, Hamtramck and Sterling Heights. Hours, directions, services and guest reviews.",
};

const localReviews = [
  { author: "Hassan K.", rating: 5, body: "My neighborhood gem. The staff know my order by heart." },
  { author: "Emily R.", rating: 5, body: "Spotless dining room and the fastest delivery in the area." },
];

export default function LocationsPage() {
  return (
    <>
      <PageHeader arabic="مواقعنا" title="Find Your Al-Diar" subtitle="Three homes across Michigan, each serving the same authentic flavors and warm welcome." image={IMG.heroInterior} />

      <div className="container-luxe space-y-16 py-16">
        {locations.map((loc, idx) => (
          <Reveal key={loc.id}>
            <div className={`grid items-center gap-8 lg:grid-cols-2 ${idx % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] shadow-luxe">
                <Image src={loc.image} alt={loc.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                {/* Map placeholder overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass-dark p-3 text-cream">
                  <span className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-gold" /> {loc.city}, {loc.state}</span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${loc.address} ${loc.city} ${loc.state}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink"
                  >
                    <Navigation className="h-3 w-3" /> Directions
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-3xl text-ink">{loc.name}</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-sm font-semibold text-gold-dark">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {loc.rating} ({loc.reviewCount})
                  </span>
                </div>

                <div className="mt-4 space-y-2.5 text-ink/70">
                  <p className="flex items-start gap-3"><MapPin className="h-5 w-5 shrink-0 text-gold-dark" /> {loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
                  <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold-dark" /> {loc.phone}</p>
                </div>

                <div className="mt-4 rounded-2xl border border-ink/8 bg-white p-4">
                  <p className="mb-2 flex items-center gap-2 text-sm font-medium text-ink"><Clock className="h-4 w-4 text-gold-dark" /> Hours</p>
                  <ul className="space-y-1 text-sm text-ink/60">
                    {Object.entries(loc.hours).map(([d, h]) => (
                      <li key={d} className="flex justify-between"><span>{d}</span><span>{h}</span></li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {loc.services.map((s) => <Badge key={s} variant="emerald">{s}</Badge>)}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {localReviews.map((r, i) => (
                    <div key={i} className="rounded-xl bg-cream/60 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-ink">{r.author}</span>
                        <Stars rating={r.rating} />
                      </div>
                      <p className="mt-1 text-xs text-ink/60">{r.body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  <Button href="/order">Order from here</Button>
                  <Button href="/reservations" variant="outline">Reserve a table</Button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
