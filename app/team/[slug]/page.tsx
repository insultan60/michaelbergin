import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { initials, team } from "@/lib/site";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/team/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: team.find((m) => m.slug === slug)?.name ?? "Team" };
}

export default async function AgentPage({ params }: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const i = team.findIndex((m) => m.slug === slug);
  if (i < 0) notFound();
  const m = team[i];
  const next = team[(i + 1) % team.length];

  return (
    <>
      <PageHero eyebrow="The Bergin Group" title={m.name} crumbs={[["Team", "/team"], [m.name, `/team/${m.slug}`]]} />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 md:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-3xl bg-mist p-7 text-center md:sticky md:top-28">
            <span className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-navy text-3xl font-semibold text-white">{initials(m.name)}</span>
            <p className="mt-5 text-lg font-semibold">{m.name}</p>
            <Link href="/contact" className="mt-6 block rounded-full bg-navy py-3.5 text-sm text-white hover:bg-navy-3">Send a message</Link>
          </aside>
          <div>
            <div className="space-y-5 text-[17px] leading-[1.8] text-muted">
              {m.bio.map((p, n) => <p key={n} className={n === 0 ? "text-xl leading-relaxed text-navy" : ""}>{p}</p>)}
            </div>
            <Link href={`/team/${next.slug}`} className="mt-14 flex items-center justify-between rounded-2xl p-6 ring-1 ring-line transition hover:bg-mist">
              <span><span className="block text-sm text-muted">Next team member</span><span className="text-lg font-medium">{next.name}</span></span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
