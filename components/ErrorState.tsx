import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const displayError =
    error && error.trim()
      ? error
      : "An unknown error occurred during code evaluation.";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      <div className="w-16 h-16 border-2 border-accent bg-accent/5 flex items-center justify-center mb-4 shadow-[3px_3px_0px_#D94826]">
        <span className="font-mono text-2xl font-bold text-accent">!</span>
      </div>
      <h3 className="font-sans text-base font-bold uppercase tracking-wider text-accent mb-2">
        Analysis Failed
      </h3>
      <p className="font-mono text-xs text-frame/70 max-w-sm leading-relaxed mb-6 bg-canvas border border-frame/15 p-3">
        {displayError}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 border-2 border-frame bg-frame text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-accent hover:border-accent shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
