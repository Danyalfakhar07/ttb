"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { LuxuryButton } from "./ui/LuxuryButton";
import type {
  AccessPreferenceOption,
  InterestFocusOption,
  InterestOption,
  SurveyLeadCapture,
  UseCaseOption,
} from "@/lib/survey-types";
import {
  ACCESS_PREFERENCE_OPTIONS,
  INTEREST_FOCUS_OPTIONS,
  INTEREST_OPTIONS,
  USE_CASE_OPTIONS,
} from "@/lib/survey-types";

type Step = 1 | 2 | 3 | 4 | 5 | "thanks";

interface SurveyState {
  interest: InterestOption | null;
  useCases: UseCaseOption[];
  interests: InterestFocusOption[];
  accessPreference: AccessPreferenceOption | null;
  lead: SurveyLeadCapture;
}

const initialLead: SurveyLeadCapture = {
  fullName: "",
  email: "",
  company: "",
  industry: "",
  marketingConsent: false,
};

const stepVariants = {
  enter: { opacity: 0, y: 24, filter: "blur(10px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(6px)" },
};

const SINGLE_ADVANCE_MS = 480;

interface SurveyExperienceProps {
  onReturnOverview: () => void;
}

export function SurveyExperience({ onReturnOverview }: SurveyExperienceProps) {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [data, setData] = useState<SurveyState>({
    interest: null,
    useCases: [],
    interests: [],
    accessPreference: null,
    lead: initialLead,
  });

  const isMultiStep = step === 2 || step === 3;

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => {
      if (s === 5) return "thanks";
      if (typeof s === "number") return (s + 1) as Step;
      return s;
    });
  }, []);

  const scheduleAdvance = useCallback(
    (delayMs: number) => {
      clearAdvanceTimer();
      setAdvancing(true);
      advanceTimerRef.current = setTimeout(() => {
        setAdvancing(false);
        goNext();
      }, delayMs);
    },
    [clearAdvanceTimer, goNext],
  );

  useEffect(() => {
    clearAdvanceTimer();
    setAdvancing(false);
  }, [step, clearAdvanceTimer]);

  useEffect(() => () => clearAdvanceTimer(), [clearAdvanceTimer]);

  const goBack = useCallback(() => {
    clearAdvanceTimer();
    setAdvancing(false);
    setDirection(-1);
    setStep((s) => {
      if (s === "thanks" || s === 1) return 1;
      if (typeof s === "number") return (s - 1) as Step;
      return 1;
    });
  }, [clearAdvanceTimer]);

  const selectInterest = (opt: InterestOption) => {
    if (advancing) return;
    setData((d) => ({ ...d, interest: opt }));
    scheduleAdvance(SINGLE_ADVANCE_MS);
  };

  const selectAccess = (opt: AccessPreferenceOption) => {
    if (advancing) return;
    setData((d) => ({ ...d, accessPreference: opt }));
    scheduleAdvance(SINGLE_ADVANCE_MS);
  };

  const toggleUseCase = (opt: UseCaseOption) => {
    const exists = data.useCases.includes(opt);
    setData((prev) => ({
      ...prev,
      useCases: exists
        ? prev.useCases.filter((v) => v !== opt)
        : [...prev.useCases, opt],
    }));
  };

  const toggleInterestFocus = (opt: InterestFocusOption) => {
    const exists = data.interests.includes(opt);
    setData((prev) => ({
      ...prev,
      interests: exists
        ? prev.interests.filter((v) => v !== opt)
        : [...prev.interests, opt],
    }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return data.interest !== null;
      case 2:
        return data.useCases.length > 0;
      case 3:
        return data.interests.length > 0;
      case 4:
        return data.accessPreference !== null;
      case 5:
        return (
          data.lead.fullName.trim().length > 0 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.lead.email)
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed() || !data.interest || !data.accessPreference) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interest: data.interest,
          useCases: data.useCases,
          interests: data.interests,
          accessPreference: data.accessPreference,
          lead: data.lead,
        }),
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Submission failed");
      }

      goNext();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const progress =
    step === "thanks" ? 100 : (typeof step === "number" ? step : 5) * 20;

  return (
    <section id="inquiry" className="survey-section relative px-4 py-20 sm:px-6 md:px-10 md:py-32">
      <div className="glow-orb top-20 right-0 h-80 w-80 opacity-40" />

      <ScrollReveal className="mx-auto mb-12 max-w-[1100px] md:mb-16">
        <p className="survey-eyebrow type-eyebrow text-[11px] text-white/45 md:text-[10px]">
          Guided Inquiry
        </p>
        <h2 className="survey-section-title mt-4 text-[clamp(2rem,6.5vw,3rem)] tracking-[-0.02em] text-white">
          Shape the future of living environments
        </h2>
        <p className="survey-section-desc mt-4 max-w-[520px] text-[clamp(0.95rem,3.2vw,1.05rem)] leading-relaxed text-white/55">
          A refined sequence of questions — designed to understand how this
          vision aligns with your world.
        </p>
      </ScrollReveal>

      <div className="mx-auto max-w-[1100px]">
        <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/[0.08] md:mb-10">
          <motion.div
            className="h-full bg-gradient-to-r from-white/25 via-white/60 to-white/25"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="relative min-h-[380px] md:min-h-[440px]">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <StepShell key="1" direction={direction}>
                <QuestionTitle>Which best describes your interest?</QuestionTitle>
                <StepHint>Tap your choice to continue</StepHint>
                <OptionGrid columns={2}>
                  {INTEREST_OPTIONS.map((opt) => (
                    <SelectCard
                      key={opt}
                      label={opt}
                      selected={data.interest === opt}
                      disabled={advancing}
                      onClick={() => selectInterest(opt)}
                    />
                  ))}
                </OptionGrid>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell key="2" direction={direction}>
                <QuestionTitle>Where could you see this being used?</QuestionTitle>
                <StepHint>Select all that apply, then continue</StepHint>
                <OptionGrid columns={2}>
                  {USE_CASE_OPTIONS.map((opt) => (
                    <SelectCard
                      key={opt}
                      label={opt}
                      selected={data.useCases.includes(opt)}
                      onClick={() => toggleUseCase(opt)}
                      multi
                    />
                  ))}
                </OptionGrid>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell key="3" direction={direction}>
                <QuestionTitle>What interests you most?</QuestionTitle>
                <StepHint>Select all that apply, then continue</StepHint>
                <OptionGrid columns={2}>
                  {INTEREST_FOCUS_OPTIONS.map((opt) => (
                    <SelectCard
                      key={opt}
                      label={opt}
                      selected={data.interests.includes(opt)}
                      onClick={() => toggleInterestFocus(opt)}
                      multi
                    />
                  ))}
                </OptionGrid>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell key="4" direction={direction}>
                <QuestionTitle>How would you prefer to access this?</QuestionTitle>
                <StepHint>Tap your choice to continue</StepHint>
                <OptionGrid columns={2}>
                  {ACCESS_PREFERENCE_OPTIONS.map((opt) => (
                    <SelectCard
                      key={opt}
                      label={opt}
                      selected={data.accessPreference === opt}
                      disabled={advancing}
                      onClick={() => selectAccess(opt)}
                    />
                  ))}
                </OptionGrid>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell key="5" direction={direction}>
                <QuestionTitle>Stay Informed About The Project</QuestionTitle>
                <div className="glass-panel mt-6 space-y-5 rounded-2xl p-5 sm:mt-8 sm:p-8 md:p-10">
                  <FormField
                    label="Full Name"
                    required
                    value={data.lead.fullName}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        lead: { ...d.lead, fullName: v },
                      }))
                    }
                  />
                  <FormField
                    label="Email Address"
                    required
                    type="email"
                    value={data.lead.email}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        lead: { ...d.lead, email: v },
                      }))
                    }
                  />
                  <FormField
                    label="Company"
                    value={data.lead.company ?? ""}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        lead: { ...d.lead, company: v },
                      }))
                    }
                  />
                  <FormField
                    label="Industry"
                    value={data.lead.industry ?? ""}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        lead: { ...d.lead, industry: v },
                      }))
                    }
                  />
                  <label className="flex cursor-pointer items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      className="mt-1.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-white"
                      checked={data.lead.marketingConsent}
                      onChange={(e) =>
                        setData((d) => ({
                          ...d,
                          lead: {
                            ...d.lead,
                            marketingConsent: e.target.checked,
                          },
                        }))
                      }
                    />
                    <span className="text-[clamp(0.875rem,3vw,0.95rem)] leading-relaxed text-white/55">
                      I am interested in updates, collaboration opportunities,
                      or future developments.
                    </span>
                  </label>
                </div>
              </StepShell>
            )}

            {step === "thanks" && (
              <StepShell key="thanks" direction={direction}>
                <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                  <motion.div
                    className="mb-8 h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2 }}
                  />
                  <h3 className="font-display text-[clamp(1.75rem,5vw,2.25rem)] text-white">
                    Thank you for your interest.
                  </h3>
                  <p className="mt-5 max-w-md text-[clamp(0.95rem,3vw,1.05rem)] leading-relaxed text-white/50">
                    We will review all feedback as the project develops.
                  </p>
                  <LuxuryButton
                    className="mt-10"
                    variant="secondary"
                    onClick={onReturnOverview}
                  >
                    Return to Overview
                  </LuxuryButton>
                </div>
              </StepShell>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400/80">{error}</p>
        )}

        {step !== "thanks" && (
          <div className="mt-8 flex items-center justify-between gap-4 md:mt-10">
            <LuxuryButton
              variant="ghost"
              onClick={goBack}
              disabled={step === 1 || advancing}
              className={step === 1 ? "opacity-30" : ""}
            >
              Back
            </LuxuryButton>

            {isMultiStep && (
              <LuxuryButton onClick={goNext} disabled={!canProceed()}>
                Continue
              </LuxuryButton>
            )}

            {step === 5 && (
              <LuxuryButton
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
              >
                {submitting ? "Submitting…" : "Register Interest"}
              </LuxuryButton>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function StepShell({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: number;
}) {
  return (
    <motion.div
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function QuestionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="survey-question text-balance leading-[1.18] tracking-[-0.02em] text-white">
      {children}
    </h3>
  );
}

function StepHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="survey-hint mb-5 mt-3 text-white/50 md:mb-6">{children}</p>
  );
}

function OptionGrid({
  children,
  columns,
}: {
  children: React.ReactNode;
  columns: 2 | 3;
}) {
  return (
    <div
      className={
        columns === 3
          ? "grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3"
          : "grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3"
      }
    >
      {children}
    </div>
  );
}

function SelectCard({
  label,
  selected,
  onClick,
  multi,
  disabled,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "survey-option group relative flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-[border-color,background,box-shadow] duration-400 sm:min-h-[3.5rem] sm:px-4 sm:py-3",
        disabled && "pointer-events-none opacity-60",
        selected
          ? "border-white/35 bg-white/[0.1] shadow-[0_0_32px_-12px_rgba(255,255,255,0.22)]"
          : "border-white/[0.1] bg-white/[0.04] hover:border-white/22 hover:bg-white/[0.06]",
      ].join(" ")}
      whileTap={disabled ? undefined : { scale: 0.985 }}
    >
      <span className="survey-option-label pr-2 leading-snug text-white/92">
        {label}
      </span>
      <span
        className={[
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] transition-colors duration-300",
          selected
            ? "border-white/40 bg-white/15 text-white"
            : "border-white/15 text-white/30 group-hover:border-white/25 group-hover:text-white/50",
        ].join(" ")}
      >
        {multi ? (selected ? "✓" : "") : "→"}
      </span>
      {selected && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

function FormField({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.26em] text-white/45">
        {label}
        {required && <span className="text-white/70"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border border-white/[0.1] bg-white/[0.05] px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 transition-[border-color,background] duration-500 focus:border-white/28 focus:bg-white/[0.07] focus:outline-none sm:text-sm"
        placeholder={label}
      />
    </label>
  );
}
