"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrow } from "./Icons";
import { asset } from "@/lib/base-path";

// Michael's latest property tour on his YouTube channel
const VIDEO = "WFcku7vtH54";

// All three facts are from the site: "top 1 percent", "more than 15 years", 26 testimonials all rated 5 stars
const STATS = [
  ["Top 1%", "of Los Angeles agents"],
  ["15+", "years of experience"],
  ["5.0★", "26 client reviews"],
];

export default function Hero() {
  // The YouTube frame stays hidden until it has had time to start, so its play/pause UI never shows
  const [ready, setReady] = useState(false);

  return (
    <section id="top" className="relative flex h-svh min-h-[600px] flex-col overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/img/slide-1.jpg")} alt="" className="drift absolute inset-0 h-full w-full object-cover" />
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO}?autoplay=1&mute=1&loop=1&playlist=${VIDEO}&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`}
          title="Background film"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          onLoad={() => setTimeout(() => setReady(true), 2500)}
          className={`absolute top-1/2 left-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78vh)] -translate-x-1/2 -translate-y-1/2 scale-[1.2] transition-opacity duration-[1500ms] ${ready ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/50" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-center px-5 pt-24">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">Michael Bergin · CA DRE# 01845572</p>
        <h1 className="h-display mt-5 max-w-3xl text-[clamp(2.4rem,min(5.2vw,8.5svh),4.75rem)]">
          Your trusted guide to
          <span className="block font-display font-light whitespace-nowrap text-[#c9d8ec] italic">Valley living.</span>
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/75 md:text-base">
          Michael represents buyers and sellers throughout Southern California, from the coast to the San Fernando Valley,
          with a primary focus on Studio City, Sherman Oaks, Encino, Beverly Hills, and surrounding neighborhoods.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/properties" className="group flex items-center gap-2 rounded-full bg-white py-3.5 pr-3.5 pl-6 text-sm font-medium text-navy transition hover:bg-mist">
            Explore Properties
            <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-white transition group-hover:rotate-45"><IconArrow className="h-3.5 w-3.5" /></span>
          </Link>
          <Link href="/home-value" className="rounded-full px-6 py-3.5 text-sm font-medium ring-1 ring-white/40 backdrop-blur-sm transition hover:bg-white/10">
            What&apos;s my home worth?
          </Link>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-6 md:pb-8">
        <div className="flex flex-wrap items-end justify-between gap-5 border-t border-white/15 pt-5">
          <dl className="flex gap-8 md:gap-12">
            {STATS.map(([n, l]) => (
              <div key={l}>
                <dt className="tnum text-2xl font-semibold md:text-3xl">{n}</dt>
                <dd className="text-xs text-white/60 md:text-sm">{l}</dd>
              </div>
            ))}
          </dl>
          <Link href="/properties/4365-kraft-ave-studio-city" className="group hidden items-center gap-3 rounded-2xl bg-white/10 p-2 pr-5 ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/20 sm:flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/slide-1.jpg")} alt="" className="h-14 w-20 rounded-xl object-cover" />
            <span>
              <span className="block text-[11px] tracking-wider text-white/60 uppercase">Featured property · Studio City</span>
              <span className="block font-medium">4365 Kraft Ave · <span className="tnum">$4,499,000</span></span>
            </span>
            <IconArrow className="h-4 w-4 transition group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}
