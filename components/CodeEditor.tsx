"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const langObj = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langObj?.label || language;

  const lineCount = Math.max(code.split("\n").length, 10);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const updateCursor = (target: HTMLTextAreaElement) => {
    const selStart = target.selectionStart;
    const textBefore = target.value.substring(0, selStart);
    const lines = textBefore.split("\n");
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    setCursor({ line, col });
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);
      updateCursor(textarea);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-panel border-frame overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 bg-canvas border-b border-frame flex items-center justify-between shrink-0 select-none">
        <span className="font-mono text-xs uppercase tracking-widest text-frame/60">
          INPUT // SRC
        </span>
        <span className="font-sans text-xs font-bold uppercase tracking-wider text-frame">
          Your Code
        </span>
        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-accent hover:underline font-bold uppercase tracking-wider cursor-pointer"
          >
            [SAMPLE BUG]
          </button>
          <span className="text-frame/30">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-frame/60 hover:text-frame font-bold uppercase tracking-wider cursor-pointer"
          >
            [CLEAR]
          </button>
        </div>
      </div>

      {/* Editor Main Canvas (Gutter + Textarea) */}
      <div className="flex-1 flex relative overflow-hidden bg-panel min-h-[320px]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 bg-canvas/80 border-r border-frame/20 py-3 text-right pr-2 select-none overflow-hidden shrink-0"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={`font-mono text-xs h-6 leading-6 ${
                  isError
                    ? "text-accent bg-accent/15 font-bold"
                    : "text-frame/40"
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <div className="flex-1 relative overflow-hidden">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              onChange(e.target.value);
              updateCursor(e.target);
            }}
            onSelect={(e) => updateCursor(e.currentTarget)}
            onKeyUp={(e) => updateCursor(e.currentTarget)}
            onClick={(e) => updateCursor(e.currentTarget)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            wrap="off"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            placeholder="// Paste your code here..."
            className="w-full h-full p-3 font-mono text-xs leading-6 text-frame bg-transparent resize-none outline-none overflow-auto custom-scroll selection:bg-accent selection:text-white"
          />
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 px-3 bg-canvas border-t border-frame/20 flex items-center justify-between text-[11px] font-mono text-frame/70 shrink-0 select-none">
        <div>
          Ln {cursor.line}, Col {cursor.col} · {languageLabel}
        </div>
        <div className="hidden sm:inline text-frame/50">
          UTF-8 · Tab Size: 4
        </div>
      </div>
    </div>
  );
}
