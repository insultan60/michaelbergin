import Link from "next/link";
import { listings } from "@/lib/site";
import ListingCard, { Specs } from "./ListingCard";
import Reveal from "./Reveal";
import { asset } from "@/lib/base-path";

// Homepage: Michael's featured properties (the five shown on his current homepage)
export default function Properties() {
  const withPhotos = listings.filter((l) => l.photos.length);
  const [main, ...rest] = withPhotos;

  return (
    <section id="properties" className="bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display max-w-xl text-4xl md:text-[3.2rem]">Featured Properties</h2>
          <Link href="/properties" className="rounded-full bg-navy px-6 py-3 text-sm text-white transition hover:bg-navy-3">View All Properties</Link>
        </Reveal>

        <Reveal className="mt-12 grid gap-4 md:grid-cols-[1fr_150px]">
          <Link href={`/properties/${main.slug}`} className="group relative block aspect-[16/9] overflow-hidden rounded-2xl md:aspect-auto md:h-[520px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(main.photos[0])} alt={`${main.street}, ${main.city}`} className="h-full w-full object-cover transition duration-[1600ms] group-hover:scale-105" />
            <span className="absolute top-5 right-5 rounded-md bg-white px-3 py-1.5 text-xs font-medium">{main.status}</span>
            <div className="absolute bottom-5 left-5 rounded-xl bg-white p-5 shadow-xl md:bottom-8 md:left-8">
              <p className="tnum text-sm text-muted">{main.price}</p>
              <p className="mt-1 text-xl font-semibold">{main.street}</p>
              <p className="mb-4 text-sm text-muted">{main.city}, CA</p>
              <Specs l={main} />
            </div>
          </Link>
          <div className="no-bar hidden flex-col gap-3 overflow-y-auto md:flex md:h-[520px]">
            {main.photos.slice(1).map((p) => (
              <Link key={p} href={`/properties/${main.slug}`} className="aspect-[4/3] shrink-0 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(p)} alt="" className="h-full w-full object-cover transition hover:scale-110" />
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((l, i) => (
            <Reveal key={l.slug} delay={i * 80}><ListingCard l={l} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
