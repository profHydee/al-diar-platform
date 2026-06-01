import Link from "next/link";
import Image from "next/image"
import { MapPin, Phone, Mail, Clock10, CalendarCheck, Utensils } from "lucide-react";
import { Instagram, Facebook, Youtube } from "@/components/icons/brand";
import { mainNav, site } from "@/lib/site";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import newLogo from "@/assets/Al-diar-logo.jpg";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
           <Image src={newLogo} alt="Al-Diar Logo" className="h-20 w-20 rounded-sm" />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            {site.tagline}. Our establishment proudly features a diverse array of dishes, showcasing the uniqueness of Middle Eastern gastronomy.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href={`https://www.${Icon.name.toLowerCase()}.com/aldiar92025`}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-8 w-8" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg text-red-500">Explore</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-cream/60">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-red-500">Visit Us {site.location1}</h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/60">
            <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-gold/70" /> {site.address}</li>
            <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-gold/70" /> {site.phone}</li>
            <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-gold/70" /> {site.email}</li>
            <li className="flex gap-3"><CalendarCheck className="h-5 w-5 shrink-0 text-gold/70" /> Days: Monday - Sunday</li>
            <li className="flex gap-3"><Clock10 className="h-5 w-5 shrink-0 text-gold/70" /> Hours: 10:00 AM - 9:00 PM</li>
            <li className="flex gap-3"><Utensils className="h-5 w-5 shrink-0 text-gold/70" /> <b>Breakfast:</b> Start at 10:30 AM</li>
            <li className="flex gap-3"><Utensils className="h-5 w-5 shrink-0 text-gold/70" /> <b>Dinner:</b> Start at 6:00 PM</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-red-500">Visit Us {site.location2}</h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/60">
            <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-gold/70" /> {site.address2}</li>
            <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-gold/70" /> {site.phone2}</li>
            <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-gold/70" /> {site.email}</li>
            <li className="flex gap-3"><CalendarCheck className="h-5 w-5 shrink-0 text-gold/70" /> Days: Monday - Sunday</li>
            <li className="flex gap-3"><Clock10 className="h-5 w-5 shrink-0 text-gold/70" /> Hours: 10:00 AM - 9:00 PM</li>
            <li className="flex gap-3"><Utensils className="h-5 w-5 shrink-0 text-gold/70" /> <b>Breakfast:</b> Start at 10:30 AM</li>
            <li className="flex gap-3"><Utensils className="h-5 w-5 shrink-0 text-gold/70" /> <b>Dinner:</b> Start at 6:00 PM</li>
          </ul>
        </div>

        {/* <div>
          <h3 className="font-display text-lg text-red-500">Stay in the Loop</h3>
          <p className="mt-5 text-sm text-cream/60">
            Join our newsletter for exclusive offers, events and new dishes.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div> */}
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-gold">Privacy</Link>
            <Link href="#" className="hover:text-gold">Terms</Link>
            <Link href="#" className="hover:text-gold">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
