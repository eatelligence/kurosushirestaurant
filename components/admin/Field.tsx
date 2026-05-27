"use client";

import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-2">
        {label}
      </span>
      {children}
      {hint && !error && (
        <span className="block mt-1.5 text-[11px] text-kuro-ash">{hint}</span>
      )}
      {error && (
        <span role="alert" className="block mt-1.5 text-[11px] text-kuro-stone">
          {error}
        </span>
      )}
    </label>
  );
}
