import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import PageHero from "@/components/PageHero";
import { AREA_IMG, communities, listingsIn } from "@/lib/site";

export function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/neighborhoods/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = communities.find((x) => x.slug === slug);
  return { title: c?.name ?? "Neighborhood" };
}

export default async function CommunityPage({ params }: PageProps<"/neighborhoods/[slug]">) {
  const { slug } = await params;
  const c = communities.find((x) => x.slug === slug);
  if (!c) notFound();
  const homes = listingsIn(c.name);

  return (
    <>
      <PageHero eyebrow="Neighborhood guide" title={c.name} image={AREA_IMG[c.slug]} crumbs={[["Neighborhoods", "/neighborhoods"], [c.name, `/neighborhoods/${c.slug}`]]} />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 md:grid-cols-[1fr_320px]">
          <div className="space-y-5 text-[17px] leading-[1.8] text-muted">
            {c.body.map((p, i) => <p key={i} className={i === 0 ? "text-xl leading-relaxed text-navy" : ""}>{p}</p>)}
          </div>
          <aside className="h-fit rounded-3xl bg-navy p-7 text-white md:sticky md:top-24">
            <p className="tnum text-5xl font-semibold">{homes.length}</p>
            <p className="mt-1 text-white/70">properties in {c.name}</p>
            <a href="#homes" className="mt-6 block rounded-full bg-white py-3.5 text-center text-sm font-medium text-navy hover:bg-mist">View homes</a>
            <Link href="/contact" className="mt-3 block rounded-full py-3.5 text-center text-sm ring-1 ring-white/30 hover:bg-white/10">Ask Michael about {c.name}</Link>
          </aside>
        </div>
      </section>
      {homes.length > 0 && (
        <section id="homes" className="bg-mist py-16 md:py-24">
          <div className="mx-auto max-w-[1240px] px-5">
            <h2 className="h-display text-3xl md:text-[2.8rem]">Homes in {c.name}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{homes.map((l) => <ListingCard key={l.slug} l={l} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
