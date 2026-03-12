"use client";

import { useState, useCallback } from "react";
import { AnimationProvider } from "@/components/animation/AnimationProvider";
import { AnimationCanvas } from "@/components/animation/AnimationCanvas";
import { PlaybackControls } from "@/components/animation/PlaybackControls";
import { StepIndicator } from "@/components/animation/StepIndicator";
import { StepDescription } from "@/components/animation/StepDescription";
import { CodePanel } from "@/components/code/CodePanel";
import { VariableViewer } from "@/components/code/VariableViewer";
import { ProblemHeader } from "./ProblemHeader";
import { ProblemDescription } from "./ProblemDescription";
import { ComplexityDisplay } from "./ComplexityDisplay";
import { CustomInputForm, type InputField } from "./CustomInputForm";
import type { Problem, AnimationStep, Language } from "@/lib/types";

interface ProblemPageLayoutProps {
  problem: Problem;
  initialSteps: AnimationStep[];
  inputFields: InputField[];
  generateSteps: (input: Record<string, unknown>) => AnimationStep[];
}

export function ProblemPageLayout({
  problem,
  initialSteps,
  inputFields,
  generateSteps,
}: ProblemPageLayoutProps) {
  const [language, setLanguage] = useState<Language>("javascript");
  const [steps, setSteps] = useState<AnimationStep[]>(initialSteps);

  const handleRun = useCallback(
    (input: Record<string, unknown>) => {
      const newSteps = generateSteps(input);
      setSteps(newSteps);
    },
    [generateSteps],
  );

  const solution =
    problem.solutions.find((s) => s.language === language) ??
    problem.solutions[0];

  const primaryDataStructure = problem.dataStructures[0] ?? "array";

  return (
    <AnimationProvider steps={steps}>
      <div className="flex flex-col gap-6">
        <ProblemHeader problem={problem} />

        {/* Playback toolbar — top for easy access */}
        <PlaybackControls />
        <StepIndicator />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Left column: visualization */}
          <div className="flex flex-col gap-4">
            <div className="min-h-[280px]">
              <AnimationCanvas dataStructure={primaryDataStructure} />
            </div>
            <StepDescription />
          </div>

          {/* Right column: code debugger */}
          <div className="flex flex-col gap-4">
            {/* Language tabs */}
            <div className="flex gap-1">
              {problem.solutions.map((sol) => (
                <button
                  key={sol.language}
                  onClick={() => setLanguage(sol.language)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    language === sol.language
                      ? "bg-accent-blue text-white"
                      : "text-text-secondary hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  {sol.language}
                </button>
              ))}
            </div>
            <CodePanel code={solution.code} language={solution.language} />
            <VariableViewer />
          </div>
        </div>

        {/* Input + Problem details */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProblemDescription problem={problem} />
          </div>
          <div className="flex flex-col gap-4">
            <CustomInputForm
              fields={inputFields}
              testCases={problem.testCases}
              onRun={handleRun}
            />
            <ComplexityDisplay
              timeComplexity={problem.timeComplexity}
              spaceComplexity={problem.spaceComplexity}
            />
          </div>
        </div>
      </div>
    </AnimationProvider>
  );
}
