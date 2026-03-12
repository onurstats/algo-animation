import type { AnimationStep } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

export function generateSteps(input: Record<string, unknown>): AnimationStep[] {
  const nums = input.nums as number[];
  const target = input.target as number;
  const steps: AnimationStep[] = [];
  let id = 0;

  // Step 0: Introduction
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `Start: nums = [${nums.join(", ")}], target = ${target}. Find two numbers that add up to ${target}.`,
      codeLineNumber: 1,
      data: { nums: [...nums], target },
      auxiliaryData: { map: {} },
    }),
  );

  // Step 1: Initialize map
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: "Initialize an empty hash map to store {value → index} pairs.",
      codeLineNumber: 2,
      data: { nums: [...nums], target },
      auxiliaryData: { map: {} },
    }),
  );

  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    const mapObj = Object.fromEntries(map);

    // Check complement
    steps.push(
      createStep(id++, {
        action: "compare",
        description: `i=${i}: nums[${i}] = ${nums[i]}. Complement = ${target} - ${nums[i]} = ${complement}. Is ${complement} in the map? ${map.has(complement) ? "Yes!" : "No."}`,
        highlights: [
          ...Array.from(map.values()).map((idx) => ({
            index: idx,
            color: "processed" as const,
          })),
          { index: i, color: "current" as const },
        ],
        pointers: [{ index: i, label: "i", color: "current" as const }],
        codeLineNumber: 4,
        data: { nums: [...nums], target, i, complement },
        auxiliaryData: { map: { ...mapObj } },
      }),
    );

    if (map.has(complement)) {
      const j = map.get(complement)!;

      // Found!
      steps.push(
        createStep(id++, {
          action: "found",
          description: `Found! nums[${j}] + nums[${i}] = ${nums[j]} + ${nums[i]} = ${target}. Return [${j}, ${i}].`,
          highlights: [
            { index: j, color: "success" as const },
            { index: i, color: "success" as const },
          ],
          codeLineNumber: 6,
          data: { nums: [...nums], target, i, complement, result: [j, i] },
          auxiliaryData: { map: { ...mapObj } },
        }),
      );

      return steps;
    }

    // Store in map
    map.set(nums[i], i);
    const updatedMapObj = Object.fromEntries(map);

    steps.push(
      createStep(id++, {
        action: "set",
        description: `${complement} not found. Store nums[${i}]=${nums[i]} → index ${i} in map.`,
        highlights: [
          ...Array.from(map.values()).map((idx) => ({
            index: idx,
            color: "processed" as const,
          })),
        ],
        pointers: [{ index: i, label: "i", color: "processed" as const }],
        codeLineNumber: 8,
        data: { nums: [...nums], target, i, complement },
        auxiliaryData: { map: { ...updatedMapObj } },
      }),
    );
  }

  // No solution found
  steps.push(
    createStep(id++, {
      action: "not-found",
      description: "No two numbers add up to target. Return empty array.",
      codeLineNumber: 10,
      data: { nums: [...nums], target, result: [] },
      auxiliaryData: { map: Object.fromEntries(map) },
    }),
  );

  return steps;
}
