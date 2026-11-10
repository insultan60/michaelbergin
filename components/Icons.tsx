// Thin line icons (24px grid, 1.5 stroke) so every section shares one drawing style
type P = { className?: string };
const S = ({ className = "h-6 w-6", children }: P & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    {children}
  </svg>
);

export const IconHome = (p: P) => <S {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></S>;
export const IconTag = (p: P) => <S {...p}><path d="M3 12V4h8l9 9-8 8-9-9Z" /><circle cx="7.5" cy="7.5" r="1.2" /></S>;
export const IconChart = (p: P) => <S {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></S>;
export const IconKey = (p: P) => <S {...p}><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M17 6l3 3M15 8l2 2" /></S>;
export const IconBed = (p: P) => <S {...p}><path d="M3 18V7M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6" /><circle cx="7" cy="11" r="1.5" /></S>;
export const IconBath = (p: P) => <S {...p}><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" /><path d="M6 12V5a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2" /></S>;
export const IconArea = (p: P) => <S {...p}><path d="M4 4h6M4 4v6M20 20h-6M20 20v-6M4 4l16 16" /></S>;
export const IconArrow = (p: P) => <S {...p}><path d="M7 17 17 7M8 7h9v9" /></S>;
export const IconPhone = (p: P) => <S {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></S>;
export const IconStar = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden><path d="m10 1.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8L10 1.5Z" /></svg>
);

// Neighborhood glyphs
export const IconHills = (p: P) => <S {...p}><path d="M2 19 9 8l4 6 3-4 6 9H2Z" /><circle cx="17" cy="5" r="2" /></S>;
export const IconPalm = (p: P) => <S {...p}><path d="M12 21c0-6 .5-9 1-11M13 10c-2-3-6-3-8-1M13 10c1-3 5-4 7-2M13 10c-1-3-4-5-6-5M13 10c2-2 5-2 6 0" /><path d="M8 21h9" /></S>;
export const IconLake = (p: P) => <S {...p}><path d="M3 15c2 0 2 1.5 4.5 1.5S10 15 12 15s2.5 1.5 4.5 1.5S19 15 21 15M3 19c2 0 2 1.5 4.5 1.5S10 19 12 19s2.5 1.5 4.5 1.5S19 19 21 19" /><path d="M6 12V7l4-3 4 3v5" /></S>;
export const IconFilm = (p: P) => <S {...p}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4" /></S>;
export const IconOak = (p: P) => <S {...p}><path d="M12 21v-7M12 14c-4 0-7-2.5-7-6a4 4 0 0 1 5-3.8A4 4 0 0 1 19 6c1.5 1 2 2.5 1 4.5-1 1.8-4 3.5-8 3.5Z" /></S>;
export const IconVillage = (p: P) => <S {...p}><path d="M2 21h20M4 21v-8l5-4 5 4v8M14 21V9l4-3 4 3v12" /><path d="M8 21v-4h2v4" /></S>;
