// All site content comes from content.json, generated from the captured michaelbergin.com
// by ../../_tools/site_content.py. Nothing in that file is written by hand.
import content from "./content.json";

export type Block = { h?: string; p?: string };
export type Listing = (typeof content.listings)[number];

export const { listings, team, communities, guides, blog, testimonials, about, concierge, contact } = content;

export const GUIDE_GROUPS = ["buyers", "sellers", "financing"] as const;
export type GuideGroup = (typeof GUIDE_GROUPS)[number];
export const guideLabel: Record<GuideGroup, string> = { buyers: "Buyers", sellers: "Sellers", financing: "Financing" };

export const firstParagraph = (b: Block[]) => b.find((x) => x.p)?.p ?? "";
export const initials = (n: string) =>
  n.replace(/\(.*?\)/g, "").split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("");
export const priceNum = (p: string) => Number(p.replace(/\D/g, "")) || 0;
export const listingsIn = (city: string) => listings.filter((l) => l.city.toLowerCase() === city.toLowerCase());

// Neighborhood cover photos: listing photos where we have them, otherwise homepage slides
export const AREA_IMG: Record<string, string> = {
  "studio-city": "/img/listings/4365-kraft-ave-studio-city-ca-91604-2.jpg",
  "sherman-oaks": "/img/listings/3551-royal-woods-sherman-oaks-ca-91403-1.jpg",
  tarzana: "/img/listings/4256-tarzana-estates-dr-tarzana-california-91356-2.jpg",
  encino: "/img/slide-3.jpg",
  "toluca-lake": "/img/slide-5.jpg",
  "valley-village": "/img/slide-7.jpg",
  "beverly-hills": "/img/slide-2.jpg",
  brentwood: "/img/slide-4.jpg",
  calabasas: "/img/slide-6.jpg",
  malibu: "/img/slide-8.jpg",
  "mar-vista": "/img/slide-1.jpg",
  "woodland-hills": "/img/listings/3430-wrightwood-dr-studio-city-california-91604-2.jpg",
};
