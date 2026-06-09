import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { PRIVACY_NOTICE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Notice — TTB",
  description: "Privacy notice for Controlled Plant Environment (CPE).",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title={PRIVACY_NOTICE.title}
      paragraphs={PRIVACY_NOTICE.paragraphs}
    />
  );
}
