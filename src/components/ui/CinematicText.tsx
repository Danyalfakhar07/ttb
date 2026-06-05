"use client";

import { BRAND_FULL, BRAND_FULL_WORDS } from "@/lib/brand";
import { motion, useReducedMotion } from "framer-motion";

const luxuryEase = [0.16, 1, 0.3, 1] as const;

interface CinematicLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  active?: boolean;
}

/** Editorial headline reveal — blur dissolve with soft drift */
export function CinematicLines({
  lines,
  className = "",
  lineClassName = "",
  stagger = 0.14,
  active = true,
}: CinematicLinesProps) {
  const reduceMotion = useReducedMotion();
  const headlineClassName = [lineClassName, "hero-headline-line"].filter(Boolean).join(" ");

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
        <div key={`${line}-${lineIndex}`} className="w-full overflow-hidden">
          <motion.p
            className={headlineClassName}
            initial={{ opacity: 0, filter: "blur(16px)", y: 12 }}
            animate={
              active
                ? { opacity: 1, filter: "blur(0px)", y: 0 }
                : { opacity: 0, filter: "blur(10px)", y: -8 }
            }
            transition={{
              duration: 1.35,
              delay: active ? 0.08 + lineIndex * stagger : 0,
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
      initial={{ opacity: 0, filter: "blur(14px)", y: 10 }}
      animate={
        active
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: "blur(8px)", y: -6 }
      }
      transition={{
        duration: 1.2,
        delay: active ? delay + 0.06 : 0,
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
          initial={{ opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          transition={{
            duration: 0.9,
            delay: active ? 0.12 + i * 0.14 : 0,
            ease: luxuryEase,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
