import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Heart, Cake, Users, Globe, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { CateringForm } from "@/components/forms/catering-form";
import { Reveal } from "@/components/motion/reveal";
import { IMG } from "@/lib/mock/images";

export const metadata: Metadata = {
  title: "Catering & Corporate Orders",
  description: "Premium Yemeni catering for corporate events, weddings, birthdays and community gatherings. From 20 to 500+ guests.",
};

const eventTypes = [
  { icon: Building2, title: "Corporate Events", desc: "Impress clients and reward teams with a memorable feast." },
  { icon: Heart, title: "Weddings", desc: "Elegant menus and seamless service for your special day." },
  { icon: Cake, title: "Birthday Parties", desc: "Celebrate with platters everyone will be talking about." },
  { icon: Users, title: "Family Gatherings", desc: "Bring everyone together around food that feels like home." },
  { icon: Globe, title: "Community Events", desc: "Large-scale catering with authentic flavor at any volume." },
];

const steps = ["Tell us about your event", "Receive a custom quote", "Approve menu & details", "We cater, you celebrate"];

export default function CateringPage() {
  return (
    <>
      <PageHeader arabic="خدمة الولائم" title="Catering & Corporate Orders" subtitle="From boardrooms to ballrooms — authentic Yemeni cuisine for 20 to 500+ guests." image={IMG.platter} />

      <section className="container-luxe py-16">
        <SectionHeading eyebrow="We Cater" title="Every Occasion, Elevated" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {eventTypes.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-ink/8 bg-white p-6 text-center shadow-luxe transition-transform hover:-translate-y-1.5">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-deep/8 text-emerald-deep"><e.icon className="h-7 w-7" /></div>
                <h3 className="mt-4 font-display text-lg text-ink">{e.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{e.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-emerald-deep py-16 text-cream">
        <div className="container-luxe">
          <SectionHeading light eyebrow="How It Works" title="Effortless From Start to Finish" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s} delay={i * 0.1}>
                <div className="rounded-3xl glass-dark p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold font-bold text-ink">{i + 1}</span>
                  <p className="mt-4 font-medium">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="relative hidden overflow-hidden rounded-[2rem] shadow-luxe lg:block">
          <Image src={IMG.grill} alt="Catering spread" fill className="object-cover" sizes="50vw" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl glass-dark p-5 text-cream">
            <p className="font-display text-2xl">500+ guests catered</p>
            <ul className="mt-3 space-y-1 text-sm text-cream/80">
              {["Full-service setup & staff", "Custom menu planning", "Dietary accommodations"].map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> {x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <CateringForm />
      </section>
    </>
  );
}
