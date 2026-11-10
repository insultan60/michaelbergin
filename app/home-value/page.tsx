import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Valuation from "@/components/Valuation";

export const metadata: Metadata = { title: "What Is My Home Worth?" };

export default function HomeValuePage() {
  return (
    <>
      <PageHero eyebrow="Home valuation" title="What Is My Property Value?" image="/img/slide-8.jpg" crumbs={[["Home Value", "/home-value"]]} />
      <div className="pb-24 md:pb-32"><Valuation /></div>
    </>
  );
}
