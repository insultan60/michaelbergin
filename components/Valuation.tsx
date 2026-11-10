"use client";

import { asset } from "@/lib/base-path";
import { useState } from "react";
import { IconHome } from "./Icons";

export default function Valuation() {
  const [sent, setSent] = useState(false);
  return (
    <section id="valuation" className="px-3 pt-24 md:px-6 md:pt-32">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] bg-navy text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/img/slide-8.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative grid items-center gap-10 p-8 md:grid-cols-2 md:p-16">
          <div>
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 ring-1 ring-white/20"><IconHome /></span>
            <h2 className="h-display mt-6 text-4xl md:text-[3rem]">What Is My Property Value?</h2>
            
          </div>
          {sent ? (
            <p className="text-2xl font-medium">Thank you. Michael will be in touch within one business day.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-3 rounded-2xl bg-white p-3 sm:flex-row">
              <label htmlFor="addr" className="sr-only">Property address</label>
              <input id="addr" required placeholder="Enter your property address" className="h-13 flex-1 rounded-xl px-4 text-navy outline-none placeholder:text-muted" />
              <button className="h-13 rounded-full bg-navy px-7 text-sm font-medium hover:bg-navy-3">Get Estimate</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

