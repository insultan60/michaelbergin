import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { initials, team } from "@/lib/site";
import { asset } from "@/lib/base-path";

export const metadata: Metadata = { title: "Meet The Team" };

export default function TeamPage() {
  return (
    <>
      <PageHero eyebrow="The Bergin Group" title="Meet The Team" crumbs={[["Team", "/team"]]} />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Link href="/about" className="group relative block h-full min-h-[420px] overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/michael.jpg")} alt="Michael Bergin" className="absolute inset-0 h-full w-full object-cover object-top transition duration-[1400ms] group-hover:scale-105" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-5">
                <p className="text-lg font-semibold">Michael Bergin</p>
                <p className="text-sm text-muted">CA DRE# 01845572</p>
              </div>
            </Link>
          </Reveal>
          {team.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 60}>
              <Link href={`/team/${m.slug}`} className="group flex h-full flex-col rounded-3xl bg-mist p-6 transition hover:bg-navy hover:text-white">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-sm font-semibold text-navy">{initials(m.name)}</span>
                <p className="mt-5 text-lg font-semibold">{m.name}</p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted group-hover:text-white/70">{m.bio[0]}</p>
                <span className="mt-auto pt-5 text-sm font-medium">Read bio →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
