import Link from "next/link";
import { GUIDE_GROUPS, type GuideGroup, guideLabel } from "@/lib/site";

export default function GuideTabs({ active }: { active?: GuideGroup }) {
  return (
    <div className="border-b border-line">
      <div className="mx-auto flex max-w-[1240px] gap-2 px-5 py-4">
        {GUIDE_GROUPS.map((g) => (
          <Link key={g} href={`/guides/${g}`} className={`rounded-full px-5 py-2 text-sm transition ${g === active ? "bg-navy text-white" : "ring-1 ring-line hover:bg-mist"}`}>
            {guideLabel[g]}
          </Link>
        ))}
        <Link href="/concierge" className="rounded-full px-5 py-2 text-sm ring-1 ring-line hover:bg-mist">Lenders</Link>
      </div>
    </div>
  );
}
