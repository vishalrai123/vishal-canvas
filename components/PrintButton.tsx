"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="no-print rounded-full bg-accent px-6 py-3 font-medium text-on-accent">
      Download as PDF
    </button>
  );
}
