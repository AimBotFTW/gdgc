import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-frame bg-canvas px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
      {/* Left: App Logo & Version Tag */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-frame text-white flex items-center justify-center font-mono font-bold text-xs">
          CR
        </div>
        <h1 className="font-sans text-base md:text-lg font-bold uppercase tracking-wider text-frame">
          {APP.name}
        </h1>
        <span className="border border-frame/40 bg-panel px-1.5 py-0.5 text-[10px] font-mono font-bold text-frame/70">
          {APP.version}
        </span>
      </div>

      {/* Right: Controls passed as children */}
      <div className="flex items-center">{children}</div>
    </header>
  );
}
