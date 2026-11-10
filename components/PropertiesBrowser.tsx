"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { type Listing, listings, priceNum } from "@/lib/site";
import ListingCard, { Specs } from "./ListingCard";
import { IconArrow, IconHome } from "./Icons";
import { shortPrice } from "./ListingMap";
import { asset } from "@/lib/base-path";

const ListingMap = dynamic(() => import("./ListingMap"), { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-mist-2" /> });

const SORTS = { featured: "Featured", high: "Price (High to Low)", low: "Price (Low to High)", sqft: "Largest" } as const;
const PRICES = [0, 1e6, 2e6, 3e6, 5e6, 10e6, 20e6];
const PAGE = 18;
const money = (n: number) => (n >= 1e6 ? `$${n / 1e6}M` : n ? `$${n / 1e3}K` : "Any");

type Status = "all" | "active" | "coming" | "sold";

function Select<T extends string | number>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: [T, string][] }) {
  const on = options[0][0] !== value;
  return (
    <label className={`relative flex h-11 items-center rounded-full pr-9 pl-4 text-sm whitespace-nowrap ring-1 transition ${on ? "bg-navy text-white ring-navy" : "bg-white ring-line hover:ring-navy/40"}`}>
      <span className="sr-only">{label}</span>
      <select value={String(value)} onChange={(e) => onChange((typeof value === "number" ? Number(e.target.value) : e.target.value) as T)} className="absolute inset-0 cursor-pointer opacity-0">
        {options.map(([v, t]) => <option key={String(v)} value={String(v)}>{t}</option>)}
      </select>
      {options.find(([v]) => v === value)?.[1]}
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3.5 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}><path d="m6 9 6 6 6-6" /></svg>
    </label>
  );
}

export default function PropertiesBrowser() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<Status>("all");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [sort, setSort] = useState<keyof typeof SORTS>("featured");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"list" | "map">("list");
  const [hover, setHover] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const listTop = useRef<HTMLDivElement>(null);

  // allow /properties?area=Studio%20City links
  useEffect(() => {
    const a = new URLSearchParams(window.location.search).get("area");
    if (a) setQ(a);
  }, []);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let l = listings.filter((x) => {
      const p = priceNum(x.price);
      const st = x.status === "Sold" ? "sold" : x.status === "Coming Soon" ? "coming" : "active";
      return (
        (!needle || `${x.street} ${x.city} ${x.zip} ${x.mls}`.toLowerCase().includes(needle)) &&
        (status === "all" || st === status) &&
        (!min || p >= min) && (!max || p <= max) &&
        (!beds || Number(x.beds) >= beds) && (!baths || Number(x.baths) >= baths)
      );
    });
    if (sort === "high") l = [...l].sort((a, b) => priceNum(b.price) - priceNum(a.price));
    if (sort === "low") l = [...l].sort((a, b) => priceNum(a.price) - priceNum(b.price));
    if (sort === "sqft") l = [...l].sort((a, b) => priceNum(b.sqft) - priceNum(a.sqft));
    return l;
  }, [q, status, min, max, beds, baths, sort]);

  useEffect(() => { setPage(1); setPicked(null); }, [q, status, min, max, beds, baths, sort]);

  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const shown = list.slice((page - 1) * PAGE, page * PAGE);
  const onMap = list.filter((l) => l.geo).length;
  const pickedL = listings.find((l) => l.slug === picked) as Listing | undefined;
  const filters = [status !== "all", min, max, beds, baths].filter(Boolean).length;
  const clear = () => { setQ(""); setStatus("all"); setMin(0); setMax(0); setBeds(0); setBaths(0); };
  const go = (p: number) => { setPage(p); listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <div className="pt-16">
      {/* filter bar */}
      <div className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="no-bar flex items-center gap-2 overflow-x-auto px-4 py-3 md:px-6">
          <label className="relative flex h-11 min-w-[240px] flex-1 items-center rounded-full bg-mist pl-11 ring-1 ring-transparent focus-within:bg-white focus-within:ring-navy md:max-w-sm">
            <svg viewBox="0 0 24 24" className="absolute left-4 h-[18px] w-[18px] text-muted" fill="none" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <span className="sr-only">Search</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="City, neighborhood, ZIP, address or MLS #" className="h-full w-full bg-transparent pr-4 text-sm outline-none" />
          </label>
          <Select label="Status" value={status} onChange={setStatus} options={[["all", "Any status"], ["active", "For Sale"], ["coming", "Coming Soon"], ["sold", "Sold"]]} />
          <Select label="Min price" value={min} onChange={setMin} options={PRICES.map((p) => [p, p ? `Min ${money(p)}` : "Min price"] as [number, string])} />
          <Select label="Max price" value={max} onChange={setMax} options={[[0, "Max price"], ...PRICES.slice(1).map((p) => [p, `Max ${money(p)}`] as [number, string])]} />
          <Select label="Beds" value={beds} onChange={setBeds} options={[[0, "Beds"], [1, "1+ bd"], [2, "2+ bd"], [3, "3+ bd"], [4, "4+ bd"], [5, "5+ bd"], [6, "6+ bd"]]} />
          <Select label="Baths" value={baths} onChange={setBaths} options={[[0, "Baths"], [1, "1+ ba"], [2, "2+ ba"], [3, "3+ ba"], [4, "4+ ba"], [5, "5+ ba"]]} />
          {filters > 0 && <button onClick={clear} className="h-11 px-3 text-sm whitespace-nowrap text-muted underline-offset-4 hover:text-navy hover:underline">Clear ({filters})</button>}
          <div className="ml-auto flex shrink-0 rounded-full bg-mist p-1 lg:hidden">
            {(["list", "map"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`rounded-full px-4 py-2 text-sm capitalize ${view === v ? "bg-navy text-white" : ""}`}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      {/* split view */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <section ref={listTop} className={`scroll-mt-32 bg-mist px-4 py-6 md:px-6 ${view === "map" ? "hidden lg:block" : ""}`} aria-label="Property listings">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Homes For Sale & Recently Sold</h1>
              <p className="mt-1 text-sm text-muted">{list.length} results · {onMap} on map</p>
            </div>
            <Select label="Sort" value={sort} onChange={setSort} options={Object.entries(SORTS) as [keyof typeof SORTS, string][]} />
          </div>

          {shown.length ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {shown.map((l) => (
                <div key={l.slug} onMouseEnter={() => setHover(l.slug)} onMouseLeave={() => setHover(null)}
                  className={`rounded-2xl transition ${hover === l.slug || picked === l.slug ? "ring-2 ring-gold" : ""}`}>
                  <ListingCard l={l} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <IconHome className="mx-auto h-10 w-10 text-muted" />
              <p className="mt-4 text-lg font-medium">No homes match these filters</p>
              <button onClick={clear} className="mt-4 rounded-full px-6 py-3 text-sm ring-1 ring-line hover:bg-white">Clear all filters</button>
            </div>
          )}

          {pages > 1 && (
            <nav className="mt-8 flex flex-wrap items-center justify-center gap-1.5" aria-label="Listing pages">
              <button disabled={page === 1} onClick={() => go(page - 1)} className="h-10 rounded-full px-4 text-sm ring-1 ring-line disabled:opacity-40">Prev</button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => go(p)} aria-current={p === page} className={`tnum h-10 w-10 rounded-full text-sm ${p === page ? "bg-navy text-white" : "hover:bg-white"}`}>{p}</button>
              ))}
              <button disabled={page === pages} onClick={() => go(page + 1)} className="h-10 rounded-full px-4 text-sm ring-1 ring-line disabled:opacity-40">Next</button>
            </nav>
          )}
        </section>

        <aside className={`relative lg:sticky lg:top-[133px] lg:block lg:h-[calc(100svh-133px)] ${view === "map" ? "h-[calc(100svh-133px)]" : "hidden"}`} aria-label="Map of listings">
          <ListingMap items={list} active={picked ?? hover} onSelect={setPicked} onHover={setHover} />
          {pickedL && (
            <div className="absolute inset-x-4 bottom-4 z-[500] mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
              <button onClick={() => setPicked(null)} aria-label="Close preview" className="absolute top-2 right-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-lg shadow">×</button>
              <Link href={`/properties/${pickedL.slug}`} className="group flex">
                <div className="relative w-36 shrink-0 bg-navy">
                  {pickedL.photos[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(pickedL.photos[0])} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <IconHome className="absolute inset-0 m-auto h-8 w-8 text-white/50" />
                  )}
                </div>
                <div className="min-w-0 p-4">
                  <p className="text-[11px] tracking-wider text-muted uppercase">{pickedL.status}</p>
                  <p className="tnum text-lg font-semibold">{pickedL.price}</p>
                  <p className="truncate text-sm font-medium">{pickedL.street}</p>
                  <p className="mb-2 text-xs text-muted">{pickedL.city}, CA {pickedL.zip}</p>
                  <Specs l={pickedL} />
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium">View details <IconArrow className="h-3.5 w-3.5 transition group-hover:rotate-45" /></span>
                </div>
              </Link>
            </div>
          )}
          <div className="pointer-events-none absolute top-4 left-4 z-[500] rounded-full bg-white/95 px-4 py-2 text-xs shadow">
            <span className="tnum font-medium">{onMap}</span> homes · <span className="text-muted">pins show list price ({shortPrice("1500000")} = $1.5 million)</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
