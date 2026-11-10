import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { IconStar } from "@/components/Icons";
import { initials, testimonials } from "@/lib/site";

export const metadata: Metadata = { title: "Client Reviews" };

export default function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="What Clients Say" crumbs={[["Reviews", "/reviews"]]} />
      <section className="bg-mist py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] columns-1 gap-6 px-5 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} className="mb-6 break-inside-avoid">
              <figure className="rounded-2xl bg-white p-7 ring-1 ring-line">
                {t.stars && <span className="flex text-gold" aria-label={`${t.stars} stars`}>{Array.from({ length: t.stars }, (_, k) => <IconStar key={k} />)}</span>}
                <blockquote className="mt-4 text-[15px] leading-relaxed text-navy/85">{t.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-xs font-semibold text-white">{initials(t.author)}</span>
                  <span className="font-medium">{t.author}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
