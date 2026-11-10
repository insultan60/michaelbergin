"use client";

import dynamic from "next/dynamic";
import type { Listing } from "@/lib/site";

const ListingMap = dynamic(() => import("./ListingMap"), { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-mist-2" /> });

export default function LocationMap({ l }: { l: Listing }) {
  return <ListingMap items={[l]} active={l.slug} onSelect={() => {}} />;
}
