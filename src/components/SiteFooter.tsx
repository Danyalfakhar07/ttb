import Link from "next/link";
import { BRAND_FULL } from "@/lib/brand";
import { COPYRIGHT_LINE } from "@/lib/legal";
import { BrandLogo } from "./ui/BrandLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <BrandLogo size="xs" />
          <span className="text-[8px] uppercase tracking-[0.22em] text-white/35">
            {BRAND_FULL}
          </span>
          <p className="max-w-[280px] text-center text-[8px] leading-relaxed tracking-[0.08em] text-white/28 md:text-left">
            {COPYRIGHT_LINE}
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link
            href="/privacy"
            className="text-[9px] uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-white/70"
          >
            Privacy
          </Link>
          <Link
            href="/intellectual-property"
            className="text-[9px] uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-white/70"
          >
            Intellectual Property
          </Link>
          <a
            href="#inquiry"
            className="text-[9px] uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-white/70"
          >
            Inquiry
          </a>
        </nav>
      </div>
    </footer>
  );
}
