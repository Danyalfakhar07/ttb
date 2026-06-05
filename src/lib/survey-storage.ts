import { promises as fs } from "fs";
import path from "path";
import type { SurveyResponse } from "./survey-types";

const DATA_DIR = path.join(process.cwd(), "data");
const RESPONSES_FILE = path.join(DATA_DIR, "survey-responses.json");

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(RESPONSES_FILE);
  } catch {
    await fs.writeFile(RESPONSES_FILE, "[]", "utf-8");
  }
}

export async function readSurveyResponses(): Promise<SurveyResponse[]> {
  await ensureDataFile();
  const raw = await fs.readFile(RESPONSES_FILE, "utf-8");
  return JSON.parse(raw) as SurveyResponse[];
}

export async function appendSurveyResponse(
  response: SurveyResponse,
): Promise<void> {
  const existing = await readSurveyResponses();
  existing.push(response);
  await fs.writeFile(
    RESPONSES_FILE,
    JSON.stringify(existing, null, 2),
    "utf-8",
  );
}

/** Shape for future CRM / spreadsheet integrations */
export function toIntegrationRecord(response: SurveyResponse) {
  return {
    id: response.id,
    submitted_at: response.submittedAt,
    interest: response.interest,
    use_cases: response.useCases.join("; "),
    focus_areas: response.interests.join("; "),
    access_preference: response.accessPreference,
    full_name: response.lead.fullName,
    email: response.lead.email,
    company: response.lead.company ?? "",
    industry: response.lead.industry ?? "",
    marketing_consent: response.lead.marketingConsent,
    source: response.source,
  };
}
