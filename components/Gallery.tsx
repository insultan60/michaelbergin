"use client";

import { useState } from "react";

export default function Gallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [i, setI] = useState(0);
  if (!photos.length)
    return (
      <div className="grid aspect-[21/9] place-items-center rounded-3xl bg-gradient-to-br from-navy-2 to-navy-3 text-center text-white/60">
        <p className="max-w-sm px-6 text-sm">Photos for this listing are shown on the MLS. Ask Michael for the full photo set or a private showing.</p>
      </div>
    );
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_160px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl md:aspect-auto md:h-[560px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={photos[i]} src={photos[i]} alt={alt} className="rise h-full w-full object-cover" />
        <span className="tnum absolute right-4 bottom-4 rounded-full bg-navy/70 px-3 py-1 text-xs text-white backdrop-blur">{i + 1} / {photos.length}</span>
      </div>
      <div className="no-bar flex gap-3 overflow-x-auto md:h-[560px] md:flex-col md:overflow-y-auto">
        {photos.map((p, n) => (
          <button key={p} onClick={() => setI(n)} className={`aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl transition md:w-full ${n === i ? "ring-2 ring-gold" : "opacity-60 hover:opacity-100"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
