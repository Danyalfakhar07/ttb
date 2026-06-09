"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LuxuryButton } from "./ui/LuxuryButton";
import {
  CinematicLines,
  CinematicParagraph,
  TEXT_FADE_DURATION,
} from "./ui/CinematicText";

const luxuryEase = [0.22, 1, 0.36, 1] as const;
const IMAGE_FADE_IN = 4.2;
const IMAGE_FADE_OUT = 4.8;
const INITIAL_REVEAL_DURATION = 2.8;

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
    desktopLayout: "side",
    desktopSide: "left",
  },
  {
    id: 1,
    headlineLines: [
      "Precision Climate",
      "For Living Interiors",
    ],
    desktopHeadlineLines: [
      "Precision Climate For Living Interiors",
    ],
    subheadline:
      "Precision climate stewardship for rare species, delicate growth, and enduring indoor vitality.",
    desktop: "/hero/hero-2-desktop.jpeg",
    mobile: "/hero/hero-2-mobile.jpeg",
    desktopFocus: "center 46%",
    desktopLayout: "wide",
  },
  {
    id: 2,
    headlineLines: [
      "Designed For Spaces",
      "That Breathe Life",
    ],
    desktopHeadlineLines: [
      "Designed For Spaces That Breathe Life",
    ],
    subheadline:
      "Crafted for collectors, hospitality, education, and spaces where living design defines the atmosphere.",
    desktop: "/hero/hero-3-desktop.jpeg",
    mobile: "/hero/hero-3-mobile.jpeg",
    desktopFocus: "center 48%",
    desktopLayout: "wide",
  },
] as const;

const DESKTOP_TEXT_PHASES: HeroPhase[] = [
  "headline",
  "subheadline",
  "buttons",
  "hold",
  "copy-out",
];

const DESKTOP_BUTTONS_PHASES: HeroPhase[] = ["buttons", "hold", "copy-out"];

const DESKTOP_SIDE_PHASES: HeroPhase[] = [...DESKTOP_TEXT_PHASES];

type HeroPhase =
  | "image-in"
  | "headline"
  | "subheadline"
  | "buttons"
  | "hold"
  | "copy-out"
  | "buttons-out"
  | "transition";

const PHASE_ORDER: HeroPhase[] = [
  "image-in",
  "headline",
  "subheadline",
  "buttons",
  "hold",
  "copy-out",
  "transition",
];

const PHASE_DURATION: Record<HeroPhase, number> = {
  "image-in": 800,
  headline: 3200,
  subheadline: 2800,
  buttons: 2000,
  hold: 5000,
  "copy-out": 3000,
  "buttons-out": 0,
  transition: 5200,
};

interface HeroSectionProps {
  imageReady?: boolean;
  copyReady?: boolean;
  onWatchFilm: () => void;
  onRegister: () => void;
}

export function HeroSection({
  imageReady = true,
  copyReady = true,
  onWatchFilm,
  onRegister,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [slideIndex, setSlideIndex] = useState(0);
  const [phase, setPhase] = useState<HeroPhase>("image-in");
  const [hasStarted, setHasStarted] = useState(false);
  const [revealAnimDone, setRevealAnimDone] = useState(false);
  const initialRevealDoneRef = useRef(false);

  const slide = SLIDES[slideIndex];
  const nextSlideIndex = (slideIndex + 1) % SLIDES.length;
  const transitioning = phase === "transition";
  const isInitialReveal = phase === "image-in" && !initialRevealDoneRef.current;
  const textExiting = phase === "copy-out";
  const buttonsExiting = phase === "copy-out";
  const productFocus = !imageReady || (!reduceMotion && transitioning);

  const copyActive =
    copyReady &&
    !transitioning &&
    !textExiting &&
    !buttonsExiting &&
    phase !== "image-in";

  const atmosphereTransition = reduceMotion
    ? { duration: 0.25 }
    : { duration: 3.2, ease: luxuryEase };

  const headlineVisible =
    copyReady &&
    !productFocus &&
    (reduceMotion ||
      ["headline", "subheadline", "buttons", "hold", "copy-out"].includes(phase));

  const subVisible =
    copyReady &&
    !productFocus &&
    (reduceMotion ||
      ["subheadline", "buttons", "hold", "copy-out"].includes(phase));

  const buttonsVisible =
    copyReady &&
    !productFocus &&
    (reduceMotion || ["buttons", "hold", "copy-out"].includes(phase));

  const desktopSideMounted =
    copyReady &&
    isDesktop &&
    (reduceMotion
      ? headlineVisible || subVisible || buttonsVisible
      : DESKTOP_SIDE_PHASES.includes(phase));

  const desktopWideTopMounted =
    copyReady && isDesktop && DESKTOP_TEXT_PHASES.includes(phase);

  const desktopWideBottomMounted =
    copyReady && isDesktop && DESKTOP_BUTTONS_PHASES.includes(phase);

  const desktopHeadlineShown =
    copyReady &&
    (reduceMotion ? headlineVisible : DESKTOP_TEXT_PHASES.includes(phase));

  const desktopSubShown =
    copyReady &&
    (reduceMotion
      ? subVisible
      : ["subheadline", "buttons", "hold", "copy-out"].includes(phase));

  const desktopButtonsShown =
    copyReady &&
    (reduceMotion ? buttonsVisible : DESKTOP_BUTTONS_PHASES.includes(phase));

  useEffect(() => {
    if (!imageReady) {
      setPhase("image-in");
      setHasStarted(false);
      setRevealAnimDone(false);
      initialRevealDoneRef.current = false;
      return;
    }

    if (!hasStarted) {
      setHasStarted(true);
      setPhase("image-in");
    }
  }, [imageReady, hasStarted]);

  useEffect(() => {
    if (!imageReady || revealAnimDone) return;

    const t = setTimeout(
      () => setRevealAnimDone(true),
      INITIAL_REVEAL_DURATION * 1000,
    );
    return () => clearTimeout(t);
  }, [imageReady, revealAnimDone]);

  useEffect(() => {
    if (!imageReady || !hasStarted) return;

    if (reduceMotion) {
      if (!copyReady) return;
      const loop = setInterval(() => {
        setSlideIndex((i) => (i + 1) % SLIDES.length);
      }, 9000);
      return () => clearInterval(loop);
    }

    let duration = PHASE_DURATION[phase];

    if (phase === "image-in" && isInitialReveal && slideIndex === 0) {
      duration =
        copyReady && revealAnimDone ? 80 : 120;
    }

    const t = setTimeout(() => {
      if (phase === "image-in" && (!copyReady || !revealAnimDone)) return;

      const idx = PHASE_ORDER.indexOf(phase);
      const next = PHASE_ORDER[idx + 1];

      if (phase === "transition") {
        setSlideIndex((i) => (i + 1) % SLIDES.length);
        setPhase("image-in");
        return;
      }

      if (phase === "image-in" && !initialRevealDoneRef.current) {
        initialRevealDoneRef.current = true;
      }

      setPhase(next ?? "image-in");
    }, duration);

    return () => clearTimeout(t);
  }, [
    phase,
    reduceMotion,
    imageReady,
    copyReady,
    hasStarted,
    slideIndex,
    isInitialReveal,
    revealAnimDone,
  ]);

  if (!imageReady) {
    return (
      <section
        id="overview"
        className="relative min-h-[100dvh] overflow-hidden bg-black"
      />
    );
  }

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
            active={!transitioning && i === slideIndex}
            entering={transitioning && i === nextSlideIndex}
            exiting={transitioning && i === slideIndex}
            revealing={isInitialReveal && i === slideIndex && !transitioning}
            reduceMotion={!!reduceMotion}
            priority={i === 0}
          />
        ))}
      </div>

      {isInitialReveal && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[4] bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: INITIAL_REVEAL_DURATION, ease: luxuryEase }}
        />
      )}

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
          textExiting={textExiting}
          lines={[...slide.headlineLines]}
          headlineClassName={`hero-headline hero-headline-primary text-white${slideIndex === 0 ? " hero-headline-compact" : ""}`}
          subClassName={`hero-subhead text-balance${slideIndex === 0 ? " hero-subhead-compact" : ""}`}
          topPadding="max-md"
        />
        <div aria-hidden className="min-h-[28vh] sm:min-h-[32vh]" />
        <div className="hero-copy-bottom pointer-events-auto flex w-full flex-col items-center px-4 pb-[max(2.25rem,env(safe-area-inset-bottom))] sm:px-6">
          <HeroCtaButtons
            visible={buttonsVisible}
            fadingOut={buttonsExiting}
            slideKey={slideIndex}
            onWatchFilm={onWatchFilm}
            onRegister={onRegister}
          />
        </div>
      </div>

      {/* Desktop — slide 1: side column | slides 2–3: top headline + bottom CTAs */}
      {desktopSideMounted && slide.desktopLayout === "side" && (
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:grid md:grid-cols-12 md:items-center md:px-12 lg:px-16 xl:px-20">
          <div className="pointer-events-auto col-span-5 col-start-1 xl:col-span-4">
            <HeroCopyBlock
              slide={slide}
              slideIndex={slideIndex}
              headlineVisible={desktopHeadlineShown}
              subVisible={desktopSubShown}
              buttonsVisible={desktopButtonsShown}
              textExiting={textExiting}
              buttonsExiting={buttonsExiting}
              lines={[...slide.desktopHeadlineLines]}
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

      {desktopWideTopMounted && slide.desktopLayout === "wide" && (
        <div className="pointer-events-none absolute inset-0 z-10 hidden min-h-[100dvh] md:grid md:grid-rows-[auto_1fr_auto]">
          <div className="hero-desktop-wide-top pointer-events-auto flex w-full flex-col items-center px-8 pt-[max(6.25rem,12.5vh)] text-center lg:px-12">
            <HeroCopyBlock
              slide={slide}
              slideIndex={slideIndex}
              headlineVisible={desktopHeadlineShown}
              subVisible={desktopSubShown}
              textExiting={textExiting}
              lines={[...slide.desktopHeadlineLines]}
              headlineClassName="hero-headline hero-headline-primary hero-headline-desktop hero-headline-desktop-wide text-white"
              subClassName="hero-subhead hero-subhead-desktop-wide"
              topPadding="desktop"
              align="wide"
            />
          </div>
          <div aria-hidden />
          {desktopWideBottomMounted && (
            <div className="hero-desktop-wide-bottom pointer-events-auto flex items-center justify-center px-8 pb-10 lg:px-12">
              <HeroCtaButtons
                visible={desktopButtonsShown}
                fadingOut={buttonsExiting}
                slideKey={slideIndex}
                onWatchFilm={onWatchFilm}
                onRegister={onRegister}
              />
            </div>
          )}
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
  headlineClassName,
  subClassName,
  topPadding,
  align,
  textExiting = false,
  buttonsExiting = false,
  buttonsVisible,
  onWatchFilm,
  onRegister,
}: {
  slide: (typeof SLIDES)[number];
  slideIndex: number;
  headlineVisible: boolean;
  subVisible: boolean;
  lines: string[];
  headlineClassName: string;
  subClassName: string;
  topPadding: "max-md" | "desktop";
  align?: "side" | "wide";
  textExiting?: boolean;
  buttonsExiting?: boolean;
  buttonsVisible?: boolean;
  onWatchFilm?: () => void;
  onRegister?: () => void;
}) {
  const isDesktopStack = topPadding === "desktop";
  const isSideLayout = isDesktopStack && align === "side";
  const isWideLayout = isDesktopStack && align === "wide";
  const fixedStack = isSideLayout || !isDesktopStack || isWideLayout;
  const stagger = isWideLayout ? 0.1 : isDesktopStack ? 0.14 : 0.12;
  const headlineShown = headlineVisible;
  const subShown = subVisible;
  const headlineActive = headlineVisible && !textExiting && !buttonsExiting;
  const subActive = subVisible && !textExiting && !buttonsExiting;
  const subMounted = fixedStack ? headlineShown : subShown;

  return (
    <div
      className={
        isSideLayout
          ? "hero-desktop-stack hero-desktop-side hero-fixed-stack pointer-events-auto w-full"
          : isWideLayout
            ? "hero-desktop-stack hero-desktop-wide pointer-events-auto w-full max-w-[920px]"
            : isDesktopStack
              ? "hero-desktop-stack pointer-events-auto w-full max-w-[1120px]"
              : `hero-copy-top pointer-events-auto flex w-full flex-col items-center text-center px-4 pt-[max(5.25rem,calc(env(safe-area-inset-top)+4.75rem))] sm:px-6${fixedStack ? " hero-fixed-stack" : ""}`
      }
    >
      <div
        className={
          isSideLayout
            ? "hero-desktop-headline-slot flex w-full flex-col items-start"
            : isWideLayout
              ? "flex w-full flex-col items-center"
              : isDesktopStack
                ? "hero-desktop-headline-slot flex w-full flex-col items-center"
                : "mx-auto w-full max-w-[920px] text-center"
        }
      >
        {headlineShown && (
          <CinematicLines
            key={`headline-${slideIndex}-${topPadding}`}
            lines={lines}
            active={headlineActive}
            stagger={stagger}
            anchored={lines.length > 1}
            className="hero-headline-stack"
            lineClassName={headlineClassName}
          />
        )}
      </div>

      <div
        className={
          isSideLayout
            ? "hero-fixed-sub-slot hero-desktop-sub-slot mt-5 w-full max-w-[34ch] text-left"
            : isWideLayout
              ? "mx-auto mt-4 flex w-full max-w-[50ch] flex-col items-center text-center"
              : isDesktopStack
                ? "hero-desktop-sub-slot mt-4 w-full max-w-[580px] text-center"
                : fixedStack
                  ? "hero-fixed-sub-slot mx-auto mt-4 w-full max-w-[560px] text-center"
                  : "mx-auto mt-4 w-full max-w-[560px] text-center"
        }
      >
        {subMounted && (
          <CinematicParagraph
            key={`sub-${slideIndex}-${topPadding}`}
            text={slide.subheadline}
            active={subActive}
            delay={0}
            className={subClassName}
          />
        )}
      </div>

      {isSideLayout && onWatchFilm && onRegister && (
        <div className="hero-fixed-cta-slot mt-7 flex w-full justify-start">
          <HeroCtaButtons
            visible={!!buttonsVisible}
            fadingOut={buttonsExiting}
            slideKey={slideIndex}
            onWatchFilm={onWatchFilm}
            onRegister={onRegister}
            alignStart={isSideLayout}
            fixedSlot
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
  fadingOut = false,
  fixedSlot = false,
}: {
  visible: boolean;
  slideKey: number;
  onWatchFilm: () => void;
  onRegister: () => void;
  alignStart?: boolean;
  fadingOut?: boolean;
  fixedSlot?: boolean;
}) {
  const show = visible && !fadingOut;
  const ctaTransition = { duration: TEXT_FADE_DURATION, ease: luxuryEase };

  return (
    <div
      className={`relative flex min-h-[5.5rem] w-full sm:min-h-[4.5rem] ${alignStart ? "items-center justify-start" : "items-center justify-center"}`}
    >
      <motion.div
        aria-hidden={!show}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={ctaTransition}
      >
        <div className="h-20 w-[min(92%,340px)] rounded-full bg-white/[0.03] blur-2xl sm:h-14 sm:w-[min(80%,480px)]" />
      </motion.div>

      <motion.div
        key={`cta-${slideKey}`}
        className={`relative z-[1] flex flex-col gap-3 sm:flex-row sm:gap-4 ${alignStart ? "items-start" : "items-center"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={ctaTransition}
        style={{ pointerEvents: show ? "auto" : "none" }}
      >
        <div className="inline-flex w-auto max-w-full">
          <LuxuryButton cinematic onClick={onWatchFilm}>
            <PlayIcon />
            Watch Film
          </LuxuryButton>
        </div>
        <div className="inline-flex w-auto max-w-full">
          <LuxuryButton cinematic variant="secondary" onClick={onRegister}>
            Register Interest
          </LuxuryButton>
        </div>
      </motion.div>
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
  entering,
  exiting,
  revealing,
  reduceMotion,
  priority,
}: {
  slide: (typeof SLIDES)[number];
  active: boolean;
  entering: boolean;
  exiting: boolean;
  revealing: boolean;
  reduceMotion: boolean;
  priority: boolean;
}) {
  const targetOpacity = exiting ? 0 : active || entering ? 1 : 0;
  const fadeDuration = reduceMotion
    ? 0.4
    : revealing
      ? INITIAL_REVEAL_DURATION
      : exiting
        ? IMAGE_FADE_OUT
        : entering
          ? IMAGE_FADE_IN
          : 0.35;

  return (
    <motion.div
      className="absolute inset-0 [transform:translateZ(0)]"
      initial={revealing ? { opacity: 0 } : false}
      animate={{
        opacity: targetOpacity,
        zIndex: entering || active ? 2 : exiting ? 1 : 0,
      }}
      transition={{
        opacity: { duration: fadeDuration, ease: luxuryEase },
      }}
    >
      <div className="absolute inset-[-3%] md:inset-0">
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
