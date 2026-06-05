export type InterestOption =
  | "Home / Personal Use"
  | "Commercial / Hospitality"
  | "Education / Research"
  | "Interior Designer / Architect"
  | "Investor / Manufacturing Partner"
  | "Just Exploring";

export type UseCaseOption =
  | "Home"
  | "Office"
  | "Hotel"
  | "Restaurant / Café"
  | "Retail Display"
  | "School"
  | "University"
  | "Botanical Research"
  | "Healthcare / Wellbeing"
  | "Public Space"
  | "Other";

export type InterestFocusOption =
  | "Reduced Maintenance"
  | "Beautiful Living Display"
  | "Difficult Plants Made Simple"
  | "Rental / Maintenance Service"
  | "Education & Research"
  | "Commercial Installation"
  | "Rare Plant Collections"
  | "Sustainability";

export type AccessPreferenceOption =
  | "Purchase a Unit"
  | "Rental with Maintenance Included"
  | "Commercial Installation Contract"
  | "Educational Version"
  | "Not Sure Yet";

export interface SurveyLeadCapture {
  fullName: string;
  email: string;
  company?: string;
  industry?: string;
  marketingConsent: boolean;
}

export interface SurveyResponse {
  id: string;
  submittedAt: string;
  source: "ttb-launch-experience";
  interest: InterestOption;
  useCases: UseCaseOption[];
  interests: InterestFocusOption[];
  accessPreference: AccessPreferenceOption;
  lead: SurveyLeadCapture;
  meta: {
    userAgent?: string;
    locale?: string;
  };
}

export interface SurveySubmissionPayload {
  interest: InterestOption;
  useCases: UseCaseOption[];
  interests: InterestFocusOption[];
  accessPreference: AccessPreferenceOption;
  lead: SurveyLeadCapture;
}

export const INTEREST_OPTIONS: InterestOption[] = [
  "Home / Personal Use",
  "Commercial / Hospitality",
  "Education / Research",
  "Interior Designer / Architect",
  "Investor / Manufacturing Partner",
  "Just Exploring",
];

export const USE_CASE_OPTIONS: UseCaseOption[] = [
  "Home",
  "Office",
  "Hotel",
  "Restaurant / Café",
  "Retail Display",
  "School",
  "University",
  "Botanical Research",
  "Healthcare / Wellbeing",
  "Public Space",
  "Other",
];

export const INTEREST_FOCUS_OPTIONS: InterestFocusOption[] = [
  "Reduced Maintenance",
  "Beautiful Living Display",
  "Difficult Plants Made Simple",
  "Rental / Maintenance Service",
  "Education & Research",
  "Commercial Installation",
  "Rare Plant Collections",
  "Sustainability",
];

export const ACCESS_PREFERENCE_OPTIONS: AccessPreferenceOption[] = [
  "Purchase a Unit",
  "Rental with Maintenance Included",
  "Commercial Installation Contract",
  "Educational Version",
  "Not Sure Yet",
];
