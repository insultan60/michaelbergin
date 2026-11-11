import Link from "next/link";
import type { Listing } from "@/lib/site";
import { IconArea, IconBath, IconBed, IconHome } from "./Icons";
import { asset } from "@/lib/base-path";

export function Specs({ l, className = "" }: { l: Listing; className?: string }) {
  return (
    <div className={`tnum flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted ${className}`}>
      {l.beds && <span className="flex items-center gap-1.5"><IconBed className="h-4 w-4" />{l.beds} Bed</span>}
      {l.baths && <span className="flex items-center gap-1.5"><IconBath className="h-4 w-4" />{l.baths} Bath</span>}
      {l.sqft && <span className="flex items-center gap-1.5"><IconArea className="h-4 w-4" />{l.sqft} Sqft</span>}
    </div>
  );
}

export default function ListingCard({ l }: { l: Listing }) {
  const photo = l.photos[0];
  return (
    <Link href={`/properties/${l.slug}`} className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(13,13,15,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(photo)} alt={`${l.street}, ${l.city}`} className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105" />
        ) : (
          // No photos were captured for this MLS listing: show a typographic card instead of a stock image
          <div className="flex h-full flex-col justify-between bg-gradient-to-br from-navy to-navy-3 p-6 text-white">
            <IconHome className="h-8 w-8 opacity-60" />
            <div>
              <p className="text-xs tracking-[0.25em] text-gold uppercase">{l.city}</p>
              <p className="mt-2 text-2xl leading-tight font-medium">{l.street}</p>
            </div>
          </div>
        )}
        <span className={`absolute top-3 right-3 rounded-md px-2.5 py-1 text-[11px] font-medium ${l.status === "Sold" ? "bg-navy text-white" : l.status === "Coming Soon" ? "bg-navy text-gold ring-1 ring-gold/50" : "bg-white text-navy"}`}>
          {l.status}
        </span>
      </div>
      <div className="p-5">
        <p className="tnum text-xl font-semibold">{l.price}</p>
        <p className="mt-1 font-medium">{l.street}</p>
        <p className="mb-4 text-sm text-muted">{l.city}, CA</p>
        <Specs l={l} />
      </div>
    </Link>
  );
}
