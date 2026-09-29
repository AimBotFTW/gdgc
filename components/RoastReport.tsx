import React from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { SectionHeader } from "./SectionHeader";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string | null;
  onRetry: () => void;
  onApplyFix: (fixedCode: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const hasCorrectedCode = Boolean(result?.correctedCode?.trim());
  const hasTakeaway = Boolean(result?.takeaway?.trim());
  const takeawaySectionNumber = hasCorrectedCode ? 4 : 3;
  const issues = result?.issues ?? [];
  const issueCount = issues.length;

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-panel border-t md:border-t-0 md:border-l border-frame overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 bg-canvas border-b border-frame flex items-center justify-between shrink-0 select-none">
        <span className="font-mono text-xs uppercase tracking-widest text-frame/60">
          AUDIT // REPORT
        </span>
        <span className="font-sans text-xs font-bold uppercase tracking-wider text-frame">
          Roast Report
        </span>
        <div className="w-16 flex justify-end">
          {state === "results" && (
            <span className="font-mono text-[10px] font-bold text-accent bg-accent/10 border border-accent px-1.5 py-0.5">
              {issueCount} {issueCount === 1 ? "FLAW" : "FLAWS"}
            </span>
          )}
        </div>
      </div>

      {/* Body Area */}
      <div className="flex-1 flex flex-col overflow-y-auto custom-scroll p-4 min-h-[380px]">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="space-y-6">
            {/* Section 1: Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 border border-accent px-1.5 py-0.5 uppercase">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <div className="border-l-4 border-l-accent bg-canvas/80 border border-frame/15 p-3.5 shadow-[2px_2px_0px_#111111]">
                <p className="font-sans text-sm md:text-base text-frame font-medium italic leading-relaxed">
                  &ldquo;{result.roast}&rdquo;
                </p>
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="text-[10px] font-mono text-frame/70 font-bold">
                  {issueCount} {issueCount === 1 ? "ISSUE" : "ISSUES"}
                </span>
              </SectionHeader>

              {issueCount === 0 ? (
                <div className="p-3 border border-green-600 bg-green-500/10 text-green-700 text-xs font-mono font-bold">
                  No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-2">
                  {issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix (Conditional) */}
            {hasCorrectedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Takeaway Section (Conditional) */}
            {hasTakeaway && (
              <div>
                <SectionHeader number={takeawaySectionNumber} title="Takeaway" />
                <div className="p-3.5 bg-canvas border border-frame/20 shadow-[2px_2px_0px_#111111]">
                  <p className="font-mono text-xs text-frame leading-relaxed">
                    {result.takeaway}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
