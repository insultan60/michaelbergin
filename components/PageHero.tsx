import Link from "next/link";
import { asset } from "@/lib/base-path";

// Navy banner at the top of every inner page (the header sits over it in white)
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  crumbs?: [string, string][];
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(image)} alt="" className="drift absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/40" />
        </>
      )}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="relative mx-auto max-w-[1240px] px-5 pt-40 pb-16 md:pt-48 md:pb-20">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-white/55">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map(([l, h]) => (
            <span key={h} className="flex items-center gap-2">
              <span>/</span>
              <Link href={h} className="hover:text-white">{l}</Link>
            </span>
          ))}
        </nav>
        {eyebrow && <p className="mt-6 text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">{eyebrow}</p>}
        <h1 className="h-display mt-3 max-w-4xl text-[clamp(2.4rem,5vw,4.4rem)]">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/75">{intro}</p>}
      </div>
    </section>
  );
}
