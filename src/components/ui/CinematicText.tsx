"use client";

import { BRAND_FULL, BRAND_FULL_WORDS } from "@/lib/brand";
import { motion, useReducedMotion } from "framer-motion";

const luxuryEase = [0.22, 1, 0.36, 1] as const;

type RevealStyle = "fade" | "drift";

interface CinematicLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  active?: boolean;
  reveal?: RevealStyle;
}

/** Editorial headline reveal */
export function CinematicLines({
  lines,
  className = "",
  lineClassName = "",
  stagger = 0.2,
  active = true,
  reveal = "drift",
}: CinematicLinesProps) {
  const reduceMotion = useReducedMotion();
  const headlineClassName = [lineClassName, "hero-headline-line"].filter(Boolean).join(" ");
  const fadeOnly = reveal === "fade";

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

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <div
          key={`${line}-${lineIndex}`}
          className={fadeOnly ? "hero-headline-line-slot w-full" : "w-full overflow-hidden"}
        >
          <motion.p
            className={headlineClassName}
            initial={{ opacity: 0, ...(fadeOnly ? {} : { y: 8 }) }}
            animate={
              active
                ? { opacity: 1, ...(fadeOnly ? {} : { y: 0 }) }
                : { opacity: 0, ...(fadeOnly ? {} : { y: -4 }) }
            }
            transition={{
              duration: active ? (fadeOnly ? 2.2 : 2.05) : 1.85,
              delay: active ? 0.2 + lineIndex * stagger : 0,
              ease: luxuryEase,
            }}
          >
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
  reveal = "drift",
}: CinematicParagraphProps) {
  const reduceMotion = useReducedMotion();
  const fadeOnly = reveal === "fade";

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, ...(fadeOnly ? {} : { y: 6 }) }}
      animate={
        active
          ? { opacity: 1, ...(fadeOnly ? {} : { y: 0 }) }
          : { opacity: 0, ...(fadeOnly ? {} : { y: -3 }) }
      }
      transition={{
        duration: active ? (fadeOnly ? 2.05 : 1.85) : 1.8,
        delay: active ? delay + 0.12 : 0,
        ease: luxuryEase,
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
          initial={{ opacity: 0, y: 6 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -3 }}
          transition={{
            duration: 1.2,
            delay: active ? 0.18 + i * 0.18 : 0,
            ease: luxuryEase,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
