import type { ReactNode } from "react";

/** Label kecil huruf besar di atas judul section, diawali garis emas. */
export function SectionLabel({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: "muted" | "gold";
  className?: string;
}) {
  const color = tone === "gold" ? "text-gold" : "text-slate-500";
  return (
    <span className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] ${color} ${className}`}>
      <span className="h-px w-8 bg-gold" aria-hidden />
      {children}
    </span>
  );
}
