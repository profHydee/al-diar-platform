import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/mock/images";

const milestones = [
  { year: "2008", title: "The First Table", desc: "Chef Khaled opens a 12-seat kitchen in Dearborn with his grandmother's recipes." },
  { year: "2013", title: "A Growing Family", desc: "Word spreads. Al-Diar moves to a flagship space and earns its first 'Best Of' award." },
  { year: "2019", title: "Three Locations", desc: "Demand carries Al-Diar across Michigan with new homes in Hamtramck and Sterling Heights." },
  { year: "2026", title: "The Digital Experience", desc: "A modern platform brings the warmth of Yemen to every screen and doorstep." },
];

export function StoryTimeline() {
  return (
    <section className="bg-gradient-to-b from-sand/30 to-cream py-20">
      <div className="container-luxe">
        <SectionHeading eyebrow="Our Journey" title="A Story Told Through Generations" />
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gold/30 sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.05}>
                <div className={`relative flex items-center gap-6 sm:gap-0 ${i % 2 ? "sm:flex-row-reverse" : ""}`}>
                  <div className="ml-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-4 border-cream bg-gold sm:absolute sm:left-1/2 sm:-translate-x-1/2" />
                  <div className={`flex-1 sm:px-12 ${i % 2 ? "sm:text-left" : "sm:text-right"}`}>
                    <span className="font-display text-3xl text-gold-dark">{m.year}</span>
                    <h3 className="mt-1 font-display text-xl text-ink">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{m.desc}</p>
                  </div>
                  <div className="hidden flex-1 sm:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button href="/about" variant="outline">Read Our Full Story</Button>
        </div>
      </div>
    </section>
  );
}

export function YemeniExperience() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream">
      <Image src={IMG.spices} alt="" fill className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      <div className="pattern-arabesque absolute inset-0 opacity-10" />
      <div className="container-luxe relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="font-arabic text-3xl text-gold">تجربة يمنية أصيلة</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            The Signature <span className="text-gradient-gold">Yemeni</span> Experience
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-cream/70">
            We’ve been open to the public for a year now, and being in Chicago, a city celebrated for its cultural diversity and incredible food scene, made it the perfect place to introduce Yemeni cuisine. Chicago’s adventurous diners embrace authentic flavors and unique culinary experiences, so I felt excited to bring the rich, traditional tastes of Yemen here. I believe the people of Chicago will not only appreciate but truly connect with the warmth and depth of our food, and I’m confident this city will be the foundation of our success.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "600+", v: "Years of Mandi tradition" },
              { k: "1st", v: "Coffee grown in Yemen" },
              { k: "20+", v: "House-ground spices" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl glass-dark p-4">
                <p className="font-display text-2xl text-gold-light">{s.k}</p>
                <p className="mt-1 text-xs text-cream/60">{s.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15} className="grid grid-cols-2 gap-4">
          {[IMG.coffee, IMG.mandi, IMG.bread, IMG.honey].map((src, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
              <Image src={src} alt="" fill className="object-cover transition-transform duration-700 hover:scale-110" sizes="25vw" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
