import type { Block } from "@/lib/site";

// Renders captured page text: headings and paragraphs, nothing added
export default function Prose({ blocks, className = "" }: { blocks: Block[]; className?: string }) {
  return (
    <div className={`space-y-5 text-[17px] leading-[1.75] text-muted ${className}`}>
      {blocks.map((b, i) =>
        b.h ? (
          <h2 key={i} className="pt-4 text-2xl font-medium tracking-tight text-navy">{b.h}</h2>
        ) : (
          <p key={i}>{b.p}</p>
        ),
      )}
    </div>
  );
}
