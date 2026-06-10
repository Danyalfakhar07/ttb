"use client";

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SmoothScroll } from "./SmoothScroll";

interface EditorialPageProps {
  children: React.ReactNode;
}

export function EditorialPage({ children }: EditorialPageProps) {
  const goEnquiry = () => {
    window.location.href = "/#enquiry";
  };

  return (
    <SmoothScroll enabled>
      <div className="min-h-[100dvh] bg-black text-white">
        <SiteHeader variant="site" visible onRegister={goEnquiry} />

        <main className="pt-[5.5rem] md:pt-[6.25rem]">{children}</main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
