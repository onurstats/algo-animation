"use client";

import { useCallback } from "react";
import { ProblemPageLayout } from "@/components/problem/ProblemPageLayout";
import type { InputField } from "@/components/problem/CustomInputForm";
import type { Problem, AnimationStep } from "@/lib/types";

// Dynamically import step generators per problem
const stepGenerators: Record<
  string,
  (input: Record<string, unknown>) => AnimationStep[]
> = {};

// Lazy-load step generators
async function loadGenerator(slug: string) {
  if (stepGenerators[slug]) return stepGenerators[slug];
  const mod = await import(`@/lib/problems/data/${slug}/stepGenerator`);
  stepGenerators[slug] = mod.generateSteps;
  return mod.generateSteps;
}

// Input field definitions per problem slug
const inputFieldsMap: Record<string, InputField[]> = {
  "two-sum": [
    { name: "nums", label: "nums", type: "array", defaultValue: [2, 7, 11, 15] },
    { name: "target", label: "target", type: "number", defaultValue: 9 },
  ],
  "valid-parentheses": [
    { name: "s", label: "s", type: "string", defaultValue: "()[]{}" },
  ],
  "binary-search": [
    { name: "nums", label: "nums", type: "array", defaultValue: [-1, 0, 3, 5, 9, 12] },
    { name: "target", label: "target", type: "number", defaultValue: 9 },
  ],
  "reverse-linked-list": [
    { name: "head", label: "head", type: "array", defaultValue: [1, 2, 3, 4, 5] },
  ],
  "invert-binary-tree": [
    { name: "root", label: "root", type: "array", defaultValue: [4, 2, 7, 1, 3, 6, 9] },
  ],
  "maximum-subarray": [
    { name: "nums", label: "nums", type: "array", defaultValue: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
  ],
  "climbing-stairs": [
    { name: "n", label: "n", type: "number", defaultValue: 5 },
  ],
  "best-time-to-buy-and-sell-stock": [
    { name: "prices", label: "prices", type: "array", defaultValue: [7, 1, 5, 3, 6, 4] },
  ],
  "merge-two-sorted-lists": [
    { name: "list1", label: "list1", type: "array", defaultValue: [1, 2, 4] },
    { name: "list2", label: "list2", type: "array", defaultValue: [1, 3, 4] },
  ],
  "3sum": [
    { name: "nums", label: "nums", type: "array", defaultValue: [-1, 0, 1, 2, -1, -4] },
  ],
};

interface ProblemPageClientProps {
  problem: Problem;
  initialSteps: AnimationStep[];
}

export function ProblemPageClient({ problem, initialSteps }: ProblemPageClientProps) {
  const fields = inputFieldsMap[problem.slug] ?? [];

  const generateSteps = useCallback(
    (input: Record<string, unknown>) => {
      // Synchronous import since module is already loaded at this point
      // Fall back to initial steps if generator not yet loaded
      const gen = stepGenerators[problem.slug];
      if (gen) return gen(input);

      // Trigger lazy load for next time
      loadGenerator(problem.slug);
      return initialSteps;
    },
    [problem.slug, initialSteps],
  );

  // Pre-load the generator
  loadGenerator(problem.slug);

  return (
    <ProblemPageLayout
      problem={problem}
      initialSteps={initialSteps}
      inputFields={fields}
      generateSteps={generateSteps}
    />
  );
}
