import type { AnimationStep } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

/*
 * Line reference:
 * 1: function twoSum(nums, target) {
 * 2:   const map = new Map();
 * 3:   for (let i = 0; i < nums.length; i++) {
 * 4:     const complement = target - nums[i];
 * 5:     if (map.has(complement)) {
 * 6:       return [map.get(complement), i];
 * 7:     }
 * 8:     map.set(nums[i], i);
 * 9:   }
 * 10:  return [];
 * 11: }
 */

export function generateSteps(input: Record<string, unknown>): AnimationStep[] {
  const nums = input.nums as number[];
  const target = input.target as number;
  const steps: AnimationStep[] = [];
  let id = 0;

  const map = new Map<number, number>();

  function snap() {
    return Object.fromEntries(map);
  }

  function processed() {
    return Array.from(map.values()).map((idx) => ({
      index: idx,
      color: "processed" as const,
    }));
  }

  // Line 1: function twoSum(nums, target) {
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `twoSum([${nums.join(", ")}], ${target})`,
      codeLineNumber: 1,
      data: { nums: [...nums], target },
      auxiliaryData: { map: {} },
    }),
  );

  // Line 2: const map = new Map();
  steps.push(
    createStep(id++, {
      action: "set",
      description: `const map = new Map()  →  map = {}`,
      codeLineNumber: 2,
      data: { nums: [...nums], target },
      auxiliaryData: { map: {} },
    }),
  );

  for (let i = 0; i < nums.length; i++) {
    // Line 3: for (let i = 0; i < nums.length; i++)  — condition check
    steps.push(
      createStep(id++, {
        action: "traverse",
        description: `for: i = ${i}, i < ${nums.length} → true, entering loop body`,
        highlights: [...processed(), { index: i, color: "current" }],
        pointers: [{ index: i, label: "i", color: "current" }],
        codeLineNumber: 3,
        data: { nums: [...nums], target, i },
        auxiliaryData: { map: snap() },
      }),
    );

    const complement = target - nums[i];

    // Line 4: const complement = target - nums[i];
    steps.push(
      createStep(id++, {
        action: "compare",
        description: `const complement = ${target} - ${nums[i]}  →  complement = ${complement}`,
        highlights: [...processed(), { index: i, color: "current" }],
        pointers: [{ index: i, label: "i", color: "current" }],
        codeLineNumber: 4,
        data: { nums: [...nums], target, i, complement },
        auxiliaryData: { map: snap() },
      }),
    );

    const found = map.has(complement);

    // Line 5: if (map.has(complement))
    steps.push(
      createStep(id++, {
        action: "compare",
        description: `map.has(${complement})  →  ${found}`,
        highlights: [...processed(), { index: i, color: found ? "success" : "current" }],
        pointers: [{ index: i, label: "i", color: found ? "success" : "current" }],
        codeLineNumber: 5,
        data: { nums: [...nums], target, i, complement },
        auxiliaryData: { map: snap() },
      }),
    );

    if (found) {
      const j = map.get(complement)!;

      // Line 6: return [map.get(complement), i];
      steps.push(
        createStep(id++, {
          action: "found",
          description: `return [map.get(${complement}), ${i}]  →  return [${j}, ${i}]`,
          highlights: [
            { index: j, color: "success" },
            { index: i, color: "success" },
          ],
          codeLineNumber: 6,
          data: { nums: [...nums], target, i, complement, result: [j, i] },
          auxiliaryData: { map: snap() },
        }),
      );

      return steps;
    }

    // Line 8: map.set(nums[i], i);
    map.set(nums[i], i);

    steps.push(
      createStep(id++, {
        action: "set",
        description: `map.set(${nums[i]}, ${i})  →  map = {${[...map.entries()].map(([k, v]) => `${k}: ${v}`).join(", ")}}`,
        highlights: processed(),
        pointers: [{ index: i, label: "i", color: "processed" }],
        codeLineNumber: 8,
        data: { nums: [...nums], target, i, complement },
        auxiliaryData: { map: snap() },
      }),
    );
  }

  // Line 3: for condition false (loop ended)
  steps.push(
    createStep(id++, {
      action: "traverse",
      description: `for: i = ${nums.length}, i < ${nums.length} → false, loop ended`,
      highlights: processed(),
      codeLineNumber: 3,
      data: { nums: [...nums], target, i: nums.length },
      auxiliaryData: { map: snap() },
    }),
  );

  // Line 10: return [];
  steps.push(
    createStep(id++, {
      action: "not-found",
      description: `return []  →  no pair found`,
      codeLineNumber: 10,
      data: { nums: [...nums], target, result: [] },
      auxiliaryData: { map: snap() },
    }),
  );

  return steps;
}
