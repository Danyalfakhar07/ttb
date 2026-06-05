import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { dispatchIntegrations } from "@/lib/integrations";
import { appendSurveyResponse } from "@/lib/survey-storage";
import type { SurveySubmissionPayload } from "@/lib/survey-types";
import {
  ACCESS_PREFERENCE_OPTIONS,
  INTEREST_FOCUS_OPTIONS,
  INTEREST_OPTIONS,
  USE_CASE_OPTIONS,
} from "@/lib/survey-types";

function isValidPayload(body: unknown): body is SurveySubmissionPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as SurveySubmissionPayload;
  return (
    INTEREST_OPTIONS.includes(b.interest) &&
    Array.isArray(b.useCases) &&
    b.useCases.every((o) => USE_CASE_OPTIONS.includes(o)) &&
    Array.isArray(b.interests) &&
    b.interests.every((o) => INTEREST_FOCUS_OPTIONS.includes(o)) &&
    ACCESS_PREFERENCE_OPTIONS.includes(b.accessPreference) &&
    typeof b.lead?.fullName === "string" &&
    b.lead.fullName.trim().length > 0 &&
    typeof b.lead?.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.lead.email) &&
    typeof b.lead?.marketingConsent === "boolean"
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { error: "Invalid or incomplete survey data." },
        { status: 400 },
      );
    }

    if (body.useCases.length === 0 || body.interests.length === 0) {
      return NextResponse.json(
        { error: "Please complete all required selections." },
        { status: 400 },
      );
    }

    const response = {
      id: uuidv4(),
      submittedAt: new Date().toISOString(),
      source: "ttb-launch-experience" as const,
      interest: body.interest,
      useCases: body.useCases,
      interests: body.interests,
      accessPreference: body.accessPreference,
      lead: {
        fullName: body.lead.fullName.trim(),
        email: body.lead.email.trim().toLowerCase(),
        company: body.lead.company?.trim() || undefined,
        industry: body.lead.industry?.trim() || undefined,
        marketingConsent: body.lead.marketingConsent,
      },
      meta: {
        userAgent: request.headers.get("user-agent") ?? undefined,
        locale: request.headers.get("accept-language")?.split(",")[0],
      },
    };

    await appendSurveyResponse(response);
    await dispatchIntegrations(response);

    return NextResponse.json({ success: true, id: response.id });
  } catch {
    return NextResponse.json(
      { error: "Unable to save your response. Please try again." },
      { status: 500 },
    );
  }
}
