import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b border-frame bg-canvas p-3 transition-all animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="error-traceback"
          className="font-mono text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5"
        >
          <span>⚠</span> Attach Terminal Traceback / Compiler Error (Optional)
        </label>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-mono text-frame/60 hover:text-frame font-bold uppercase tracking-wider cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        id="error-traceback"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='e.g. TypeError: unsupported operand type(s) for +=: "int" and "list"'
        className="w-full p-2.5 font-mono text-xs text-frame bg-panel border border-frame/40 outline-none focus:border-frame resize-y custom-scroll selection:bg-accent selection:text-white"
      />
    </div>
  );
}
