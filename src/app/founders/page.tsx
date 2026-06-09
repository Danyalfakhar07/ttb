import type { Metadata } from "next";
import { FoundersSection } from "@/components/FoundersSection";
import { EditorialPage } from "@/components/EditorialPage";

export const metadata: Metadata = {
  title: "Founders — TTB",
  description:
    "Meet the founders behind Teayam Tasbihgou Botanicals and the vision for enclosed living ecosystems.",
};

export default function FoundersPage() {
  return (
    <EditorialPage>
      <FoundersSection />
    </EditorialPage>
  );
}
