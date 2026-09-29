"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langObj = LANGUAGES.find((l) => l.id === language);
  const extension = langObj?.extension ?? "txt";
  const filename = `solution.${extension}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mt-4">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-[10px] font-bold text-green-700 bg-green-500/10 border border-green-600 px-1.5 py-0.5">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-frame/20 bg-panel shadow-[2px_2px_0px_#111111] overflow-hidden mb-3">
        {/* Header Strip */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-canvas border-b border-frame/20 text-[11px] font-mono">
          <span className="text-frame/80 font-bold">{filename}</span>
          <span className="text-green-700 font-bold uppercase tracking-wider text-[10px]">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <div className="p-3 bg-panel max-h-72 overflow-y-auto custom-scroll">
          <pre className="font-mono text-xs text-frame leading-relaxed whitespace-pre overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-2 bg-canvas/50 border-t border-frame/20">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 min-w-[140px] px-3 py-2 text-xs font-mono font-bold border border-frame bg-panel text-frame hover:bg-frame hover:text-white transition-colors cursor-pointer"
          >
            {copyLabel}
          </button>
          <button
            type="button"
            onClick={() => onApply(code)}
            className="flex-1 min-w-[140px] px-3 py-2 text-xs font-mono font-bold border border-frame bg-frame text-white hover:bg-accent hover:border-accent transition-colors cursor-pointer"
          >
            APPLY TO EDITOR ↵
          </button>
        </div>
      </div>
    </div>
  );
}
