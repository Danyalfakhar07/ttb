import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { EditorialPage } from "@/components/EditorialPage";

export const metadata: Metadata = {
  title: "About Us — TTB",
  description:
    "Building the future of living ecosystems through science, design, sustainability, and education.",
};

export default function AboutPage() {
  return (
    <EditorialPage>
      <AboutSection />
    </EditorialPage>
  );
}
