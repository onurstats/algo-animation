import type { AnimationStep, Highlight, Pointer } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

/*
 * Line reference (JavaScript solution):
 * 1:  function search(nums, target) {
 * 2:    let left = 0;
 * 3:    let right = nums.length - 1;
 * 4:    while (left <= right) {
 * 5:      const mid = Math.floor((left + right) / 2);
 * 6:      if (nums[mid] === target) {
 * 7:        return mid;
 * 8:      } else if (nums[mid] < target) {
 * 9:        left = mid + 1;
 * 10:     } else {
 * 11:       right = mid - 1;
 * 12:     }
 * 13:   }
 * 14:   return -1;
 * 15: }
 */

export function generateSteps(
  input: Record<string, unknown>,
): AnimationStep[] {
  const nums = input.nums as number[];
  const target = input.target as number;
  const steps: AnimationStep[] = [];
  let id = 0;

  const eliminated = new Set<number>();

  function processedHighlights(): Highlight[] {
    return Array.from(eliminated).map((idx) => ({
      index: idx,
      color: "processed" as const,
    }));
  }

  function buildHighlights(
    left: number,
    right: number,
    mid?: number,
  ): Highlight[] {
    const h: Highlight[] = processedHighlights();
    if (mid !== undefined) {
      if (left !== mid) h.push({ index: left, color: "secondary" });
      if (right !== mid) h.push({ index: right, color: "secondary" });
      h.push({ index: mid, color: "current" });
    } else {
      h.push({ index: left, color: "secondary" });
      if (right >= 0 && right < nums.length) {
        h.push({ index: right, color: "secondary" });
      }
    }
    return h;
  }

  function buildPointers(
    left: number,
    right: number,
    mid?: number,
  ): Pointer[] {
    const p: Pointer[] = [
      { index: left, label: "L", color: "secondary" },
    ];
    if (mid !== undefined) {
      p.push({ index: mid, label: "M", color: "current" });
    }
    if (right >= 0 && right < nums.length) {
      p.push({ index: right, label: "R", color: "secondary" });
    }
    return p;
  }

  // Line 1: function search(nums, target) {
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `search([${nums.join(", ")}], ${target})`,
      codeLineNumber: 1,
      data: { nums: [...nums], target },
    }),
  );

  // Line 2: let left = 0;
  let left = 0;
  steps.push(
    createStep(id++, {
      action: "set",
      description: `let left = 0  →  left = 0`,
      codeLineNumber: 2,
      highlights: [{ index: 0, color: "secondary" }],
      pointers: [{ index: 0, label: "L", color: "secondary" }],
      data: { nums: [...nums], target, left },
    }),
  );

  // Line 3: let right = nums.length - 1;
  let right = nums.length - 1;
  steps.push(
    createStep(id++, {
      action: "set",
      description: `let right = ${nums.length} - 1  →  right = ${right}`,
      codeLineNumber: 3,
      highlights: [
        { index: left, color: "secondary" },
        { index: right, color: "secondary" },
      ],
      pointers: [
        { index: left, label: "L", color: "secondary" },
        { index: right, label: "R", color: "secondary" },
      ],
      data: { nums: [...nums], target, left, right },
    }),
  );

  // Binary search loop
  while (left <= right) {
    // Line 4: while (left <= right) — condition true
    steps.push(
      createStep(id++, {
        action: "compare",
        description: `while (left <= right)  →  ${left} <= ${right}  →  true`,
        codeLineNumber: 4,
        highlights: buildHighlights(left, right),
        pointers: buildPointers(left, right),
        data: { nums: [...nums], target, left, right },
      }),
    );

    // Line 5: const mid = Math.floor((left + right) / 2);
    const mid = Math.floor((left + right) / 2);
    steps.push(
      createStep(id++, {
        action: "set",
        description: `const mid = Math.floor((${left} + ${right}) / 2)  →  mid = ${mid}`,
        codeLineNumber: 5,
        highlights: buildHighlights(left, right, mid),
        pointers: buildPointers(left, right, mid),
        data: { nums: [...nums], target, left, right, mid },
      }),
    );

    if (nums[mid] === target) {
      // Line 6: if (nums[mid] === target) — true
      steps.push(
        createStep(id++, {
          action: "compare",
          description: `nums[${mid}] === ${target}  →  ${nums[mid]} === ${target}  →  true`,
          codeLineNumber: 6,
          highlights: [
            ...processedHighlights(),
            { index: mid, color: "success" },
          ],
          pointers: buildPointers(left, right, mid),
          data: { nums: [...nums], target, left, right, mid },
        }),
      );

      // Line 7: return mid;
      steps.push(
        createStep(id++, {
          action: "found",
          description: `return ${mid}  →  target ${target} found at index ${mid}`,
          codeLineNumber: 7,
          highlights: [
            ...processedHighlights(),
            { index: mid, color: "success" },
          ],
          pointers: [{ index: mid, label: "found", color: "success" }],
          data: { nums: [...nums], target, left, right, mid, result: mid },
        }),
      );

      return steps;
    } else if (nums[mid] < target) {
      // Line 6: if (nums[mid] === target) — false
      steps.push(
        createStep(id++, {
          action: "compare",
          description: `nums[${mid}] === ${target}  →  ${nums[mid]} === ${target}  →  false`,
          codeLineNumber: 6,
          highlights: buildHighlights(left, right, mid),
          pointers: buildPointers(left, right, mid),
          data: { nums: [...nums], target, left, right, mid },
        }),
      );

      // Line 8: else if (nums[mid] < target) — true
      steps.push(
        createStep(id++, {
          action: "compare",
          description: `nums[${mid}] < ${target}  →  ${nums[mid]} < ${target}  →  true`,
          codeLineNumber: 8,
          highlights: buildHighlights(left, right, mid),
          pointers: buildPointers(left, right, mid),
          data: { nums: [...nums], target, left, right, mid },
        }),
      );

      // Eliminate left half including mid
      for (let i = left; i <= mid; i++) {
        eliminated.add(i);
      }

      // Line 9: left = mid + 1;
      left = mid + 1;
      steps.push(
        createStep(id++, {
          action: "move-pointer",
          description: `left = ${mid} + 1  →  left = ${left}`,
          codeLineNumber: 9,
          highlights: [
            ...processedHighlights(),
            ...(left < nums.length
              ? [{ index: left, color: "secondary" as const }]
              : []),
            ...(right < nums.length
              ? [{ index: right, color: "secondary" as const }]
              : []),
          ],
          pointers: buildPointers(left, right),
          data: { nums: [...nums], target, left, right },
        }),
      );
    } else {
      // Line 6: if (nums[mid] === target) — false
      steps.push(
        createStep(id++, {
          action: "compare",
          description: `nums[${mid}] === ${target}  →  ${nums[mid]} === ${target}  →  false`,
          codeLineNumber: 6,
          highlights: buildHighlights(left, right, mid),
          pointers: buildPointers(left, right, mid),
          data: { nums: [...nums], target, left, right, mid },
        }),
      );

      // Line 8: else if (nums[mid] < target) — false
      steps.push(
        createStep(id++, {
          action: "compare",
          description: `nums[${mid}] < ${target}  →  ${nums[mid]} < ${target}  →  false`,
          codeLineNumber: 8,
          highlights: buildHighlights(left, right, mid),
          pointers: buildPointers(left, right, mid),
          data: { nums: [...nums], target, left, right, mid },
        }),
      );

      // Line 10: else {  (implicit — nums[mid] > target)
      steps.push(
        createStep(id++, {
          action: "highlight",
          description: `else: nums[${mid}] > ${target}  →  ${nums[mid]} > ${target}  →  true`,
          codeLineNumber: 10,
          highlights: buildHighlights(left, right, mid),
          pointers: buildPointers(left, right, mid),
          data: { nums: [...nums], target, left, right, mid },
        }),
      );

      // Eliminate right half including mid
      for (let i = mid; i <= right; i++) {
        eliminated.add(i);
      }

      // Line 11: right = mid - 1;
      right = mid - 1;
      steps.push(
        createStep(id++, {
          action: "move-pointer",
          description: `right = ${mid} - 1  →  right = ${right}`,
          codeLineNumber: 11,
          highlights: [
            ...processedHighlights(),
            ...(left < nums.length
              ? [{ index: left, color: "secondary" as const }]
              : []),
            ...(right >= 0
              ? [{ index: right, color: "secondary" as const }]
              : []),
          ],
          pointers: buildPointers(left, right),
          data: { nums: [...nums], target, left, right },
        }),
      );
    }
  }

  // Line 4: while (left <= right) — condition false (loop ends)
  steps.push(
    createStep(id++, {
      action: "compare",
      description: `while (left <= right)  →  ${left} <= ${right}  →  false, loop ended`,
      codeLineNumber: 4,
      highlights: processedHighlights(),
      data: { nums: [...nums], target, left, right },
    }),
  );

  // Line 14: return -1;
  steps.push(
    createStep(id++, {
      action: "not-found",
      description: `return -1  →  target ${target} not found`,
      codeLineNumber: 14,
      highlights: processedHighlights(),
      data: { nums: [...nums], target, result: -1 },
    }),
  );

  return steps;
}
