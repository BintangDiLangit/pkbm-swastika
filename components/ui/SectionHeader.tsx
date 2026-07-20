"use client";

import { Reveal } from "./Reveal";
import { ScrollRevealHeading } from "./ScrollRevealHeading";

type Props = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
}: Props) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      {eyebrow && (
        <Reveal>
          <span className="section-eyebrow mb-4">{eyebrow}</span>
        </Reveal>
      )}
      <ScrollRevealHeading
        text={title}
        highlight={highlight}
        className="mt-3 text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl"
      />
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
