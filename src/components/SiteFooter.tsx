import { BRAND_FULL, BRAND_SHORT } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-display text-[12px] font-medium tracking-[0.35em] text-white">
            {BRAND_SHORT}
          </span>
          <span className="text-[8px] uppercase tracking-[0.22em] text-white/35">
            {BRAND_FULL}
          </span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          {["Privacy", "Terms", "Advisors", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[9px] uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-white/70"
            >
              {item}
            </a>
          ))}
        </nav>
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
          © {new Date().getFullYear()} {BRAND_FULL}
        </p>
      </div>
    </footer>
  );
}
