import Image from "next/image";
import { BRAND_SHORT } from "@/lib/brand";

type BrandLogoSize = "xs" | "sm" | "header" | "md" | "lg";

const sizeConfig: Record<
  BrandLogoSize,
  { text: string; width: number; height: number }
> = {
  xs: {
    text: "text-[11px] tracking-[0.32em]",
    width: 9,
    height: 17,
  },
  sm: {
    text: "text-[13px] tracking-[0.35em]",
    width: 10,
    height: 19,
  },
  header: {
    text: "text-[15px] md:text-[17px] tracking-[0.38em]",
    width: 12,
    height: 23,
  },
  md: {
    text: "text-[clamp(0.85rem,3vw,1rem)] tracking-[0.48em]",
    width: 13,
    height: 24,
  },
  lg: {
    text: "text-[clamp(1rem,3.8vw,1.2rem)] tracking-[0.5em]",
    width: 15,
    height: 28,
  },
};

interface BrandLogoProps {
  className?: string;
  size?: BrandLogoSize;
}

export function BrandLogo({ className = "", size = "sm" }: BrandLogoProps) {
  const config = sizeConfig[size];

  return (
    <span
      className={`inline-flex items-center gap-[0.42em] font-display font-light uppercase text-white ${config.text} ${className}`}
    >
      {BRAND_SHORT}
      <Image
        src="/brand/bottle.svg"
        alt=""
        width={config.width}
        height={config.height}
        className="shrink-0"
        aria-hidden
        priority={size === "lg"}
      />
    </span>
  );
}
