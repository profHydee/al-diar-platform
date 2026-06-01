import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/mock/data";
import { formatDate } from "@/lib/utils";

export function LatestNews() {
  return (
    <section className="container-luxe py-20">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading align="left" eyebrow="The Journal" title="News & Stories" />
        <Button href="/blog" variant="ghost" className="hidden sm:inline-flex">
          All Articles <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post, i) => (
          <Reveal key={post.id} delay={(i % 4) * 0.08}>
            <Link href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-luxe">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image src={post.cover} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:1024px) 100vw, 25vw" />
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">{post.category}</span>
              </div>
              <div className="p-5">
                <p className="text-xs text-ink/45">{formatDate(post.date)} · {post.readTime} min read</p>
                <h3 className="mt-2 font-display text-lg leading-snug text-ink group-hover:text-red-500">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink/60">{post.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
