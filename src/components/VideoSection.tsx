"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { LuxuryButton } from "./ui/LuxuryButton";

interface VideoSectionProps {
  onContinue: () => void;
}

const VIDEO_SRC = "/video/launch-film.mp4";
const POSTER = "/hero/hero-2-desktop.jpeg";

export function VideoSection({ onContinue }: VideoSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-15%" });
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setPlaying(true);
    } catch {
      setPlaying(true);
    }
  };

  return (
    <section
      id="film"
      ref={containerRef}
      className="relative px-5 py-24 md:px-10 md:py-32"
    >
      <ScrollReveal className="mx-auto max-w-[1200px]">
        <p className="type-eyebrow mb-4 text-center text-[11px] text-white/45 md:text-[10px]">
          Cinematic Introduction
        </p>
        <h2 className="font-display mb-12 text-center text-[clamp(1.85rem,5vw,2.75rem)] leading-[1.08] text-white">
          Experience the vision
        </h2>
      </ScrollReveal>

      <motion.div
        className="relative mx-auto aspect-[16/9] max-w-[1200px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a]"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(16px)" }}
        animate={
          inView
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.96, filter: "blur(16px)" }
        }
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {hasVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            playsInline
            poster={POSTER}
            onEnded={() => setEnded(true)}
            onError={() => setHasVideo(false)}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <div className="relative h-full min-h-[220px] w-full">
            <Image
              src={POSTER}
              alt="Product film preview"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {!playing && !ended && (
          <motion.button
            type="button"
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
            onClick={handlePlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-transform duration-500 hover:scale-105">
              <svg width="14" height="18" viewBox="0 0 14 18" fill="white">
                <path d="M0 0L14 9L0 18V0Z" />
              </svg>
            </span>
          </motion.button>
        )}

        {ended && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
              Continue your journey
            </p>
            <LuxuryButton onClick={onContinue}>Continue</LuxuryButton>
          </motion.div>
        )}
      </motion.div>

      {!ended && playing && hasVideo && (
        <p className="mt-6 text-center text-[10px] tracking-[0.2em] text-white/30 uppercase">
          Immersive film in progress
        </p>
      )}

      {!hasVideo && !ended && (
        <div className="mt-8 flex justify-center">
          <LuxuryButton onClick={onContinue}>Continue</LuxuryButton>
        </div>
      )}
    </section>
  );
}
