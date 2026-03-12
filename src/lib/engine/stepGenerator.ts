import type { AnimationStep } from "@/lib/types";

export interface StepGenerator {
  generate(input: Record<string, unknown>): AnimationStep[];
}

export function createStep(
  id: number,
  overrides: Partial<AnimationStep> & Pick<AnimationStep, "action" | "description">,
): AnimationStep {
  return {
    id,
    highlights: [],
    pointers: [],
    codeLineNumber: 0,
    data: {},
    ...overrides,
  };
}
