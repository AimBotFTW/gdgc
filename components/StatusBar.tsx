import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-frame bg-canvas px-4 py-2 text-xs font-mono shrink-0 select-none">
      {/* Main Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-frame/70">
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="text-amber-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              PROCESSING...
            </span>
          ) : (
            <span className="text-green-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-600" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden md:inline text-frame/30">|</span>
          <span className="hidden md:inline text-frame/60">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        <div className="uppercase tracking-widest font-bold text-frame/80 text-[10px]">
          {APP.name} {APP.version}{" // LIVE"}
        </div>
      </div>

      {/* Workshop Attribution Line */}
      <div className="mt-1 text-center text-[10px] text-frame/50 uppercase tracking-widest border-t border-frame/10 pt-1">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
