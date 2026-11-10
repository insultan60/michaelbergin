import Link from "next/link";
import { asset } from "@/lib/base-path";

const FLOAT = [
  ["/img/slide-2.jpg", "left-[8%] top-[22%] w-24 md:w-32", "0s"],
  ["/img/slide-4.jpg", "left-[2%] top-[52%] w-20 md:w-28", "1.5s"],
  ["/img/slide-6.jpg", "right-[8%] top-[14%] w-28 md:w-40", "0.8s"],
  ["/img/slide-8.jpg", "right-[3%] top-[58%] w-20 md:w-28", "2.2s"],
];

export default function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      {/* Ready to get started */}
      <div className="relative mx-auto max-w-[1240px] px-5 py-28 text-center md:py-36">
        {FLOAT.map(([src, pos, delay]) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={asset(src)} alt="" className={`bob absolute hidden aspect-[4/3] rounded-lg object-cover opacity-90 sm:block ${pos}`} style={{ animationDelay: delay }} />
        ))}
        <h2 className="h-display relative mx-auto max-w-lg text-4xl md:text-[3.4rem]">Ready To Get Started?</h2>
        <p className="relative mx-auto mt-5 max-w-md text-white/65">Michael represents buyers and sellers throughout Southern California, from the coast to the San Fernando Valley.</p>
        <a href={asset("/contact")} className="relative mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-medium text-navy hover:bg-mist">Contact Michael</a>
      </div>

      <div className="mx-auto max-w-[1240px] border-t border-white/10 px-5">
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/60 text-sm font-semibold">MB</span>
              <span className="text-lg font-semibold tracking-[0.18em]">BERGIN</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">Proud Member of the Summers Global team as the Southern California Representative.</p>
          </div>
          {[
            ["Quick Links", ["Properties", "About", "Team", "Reviews", "Blog", "Contact"]],
            ["Areas", ["Studio City", "Sherman Oaks", "Encino", "Toluca Lake", "Tarzana"]],
          ].map(([h, items]) => (
            <div key={h as string}>
              <p className="font-medium">{h}</p>
              <ul className="mt-5 space-y-3 text-sm text-white/60">
                {(items as string[]).map((l) => (
                  <li key={l}><Link href={h === "Areas" ? `/neighborhoods/${l.toLowerCase().replace(/\s+/g, "-")}` : `/${l.toLowerCase()}`} className="hover:text-white">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="font-medium">Contacts</p>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li><a href="tel:3106000715" className="hover:text-white">310.600.0715</a></li>
              <li>michaelbergin.com</li>
              <li>CA DRE# 01845572</li>
              <li>Los Angeles, CA</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-navy-2/60">
        <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-3 px-5 py-5 text-xs text-white/50">
          <p>© 2026 Michael Bergin Real Estate. All Rights Reserved.</p>
          <p>Equal Housing Opportunity · Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}

