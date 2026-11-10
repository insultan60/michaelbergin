import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import { blog } from "@/lib/site";

export function generateStaticParams() {
  return blog.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: blog.find((b) => b.slug === slug)?.title ?? "Blog" };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const b = blog.find((x) => x.slug === slug);
  if (!b) notFound();
  return (
    <>
      <PageHero eyebrow="Blog" title={b.title} crumbs={[["Blog", "/blog"], [b.title, `/blog/${b.slug}`]]} />
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <Prose blocks={b.body} />
      </article>
    </>
  );
}
