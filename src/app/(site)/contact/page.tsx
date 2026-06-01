import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { IMG } from "@/lib/mock/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Al-Diar. Reach our team for questions, feedback, catering and support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader arabic="تواصل معنا" title="Get in Touch" subtitle="We'd love to hear from you — questions, feedback, or just to say hello." image={IMG.interior2} />

      <div className="container-luxe grid gap-12 py-16 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <h2 className="font-display text-3xl text-ink">Reach Us</h2>
          <div className="mt-6 space-y-4">
            {[
              { icon: MapPin, t: "Visit", d: site.address },
              { icon: Phone, t: "Call", d: site.phone },
              { icon: Mail, t: "Email", d: site.email },
              { icon: Clock, t: "Hours", d: "Mon–Sun · 11:00 AM – 11:00 PM" },
              { icon: MessageCircle, t: "Support", d: "Live chat available during business hours" },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 rounded-2xl border border-ink/8 bg-white p-4 shadow-luxe">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-dark"><c.icon className="h-5 w-5" /></div>
                <div><p className="text-sm font-medium text-ink">{c.t}</p><p className="text-sm text-ink/60">{c.d}</p></div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="relative mt-6 h-56 overflow-hidden rounded-2xl border border-ink/8 bg-emerald-deep/5">
            <div className="pattern-arabesque absolute inset-0 opacity-20" />
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <MapPin className="mx-auto h-10 w-10 text-gold-dark" />
                <p className="mt-2 text-sm text-ink/60">Interactive map · {site.address}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-medium text-emerald-deep underline">Open in Google Maps</a>
              </div>
            </div>
          </div>
        </Reveal>

        <ContactForm />
      </div>
    </>
  );
}
