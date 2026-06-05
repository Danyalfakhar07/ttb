"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LuxuryButton } from "./ui/LuxuryButton";
import { CinematicLines, CinematicParagraph } from "./ui/CinematicText";

const luxuryEase = [0.16, 1, 0.3, 1] as const;

const SLIDES = [
  {
    id: 0,
    headlineLines: [
      "A New Generation of",
      "Controlled Plant Environments",
    ],
    subheadline:
      "Beautiful living ecosystems designed to support a wide range of plants in stable indoor conditions.",
    desktop: "/hero/hero-1-desktop.jpeg",
    mobile: "/hero/hero-1-mobile.jpeg",
  },
  {
    id: 1,
    headlineLines: [
      "Precision Climate",
      "For Living Interiors",
    ],
    subheadline:
      "Precision climate stewardship for rare species, delicate growth, and enduring indoor vitality.",
    desktop: "/hero/hero-2-desktop.jpeg",
    mobile: "/hero/hero-2-mobile.jpeg",
  },
  {
    id: 2,
    headlineLines: [
      "Designed For Spaces",
      "That Breathe Life",
    ],
    subheadline:
      "Crafted for collectors, hospitality, education, and spaces where living design defines the atmosphere.",
    desktop: "/hero/hero-3-desktop.jpeg",
    mobile: "/hero/hero-3-mobile.jpeg",
  },
] as const;

type HeroPhase =
  | "image-in"
  | "headline"
  | "subheadline"
  | "buttons"
  | "hold"
  | "transition";

const PHASE_ORDER: HeroPhase[] = [
  "image-in",
  "headline",
  "subheadline",
  "buttons",
  "hold",
  "transition",
];

const PHASE_DURATION: Record<HeroPhase, number> = {
  "image-in": 2000,
  headline: 2000,
  subheadline: 1500,
  buttons: 1100,
  hold: 4200,
  transition: 2800,
};

interface HeroSectionProps {
  ready?: boolean;
  onWatchFilm: () => void;
  onRegister: () => void;
}

export function HeroSection({
  ready = true,
  onWatchFilm,
  onRegister,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [slideIndex, setSlideIndex] = useState(0);
  const [phase, setPhase] = useState<HeroPhase>("image-in");
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const slide = SLIDES[slideIndex];
  const transitioning = phase === "transition";
  const productFocus =
    !ready ||
    (!reduceMotion && (transitioning || phase === "image-in"));

  const dimLevel = useMemo(() => {
    // Keep a baseline dim at all times so we never flash from fully clear to dark.
    if (!ready) return 0.1;
    if (productFocus) return 0.06;
    let level = phase === "buttons" || phase === "hold" ? 0.24 : 0.16;
    if (slideIndex === 1 && isDesktop) {
      level += phase === "buttons" || phase === "hold" ? 0.08 : 0.05;
    }
    return Math.min(level, 0.34);
  }, [ready, productFocus, phase, slideIndex, isDesktop]);

  const atmosphereTransition = reduceMotion
    ? { duration: 0.2 }
    : { duration: 2.4, ease: luxuryEase };

  const headlineVisible =
    ready &&
    !productFocus &&
    (reduceMotion || ["headline", "subheadline", "buttons", "hold"].includes(phase));

  const subVisible =
    ready &&
    !productFocus &&
    (reduceMotion || ["subheadline", "buttons", "hold"].includes(phase));

  const buttonsVisible =
    ready &&
    !productFocus &&
    (reduceMotion || ["buttons", "hold"].includes(phase));

  /** Shift copy down when lower rows are empty so headline sits on image center */
  const copyStackOffset = useMemo(() => {
    if (buttonsVisible) return 0;
    if (subVisible) return 26;
    if (headlineVisible) return 52;
    return 0;
  }, [buttonsVisible, subVisible, headlineVisible]);

  useEffect(() => {
    if (!ready) {
      setPhase("image-in");
      setHasStarted(false);
      return;
    }

    if (!hasStarted) {
      setHasStarted(true);
      setPhase("image-in");
    }
  }, [ready, hasStarted]);

  useEffect(() => {
    if (!ready || !hasStarted) return;

    if (reduceMotion) {
      const loop = setInterval(() => {
        setPrevSlideIndex(slideIndex);
        setSlideIndex((i) => (i + 1) % SLIDES.length);
      }, 7000);
      return () => clearInterval(loop);
    }

    const duration = PHASE_DURATION[phase];

    const t = setTimeout(() => {
      const idx = PHASE_ORDER.indexOf(phase);
      const next = PHASE_ORDER[idx + 1];

      if (phase === "transition") {
        setPrevSlideIndex(slideIndex);
        setSlideIndex((i) => (i + 1) % SLIDES.length);
        setPhase("image-in");
        return;
      }

      setPhase(next ?? "image-in");
    }, duration);

    return () => clearTimeout(t);
  }, [phase, reduceMotion, ready, hasStarted, slideIndex]);

  return (
    <section
      id="overview"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black [backface-visibility:hidden]"
    >
      <div className="pointer-events-none absolute inset-0">
        {SLIDES.map((s, i) => (
          <HeroImageLayer
            key={s.id}
            slide={s}
            active={i === slideIndex}
            exiting={transitioning && i === prevSlideIndex && i !== slideIndex}
            reduceMotion={!!reduceMotion}
            priority={i === 0}
            showcase={productFocus && i === slideIndex}
          />
        ))}
      </div>

      <HeroAtmosphere dimLevel={dimLevel} transition={atmosphereTransition} />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-3 sm:px-6">
        <motion.div
          className="hero-copy-stage pointer-events-auto flex w-full max-w-[920px] flex-col items-center justify-center text-center"
          animate={{ y: copyStackOffset }}
          transition={{ duration: 2.2, ease: luxuryEase }}
        >
          <div className="flex min-h-[clamp(5.5rem,24vw,9.5rem)] w-full items-center justify-center">
            {headlineVisible && (
              <div key={`headline-${slideIndex}`} className="w-full">
                <CinematicLines
                  lines={[...slide.headlineLines]}
                  active
                  stagger={0.16}
                  className="hero-headline-stack"
                  lineClassName="hero-headline hero-headline-primary text-white"
                />
              </div>
            )}
          </div>

          <div className="flex min-h-[clamp(4.25rem,18vw,6.5rem)] w-full max-w-[600px] items-center justify-center px-0 sm:px-1">
            {subVisible && (
              <div key={`sub-${slideIndex}`} className="w-full">
                <CinematicParagraph
                  text={slide.subheadline}
                  active={subVisible}
                  delay={0.1}
                  className="hero-subhead text-balance max-md:px-1"
                />
              </div>
            )}
          </div>

          <div className="relative flex h-[8.25rem] w-full items-center justify-center sm:h-[5.75rem]">
            <motion.div
              className="absolute top-0 left-1/2 h-px w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                scaleX: buttonsVisible ? 1 : 0.4,
                opacity: buttonsVisible ? 0.5 : 0,
              }}
              transition={{ duration: 0.9, ease: luxuryEase }}
            />
            <HeroCtaButtons
              visible={buttonsVisible}
              slideKey={slideIndex}
              onWatchFilm={onWatchFilm}
              onRegister={onRegister}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ opacity: buttonsVisible ? 0.4 : 0.12 }}
        transition={{ duration: 1, ease: luxuryEase }}
      >
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-white/0 via-white/45 to-white/0"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

function HeroCtaButtons({
  visible,
  slideKey,
  onWatchFilm,
  onRegister,
}: {
  visible: boolean;
  slideKey: number;
  onWatchFilm: () => void;
  onRegister: () => void;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center pt-4">
      <motion.div
        aria-hidden={!visible}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.85,
        }}
        transition={{ duration: 0.85, ease: luxuryEase }}
      >
        <div className="h-24 w-[min(92%,340px)] rounded-full bg-white/[0.04] blur-2xl sm:h-16 sm:w-[min(80%,480px)]" />
      </motion.div>

      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={`cta-${slideKey}`}
            className="relative z-[1] flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.05 },
              },
              exit: {
                opacity: 0,
                transition: { duration: 0.5, ease: luxuryEase },
              },
            }}
          >
            <motion.div
              className="inline-flex w-auto max-w-full"
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.85, ease: luxuryEase },
                },
                exit: {
                  opacity: 0,
                  scale: 0.94,
                  transition: { duration: 0.45, ease: luxuryEase },
                },
              }}
            >
              <LuxuryButton cinematic onClick={onWatchFilm}>
                <PlayIcon />
                Watch Film
              </LuxuryButton>
            </motion.div>
            <motion.div
              className="inline-flex w-auto max-w-full"
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.85, ease: luxuryEase },
                },
                exit: {
                  opacity: 0,
                  scale: 0.94,
                  transition: { duration: 0.45, ease: luxuryEase },
                },
              }}
            >
              <LuxuryButton cinematic variant="secondary" onClick={onRegister}>
                Register Interest
              </LuxuryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroAtmosphere({
  dimLevel,
  transition,
}: {
  dimLevel: number;
  transition: { duration: number; ease?: readonly [number, number, number, number] };
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] [transform:translateZ(0)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_50%,transparent_42%,rgba(0,0,0,0.22)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_48%,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.42)_100%)]"
        initial={false}
        animate={{ opacity: dimLevel }}
        transition={transition}
      />
    </div>
  );
}

function HeroImageLayer({
  slide,
  active,
  exiting,
  reduceMotion,
  priority,
  showcase,
}: {
  slide: (typeof SLIDES)[number];
  active: boolean;
  exiting: boolean;
  reduceMotion: boolean;
  priority: boolean;
  showcase: boolean;
}) {
  const duration = reduceMotion ? 0.5 : 2.8;
  const crossfadeEase = luxuryEase;

  return (
    <motion.div
      className="absolute inset-0 [transform:translateZ(0)]"
      initial={false}
      animate={{
        opacity: active ? 1 : exiting ? 0 : 0,
        scale: active ? 1 : exiting ? 1.02 : 1.04,
        zIndex: active ? 2 : exiting ? 1 : 0,
      }}
      transition={{
        opacity: { duration, ease: crossfadeEase },
        scale: { duration, ease: crossfadeEase },
      }}
    >
      <motion.div
        className="absolute inset-[-4%] [transform:translateZ(0)]"
        animate={
          active && !reduceMotion
            ? { scale: [1.06, 1, 1.04], x: [0, "-0.5%", 0], y: [0, "-0.3%", 0] }
            : { scale: 1.04, x: 0, y: 0 }
        }
        transition={
          active && !reduceMotion
            ? { duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            : { duration: 0.6, ease: crossfadeEase }
        }
      >
        <div className="absolute inset-0 md:hidden">
          <Image
            src={slide.mobile}
            alt=""
            fill
            priority={priority}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={slide.desktop}
            alt=""
            fill
            priority={priority}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {active && showcase && (
          <motion.div
            key={`sweep-${slide.id}`}
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: ["-100%", "120%"], opacity: [0, 0.28, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              x: { duration: 2.2, ease: crossfadeEase, delay: 0.2 },
              opacity: { duration: 0.8, ease: crossfadeEase },
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PlayIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="currentColor"
      aria-hidden
      className="block shrink-0"
    >
      <path d="M0 0L10 6L0 12V0Z" />
    </svg>
  );
}
