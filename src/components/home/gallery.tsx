import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GALLERY } from "@/lib/mock/images";

export function Gallery() {
  return (
    <section className="bg-gradient-to-b from-sand/30 to-cream py-20">
      <div className="container-luxe">
        <SectionHeading eyebrow="Gallery" title="A Feast for the Eyes" description="Moments from our kitchens, tables and gatherings." />
        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {GALLERY.map((src, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <div className={`group relative overflow-hidden rounded-2xl ${i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                <Image src={src} alt="Al-Diar gallery" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
