import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { AREA_IMG, communities, firstParagraph, listingsIn } from "@/lib/site";
import { IconArrow } from "@/components/Icons";

export const metadata: Metadata = { title: "Neighborhoods" };

export default function NeighborhoodsPage() {
  return (
    <>
      <PageHero eyebrow="Communities" title="Explore The Neighborhoods" image="/img/slide-3.jpg" crumbs={[["Neighborhoods", "/neighborhoods"]]} />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 80}>
              <Link href={`/neighborhoods/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-navy text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={AREA_IMG[c.slug]} alt="" className="h-full w-full object-cover opacity-85 transition duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs tracking-[0.25em] text-gold uppercase">{listingsIn(c.name).length} properties</p>
                  <p className="mt-2 text-3xl font-medium">{c.name}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-white/70">{firstParagraph(c.body.map((p) => ({ p })))}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm">Explore <IconArrow className="h-4 w-4 transition group-hover:rotate-45" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
