"use client";

import { AnimationProvider } from "@/components/animation/AnimationProvider";
import { AnimationCanvas } from "@/components/animation/AnimationCanvas";
import { PlaybackControls } from "@/components/animation/PlaybackControls";
import { StepIndicator } from "@/components/animation/StepIndicator";
import { StepDescription } from "@/components/animation/StepDescription";
import { Navbar } from "@/components/layout/Navbar";
import type { AnimationStep } from "@/lib/types";

const mockSteps: AnimationStep[] = [
  {
    id: 0,
    action: "highlight",
    description: "Start: array = [2, 7, 11, 15], target = 9. We need to find two numbers that add up to 9.",
    highlights: [],
    pointers: [],
    codeLineNumber: 1,
    data: { array: [2, 7, 11, 15] },
  },
  {
    id: 1,
    action: "compare",
    description: "Check nums[0] = 2. We need 9 - 2 = 7. Is 7 in our hash map? No.",
    highlights: [{ index: 0, color: "current" }],
    pointers: [{ index: 0, label: "i", color: "current" }],
    codeLineNumber: 3,
    data: { array: [2, 7, 11, 15] },
    auxiliaryData: { hashMap: {} },
  },
  {
    id: 2,
    action: "set",
    description: "Store nums[0] = 2 → index 0 in hash map.",
    highlights: [{ index: 0, color: "processed" }],
    pointers: [{ index: 0, label: "i", color: "processed" }],
    codeLineNumber: 5,
    data: { array: [2, 7, 11, 15] },
    auxiliaryData: { hashMap: { "2": 0 } },
  },
  {
    id: 3,
    action: "compare",
    description: "Check nums[1] = 7. We need 9 - 7 = 2. Is 2 in our hash map? Yes!",
    highlights: [
      { index: 0, color: "processed" },
      { index: 1, color: "current" },
    ],
    pointers: [{ index: 1, label: "i", color: "current" }],
    codeLineNumber: 3,
    data: { array: [2, 7, 11, 15] },
    auxiliaryData: { hashMap: { "2": 0 } },
  },
  {
    id: 4,
    action: "found",
    description: "Found! nums[0] + nums[1] = 2 + 7 = 9. Return [0, 1].",
    highlights: [
      { index: 0, color: "success" },
      { index: 1, color: "success" },
    ],
    pointers: [],
    codeLineNumber: 4,
    data: { array: [2, 7, 11, 15] },
  },
];

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 p-6">
        <h1 className="text-2xl font-bold text-foreground">Dev Playground</h1>
        <p className="text-sm text-text-secondary">
          Testing ArrayVisualizer with Two Sum mock steps. Use Space to play, arrows to step.
        </p>

        <AnimationProvider steps={mockSteps}>
          <div className="flex min-h-[300px] flex-col gap-4">
            <div className="flex-1">
              <AnimationCanvas dataStructure="array" />
            </div>
            <StepDescription />
            <StepIndicator />
            <PlaybackControls />
          </div>
        </AnimationProvider>
      </main>
    </div>
  );
}
