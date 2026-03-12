"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/hooks/useAnimation";
import { cn } from "@/lib/utils/cn";

interface Variable {
  name: string;
  value: unknown;
  changed?: boolean;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "undefined";
  if (typeof value === "string") return `"${value}"`;
  if (Array.isArray(value)) return `[${value.map(formatValue).join(", ")}]`;
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return `{ ${entries.map(([k, v]) => `${k}: ${formatValue(v)}`).join(", ")} }`;
  }
  return String(value);
}

function getTypeColor(value: unknown): string {
  if (value === null || value === undefined) return "text-text-muted";
  if (typeof value === "number") return "text-accent-blue";
  if (typeof value === "string") return "text-accent-green";
  if (typeof value === "boolean") return "text-accent-purple";
  if (Array.isArray(value)) return "text-accent-yellow";
  return "text-accent-orange";
}

function getTypeLabel(value: unknown): string {
  if (value === null || value === undefined) return "undef";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

export function VariableViewer() {
  const { currentStep, currentStepIndex, steps } = useAnimation();
  const prevStep = currentStepIndex > 0 ? steps[currentStepIndex - 1] : null;

  if (!currentStep) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-xs text-text-muted">No variables to display</p>
      </div>
    );
  }

  const variables: Variable[] = [];
  const allData = { ...currentStep.data, ...(currentStep.auxiliaryData ?? {}) };
  const prevData = prevStep
    ? { ...prevStep.data, ...(prevStep.auxiliaryData ?? {}) }
    : {};

  for (const [name, value] of Object.entries(allData)) {
    const prevValue = prevData[name];
    const changed = JSON.stringify(value) !== JSON.stringify(prevValue);
    variables.push({ name, value, changed });
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <svg
          className="h-3.5 w-3.5 text-accent-blue"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span className="text-xs font-medium text-text-secondary">
          Variables
        </span>
        <span className="ml-auto text-[10px] text-text-muted">
          Step {currentStepIndex + 1}
        </span>
      </div>

      {/* Variable list */}
      <div className="divide-y divide-border">
        <AnimatePresence>
          {variables.map((variable) => (
            <motion.div
              key={variable.name}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                "flex items-start gap-3 px-4 py-2 transition-colors duration-300",
                variable.changed && "bg-accent-yellow/5",
              )}
            >
              {/* Variable name */}
              <div className="flex shrink-0 items-center gap-1.5">
                <span
                  className={cn(
                    "rounded px-1 py-0.5 text-[10px] font-medium",
                    "bg-elevated text-text-muted",
                  )}
                >
                  {getTypeLabel(variable.value)}
                </span>
                <span className="font-mono text-sm font-medium text-accent-purple">
                  {variable.name}
                </span>
              </div>

              {/* Equals */}
              <span className="shrink-0 pt-px text-xs text-text-muted">=</span>

              {/* Value */}
              <span
                className={cn(
                  "min-w-0 break-all font-mono text-sm",
                  getTypeColor(variable.value),
                  variable.changed && "font-semibold",
                )}
              >
                {formatValue(variable.value)}
              </span>

              {/* Changed indicator */}
              {variable.changed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto shrink-0 rounded-full bg-accent-yellow/20 px-1.5 py-0.5 text-[10px] font-medium text-yellow-400"
                >
                  changed
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
