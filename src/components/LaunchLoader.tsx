"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandNameReveal } from "./ui/CinematicText";
import { BrandLogo } from "./ui/BrandLogo";

interface LaunchLoaderProps {
  onComplete: () => void;
}

type LoaderPhase = "logo" | "name" | "hold" | "exit";

const luxuryEase = [0.22, 1, 0.36, 1] as const;

export function LaunchLoader({ onComplete }: LaunchLoaderProps) {
  const [phase, setPhase] = useState<LoaderPhase>("logo");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"), 2000);
    const t2 = setTimeout(() => setPhase("hold"), 4600);
    const t3 = setTimeout(() => setPhase("exit"), 6400);
    const t4 = setTimeout(() => setVisible(false), 7200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const showName = phase === "name" || phase === "hold" || phase === "exit";
  const nameActive = phase === "name" || phase === "hold";

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: luxuryEase }}
        >
          <motion.div
            className="glow-orb h-[min(70vw,480px)] w-[min(70vw,480px)]"
            animate={{
              opacity: phase === "hold" ? 0.85 : 0.5,
              scale: phase === "name" ? 1.06 : 1,
            }}
            transition={{ duration: 2.6, ease: luxuryEase }}
          />

          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,255,255,0.06),transparent_70%)]"
            animate={{ opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                phase === "logo"
                  ? { opacity: 1, y: 0 }
                  : { opacity: showName ? 0.4 : 1, y: showName ? -4 : 0 }
              }
              transition={{ duration: 1.8, ease: luxuryEase }}
            >
              <BrandLogo size="lg" />
            </motion.div>

            <motion.div
              className="my-7 h-px origin-center bg-gradient-to-r from-transparent via-white/45 to-transparent md:my-9"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: showName ? "min(280px, 72vw)" : "min(120px, 40vw)",
                opacity: showName ? 1 : 0.45,
              }}
              transition={{ duration: 1.8, ease: luxuryEase }}
            />

            <AnimatePresence mode="wait">
              {showName && (
                <motion.div
                  key="brand-name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 1.2, ease: luxuryEase }}
                  className="flex flex-col items-center gap-3"
                >
                  <BrandNameReveal active={nameActive} />
                  <motion.p
                    className="mt-4 max-w-[300px] text-center text-[9px] leading-relaxed tracking-[0.32em] text-white/30 uppercase"
                    initial={{ opacity: 0, y: 8 }}
                    animate={nameActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 1.2, delay: 0.75, ease: luxuryEase }}
                  >
                    Controlled plant environments
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="absolute bottom-[10vh] flex flex-col items-center gap-3"
            animate={{ opacity: phase === "hold" ? 0.45 : 0.18 }}
            transition={{ duration: 1.4, ease: luxuryEase }}
          >
            <motion.div
              className="h-10 w-px bg-gradient-to-b from-white/0 via-white/40 to-white/0"
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
