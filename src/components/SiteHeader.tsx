"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "./ui/BrandLogo";
import { LuxuryButton } from "./ui/LuxuryButton";

const NAV_LINKS = [
  { label: "Home", href: "#overview", isPage: false },
  { label: "Privacy", href: "/privacy", isPage: true },
  { label: "Intellectual Property", href: "/intellectual-property", isPage: true },
  { label: "Inquiry", href: "#inquiry", isPage: false },
] as const;

interface SiteHeaderProps {
  onRegister: () => void;
  visible?: boolean;
}

export function SiteHeader({ onRegister, visible = true }: SiteHeaderProps) {
  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 px-5 pt-5 md:px-10 md:pt-8"
      initial={{ opacity: 0, y: -10 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <a href="#overview" className="transition-opacity duration-700 hover:opacity-80">
          <BrandLogo size="header" />
        </a>

        <nav className="hidden items-center gap-7 lg:gap-8 md:flex">
          {NAV_LINKS.map((item) =>
            item.isPage ? (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10px] uppercase tracking-[0.28em] text-white/50 transition-colors duration-500 hover:text-white/90"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] uppercase tracking-[0.28em] text-white/50 transition-colors duration-500 hover:text-white/90"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <LuxuryButton
          variant="secondary"
          className="!px-4 !py-2 !text-[9px] md:!px-5"
          onClick={onRegister}
        >
          Register Interest
        </LuxuryButton>
      </div>
    </motion.header>
  );
}
