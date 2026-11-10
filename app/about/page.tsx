import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { about } from "@/lib/site";

export const metadata: Metadata = { title: "About Michael" };

export default function AboutPage() {
  const [tagline, dre, ...body] = about;
  return (
    <>
      <PageHero eyebrow="About" title="Michael Bergin" intro={tagline.p} crumbs={[["About", "/about"]]} />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1240px] items-start gap-14 px-5 md:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="relative md:sticky md:top-28">
            <div className="absolute -top-4 -left-4 h-full w-full rounded-3xl bg-mist" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/michael.jpg" alt="Michael Bergin" className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top" />
            <p className="absolute right-5 bottom-5 rounded-2xl bg-white/95 px-5 py-3 text-sm font-medium shadow-xl">{dre.p}</p>
          </Reveal>
          <div className="space-y-6 text-[17px] leading-[1.8] text-muted">
            {body.map((b, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className={i === 0 ? "text-[1.35rem] leading-relaxed text-navy" : ""}>{b.p}</p>
              </Reveal>
            ))}
            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/contact" className="rounded-full bg-navy px-7 py-3.5 text-sm text-white hover:bg-navy-3">Contact Michael</Link>
              <Link href="/reviews" className="rounded-full px-7 py-3.5 text-sm ring-1 ring-line hover:bg-mist">Read client reviews</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
