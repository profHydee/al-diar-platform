import Image from "next/image";
import { FileText, Image as ImageIcon, MessageSquareQuote, Megaphone, Pencil, Plus } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { blogPosts, testimonials } from "@/lib/mock/data";
import { GALLERY } from "@/lib/mock/images";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-4">
        {[
          { icon: FileText, label: "News Articles", value: blogPosts.length },
          { icon: MessageSquareQuote, label: "Testimonials", value: testimonials.length },
          { icon: ImageIcon, label: "Gallery Images", value: GALLERY.length },
          { icon: Megaphone, label: "Active Promos", value: 2 },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white p-5 shadow-luxe">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-dark"><c.icon className="h-5 w-5" /></div>
            <div><p className="font-display text-2xl text-ink">{c.value}</p><p className="text-xs text-ink/55">{c.label}</p></div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="News & Articles" action={<Button size="sm"><Plus className="h-4 w-4" /> New Post</Button>}>
          <div className="space-y-3">
            {blogPosts.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-2xl border border-ink/8 p-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg"><Image src={p.cover} alt={p.title} fill className="object-cover" sizes="48px" /></div>
                  <div><p className="text-sm font-medium text-ink">{p.title}</p><p className="text-xs text-ink/45">{p.category} · Published</p></div>
                </div>
                <button className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-cream"><Pencil className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Testimonials" action={<Button size="sm"><Plus className="h-4 w-4" /> Add</Button>}>
          <div className="space-y-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl border border-ink/8 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-ink">{t.author}</p>
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-ink/50 hover:bg-cream"><Pencil className="h-4 w-4" /></button>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-ink/55">{t.body}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Gallery" action={<Button size="sm"><Plus className="h-4 w-4" /> Upload</Button>}>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {GALLERY.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={src} alt="" fill className="object-cover" sizes="16vw" />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
