"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import type { TestCase } from "@/lib/types";

interface InputField {
  name: string;
  label: string;
  type: "array" | "number" | "string" | "matrix" | "linked-list";
  defaultValue: unknown;
}

interface CustomInputFormProps {
  fields: InputField[];
  testCases?: TestCase[];
  onRun: (values: Record<string, unknown>) => void;
}

function parseValue(raw: string, type: InputField["type"]): unknown {
  try {
    switch (type) {
      case "array":
      case "matrix":
      case "linked-list":
        return JSON.parse(raw);
      case "number":
        return Number(raw);
      case "string":
        return raw;
      default:
        return raw;
    }
  } catch {
    return raw;
  }
}

function formatDefault(value: unknown): string {
  if (Array.isArray(value) || typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value ?? "");
}

export function CustomInputForm({
  fields,
  testCases = [],
  onRun,
}: CustomInputFormProps) {
  const [mode, setMode] = useState<"test-cases" | "custom">(
    testCases.length > 0 ? "test-cases" : "custom",
  );
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const field of fields) {
      initial[field.name] = formatDefault(field.defaultValue);
    }
    return initial;
  });

  function handleRunCustom() {
    const parsed: Record<string, unknown> = {};
    for (const field of fields) {
      parsed[field.name] = parseValue(values[field.name], field.type);
    }
    onRun(parsed);
  }

  function handleRunTestCase(index: number) {
    setSelectedTestCase(index);
    onRun(testCases[index].input);
  }

  function loadTestCaseIntoCustom(index: number) {
    const tc = testCases[index];
    const newValues: Record<string, string> = {};
    for (const field of fields) {
      newValues[field.name] = formatDefault(tc.input[field.name] ?? field.defaultValue);
    }
    setValues(newValues);
    setMode("custom");
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      {/* Mode toggle */}
      <div className="flex items-center gap-2">
        <svg
          className="h-3.5 w-3.5 text-accent-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-xs font-medium text-text-secondary">Input</span>

        {testCases.length > 0 && (
          <div className="ml-auto flex rounded-lg bg-elevated p-0.5">
            <button
              onClick={() => setMode("test-cases")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                mode === "test-cases"
                  ? "bg-accent-blue text-white"
                  : "text-text-secondary hover:text-foreground",
              )}
            >
              Test Cases
            </button>
            <button
              onClick={() => setMode("custom")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                mode === "custom"
                  ? "bg-accent-blue text-white"
                  : "text-text-secondary hover:text-foreground",
              )}
            >
              Custom
            </button>
          </div>
        )}
      </div>

      {mode === "test-cases" && testCases.length > 0 ? (
        /* Test case selector */
        <div className="flex flex-col gap-2">
          {testCases.map((tc, i) => (
            <button
              key={i}
              onClick={() => handleRunTestCase(i)}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors",
                selectedTestCase === i
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
                    loadTestCaseIntoCustom(i);
                  }}
                  className="rounded p-1 text-text-muted hover:bg-elevated hover:text-foreground"
                  title="Edit this test case"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Custom input fields */
        <>
          <div className="flex flex-col gap-2">
            {fields.map((field) => (
              <div key={field.name} className="flex items-center gap-2">
                <label
                  htmlFor={`input-${field.name}`}
                  className="w-24 shrink-0 text-right font-mono text-xs text-text-muted"
                >
                  {field.label}
                </label>
                <input
                  id={`input-${field.name}`}
                  type="text"
                  value={values[field.name]}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                  className="flex-1 rounded-lg border border-border bg-elevated px-3 py-1.5 font-mono text-sm text-foreground placeholder:text-text-muted focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  placeholder={field.label}
                />
              </div>
            ))}
          </div>
          <Button size="sm" onClick={handleRunCustom} className="self-end">
            Run
          </Button>
        </>
      )}
    </div>
  );
}

export type { InputField };
