import type { SurveyResponse } from "@/lib/survey-types";
import { toIntegrationRecord } from "@/lib/survey-storage";

export type IntegrationProvider =
  | "airtable"
  | "hubspot"
  | "mailchimp"
  | "google_sheets";

export interface IntegrationAdapter {
  name: IntegrationProvider;
  send: (response: SurveyResponse) => Promise<void>;
}

/** Placeholder adapters — wire env vars when ready */
const adapters: IntegrationAdapter[] = [
  {
    name: "airtable",
    async send(response) {
      if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
        return;
      }
      void toIntegrationRecord(response);
      // POST to Airtable REST API
    },
  },
  {
    name: "hubspot",
    async send(response) {
      if (!process.env.HUBSPOT_ACCESS_TOKEN) return;
      void toIntegrationRecord(response);
    },
  },
  {
    name: "mailchimp",
    async send(response) {
      if (!process.env.MAILCHIMP_API_KEY) return;
      void toIntegrationRecord(response);
    },
  },
  {
    name: "google_sheets",
    async send(response) {
      if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return;
      void toIntegrationRecord(response);
    },
  },
];

export async function dispatchIntegrations(
  response: SurveyResponse,
): Promise<void> {
  await Promise.allSettled(adapters.map((a) => a.send(response)));
}
