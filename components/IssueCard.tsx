import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  Severity,
  {
    badge: string;
    stripe: string;
  }
> = {
  "FATAL BUG": {
    badge: "border-accent text-accent bg-accent/10",
    stripe: "border-l-accent",
  },
  "CODE SMELL": {
    badge: "border-amber-600 text-amber-600 bg-amber-500/10",
    stripe: "border-l-amber-600",
  },
  OPTIMIZATION: {
    badge: "border-green-600 text-green-600 bg-green-500/10",
    stripe: "border-l-green-600",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index).padStart(2, "0");
  const config = severityConfig[issue.severity] || severityConfig["FATAL BUG"];

  return (
    <div className="border border-frame/20 bg-panel p-3 shadow-[2px_2px_0px_#111111] mb-3 text-xs font-mono">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-subtle pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-frame text-white px-1.5 py-0.5 text-[10px] font-bold">
            [{paddedIndex}]
          </span>
          <span className="font-bold text-frame">LINE {issue.line}</span>
          <span
            className={`border px-1.5 py-0.5 text-[10px] font-bold uppercase ${config.badge}`}
          >
            {issue.severity}
          </span>
        </div>
        <div className="text-frame/60 text-[11px] font-sans font-medium text-right flex-1 min-w-[120px] break-words">
          {issue.title}
        </div>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <div className={`border border-frame/15 border-l-4 ${config.stripe} bg-canvas/70 p-2 mb-2 overflow-x-auto`}>
          <pre className="font-mono text-[11px] text-frame leading-relaxed">
            <code>{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 pt-1 text-[11px]">
        <div className="text-accent leading-snug">
          <span className="font-bold mr-1">✕ Diagnosis:</span>
          <span>{issue.diagnosis}</span>
        </div>
        <div className="text-green-700 leading-snug">
          <span className="font-bold mr-1">✓ Expected:</span>
          <span>{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
