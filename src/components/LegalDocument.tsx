import Link from "next/link";
import { BrandLogo } from "./ui/BrandLogo";

interface LegalDocumentProps {
  title: string;
  paragraphs: readonly string[];
  extraSections?: { title: string; paragraphs: readonly string[] }[];
}

export function LegalDocument({
  title,
  paragraphs,
  extraSections = [],
}: LegalDocumentProps) {
  return (
    <div className="min-h-[100dvh] bg-black text-white">
      <header className="border-b border-white/[0.06] px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-[800px] items-center justify-between gap-4">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <BrandLogo size="sm" />
          </Link>
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.28em] text-white/45 transition-colors hover:text-white/80"
          >
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[800px] px-5 py-12 md:px-10 md:py-16">
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-light tracking-[-0.02em] text-white">
          {title}
        </h1>

        <div className="mt-8 space-y-5 text-[15px] leading-[1.75] text-white/65 md:text-base">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        {extraSections.map((section) => (
          <section key={section.title} className="mt-12">
            <h2 className="font-display text-xl font-light tracking-[-0.02em] text-white/90">
              {section.title}
            </h2>
            <div className="mt-5 space-y-5 text-[15px] leading-[1.75] text-white/65 md:text-base">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-14 flex flex-wrap gap-6 border-t border-white/[0.08] pt-8 text-[10px] uppercase tracking-[0.24em] text-white/40">
          <Link href="/privacy" className="transition-colors hover:text-white/70">
            Privacy
          </Link>
          <Link
            href="/intellectual-property"
            className="transition-colors hover:text-white/70"
          >
            Intellectual Property
          </Link>
        </div>
      </main>
    </div>
  );
}
