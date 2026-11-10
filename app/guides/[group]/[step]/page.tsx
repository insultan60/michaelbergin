import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import { GUIDE_GROUPS, type GuideGroup, guideLabel, guides } from "@/lib/site";

export function generateStaticParams() {
  return GUIDE_GROUPS.flatMap((group) => guides[group].steps.map((s) => ({ group, step: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/guides/[group]/[step]">): Promise<Metadata> {
  const { group, step } = await params;
  return { title: guides[group as GuideGroup]?.steps.find((s) => s.slug === step)?.title ?? "Guide" };
}

export default async function StepPage({ params }: PageProps<"/guides/[group]/[step]">) {
  const { group: g, step } = await params;
  const group = g as GuideGroup;
  if (!GUIDE_GROUPS.includes(group)) notFound();
  const steps = guides[group].steps;
  const i = steps.findIndex((s) => s.slug === step);
  if (i < 0) notFound();
  const s = steps[i];

  return (
    <>
      <PageHero eyebrow={`${guideLabel[group]} guide · Step ${i + 1} of ${steps.length}`} title={s.title}
        crumbs={[["Guides", `/guides/${group}`], [guideLabel[group], `/guides/${group}`], [s.title, `/guides/${group}/${s.slug}`]]} />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 md:grid-cols-[260px_1fr]">
          <nav className="h-fit md:sticky md:top-28" aria-label={`${guideLabel[group]} steps`}>
            <ol className="space-y-1">
              {steps.map((x, n) => (
                <li key={x.slug}>
                  <Link href={`/guides/${group}/${x.slug}`} className={`flex gap-3 rounded-xl px-4 py-3 text-sm transition ${n === i ? "bg-navy text-white" : "hover:bg-mist"}`}>
                    <span className="tnum opacity-60">{String(n + 1).padStart(2, "0")}</span>{x.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="max-w-3xl">
            <Prose blocks={s.body} />
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {i > 0 && (
                <Link href={`/guides/${group}/${steps[i - 1].slug}`} className="rounded-2xl p-5 ring-1 ring-line hover:bg-mist">
                  <span className="text-sm text-muted">← Previous</span><span className="block font-medium">{steps[i - 1].title}</span>
                </Link>
              )}
              {i < steps.length - 1 && (
                <Link href={`/guides/${group}/${steps[i + 1].slug}`} className="rounded-2xl p-5 text-right ring-1 ring-line hover:bg-mist sm:col-start-2">
                  <span className="text-sm text-muted">Next →</span><span className="block font-medium">{steps[i + 1].title}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
