export const LEGAL_ENTITY =
  "Robert Hudson and Teayam Tasbihgou, trading as Controlled Plant Environment (CPE)";

export const COPYRIGHT_LINE =
  "© 2026 Controlled Plant Environment (CPE). All rights reserved.";

export const PRIVACY_NOTICE = {
  title: "Privacy Notice",
  paragraphs: [
    `By submitting your information through this website, you consent to ${LEGAL_ENTITY} collecting and processing your personal data for the purposes of responding to enquiries, providing product updates, managing pre-orders, and communicating information relating to our products and services.`,
    "We collect only the information you voluntarily provide and take reasonable measures to protect your data. Your information will not be sold to third parties. We may share information with trusted service providers where necessary to operate our website, process orders, or deliver communications.",
    "You may request access to, correction of, or deletion of your personal information at any time by contacting us.",
    "By submitting your details, you acknowledge that you have read and understood our Privacy Policy.",
  ],
} as const;

export const INTELLECTUAL_PROPERTY_NOTICE = {
  title: "Intellectual Property Notice",
  paragraphs: [
    "The Controlled Plant Environment (CPE) system, including its self-watering reservoir design, wick assembly, sectioned planter configuration, airflow management system, ventilation architecture, condensation control technology, environmental monitoring arrangement, and associated design features, is the subject of proprietary intellectual property rights owned by Robert Hudson and Teayam Tasbihgou.",
    "All designs, images, specifications, descriptions, and product concepts displayed on this website are provided for informational purposes only and may not be reproduced, copied, adapted, manufactured, or commercially exploited without prior written permission.",
  ],
  footerParagraphs: [
    `The Controlled Plant Environment design, associated technologies, product concepts, images, specifications, trademarks, and intellectual property are proprietary to Robert Hudson and Teayam Tasbihgou. Unauthorised reproduction, distribution, copying, reverse engineering, or commercial use is prohibited.`,
    "Personal information submitted through this website is processed in accordance with our Privacy Policy and applicable UK data protection legislation.",
  ],
} as const;
