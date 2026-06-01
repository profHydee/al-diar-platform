import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Heart } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StoryTimeline } from "@/components/home/story";
import { team, values } from "@/lib/mock/data";
import { IMG } from "@/lib/mock/images";
import * as Icons from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Three generations of Yemeni culinary heritage, from a 12-seat kitchen in Dearborn to Michigan's most loved Yemeni restaurant.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader arabic="قصتنا" title="Our Story" subtitle="From a grandmother's kitchen in Sana'a to your table — a legacy of flavor, family and fire." image={IMG.interior2} />

      {/* Brand story */}
      <section className="container-luxe py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-luxe">
            <Image src={IMG.chef} alt="Chef Khaled" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </Reveal>
          <div>
            <SectionHeading align="left" eyebrow="The Beginning" title="Born of Heritage & Hospitality" />
            <div className="mt-6 space-y-4 leading-relaxed text-ink/70">
              <p>In 2008, Chef Khaled Al-Diar arrived in Michigan carrying little more than a suitcase and a notebook of his grandmother&apos;s recipes. He opened a modest 12-seat kitchen with a single conviction: that the food of Yemen — slow, soulful and generous — deserved a place at the American table.</p>
              <p>Word travelled the way it always does with great food: quietly, then all at once. Today Al-Diar spans three locations, but the spirit remains unchanged. Every plate is still seasoned with the same patience, the same imported spices, and the same belief that to feed someone is to honor them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-emerald-deep py-20 text-cream">
        <div className="container-luxe grid gap-8 md:grid-cols-3">
          {[
            { icon: Target, title: "Our Mission", body: "To share authentic Yemeni cuisine and hospitality with our community — one unforgettable meal at a time." },
            { icon: Eye, title: "Our Vision", body: "To become the most beloved Yemeni dining experience in America, honoring tradition while embracing the future." },
            { icon: Heart, title: "Our Promise", body: "Fresh, halal ingredients, family recipes, and a welcome warm enough to feel like home." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="rounded-3xl glass-dark p-8">
                <c.icon className="h-10 w-10 text-gold" />
                <h3 className="mt-4 font-display text-2xl">{c.title}</h3>
                <p className="mt-3 text-cream/70">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <StoryTimeline />

      {/* Values */}
      <section className="container-luxe py-20">
        <SectionHeading eyebrow="What We Believe" title="Our Values" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = (Icons[v.icon as keyof typeof Icons] ?? Icons.Star) as React.ComponentType<{ className?: string }>;
            return (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-ink/8 bg-white p-7 text-center shadow-luxe">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold-dark">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-lg text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink/60">{v.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="bg-gradient-to-b from-sand/30 to-cream py-20">
        <div className="container-luxe">
          <SectionHeading eyebrow="The People" title="Meet the Family" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1}>
                <div className="group text-center">
                  <div className="relative mx-auto aspect-[4/5] overflow-hidden rounded-[2rem] shadow-luxe">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-ink">{member.name}</h3>
                  <p className="text-sm font-medium text-gold-dark">{member.role}</p>
                  <p className="mt-2 text-sm text-ink/60">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
