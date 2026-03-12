"use client";

import { useEffect, useState } from "react";
import { codeToTokens, type ThemedToken } from "shiki";
import { useAnimationStore } from "@/stores/animationStore";
import { cn } from "@/lib/utils/cn";

interface CodePanelProps {
  code: string;
  language?: string;
}

export function CodePanel({ code, language = "javascript" }: CodePanelProps) {
  const currentStepIndex = useAnimationStore((s) => s.currentStepIndex);
  const steps = useAnimationStore((s) => s.steps);
  const currentStep = steps[currentStepIndex] ?? null;
  const activeLine = currentStep?.codeLineNumber ?? -1;

  const [tokenLines, setTokenLines] = useState<ThemedToken[][] | null>(null);

  useEffect(() => {
    codeToTokens(code, {
      lang: language as "javascript",
      theme: "github-dark-default",
    }).then((result) => setTokenLines(result.tokens));
  }, [code, language]);

  const lines = code.split("\n");

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs font-medium text-text-secondary">
          {language}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Code body */}
      <div className="overflow-auto p-0">
        <pre className="text-sm leading-7">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isActive = lineNum === activeLine;
            const tokens = tokenLines?.[idx];

            return (
              <div
                key={idx}
                className={cn(
                  "flex transition-colors duration-150",
                  isActive
                    ? "bg-accent-blue/15 border-l-2 border-accent-blue"
                    : "border-l-2 border-transparent",
                )}
              >
                {/* Line number */}
                <span
                  className={cn(
                    "inline-block w-12 shrink-0 select-none px-3 text-right font-mono text-xs leading-7",
                    isActive ? "text-accent-blue" : "text-text-muted",
                  )}
                >
                  {lineNum}
                </span>

                {/* Breakpoint / active indicator */}
                <span className="inline-flex w-5 shrink-0 items-center justify-center">
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-accent-blue shadow-[0_0_6px_rgba(59,130,246,0.5)]" />
                  )}
                </span>

                {/* Code with syntax highlighting */}
                <code className="flex-1 pr-4 font-mono">
                  {tokens
                    ? tokens.map((token, i) => (
                        <span key={i} style={{ color: token.color }}>
                          {token.content}
                        </span>
                      ))
                    : line || " "}
                </code>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
