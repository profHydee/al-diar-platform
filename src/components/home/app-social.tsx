import Image from "next/image";
import { QrCode, Bell, Gift, MapPin } from "lucide-react";
import { Apple, GooglePlay, Instagram } from "@/components/icons/brand";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GALLERY } from "@/lib/mock/images";

export function AppPromo() {
  return (
    <section className="container-luxe py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-red-500 px-8 py-14 text-cream sm:px-14">
        <div className="pattern-arabesque absolute inset-0 opacity-10" />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">Coming Soon</span>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Al-Diar in Your Pocket</h2>
            <p className="mt-4 max-w-md text-cream/70">
              Order faster, track in real time, and unlock app-only rewards. The full Al-Diar
              experience — anytime, anywhere.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-cream/80">
              {[
                { icon: Bell, t: "Live order tracking & push updates" },
                { icon: Gift, t: "App-exclusive rewards & double points" },
                { icon: MapPin, t: "One-tap reorder & saved addresses" },
              ].map((f) => (
                <p key={f.t} className="flex items-center gap-3"><f.icon className="h-5 w-5 text-gold" /> {f.t}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-3 rounded-xl bg-ink px-5 py-3 text-left transition hover:bg-ink-soft">
                <Apple className="h-7 w-7" />
                <span><span className="block text-[10px] text-cream/60">Download on the</span><span className="font-semibold">App Store</span></span>
              </button>
              <button className="flex items-center gap-3 rounded-xl bg-ink px-5 py-3 text-left transition hover:bg-ink-soft">
                <GooglePlay className="h-6 w-6" />
                <span><span className="block text-[10px] text-cream/60">Get it on</span><span className="font-semibold">Google Play</span></span>
              </button>
              <div className="grid h-[58px] w-[58px] place-items-center rounded-xl bg-cream text-ink">
                <QrCode className="h-9 w-9" />
              </div>
            </div>
          </div>
          <Reveal delay={0.15} className="relative mx-auto hidden lg:block">
            <div className="relative h-[460px] w-[230px] animate-[float_6s_ease-in-out_infinite] overflow-hidden rounded-[2.5rem] border-8 border-ink bg-ink shadow-luxe">
              <Image src={GALLERY[0]} alt="App preview" fill className="object-cover" sizes="230px" />
              <div className="absolute inset-x-0 bottom-0 glass-dark p-4">
                <p className="text-xs text-gold-light">Order #4821 · On the way</p>
                <p className="font-display text-lg text-cream">Arriving in 12 min</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function InstagramFeed() {
  return (
    <section className="container-luxe py-20">
      <SectionHeading eyebrow="@aldiar" title="Follow the Feast" description="Tag us #AlDiarMoments to be featured." />
      <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {GALLERY.slice(0, 6).map((src, i) => (
          <a key={i} href="#" className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image src={src} alt="Instagram post" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:640px) 33vw, 16vw" />
            <div className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors group-hover:bg-ink/40">
              <Instagram className="h-7 w-7 text-cream opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
