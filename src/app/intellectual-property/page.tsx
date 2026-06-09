import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import {
  COPYRIGHT_LINE,
  INTELLECTUAL_PROPERTY_NOTICE,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Intellectual Property — TTB",
  description: "Intellectual property notice for Controlled Plant Environment (CPE).",
};

export default function IntellectualPropertyPage() {
  return (
    <LegalDocument
      title={INTELLECTUAL_PROPERTY_NOTICE.title}
      paragraphs={INTELLECTUAL_PROPERTY_NOTICE.paragraphs}
      extraSections={[
        {
          title: "Copyright",
          paragraphs: [
            COPYRIGHT_LINE,
            ...INTELLECTUAL_PROPERTY_NOTICE.footerParagraphs,
          ],
        },
      ]}
    />
  );
}
