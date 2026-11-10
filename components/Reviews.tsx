"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { testimonials } from "@/lib/site";
import { IconStar } from "./Icons";

const initials = (n: string) => n.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).slice(0, 2).join("");

export default function Reviews() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % n), 8000);
    return () => clearInterval(t);
  }, [n, i]);

  const at = (d: number) => testimonials[(i + d + n) % n];

  return (
    <section id="reviews" className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="h-display text-4xl md:text-[3.2rem]">What Clients Say</h2>
          <Link href="/reviews" className="mt-6 inline-block rounded-full px-6 py-3 text-sm ring-1 ring-white/30 hover:bg-white/10">Read all 26 reviews</Link>
          <div className="mt-10 flex items-center gap-5">
            <p className="tnum text-5xl font-semibold">5.0</p>
            <div>
              <span className="flex text-gold">{Array.from({ length: 5 }, (_, k) => <IconStar key={k} />)}</span>
              <p className="mt-1 text-sm text-white/60">Based on 26 client reviews</p>
            </div>
          </div>
        </div>

        {/* stacked cards: faded previous, active, faded next */}
        <div className="relative">
          <p className="mb-4 line-clamp-2 px-8 text-sm text-white/25">{at(-1).text}</p>
          <figure key={i} className="rise rounded-2xl bg-white p-8 text-navy shadow-2xl md:p-10">
            <span className="text-5xl leading-none text-navy/20">“</span>
            <blockquote className="-mt-3 text-[17px] leading-relaxed">{at(0).text}</blockquote>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-sm font-semibold text-white">{initials(at(0).author)}</span>
              <span>
                <span className="block font-semibold">{at(0).author}</span>
                <span className="flex text-gold">{Array.from({ length: 5 }, (_, k) => <IconStar key={k} className="h-3 w-3" />)}</span>
              </span>
            </figcaption>
          </figure>
          <p className="mt-4 line-clamp-2 px-8 text-sm text-white/25">{at(1).text}</p>
          <div className="mt-6 flex justify-end gap-2">
            {[-1, 1].map((d) => (
              <button key={d} onClick={() => setI((i + d + n) % n)} aria-label={d < 0 ? "Previous review" : "Next review"} className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white hover:text-navy">
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

