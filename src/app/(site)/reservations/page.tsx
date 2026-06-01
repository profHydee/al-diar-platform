import type { Metadata } from "next";
import { Clock, Users, Sparkles, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ReservationForm } from "@/components/forms/reservation-form";
import { Reveal } from "@/components/motion/reveal";
import { IMG } from "@/lib/mock/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Reserve your table at Al-Diar. Select your date, time, location and party size for an unforgettable Yemeni dining experience.",
};

export default function ReservationsPage() {
  return (
    <>
      <PageHeader arabic="احجز طاولتك" title="Reserve a Table" subtitle="Gather your favorite people. We'll handle the rest." image={IMG.heroInterior} />
      <div className="container-luxe grid gap-12 py-16 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <h2 className="font-display text-3xl text-ink">An Evening to Remember</h2>
          <p className="mt-4 leading-relaxed text-ink/65">
            From intimate dinners to grand celebrations, every reservation at Al-Diar is met with
            the legendary warmth of Yemeni hospitality.
          </p>
          <div className="mt-8 space-y-5">
            {[
              { icon: Clock, t: "Instant confirmation", d: "Receive email & SMS confirmation within minutes." },
              { icon: Users, t: "Parties of all sizes", d: "From a table for two to private dining for 50." },
              { icon: Sparkles, t: "Special occasions", d: "Tell us what you're celebrating and we'll make it shine." },
            ].map((f) => (
              <div key={f.t} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold-dark"><f.icon className="h-6 w-6" /></div>
                <div><p className="font-medium text-ink">{f.t}</p><p className="text-sm text-ink/60">{f.d}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-emerald-deep/5 p-5">
            <p className="flex items-center gap-2 text-sm text-emerald-deep"><Phone className="h-4 w-4" /> Prefer to call? {site.phone}</p>
          </div>
        </Reveal>
        <ReservationForm />
      </div>
    </>
  );
}
