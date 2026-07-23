"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Subtle scroll-in: gentle fade + slight rise. Respects prefers-reduced-motion
 * (renders instantly, no transform) per the design brief.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  immediate = false,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
  /** Play on mount (for above-the-fold content like the hero) instead of on scroll. */
  immediate?: boolean;
} & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...(rest as object)}>
        {children}
      </Tag>
    );
  }

  const anim = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
      };

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...anim}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
