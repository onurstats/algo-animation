import type { AnimationStep } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

export function generateSteps(
  input: Record<string, unknown>,
): AnimationStep[] {
  const nums = input.nums as number[];
  const target = input.target as number;
  const steps: AnimationStep[] = [];
  let id = 0;

  // Track which indices have been eliminated
  const eliminated = new Set<number>();

  // Step 0: Introduction
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `Start: nums = [${nums.join(", ")}], target = ${target}. Search for ${target} using binary search.`,
      codeLineNumber: 1,
      data: {
        array: nums.map((value, index) => ({
          value,
          index,
        })),
        target,
      },
    }),
  );

  // Step 1: Initialize left and right pointers
  let left = 0;
  let right = nums.length - 1;

  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `Initialize pointers: left = ${left}, right = ${right}.`,
      highlights: [
        { index: left, color: "secondary" as const },
        { index: right, color: "secondary" as const },
      ],
      pointers: [
        { index: left, label: "L", color: "secondary" as const },
        { index: right, label: "R", color: "secondary" as const },
      ],
      codeLineNumber: 2,
      data: {
        array: nums.map((value, index) => ({
          value,
          index,
        })),
        target,
        left,
        right,
      },
    }),
  );

  // Binary search loop
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Build highlights: eliminated as processed, left/right as secondary, mid as current
    const buildHighlights = () => {
      const highlights: { index: number; color: "processed" | "secondary" | "current" | "success" }[] = [];
      for (const idx of eliminated) {
        highlights.push({ index: idx, color: "processed" as const });
      }
      if (left !== mid) {
        highlights.push({ index: left, color: "secondary" as const });
      }
      if (right !== mid) {
        highlights.push({ index: right, color: "secondary" as const });
      }
      highlights.push({ index: mid, color: "current" as const });
      return highlights;
    };

    const buildPointers = () => [
      { index: left, label: "L", color: "secondary" as const },
      { index: mid, label: "M", color: "current" as const },
      { index: right, label: "R", color: "secondary" as const },
    ];

    // Calculate mid
    steps.push(
      createStep(id++, {
        action: "compare",
        description: `left = ${left}, right = ${right}. mid = floor((${left} + ${right}) / 2) = ${mid}. nums[${mid}] = ${nums[mid]}.`,
        highlights: buildHighlights(),
        pointers: buildPointers(),
        codeLineNumber: 5,
        data: {
          array: nums.map((value, index) => ({
            value,
            index,
          })),
          target,
          left,
          right,
          mid,
        },
      }),
    );

    if (nums[mid] === target) {
      // Found target
      const finalHighlights: { index: number; color: "processed" | "success" }[] = [];
      for (const idx of eliminated) {
        finalHighlights.push({ index: idx, color: "processed" as const });
      }
      finalHighlights.push({ index: mid, color: "success" as const });

      steps.push(
        createStep(id++, {
          action: "found",
          description: `nums[${mid}] = ${nums[mid]} equals target ${target}. Found! Return index ${mid}.`,
          highlights: finalHighlights,
          pointers: [
            { index: mid, label: "found", color: "success" as const },
          ],
          codeLineNumber: 7,
          data: {
            array: nums.map((value, index) => ({
              value,
              index,
            })),
            target,
            left,
            right,
            mid,
            result: mid,
          },
        }),
      );

      return steps;
    } else if (nums[mid] < target) {
      // Eliminate left half including mid
      for (let i = left; i <= mid; i++) {
        eliminated.add(i);
      }
      left = mid + 1;

      steps.push(
        createStep(id++, {
          action: "compare",
          description: `nums[${mid}] = ${nums[mid]} < ${target}. Target is in the right half. Set left = ${left}.`,
          highlights: [
            ...Array.from(eliminated).map((idx) => ({
              index: idx,
              color: "processed" as const,
            })),
            { index: left, color: "secondary" as const },
            { index: right, color: "secondary" as const },
          ],
          pointers: [
            { index: left, label: "L", color: "secondary" as const },
            { index: right, label: "R", color: "secondary" as const },
          ],
          codeLineNumber: 9,
          data: {
            array: nums.map((value, index) => ({
              value,
              index,
            })),
            target,
            left,
            right,
          },
        }),
      );
    } else {
      // Eliminate right half including mid
      for (let i = mid; i <= right; i++) {
        eliminated.add(i);
      }
      right = mid - 1;

      steps.push(
        createStep(id++, {
          action: "compare",
          description: `nums[${mid}] = ${nums[mid]} > ${target}. Target is in the left half. Set right = ${right}.`,
          highlights: [
            ...Array.from(eliminated).map((idx) => ({
              index: idx,
              color: "processed" as const,
            })),
            { index: left, color: "secondary" as const },
            ...(right >= left
              ? [{ index: right, color: "secondary" as const }]
              : []),
          ],
          pointers: [
            { index: left, label: "L", color: "secondary" as const },
            ...(right >= left
              ? [{ index: right, label: "R", color: "secondary" as const }]
              : []),
          ],
          codeLineNumber: 11,
          data: {
            array: nums.map((value, index) => ({
              value,
              index,
            })),
            target,
            left,
            right,
          },
        }),
      );
    }
  }

  // Target not found
  steps.push(
    createStep(id++, {
      action: "not-found",
      description: `left (${left}) > right (${right}). Search space exhausted. Target ${target} not found. Return -1.`,
      highlights: Array.from(eliminated).map((idx) => ({
        index: idx,
        color: "processed" as const,
      })),
      codeLineNumber: 14,
      data: {
        array: nums.map((value, index) => ({
          value,
          index,
        })),
        target,
        result: -1,
      },
    }),
  );

  return steps;
}
