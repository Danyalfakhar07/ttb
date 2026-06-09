import type { Metadata } from "next";
import { EnvironmentsSection } from "@/components/EnvironmentsSection";
import { EditorialPage } from "@/components/EditorialPage";

export const metadata: Metadata = {
  title: "Collections — TTB",
  description:
    "Our environments — carnivorous plant habitats, bonsai systems, temperate redwood enclosures, and arid desert ecosystems.",
};

export default function CollectionsPage() {
  return (
    <EditorialPage>
      <EnvironmentsSection />
    </EditorialPage>
  );
}
