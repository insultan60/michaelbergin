"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconPhone } from "./Icons";

const NAV = [
  ["Properties", "/properties"],
  ["Neighborhoods", "/neighborhoods"],
  ["About", "/about"],
  ["Team", "/team"],
  ["Guides", "/guides/buyers"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"],
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// Modelled on the Andrew Liberty Team header: full-width bar, serif wordmark, underline nav,
// phone + primary CTA, frosted and shorter once scrolled, full-screen mobile menu.
export default function SiteHeader() {
  // GitHub Pages serves "/properties/" (trailing slash); compare without it
  const path = usePathname().replace(/\/+$/, "") || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // light frosted bar with navy text: once scrolled, with the menu open, or on pages without a dark banner
  const light = scrolled || open || path === "/properties";
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.split("/").slice(0, 2).join("/")));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          light ? "border-navy/10 bg-white/80 shadow-[0_1px_24px_rgba(11,27,58,0.07)] backdrop-blur-xl backdrop-saturate-150" : "border-transparent"
        }`}
      >
        <div className={`mx-auto flex w-[min(1360px,100%-40px)] items-center justify-between gap-6 transition-[height] duration-300 ${scrolled || path === "/properties" ? "h-16" : "h-[84px]"}`}>
          <Link href="/" className="flex flex-col leading-[1.15]" aria-label="Michael Bergin Real Estate — home">
            <span className={`font-display text-[22px] not-italic transition-colors ${light ? "text-navy" : "text-white"}`} style={{ fontStyle: "normal" }}>
              Michael&nbsp;Bergin
            </span>
            <span className={`text-[10px] font-semibold tracking-[0.3em] uppercase ${light ? "text-[#a8812e]" : "text-gold"}`}>Real Estate · Los Angeles</span>
          </Link>

          <nav className="hidden items-center xl:flex" aria-label="Primary">
            {NAV.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`group relative rounded-lg px-3.5 py-2.5 text-[14px] font-medium whitespace-nowrap transition-colors ${
                  light ? (active(href) ? "text-navy" : "text-navy/65 hover:text-navy") : active(href) ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {label}
                <span className={`absolute inset-x-3.5 bottom-1 h-[1.5px] origin-left bg-gold transition-transform duration-300 ${active(href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="tel:3106000715" className={`hidden items-center gap-2 px-3 py-2.5 text-[14px] font-medium whitespace-nowrap transition-colors lg:inline-flex ${light ? "text-navy/70 hover:text-[#a8812e]" : "text-white/80 hover:text-gold"}`}>
              <IconPhone className="h-[15px] w-[15px]" /> 310.600.0715
            </a>
            <Link
              href="/home-value"
              className={`group hidden items-center gap-2 rounded-full px-[22px] py-[13px] text-[14px] font-medium transition active:scale-[0.97] sm:inline-flex ${
                light ? "bg-navy text-white shadow-[0_1px_2px_rgba(11,27,58,0.25)] hover:bg-navy-3 hover:shadow-[0_6px_20px_rgba(11,27,58,0.28)]" : "bg-white text-navy hover:bg-mist"
              }`}
            >
              <span>What&apos;s My Home Worth?</span>
              <Arrow />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`relative ml-1 grid h-11 w-11 place-items-center rounded-full xl:hidden ${light ? "text-navy" : "text-white"}`}
            >
              <span className={`absolute h-[1.5px] w-5 bg-current transition ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-5 bg-current transition ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-white px-8 pt-24 pb-12 transition-opacity duration-300 xl:hidden ${open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"}`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {NAV.map(([label, href], i) => (
            <Link
              key={href}
              href={href}
              className={`border-b border-line py-3 font-display text-[clamp(1.8rem,7vw,2.6rem)] text-navy transition duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ fontStyle: "normal", transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 flex flex-col gap-4">
          <Link href="/home-value" className="rounded-full bg-navy py-4 text-center font-medium text-white">What&apos;s My Home Worth?</Link>
          <a href="tel:3106000715" className="text-center text-navy/70">310.600.0715</a>
        </div>
      </div>
    </>
  );
}
