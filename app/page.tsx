import Link from "next/link";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import Valuation from "@/components/Valuation";
import {
  IconArrow, IconChart, IconFilm, IconHills, IconHome, IconKey, IconLake, IconOak, IconPalm, IconTag, IconVillage,
} from "@/components/Icons";
import { GUIDE_GROUPS, about, firstParagraph, guideLabel, guides, initials, listingsIn, team } from "@/lib/site";

// Short labels are ours; every description is a sentence from Michael's About page, word for word
const STRENGTHS = [
  { icon: IconChart, t: "Global Reach", d: "He is also the Southern California representative for The Summers Global Team, an elite international network of top luxury professionals, providing his clients with unmatched global reach and exposure." },
  { icon: IconHome, t: "Full-Service Network", d: "Supported by a trusted network of premier agents, lenders, inspectors, and contractors, Michael delivers a seamless, full-service experience tailored to each client’s goals." },
  { icon: IconKey, t: "Client-First Approach", d: "Renowned for his clear communication and client-first approach, Michael is a strong listener who excels at aligning strategy with his clients’ needs." },
  { icon: IconTag, t: "Skilled Negotiator", d: "His reputation as a highly skilled negotiator ensures that buyers and sellers are consistently positioned for the strongest possible outcomes." },
];

const AREAS = [
  { slug: "studio-city", name: "Studio City", icon: IconFilm, img: "/img/listings/4365-kraft-ave-studio-city-ca-91604-2.jpg" },
  { slug: "sherman-oaks", name: "Sherman Oaks", icon: IconOak, img: "/img/listings/3551-royal-woods-sherman-oaks-ca-91403-1.jpg" },
  { slug: "encino", name: "Encino", icon: IconPalm, img: "/img/slide-3.jpg" },
  { slug: "toluca-lake", name: "Toluca Lake", icon: IconLake, img: "/img/slide-5.jpg" },
  { slug: "tarzana", name: "Tarzana", icon: IconHills, img: "/img/listings/4256-tarzana-estates-dr-tarzana-california-91356-2.jpg" },
  { slug: "valley-village", name: "Valley Village", icon: IconVillage, img: "/img/slide-7.jpg" },
];

const GUIDE_IMG = { buyers: "/img/slide-2.jpg", sellers: "/img/slide-4.jpg", financing: "/img/slide-6.jpg" };
const WORDS = ["Luxury Portfolio", "Studio City", "Sherman Oaks", "Encino", "Toluca Lake", "Tarzana", "Valley Village", "Beverly Hills"];

function Marquee() {
  const row = (outlined: boolean) =>
    [...WORDS, ...WORDS].map((w, i) => (
      <span key={i} className="flex shrink-0 items-center gap-8 px-4">
        <span className={(i % 2 === 0) === outlined ? "outline-text" : ""}>{w}</span>
        <span className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-current/30"><IconHome className="h-5 w-5" /></span>
      </span>
    ));
  return (
    <section aria-hidden className="fade-x overflow-hidden bg-mist py-10 text-[clamp(2rem,4.5vw,3.6rem)] font-semibold tracking-tight text-navy uppercase">
      <div className="marquee flex w-max">{row(false)}</div>
      <div className="marquee-rev mt-3 flex w-max text-navy/70">{row(true)}</div>
    </section>
  );
}

export default function Home() {
  const bio = about.filter((b) => b.p && b.p.length > 120);

  return (
    <>
      <Hero />

      {/* Why Michael */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-5 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="h-display text-4xl md:text-[3.2rem]">Why Work With Michael</h2>
            <p className="mt-5 max-w-md text-muted">{bio[0].p}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/listings/3430-wrightwood-dr-studio-city-california-91604-1.jpg" alt="3430 Wrightwood Dr, Studio City" className="mt-10 aspect-[16/10] w-full rounded-2xl object-cover" />
          </Reveal>
          <div className="divide-y divide-line">
            {STRENGTHS.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 90} className="group flex gap-5 py-7 first:pt-0">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-mist text-navy transition group-hover:bg-navy group-hover:text-white"><Icon /></span>
                <div>
                  <h3 className="text-xl font-medium">{t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* Neighborhoods */}
      <section id="neighborhoods" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 border-t border-l border-line px-5 md:grid-cols-4 md:px-0">
          <Reveal className="col-span-2 flex flex-col justify-center border-r border-b border-line p-8 md:p-12">
            <h2 className="h-display text-4xl md:text-[3rem]">Explore The Neighborhoods</h2>
            <Link href="/neighborhoods" className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium">All 12 communities <IconArrow className="h-4 w-4" /></Link>
          </Reveal>
          {AREAS.map(({ slug, name, icon: Icon, img }) => (
            <Link key={slug} href={`/neighborhoods/${slug}`} className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden border-r border-b border-line p-6 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100" />
              <span className="absolute inset-0 bg-navy/70 opacity-0 transition duration-700 group-hover:opacity-100" />
              <Icon className="relative h-14 w-14 stroke-[1.1] text-navy transition group-hover:text-white" />
              <p className="relative mt-5 text-lg font-medium transition group-hover:text-white">{name}</p>
              <p className="relative text-sm text-muted transition group-hover:text-white/75">{listingsIn(name).length} Properties</p>
            </Link>
          ))}
        </div>
      </section>

      <Properties />

      {/* About */}
      <section id="about" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 md:grid-cols-2">
          <Reveal className="relative">
            <div className="absolute -top-5 -left-5 h-full w-full rounded-3xl bg-mist" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/michael.jpg" alt="Michael Bergin" className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top" />
            <div className="absolute right-5 bottom-5 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
              <p className="tnum text-3xl font-semibold">15+</p>
              <p className="text-sm text-muted">Years of experience</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[11px] font-semibold tracking-[0.3em] text-[#a8812e] uppercase">About Michael Bergin</p>
            <h2 className="h-display mt-4 text-4xl md:text-[3.2rem]">Local Expert, Global Reach</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">{bio[3]?.p}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Top 1% of Los Angeles agents", "Summers Global representative", "26 five-star client reviews", "CA DRE# 01845572"].map((x) => (
                <li key={x} className="flex items-center gap-3 text-[15px]">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-[11px] text-white">✓</span>{x}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/about" className="rounded-full bg-navy px-7 py-3.5 text-sm text-white hover:bg-navy-3">Learn More</Link>
              <Link href="/contact" className="rounded-full px-7 py-3.5 text-sm ring-1 ring-line hover:bg-mist">Contact Michael</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Reviews />

      {/* Team */}
      <section id="team" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-5">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display text-4xl md:text-[3.2rem]">Meet The Team</h2>
            <Link href="/team" className="rounded-full px-6 py-3 text-sm ring-1 ring-line hover:bg-mist">View All</Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 5) * 50}>
                <Link href={`/team/${m.slug}`} className="flex h-full flex-col items-center justify-center rounded-2xl bg-mist p-5 text-center transition hover:bg-navy hover:text-white">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-sm font-semibold text-navy">{initials(m.name)}</span>
                  <p className="mt-3 text-[15px] leading-tight font-medium">{m.name}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section id="guides" className="bg-mist py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-5">
          <Reveal><h2 className="h-display max-w-lg text-4xl md:text-[3.2rem]">Guides</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {GUIDE_GROUPS.map((g, i) => (
              <Reveal key={g} delay={i * 100}>
                <Link href={`/guides/${g}`} className="group block overflow-hidden rounded-2xl bg-white p-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={GUIDE_IMG[g]} alt="" className="h-full w-full object-cover transition duration-[1600ms] group-hover:scale-105" />
                    <span className="absolute top-3 left-3 rounded-md bg-white px-2.5 py-1 text-[11px] font-medium">{guides[g].steps.length} steps</span>
                  </div>
                  <div className="p-3 pt-5">
                    <p className="text-xl font-medium">{guideLabel[g]}</p>
                    <p className="mt-2 line-clamp-3 text-sm text-muted">{firstParagraph(guides[g].intro)}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
                      <span className="text-muted">{guides[g].steps[0].title}</span>
                      <span className="flex items-center gap-1 font-medium">Read Guide <IconArrow className="h-4 w-4 transition group-hover:rotate-45" /></span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Valuation />
      <Contact />
    </>
  );
}
