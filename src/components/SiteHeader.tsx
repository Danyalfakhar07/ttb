"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandLogo } from "./ui/BrandLogo";
import { LuxuryButton } from "./ui/LuxuryButton";

const NAV_LINKS = [
  { label: "Environments", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Founders", href: "/founders" },
  { label: "Research", href: "/research" },
] as const;

const luxuryEase = [0.22, 1, 0.36, 1] as const;

interface SiteHeaderProps {
  onRegister: () => void;
  visible?: boolean;
  variant?: "home" | "site";
}

export function SiteHeader({
  onRegister,
  visible = true,
  variant = "home",
}: SiteHeaderProps) {
  const isHome = variant === "home";
  const show = isHome ? visible : true;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const logo = <BrandLogo size="header" />;

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 px-5 pt-5 pb-5 transition-[background-color,border-color] duration-500 md:px-10 md:pt-8 md:pb-8 ${
          scrolled
            ? "border-b border-white/[0.06] bg-black"
            : "border-b border-transparent bg-transparent"
        }`}
        initial={isHome ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: isHome ? 1.7 : 0, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative mx-auto flex max-w-[1400px] items-center">
          <div className="relative z-10 shrink-0">
            {isHome ? (
              <a href="#overview" className="transition-opacity duration-700 hover:opacity-80">
                {logo}
              </a>
            ) : (
              <Link href="/" className="transition-opacity duration-700 hover:opacity-80">
                {logo}
              </Link>
            )}
          </div>

          <nav className="pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <div className="pointer-events-auto flex items-center gap-6 lg:gap-7">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[10px] uppercase tracking-[0.28em] text-white/50 transition-colors duration-500 hover:text-white/90"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="relative z-10 ml-auto flex shrink-0 items-center gap-3">
            <LuxuryButton
              variant="secondary"
              className="!px-4 !py-2 !text-[9px] md:!px-5"
              onClick={onRegister}
            >
              Register Interest
            </LuxuryButton>

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span className="flex h-3.5 w-5 flex-col justify-between">
                <motion.span
                  className="block h-px w-full origin-center bg-white/70"
                  animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: luxuryEase }}
                />
                <motion.span
                  className="block h-px w-full bg-white/70"
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.25, ease: luxuryEase }}
                />
                <motion.span
                  className="block h-px w-full origin-center bg-white/70"
                  animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: luxuryEase }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              className="absolute top-0 right-0 bottom-0 flex w-[min(88vw,320px)] flex-col border-l border-white/[0.08] bg-black/95 px-8 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] pb-10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: luxuryEase }}
            >
              <p className="mb-8 text-[10px] uppercase tracking-[0.32em] text-white/35">
                Menu
              </p>

              <ul className="flex flex-col gap-6">
                {isHome && (
                  <li>
                    <a
                      href="#overview"
                      className="font-display text-[1.35rem] tracking-[-0.02em] text-white/90 transition-colors hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      Home
                    </a>
                  </li>
                )}
                {NAV_LINKS.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.06, duration: 0.4, ease: luxuryEase }}
                  >
                    <Link
                      href={item.href}
                      className="font-display text-[1.35rem] tracking-[-0.02em] text-white/90 transition-colors hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto border-t border-white/[0.08] pt-8">
                <LuxuryButton
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    onRegister();
                  }}
                >
                  Register Interest
                </LuxuryButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
