import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import ListingCard, { Specs } from "@/components/ListingCard";
import LocationMap from "@/components/LocationMap";
import { listings } from "@/lib/site";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = listings.find((x) => x.slug === slug);
  return { title: l ? `${l.street}, ${l.city}` : "Property" };
}

export default async function PropertyPage({ params }: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const l = listings.find((x) => x.slug === slug);
  if (!l) notFound();
  const more = listings.filter((x) => x.city === l.city && x.slug !== l.slug).slice(0, 3);
  const facts = [
    ["Price", l.price], ["Status", l.status], ["Bedrooms", l.beds], ["Bathrooms", l.baths],
    ["Square feet", l.sqft], ["Property type", l.type], ["Year built", l.year], ["MLS #", l.mls],
  ].filter(([, v]) => v);

  return (
    <>
      <section className="bg-navy pt-28 text-white md:pt-32">
        <div className="mx-auto max-w-[1240px] px-5">
          <nav className="flex gap-2 text-[13px] text-white/55">
            <Link href="/" className="hover:text-white">Home</Link>/<Link href="/properties" className="hover:text-white">Properties</Link>/<span>{l.city}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 pb-10">
            <div>
              <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs">{l.status}</span>
              <h1 className="h-display mt-4 text-[clamp(2.2rem,4.5vw,3.8rem)]">{l.street}</h1>
              <p className="mt-2 text-white/70">{l.city}, CA</p>
            </div>
            <p className="tnum text-3xl font-semibold md:text-4xl">{l.price}</p>
          </div>
        </div>
      </section>

      <section className="bg-navy pb-14">
        <div className="mx-auto max-w-[1240px] px-5">
          <Gallery photos={l.photos} alt={`${l.street}, ${l.city}`} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 md:grid-cols-[1fr_340px]">
          <div>
            <Specs l={l} className="!text-[15px]" />
            <h2 className="mt-10 text-2xl font-medium">About This Property</h2>
            <p className="mt-4 text-[17px] leading-[1.8] whitespace-pre-line text-muted">{l.description || "Contact Michael for full details on this property."}</p>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 bg-white p-4 text-[15px]">
                  <dt className="text-muted">{k}</dt>
                  <dd className="tnum font-medium capitalize">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Full MLS detail groups, as published on the IDX listing */}
            {l.details.map((g) => {
              const items = g.items.filter(([k, v]) => v !== "---" && !/^(Latitude|Longitude)$/.test(k));
              if (!items.length) return null;
              return (
                <details key={g.title} open className="group mt-6 rounded-2xl ring-1 ring-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-lg font-medium">
                    {g.title}
                    <span className="text-muted transition group-open:rotate-45">+</span>
                  </summary>
                  <dl className="grid gap-x-8 border-t border-line px-5 py-3 sm:grid-cols-2">
                    {items.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-b border-line/70 py-2.5 text-[14px] last:border-0">
                        <dt className="text-muted">{k}</dt>
                        <dd className="text-right font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              );
            })}

            {l.geo && (
              <>
                <h2 className="mt-12 text-2xl font-medium">Location</h2>
                <p className="mt-1 text-sm text-muted">{l.street}, {l.city}, CA {l.zip}</p>
                <div className="mt-4 h-[380px] overflow-hidden rounded-2xl ring-1 ring-line">
                  <LocationMap l={l} />
                </div>
              </>
            )}

            {(l.office || l.disclaimer) && (
              <div className="mt-12 flex gap-4 border-t border-line pt-6 text-xs leading-relaxed text-muted">
                <span className="shrink-0 rounded border border-line px-2 py-1 font-semibold tracking-wider text-navy">MLS</span>
                <div className="space-y-2">
                  {l.office && <p>Listing courtesy of <span className="font-medium text-navy">{l.office}</span>{l.mls && ` · MLS #${l.mls}`}</p>}
                  {l.disclaimer && <p>{l.disclaimer}</p>}
                </div>
              </div>
            )}
          </div>
          <aside className="h-fit rounded-3xl bg-mist p-7 md:sticky md:top-24">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/michael.jpg" alt="Michael Bergin" className="h-16 w-16 rounded-full object-cover object-top" />
            <p className="mt-4 text-lg font-semibold">Michael Bergin</p>
            <p className="text-sm text-muted">CA DRE# 01845572</p>
            <Link href="/contact" className="mt-6 block rounded-full bg-navy py-3.5 text-center text-sm text-white hover:bg-navy-3">Request a showing</Link>
            <a href="tel:3106000715" className="mt-3 block rounded-full py-3.5 text-center text-sm ring-1 ring-line hover:bg-white">Call 310.600.0715</a>
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="bg-mist py-16 md:py-24">
          <div className="mx-auto max-w-[1240px] px-5">
            <h2 className="h-display text-3xl md:text-4xl">More in {l.city}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{more.map((x) => <ListingCard key={x.slug} l={x} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
