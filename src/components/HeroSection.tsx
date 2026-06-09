"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LuxuryButton } from "./ui/LuxuryButton";
import { CinematicLines, CinematicParagraph } from "./ui/CinematicText";

const luxuryEase = [0.22, 1, 0.36, 1] as const;

const SLIDES = [
  {
    id: 0,
    headlineLines: [
      "A New Generation of",
      "Controlled Plant Environments",
    ],
    desktopHeadlineLines: [
      "A New Generation of Controlled",
      "Plant Environments",
    ],
    subheadline:
      "Beautiful living ecosystems designed to support a wide range of plants in stable indoor conditions.",
    desktop: "/hero/hero-1-desktop.jpeg",
    mobile: "/hero/hero-1-mobile.jpeg",
    desktopFocus: "center center",
    desktopSide: "left",
  },
  {
    id: 1,
    headlineLines: [
      "Precision Climate",
      "For Living Interiors",
    ],
    desktopHeadlineLines: [
      "Precision Climate For Living",
      "Interiors",
    ],
    subheadline:
      "Precision climate stewardship for rare species, delicate growth, and enduring indoor vitality.",
    desktop: "/hero/hero-2-desktop.jpeg",
    mobile: "/hero/hero-2-mobile.jpeg",
    desktopFocus: "center center",
    desktopSide: "right",
  },
  {
    id: 2,
    headlineLines: [
      "Designed For Spaces",
      "That Breathe Life",
    ],
    desktopHeadlineLines: [
      "Designed For Spaces That",
      "Breathe Life",
    ],
    subheadline:
      "Crafted for collectors, hospitality, education, and spaces where living design defines the atmosphere.",
    desktop: "/hero/hero-3-desktop.jpeg",
    mobile: "/hero/hero-3-mobile.jpeg",
    desktopFocus: "center center",
    desktopSide: "left",
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
  "image-in": 3400,
  headline: 3200,
  subheadline: 2800,
  buttons: 2000,
  hold: 5000,
  transition: 3800,
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

  const copyActive = !productFocus;

  const atmosphereTransition = reduceMotion
    ? { duration: 0.25 }
    : { duration: 3.2, ease: luxuryEase };

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
      }, 9000);
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
      className="relative min-h-[100dvh] overflow-hidden bg-black [backface-visibility:hidden]"
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

      <HeroAtmosphere
        copyActive={copyActive}
        transition={atmosphereTransition}
        isDesktop={isDesktop}
      />

      {/* Mobile — top copy / product / bottom CTAs */}
      <div className="pointer-events-none relative z-10 min-h-[100dvh] grid grid-rows-[auto_1fr_auto] md:hidden">
        <HeroCopyBlock
          slide={slide}
          slideIndex={slideIndex}
          headlineVisible={headlineVisible}
          subVisible={subVisible}
          lines={[...slide.headlineLines]}
          reveal="drift"
          headlineClassName={`hero-headline hero-headline-primary text-white${slideIndex === 0 ? " hero-headline-compact" : ""}`}
          subClassName={`hero-subhead text-balance${slideIndex === 0 ? " hero-subhead-compact" : ""}`}
          topPadding="max-md"
        />
        <div aria-hidden className="min-h-[28vh] sm:min-h-[32vh]" />
        <div className="hero-copy-bottom pointer-events-auto flex w-full flex-col items-center px-4 pb-[max(2.25rem,env(safe-area-inset-bottom))] sm:px-6">
          <HeroCtaButtons
            visible={buttonsVisible}
            slideKey={slideIndex}
            onWatchFilm={onWatchFilm}
            onRegister={onRegister}
          />
        </div>
      </div>

      {/* Desktop — side column: headline → sub → buttons */}
      {(headlineVisible || subVisible || buttonsVisible) && (
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:grid md:grid-cols-12 md:items-center md:px-12 lg:px-16 xl:px-20">
          <div
            className={
              slide.desktopSide === "left"
                ? "pointer-events-auto col-span-5 col-start-1 xl:col-span-4"
                : "pointer-events-auto col-span-5 col-start-8 xl:col-span-4 xl:col-start-9"
            }
          >
            <HeroCopyBlock
              slide={slide}
              slideIndex={slideIndex}
              headlineVisible={headlineVisible}
              subVisible={subVisible}
              buttonsVisible={buttonsVisible}
              lines={[...slide.desktopHeadlineLines]}
              reveal="fade"
              headlineClassName="hero-headline hero-headline-primary hero-headline-desktop text-white"
              subClassName="hero-subhead hero-subhead-desktop text-balance"
              onWatchFilm={onWatchFilm}
              onRegister={onRegister}
              topPadding="desktop"
              align="side"
            />
          </div>
        </div>
      )}

      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:hidden"
        animate={{ opacity: buttonsVisible ? 0.35 : 0.1 }}
        transition={{ duration: 1.6, ease: luxuryEase }}
      >
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-white/0 via-white/40 to-white/0"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

function HeroCopyBlock({
  slide,
  slideIndex,
  headlineVisible,
  subVisible,
  lines,
  reveal,
  headlineClassName,
  subClassName,
  topPadding,
  align,
  buttonsVisible,
  onWatchFilm,
  onRegister,
}: {
  slide: (typeof SLIDES)[number];
  slideIndex: number;
  headlineVisible: boolean;
  subVisible: boolean;
  lines: string[];
  reveal: "fade" | "drift";
  headlineClassName: string;
  subClassName: string;
  topPadding: "max-md" | "desktop";
  align?: "side";
  buttonsVisible?: boolean;
  onWatchFilm?: () => void;
  onRegister?: () => void;
}) {
  const isDesktopStack = topPadding === "desktop";
  const isSideLayout = isDesktopStack && align === "side";
  const stagger = isDesktopStack ? 0.34 : 0.26;

  return (
    <div
      className={
        isSideLayout
          ? "hero-desktop-stack hero-desktop-side pointer-events-auto w-full"
          : isDesktopStack
            ? "hero-desktop-stack pointer-events-auto w-full max-w-[1120px]"
            : "hero-copy-top pointer-events-auto flex w-full flex-col items-center text-center px-4 pt-[max(5.25rem,calc(env(safe-area-inset-top)+4.75rem))] sm:px-6"
      }
    >
      <div
        className={
          isSideLayout
            ? "hero-desktop-headline-slot flex w-full flex-col items-start"
            : isDesktopStack
              ? "hero-desktop-headline-slot flex w-full flex-col items-center"
              : "mx-auto w-full max-w-[920px] text-center"
        }
      >
        <AnimatePresence mode="sync">
          {headlineVisible && (
            <motion.div
              key={`headline-${slideIndex}-${topPadding}`}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isDesktopStack ? 1.65 : 1.45, ease: luxuryEase }}
            >
              <CinematicLines
                lines={lines}
                active
                stagger={stagger}
                reveal={reveal}
                className="hero-headline-stack"
                lineClassName={headlineClassName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={
          isSideLayout
            ? "hero-desktop-sub-slot mt-5 w-full max-w-[34ch] text-left"
            : isDesktopStack
              ? "hero-desktop-sub-slot mt-4 w-full max-w-[580px] text-center"
              : "mx-auto mt-4 w-full max-w-[560px] text-center"
        }
      >
        <AnimatePresence mode="sync">
          {subVisible && (
            <motion.div
              key={`sub-${slideIndex}-${topPadding}`}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isDesktopStack ? 1.7 : 1.35, ease: luxuryEase }}
            >
              <CinematicParagraph
                text={slide.subheadline}
                active={subVisible}
                delay={isDesktopStack ? 0.28 : 0.2}
                reveal={reveal}
                className={subClassName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isDesktopStack && onWatchFilm && onRegister && (
        <div
          className={`${isSideLayout ? "mt-7" : "mt-6"} w-full ${buttonsVisible ? "hero-desktop-cta-slot" : ""} ${isSideLayout ? "flex justify-start" : ""}`}
        >
          <HeroCtaButtons
            visible={!!buttonsVisible}
            slideKey={slideIndex}
            onWatchFilm={onWatchFilm}
            onRegister={onRegister}
            alignStart={isSideLayout}
          />
        </div>
      )}
    </div>
  );
}

function HeroCtaButtons({
  visible,
  slideKey,
  onWatchFilm,
  onRegister,
  alignStart = false,
}: {
  visible: boolean;
  slideKey: number;
  onWatchFilm: () => void;
  onRegister: () => void;
  alignStart?: boolean;
}) {
  return (
    <div
      className={`relative flex min-h-[5.5rem] w-full sm:min-h-[4.5rem] ${alignStart ? "items-center justify-start" : "items-center justify-center"}`}
    >
      <motion.div
        aria-hidden={!visible}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.55, ease: luxuryEase }}
      >
        <div className="h-20 w-[min(92%,340px)] rounded-full bg-white/[0.03] blur-2xl sm:h-14 sm:w-[min(80%,480px)]" />
      </motion.div>

      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={`cta-${slideKey}`}
            className={`relative z-[1] flex flex-col gap-3 sm:flex-row sm:gap-4 ${alignStart ? "items-start" : "items-center"}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.15 },
              },
              exit: {
                opacity: 0,
                transition: { duration: 1.1, ease: luxuryEase },
              },
            }}
          >
            <motion.div
              className="inline-flex w-auto max-w-full"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 1.5, ease: luxuryEase },
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 1, ease: luxuryEase },
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
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 1.5, ease: luxuryEase },
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 1, ease: luxuryEase },
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
  copyActive,
  transition,
  isDesktop,
}: {
  copyActive: boolean;
  transition: { duration: number; ease?: readonly [number, number, number, number] };
  isDesktop: boolean;
}) {
  if (isDesktop) {
    const edgeOpacity = copyActive ? 0.55 : 0.28;

    return (
      <div className="pointer-events-none absolute inset-0 z-[1] [transform:translateZ(0)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_50%,transparent_35%,rgba(0,0,0,0.24)_100%)]" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,0,0,0.2)_0%,transparent_70%)]"
          initial={false}
          animate={{ opacity: edgeOpacity }}
          transition={transition}
        />
      </div>
    );
  }

  const topOpacity = copyActive ? 0.92 : 0.35;
  const bottomOpacity = copyActive ? 0.88 : 0.3;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] [transform:translateZ(0)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_52%,transparent_35%,rgba(0,0,0,0.18)_100%)]" />

      <motion.div
        className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        initial={false}
        animate={{ opacity: topOpacity }}
        transition={transition}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/65 via-black/28 to-transparent"
        initial={false}
        animate={{ opacity: bottomOpacity }}
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
  const duration = reduceMotion ? 0.6 : 3.8;
  const crossfadeEase = luxuryEase;

  return (
    <motion.div
      className="absolute inset-0 [transform:translateZ(0)]"
      initial={false}
      animate={{
        opacity: active ? 1 : exiting ? 0 : 0,
        zIndex: active ? 2 : exiting ? 1 : 0,
      }}
      transition={{
        opacity: { duration, ease: crossfadeEase },
      }}
    >
      <div className="absolute inset-[-3%] md:inset-0 [transform:translateZ(0)]">
        <div className="absolute inset-0 md:hidden">
          <Image
            src={slide.mobile}
            alt=""
            fill
            priority={priority}
            className="hero-image-mobile object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={slide.desktop}
            alt=""
            fill
            priority={priority}
            className="hero-image-desktop object-cover"
            style={{ objectPosition: slide.desktopFocus }}
            sizes="100vw"
          />
        </div>
      </div>

      <AnimatePresence>
        {active && showcase && (
          <motion.div
            key={`sweep-${slide.id}`}
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: ["-100%", "120%"], opacity: [0, 0.22, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              x: { duration: 2.8, ease: crossfadeEase, delay: 0.35 },
              opacity: { duration: 1.2, ease: crossfadeEase },
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
