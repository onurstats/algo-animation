"use client";

import { AnimationProvider } from "@/components/animation/AnimationProvider";
import { AnimationCanvas } from "@/components/animation/AnimationCanvas";
import { PlaybackControls } from "@/components/animation/PlaybackControls";
import { StepIndicator } from "@/components/animation/StepIndicator";
import { StepDescription } from "@/components/animation/StepDescription";
import { CodePanel } from "@/components/code/CodePanel";
import { VariableViewer } from "@/components/code/VariableViewer";
import { Navbar } from "@/components/layout/Navbar";
import type { AnimationStep } from "@/lib/types";

const twoSumCode = `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`;

const mockSteps: AnimationStep[] = [
  {
    id: 0,
    action: "highlight",
    description:
      "Start: nums = [2, 7, 11, 15], target = 9. We need two numbers that add up to 9.",
    highlights: [],
    pointers: [],
    codeLineNumber: 1,
    data: { nums: [2, 7, 11, 15], target: 9 },
    auxiliaryData: { map: {} },
  },
  {
    id: 1,
    action: "highlight",
    description: "Initialize an empty hash map to store {value → index} pairs.",
    highlights: [],
    pointers: [],
    codeLineNumber: 2,
    data: { nums: [2, 7, 11, 15], target: 9, i: 0 },
    auxiliaryData: { map: {} },
  },
  {
    id: 2,
    action: "compare",
    description:
      "i=0: nums[0] = 2. Complement = 9 - 2 = 7. Is 7 in the map? No.",
    highlights: [{ index: 0, color: "current" }],
    pointers: [{ index: 0, label: "i", color: "current" }],
    codeLineNumber: 4,
    data: { nums: [2, 7, 11, 15], target: 9, i: 0, complement: 7 },
    auxiliaryData: { map: {} },
  },
  {
    id: 3,
    action: "set",
    description: "7 not found. Store nums[0]=2 → index 0 in map.",
    highlights: [{ index: 0, color: "processed" }],
    pointers: [{ index: 0, label: "i", color: "processed" }],
    codeLineNumber: 8,
    data: { nums: [2, 7, 11, 15], target: 9, i: 0, complement: 7 },
    auxiliaryData: { map: { "2": 0 } },
  },
  {
    id: 4,
    action: "compare",
    description:
      "i=1: nums[1] = 7. Complement = 9 - 7 = 2. Is 2 in the map? Yes! map[2] = 0.",
    highlights: [
      { index: 0, color: "processed" },
      { index: 1, color: "current" },
    ],
    pointers: [{ index: 1, label: "i", color: "current" }],
    codeLineNumber: 5,
    data: { nums: [2, 7, 11, 15], target: 9, i: 1, complement: 2 },
    auxiliaryData: { map: { "2": 0 } },
  },
  {
    id: 5,
    action: "found",
    description:
      "Found the pair! Return [map.get(2), i] = [0, 1]. nums[0] + nums[1] = 2 + 7 = 9.",
    highlights: [
      { index: 0, color: "success" },
      { index: 1, color: "success" },
    ],
    pointers: [],
    codeLineNumber: 6,
    data: { nums: [2, 7, 11, 15], target: 9, i: 1, complement: 2, result: [0, 1] },
    auxiliaryData: { map: { "2": 0 } },
  },
];

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-6">
        <h1 className="text-2xl font-bold text-foreground">Dev Playground</h1>
        <p className="text-sm text-text-secondary">
          Two Sum — debugger view. Use Space to play, arrow keys to step, 1-4
          for speed.
        </p>

        <AnimationProvider steps={mockSteps}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Left: Visualization */}
            <div className="flex flex-col gap-4">
              <div className="min-h-[250px]">
                <AnimationCanvas dataStructure="array" />
              </div>
              <StepDescription />
            </div>

            {/* Right: Code + Variables (debugger) */}
            <div className="flex flex-col gap-4">
              <CodePanel code={twoSumCode} language="javascript" />
              <VariableViewer />
            </div>
          </div>

          {/* Bottom: Playback */}
          <StepIndicator />
          <PlaybackControls />
        </AnimationProvider>
      </main>
    </div>
  );
}
