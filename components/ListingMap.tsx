"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Listing } from "@/lib/site";

export const shortPrice = (p: string) => {
  const n = Number(p.replace(/\D/g, ""));
  if (!n) return "—";
  return n >= 1e6 ? `$${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "")}M` : `$${Math.round(n / 1e3)}K`;
};

type L = typeof import("leaflet");

// Inline so the pins render even before the stylesheet's pin rules load
const PIN =
  "position:absolute;transform:translate(-50%,-100%);display:inline-block;white-space:nowrap;padding:5px 10px;border-radius:999px;" +
  "background:#fff;color:#0b1b3a;font:600 12px/1 var(--font-jakarta),system-ui,sans-serif;box-shadow:0 2px 10px rgba(11,27,58,.3);border:1px solid rgba(11,27,58,.12);";
const SOLD = "background:#dfe5ee;color:#6b768a;";

/** Real map (OpenStreetMap data, CARTO light tiles) with a price pin per listing. */
export default function ListingMap({
  items,
  active,
  onSelect,
  onHover,
}: {
  items: Listing[];
  active: string | null;
  onSelect: (slug: string | null) => void;
  onHover?: (slug: string | null) => void;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<import("leaflet").Map | null>(null);
  const layer = useRef<import("leaflet").LayerGroup | null>(null);
  const markers = useRef(new Map<string, import("leaflet").Marker>());
  const lib = useRef<L | null>(null);
  const tiles = useRef<Record<"street" | "satellite", import("leaflet").TileLayer | null>>({ street: null, satellite: null });
  const [mode, setMode] = useState<"street" | "satellite">("street");
  const cb = useRef({ onSelect, onHover });
  cb.current = { onSelect, onHover };

  // create the map once
  useEffect(() => {
    let dead = false;
    import("leaflet").then((Lmod) => {
      if (dead || !el.current || map.current) return;
      const Lf = (Lmod.default ?? Lmod) as L;
      lib.current = Lf;
      map.current = Lf.map(el.current, { zoomControl: false, scrollWheelZoom: true, attributionControl: true }).setView([34.15, -118.45], 11);
      Lf.control.zoom({ position: "bottomright" }).addTo(map.current);
      // Esri basemaps: free to use with attribution, no API key
      tiles.current.street = Lf.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors",
        maxZoom: 19,
      });
      tiles.current.satellite = Lf.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Imagery &copy; Esri",
        maxZoom: 19,
      });
      tiles.current[mode]?.addTo(map.current);
      layer.current = Lf.layerGroup().addTo(map.current);
      map.current.on("click", () => cb.current.onSelect(null));
      draw();
    });
    return () => {
      dead = true;
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = () => {
    const Lf = lib.current;
    if (!Lf || !map.current || !layer.current) return;
    layer.current.clearLayers();
    markers.current.clear();
    const pts: [number, number][] = [];
    items.forEach((l) => {
      if (!l.geo) return;
      const [lat, lng] = l.geo as [number, number];
      pts.push([lat, lng]);
      const m = Lf.marker([lat, lng], {
        icon: Lf.divIcon({ className: "map-pin-wrap", html: `<span class="map-pin${l.status === "Sold" ? " is-sold" : ""}" style="${PIN}${l.status === "Sold" ? SOLD : ""}">${shortPrice(l.price)}</span>`, iconSize: [0, 0] }),
        riseOnHover: true,
        keyboard: true,
        title: `${l.street}, ${l.city}`,
      });
      m.on("click", (e) => {
        Lf.DomEvent.stopPropagation(e);
        cb.current.onSelect(l.slug);
      });
      m.on("mouseover", () => cb.current.onHover?.(l.slug));
      m.on("mouseout", () => cb.current.onHover?.(null));
      m.addTo(layer.current!);
      markers.current.set(l.slug, m);
    });
    if (pts.length) map.current.fitBounds(Lf.latLngBounds(pts).pad(0.08), { maxZoom: 14, animate: false });
  };

  // redraw when the filtered list changes
  useEffect(draw, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  // highlight the hovered / selected listing
  useEffect(() => {
    markers.current.forEach((m, slug) => {
      const pin = m.getElement()?.querySelector<HTMLElement>(".map-pin");
      if (pin) {
        const on = slug === active;
        const sold = pin.classList.contains("is-sold");
        pin.style.background = on ? "#0b1b3a" : sold ? "#dfe5ee" : "#fff";
        pin.style.color = on ? "#fff" : sold ? "#6b768a" : "#0b1b3a";
        pin.style.transform = `translate(-50%,-100%) scale(${on ? 1.15 : 1})`;
      }
      if (slug === active) m.setZIndexOffset(1000);
      else m.setZIndexOffset(0);
    });
  }, [active, items]);

  // switch base map
  useEffect(() => {
    const m = map.current;
    const { street, satellite } = tiles.current;
    if (!m || !street || !satellite) return;
    const [on, off] = mode === "street" ? [street, satellite] : [satellite, street];
    if (m.hasLayer(off)) m.removeLayer(off);
    if (!m.hasLayer(on)) on.addTo(m);
  }, [mode]);

  return (
    <div className="relative h-full w-full">
      <div ref={el} className="h-full w-full bg-mist-2" />
      <div className="absolute top-4 right-4 z-[500] flex rounded-full bg-white p-1 text-sm shadow-lg">
        {(["street", "satellite"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`rounded-full px-4 py-1.5 ${mode === m ? "bg-navy text-white" : "text-navy"}`}>
            {m === "street" ? "Map" : "Satellite"}
          </button>
        ))}
      </div>
    </div>
  );
}
