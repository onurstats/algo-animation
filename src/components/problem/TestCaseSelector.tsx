"use client";

import { cn } from "@/lib/utils/cn";
import type { TestCase } from "@/lib/types";

interface TestCaseSelectorProps {
  testCases: TestCase[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onEdit: (index: number) => void;
}

export function TestCaseSelector({
  testCases,
  selectedIndex,
  onSelect,
  onEdit,
}: TestCaseSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {testCases.map((tc, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={cn(
            "flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors",
            selectedIndex === i
              ? "border-accent-blue bg-accent-blue/10"
              : "border-border hover:border-border-hover hover:bg-surface-hover",
          )}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-text-secondary">
              {tc.description ?? `Test Case ${i + 1}`}
            </span>
            <span className="font-mono text-xs text-text-muted">
              {Object.entries(tc.input)
                .map(([k, v]) => `${k} = ${JSON.stringify(v)}`)
                .join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-accent-green">
              → {JSON.stringify(tc.expected)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(i);
              }}
              className="rounded p-1 text-text-muted hover:bg-elevated hover:text-foreground"
              title="Edit this test case"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
        </button>
      ))}
    </div>
  );
}
