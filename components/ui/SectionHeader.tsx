"use client";

import { Reveal } from "./Reveal";

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
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      {eyebrow && <span className="section-eyebrow mb-4">{eyebrow}</span>}
      <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl">
        {title}{" "}
        {highlight && (
          <span className="text-primary-700">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
