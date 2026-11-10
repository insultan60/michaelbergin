import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { blog, firstParagraph } from "@/lib/site";
import { asset } from "@/lib/base-path";

export const metadata: Metadata = { title: "Blog" };
const IMG = ["/img/slide-2.jpg", "/img/slide-4.jpg", "/img/slide-6.jpg"];

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Insights & Advice" crumbs={[["Blog", "/blog"]]} />
      <section className="bg-mist py-16 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 md:grid-cols-3">
          {blog.map((b, i) => (
            <Link key={b.slug} href={`/blog/${b.slug}`} className="group block overflow-hidden rounded-2xl bg-white p-3">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(IMG[i % 3])} alt="" className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105" />
              </div>
              <div className="p-3 pt-5">
                <p className="text-lg leading-snug font-medium">{b.title}</p>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{firstParagraph(b.body)}</p>
                <p className="mt-5 border-t border-line pt-4 text-sm font-medium">Read article →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
