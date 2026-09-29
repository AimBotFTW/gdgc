import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2">
        <span className="text-frame/60 font-semibold uppercase tracking-wider text-[11px] hidden sm:inline">
          Roast:
        </span>
        <div className="flex items-center border border-frame bg-panel p-0.5 shadow-[1px_1px_0px_#111111]">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                title={level.description}
                onClick={() => onRoastLevelChange(level.id)}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-accent text-white font-bold"
                    : "text-frame hover:bg-canvas font-medium"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full border ${
                    isSelected
                      ? "border-white bg-white"
                      : "border-frame/40 bg-transparent"
                  }`}
                />
                {level.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Language Selector */}
      <div className="flex items-center gap-1.5">
        <span className="text-frame/60 font-semibold uppercase tracking-wider text-[11px] hidden md:inline">
          Lang:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none border border-frame bg-panel px-2.5 py-1.5 pr-7 font-mono text-[11px] font-bold uppercase tracking-wider text-frame shadow-[1px_1px_0px_#111111] cursor-pointer outline-none focus:border-accent"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-frame text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`px-2.5 py-1.5 border border-dashed text-[11px] font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors ${
          errorDrawerOpen
            ? "border-frame bg-frame text-white"
            : "border-frame/60 text-frame bg-panel hover:border-frame hover:bg-canvas"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Roast Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`px-4 py-1.5 border-2 border-frame font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_#111111] transition-all cursor-pointer ${
          isRoasting
            ? "bg-frame/80 text-white/70 cursor-not-allowed animate-pulse"
            : "bg-accent text-white hover:bg-frame active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        }`}
      >
        <span>{isRoasting ? "ANALYZING..." : "ROAST MY CODE"}</span>
        {!isRoasting && (
          <span className="hidden sm:inline bg-black/30 text-white text-[9px] px-1 py-0.5 border border-white/20 font-mono">
            Ctrl ⏎
          </span>
        )}
      </button>
    </div>
  );
}
