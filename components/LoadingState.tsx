import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      <div className="w-16 h-16 border-2 border-frame flex items-center justify-center mb-4 bg-canvas/60 shadow-[3px_3px_0px_#111111]">
        <span className="font-mono text-2xl font-bold text-accent animate-spin inline-block">
          /
        </span>
      </div>
      <h3 className="font-sans text-base font-bold uppercase tracking-wider text-frame mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs text-frame/60 max-w-sm leading-relaxed mb-4">
        Evaluating computational complexity and architectural purity...
      </p>
      {/* Progress tick bar decorative element matching Stitch wireframe */}
      <div className="font-mono text-[10px] text-accent font-bold tracking-widest bg-canvas px-3 py-1 border border-subtle">
        [||||||||||||||||||||..........] ANALYZING AST
      </div>
    </div>
  );
}
