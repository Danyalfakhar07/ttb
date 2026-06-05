"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type LuxuryButtonVariant = "primary" | "secondary" | "ghost";

interface LuxuryButtonProps extends HTMLMotionProps<"button"> {
  variant?: LuxuryButtonVariant;
  selected?: boolean;
  /** Subtle entrance glow + idle shimmer for hero CTAs */
  cinematic?: boolean;
}

const variantStyles: Record<LuxuryButtonVariant, string> = {
  primary:
    "bg-white/[0.12] border-white/20 text-white hover:bg-white/[0.18] hover:border-white/30",
  secondary:
    "bg-transparent border-white/15 text-white/90 hover:bg-white/[0.06] hover:border-white/25",
  ghost:
    "bg-transparent border-transparent text-white/70 hover:text-white hover:bg-white/[0.04]",
};

export const LuxuryButton = forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  function LuxuryButton(
    {
      variant = "primary",
      selected,
      cinematic = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) {
    return (
      <motion.button
        ref={ref}
        whileHover={{
          y: -3,
          scale: 1.03,
          boxShadow: "0 12px 40px -10px rgba(255,255,255,0.22)",
        }}
        whileTap={{ scale: 0.96, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "relative inline-flex flex-row flex-nowrap items-center justify-center gap-2.5 overflow-hidden rounded-full border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] whitespace-nowrap",
          "transition-[background,border-color] duration-500",
          "shadow-[0_0_0_0_rgba(255,255,255,0)]",
          variantStyles[variant],
          selected &&
            "border-white/40 bg-white/[0.14] shadow-[0_0_40px_-12px_rgba(255,255,255,0.25)]",
          cinematic && "luxury-btn-cinematic",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {cinematic && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: ["-120%", "140%"] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}
        <span className="relative z-[1] inline-flex flex-row flex-nowrap items-center justify-center gap-2.5">
          {children as ReactNode}
        </span>
      </motion.button>
    );
  },
);
