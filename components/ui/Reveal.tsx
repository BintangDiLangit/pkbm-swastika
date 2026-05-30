"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

type Props = {
  children: ReactNode;
  delay?: number;
} & (
  | ({ as?: "div" } & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView" | "viewport" | "transition">)
  | ({ as: "section" } & Omit<HTMLMotionProps<"section">, "variants" | "initial" | "whileInView" | "viewport" | "transition">)
  | ({ as: "li" } & Omit<HTMLMotionProps<"li">, "variants" | "initial" | "whileInView" | "viewport" | "transition">)
  | ({ as: "article" } & Omit<HTMLMotionProps<"article">, "variants" | "initial" | "whileInView" | "viewport" | "transition">)
);

export function Reveal(props: Props) {
  const { children, delay = 0, className } = props;

  const shared = {
    variants,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
    className,
  };

  if (props.as === "section") {
    const { as: _as, children: _children, delay: _delay, className: _className, ...rest } = props;
    return (
      <motion.section {...shared} {...rest}>
        {children}
      </motion.section>
    );
  }

  if (props.as === "li") {
    const { as: _as, children: _children, delay: _delay, className: _className, ...rest } = props;
    return (
      <motion.li {...shared} {...rest}>
        {children}
      </motion.li>
    );
  }

  if (props.as === "article") {
    const { as: _as, children: _children, delay: _delay, className: _className, ...rest } = props;
    return (
      <motion.article {...shared} {...rest}>
        {children}
      </motion.article>
    );
  }

  const { as: _as, children: _children, delay: _delay, className: _className, ...rest } = props;
  return (
    <motion.div {...shared} {...rest}>
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
