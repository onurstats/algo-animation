"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { TestCaseSelector } from "./TestCaseSelector";
import { parseValue, formatDefault } from "@/lib/utils/inputParsing";
import type { InputField } from "@/lib/utils/inputParsing";
import type { TestCase } from "@/lib/types";

interface CustomInputFormProps {
  fields: InputField[];
  testCases?: TestCase[];
  onRun: (values: Record<string, unknown>) => void;
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
      newValues[field.name] = formatDefault(
        tc.input[field.name] ?? field.defaultValue,
      );
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
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
        <TestCaseSelector
          testCases={testCases}
          selectedIndex={selectedTestCase}
          onSelect={handleRunTestCase}
          onEdit={loadTestCaseIntoCustom}
        />
      ) : (
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
