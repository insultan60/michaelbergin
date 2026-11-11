"use client";

import { useState } from "react";
import { IconPhone } from "./Icons";
import { asset } from "@/lib/base-path";

const field = "h-12 w-full border-b border-line bg-transparent text-[15px] outline-none placeholder:text-muted/70 focus:border-navy";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 md:grid-cols-2">
        <div className="order-2 rounded-3xl border border-line p-7 md:order-1 md:p-10">
          {sent ? (
            <p className="py-16 text-center text-2xl font-medium">Thank you. Michael will reply within one business day.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-6">
              <label className="text-xs font-medium">Your Name *<input required className={field} placeholder="Full name" /></label>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="text-xs font-medium">Your Email *<input required type="email" className={field} placeholder="you@email.com" /></label>
                <label className="text-xs font-medium">Phone<input type="tel" className={field} placeholder="(000) 000-0000" /></label>
              </div>
              <label className="text-xs font-medium">I&apos;m interested in
                <select className={field} defaultValue="Selling my home">
                  <option>Selling my home</option><option>Buying a home</option><option>A home valuation</option><option>Something else</option>
                </select>
              </label>
              <label className="text-xs font-medium">Your Message<textarea rows={4} className="mt-2 w-full rounded-xl border border-line p-3 text-[15px] outline-none focus:border-navy" placeholder="Your message" /></label>
              <button className="h-13 rounded-full bg-navy text-sm font-medium text-white transition hover:bg-gold hover:text-navy">Book an Appointment</button>
            </form>
          )}
        </div>
        <div className="order-1 md:order-2">
          <h2 className="h-display text-4xl md:text-[3.2rem]">Send Michael A Message</h2>
          <p className="mt-5 max-w-md text-muted">Got any questions? Get in touch.</p>
          <a href="tel:3106000715" className="mt-9 flex w-fit items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-white"><IconPhone className="h-5 w-5" /></span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/michael.jpg")} alt="" className="-ml-7 h-12 w-12 rounded-full object-cover object-top ring-2 ring-white" />
            <span>
              <span className="block text-xs text-muted">Call or text Michael</span>
              <span className="tnum text-lg font-semibold">310.600.0715</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

