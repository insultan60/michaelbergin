import type { Metadata } from "next";
import GuideTabs from "@/components/GuideTabs";
import PageHero from "@/components/PageHero";
import { concierge } from "@/lib/site";

export const metadata: Metadata = { title: "Concierge" };

export default function ConciergePage() {
  return (
    <>
      <PageHero eyebrow="Concierge" title="Lenders" crumbs={[["Concierge", "/concierge"]]} />
      <GuideTabs />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:grid-cols-2">
          {concierge.map((c) => (
            <div key={c.name} className="rounded-2xl p-7 ring-1 ring-line">
              <p className="text-xl font-medium">{c.name}</p>
              <p className="mt-3 text-muted">{c.address}</p>
              <div className="mt-5 space-y-1 text-[15px]">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="block underline decoration-line underline-offset-4 hover:decoration-navy">{c.url.replace(/^https?:\/\/(www\.)?|\/$/g, "")}</a>
                <a href={`tel:${c.phone.replace(/\D/g, "")}`} className="block">{c.phone}</a>
                <a href={`mailto:${c.email}`} className="block">{c.email}</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
