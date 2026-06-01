import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Link2, MessageCircle } from "lucide-react";
import { Facebook, Twitter } from "@/components/icons/brand";
import { blogPosts } from "@/lib/mock/data";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", images: [post.cover], title: post.title, description: post.excerpt },
  };
}

const body = `Yemen's culinary heritage stretches back centuries, shaped by its position at the crossroads of ancient trade routes. The aromas that fill an Al-Diar kitchen — cardamom, fenugreek, dried lime — tell that story in every breath.

What makes our approach unique is patience. Nothing here is rushed. Rice is layered and rested. Meat is smoked low and slow over wood embers, the way it has been done in the highlands for generations.

We believe that food is memory made edible. Each dish we serve is an invitation to a table that has welcomed travelers, families and strangers-turned-friends for as long as anyone can remember. That is the heart of Yemeni hospitality, and it is what we hope you taste in every bite.`;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="pt-24">
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={post.cover} alt={post.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="container-luxe absolute inset-x-0 bottom-10 text-cream">
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">{post.category}</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-3 text-cream/70">{post.author} · {formatDate(post.date)} · {post.readTime} min read</p>
        </div>
      </div>

      <div className="container-luxe grid gap-12 py-16 lg:grid-cols-[1fr_220px]">
        <div>
          <p className="font-display text-xl leading-relaxed text-ink/80">{post.excerpt}</p>
          <div className="mt-6 space-y-5 leading-relaxed text-ink/70">
            {body.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {/* Comments */}
          <div className="mt-12 border-t border-ink/10 pt-8">
            <h3 className="flex items-center gap-2 font-display text-2xl text-ink"><MessageCircle className="h-5 w-5 text-gold-dark" /> Comments</h3>
            <div className="mt-5 space-y-4">
              {[{ a: "Mariam S.", t: "This made me so hungry — and homesick in the best way." }, { a: "Tom B.", t: "Fascinating read. Booking a table this weekend!" }].map((c, i) => (
                <div key={i} className="rounded-2xl bg-cream/60 p-4">
                  <p className="text-sm font-medium text-ink">{c.a}</p>
                  <p className="mt-1 text-sm text-ink/65">{c.t}</p>
                </div>
              ))}
            </div>
            <form className="mt-5 flex gap-2">
              <input className="h-12 flex-1 rounded-xl border border-ink/15 bg-white px-4 text-sm outline-none focus:border-gold" placeholder="Add a comment..." />
              <button type="button" className="rounded-xl bg-emerald-deep px-5 text-sm font-medium text-cream">Post</button>
            </form>
          </div>
        </div>

        {/* Share rail */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-medium text-ink/60">Share</p>
          <div className="mt-3 flex gap-2 lg:flex-col">
            {[Twitter, Facebook, Link2].map((Icon, i) => (
              <button key={i} className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/60 hover:border-gold hover:text-gold-dark">
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="bg-gradient-to-b from-sand/30 to-cream py-16">
        <div className="container-luxe">
          <h2 className="font-display text-2xl text-ink">Related Stories</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Link href={`/blog/${p.slug}`} className="group block overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-luxe">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-ink group-hover:text-emerald-deep">{p.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
