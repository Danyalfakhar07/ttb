"use client";

import { BRAND_FULL, BRAND_FULL_WORDS } from "@/lib/brand";
import { motion, useReducedMotion } from "framer-motion";

/** Slow, smooth opacity fade — starts immediately, no lead-in delay */
export const TEXT_FADE_DURATION = 3.05;
const textEase = [0.16, 1, 0.3, 1] as const;

type RevealStyle = "fade" | "drift";

interface CinematicLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  active?: boolean;
  reveal?: RevealStyle;
  anchored?: boolean;
}

/** Editorial headline reveal */
export function CinematicLines({
  lines,
  className = "",
  lineClassName = "",
  stagger = 0.12,
  active = true,
  anchored = false,
}: CinematicLinesProps) {
  const reduceMotion = useReducedMotion();
  const headlineClassName = [lineClassName, "hero-headline-line"].filter(Boolean).join(" ");
  const useAnchored = anchored && lines.length > 1;

  if (reduceMotion) {
    return (
      <div className={className}>
        {lines.map((line, lineIndex) => (
          <p key={`${line}-${lineIndex}`} className={headlineClassName}>
            {line}
          </p>
        ))}
      </div>
    );
  }

  const lineMotion = (lineIndex: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: active ? 1 : 0 },
    transition: {
      duration: TEXT_FADE_DURATION,
      delay: active ? lineIndex * stagger : 0,
      ease: textEase,
    },
  });

  if (useAnchored) {
    return (
      <div
        className={[className, "hero-headline-stack--grid", lineClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {lines.map((line, lineIndex) => (
          <div key={`${line}-${lineIndex}`} className="hero-headline-row-slot">
            <motion.p className="hero-headline-line" {...lineMotion(lineIndex)}>
              {line}
            </motion.p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <div key={`${line}-${lineIndex}`} className="w-full">
          <motion.p className={headlineClassName} {...lineMotion(lineIndex)}>
            {line}
          </motion.p>
        </div>
      ))}
    </div>
  );
}

interface CinematicParagraphProps {
  text: string;
  className?: string;
  active?: boolean;
  delay?: number;
  reveal?: RevealStyle;
}

export function CinematicParagraph({
  text,
  className = "",
  active = true,
  delay = 0,
}: CinematicParagraphProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{
        duration: TEXT_FADE_DURATION,
        delay: active ? delay : 0,
        ease: textEase,
      }}
    >
      {text}
    </motion.p>
  );
}

interface BrandNameRevealProps {
  active?: boolean;
}

export function BrandNameReveal({ active = true }: BrandNameRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <p className="text-center text-sm font-light tracking-[0.2em] text-white/70 uppercase">
        {BRAND_FULL}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 md:gap-2">
      {BRAND_FULL_WORDS.map((word, i) => (
        <motion.span
          key={word}
          className="block text-center font-display text-[clamp(1.1rem,4.5vw,1.65rem)] font-light tracking-[0.28em] text-white/85 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{
            duration: 1.2,
            delay: active ? 0.18 + i * 0.18 : 0,
            ease: textEase,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
