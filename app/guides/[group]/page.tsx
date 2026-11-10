import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideTabs from "@/components/GuideTabs";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import { GUIDE_GROUPS, type GuideGroup, firstParagraph, guideLabel, guides } from "@/lib/site";

export function generateStaticParams() {
  return GUIDE_GROUPS.map((group) => ({ group }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[group]">): Promise<Metadata> {
  const g = (await params).group as GuideGroup;
  return { title: `${guideLabel[g] ?? "Guides"} Guide` };
}

export default async function GuidePage({ params }: PageProps<"/guides/[group]">) {
  const group = (await params).group as GuideGroup;
  if (!GUIDE_GROUPS.includes(group)) notFound();
  const g = guides[group];

  return (
    <>
      <PageHero eyebrow="Guides" title={guideLabel[group]} crumbs={[["Guides", `/guides/${group}`], [guideLabel[group], `/guides/${group}`]]} />
      <GuideTabs active={group} />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <Prose blocks={g.intro} />
        </div>
      </section>
      <section className="bg-mist py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5">
          <h2 className="h-display text-3xl md:text-[2.8rem]">Step by step</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.steps.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link href={`/guides/${group}/${s.slug}`} className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="tnum text-sm font-semibold text-[#a8812e]">Step {String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-xl font-medium">{s.title}</p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{firstParagraph(s.body)}</p>
                  <span className="mt-auto pt-5 text-sm font-medium">Read →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
