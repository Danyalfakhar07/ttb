import type { Metadata } from "next";
import { EditorialPage } from "@/components/EditorialPage";
import { ResearchSection } from "@/components/ResearchSection";

export const metadata: Metadata = {
  title: "Research & Development — TTB",
  description:
    "Our research programme into enclosed ecosystems, self-watering technologies, and species-specific environmental testing since 2023.",
};

export default function ResearchPage() {
  return (
    <EditorialPage>
      <ResearchSection />
    </EditorialPage>
  );
}
