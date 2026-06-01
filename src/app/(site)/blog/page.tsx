import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { blogPosts } from "@/lib/mock/data";
import { formatDate } from "@/lib/utils";
import { IMG } from "@/lib/mock/images";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, recipes and heritage from the Al-Diar kitchen — the art of mandi, Yemeni coffee, the spice route and more.",
};

const categories = ["All", "Culture", "Heritage", "Ingredients", "Recipes"];

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <PageHeader arabic="المجلة" title="The Al-Diar Journal" subtitle="Stories of heritage, recipes and the people behind the plates." image={IMG.spices} />

      <div className="container-luxe py-16">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button key={c} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${i === 0 ? "bg-emerald-deep text-cream" : "bg-white text-ink/70 ring-1 ring-ink/10 hover:bg-emerald-deep/5"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        <Reveal className="mt-10">
          <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-ink/8 bg-white shadow-luxe lg:grid-cols-2">
            <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
              <Image src={featured.cover} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">{featured.category}</span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink group-hover:text-emerald-deep lg:text-4xl">{featured.title}</h2>
              <p className="mt-3 text-ink/65">{featured.excerpt}</p>
              <p className="mt-5 text-sm text-ink/45">{featured.author} · {formatDate(featured.date)} · {featured.readTime} min read</p>
            </div>
          </Link>
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-luxe">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={post.cover} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 100vw, 33vw" />
                  <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-emerald-deep">{post.category}</span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-ink/45">{formatDate(post.date)} · {post.readTime} min</p>
                  <h3 className="mt-2 font-display text-xl text-ink group-hover:text-emerald-deep">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink/60">{post.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
