import type { AnimationStep } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

/*
 * Line reference:
 * 1:  function isValid(s) {
 * 2:    const stack = [];
 * 3:    const map = { ')': '(', '}': '{', ']': '[' };
 * 4:    for (let i = 0; i < s.length; i++) {
 * 5:      if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
 * 6:        stack.push(s[i]);
 * 7:      } else {
 * 8:        if (stack.pop() !== map[s[i]]) return false;
 * 9:      }
 * 10:   }
 * 11:   return stack.length === 0;
 * 12: }
 */

export function generateSteps(
  input: Record<string, unknown>,
): AnimationStep[] {
  const s = input.s as string;
  const chars = s.split("");
  const steps: AnimationStep[] = [];
  let id = 0;

  const stack: string[] = [];

  function processedHighlights(upTo: number) {
    return Array.from({ length: upTo }, (_, idx) => ({
      index: idx,
      color: "processed" as const,
    }));
  }

  function stackStr() {
    return `[${stack.map((c) => `'${c}'`).join(", ")}]`;
  }

  // Line 1: function isValid(s) {
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `isValid("${s}")`,
      codeLineNumber: 1,
      data: { array: [...chars] },
      auxiliaryData: { stack: [] },
    }),
  );

  // Line 2: const stack = [];
  steps.push(
    createStep(id++, {
      action: "set",
      description: `const stack = []  →  stack = []`,
      codeLineNumber: 2,
      data: { array: [...chars] },
      auxiliaryData: { stack: [] },
    }),
  );

  // Line 3: const map = { ')': '(', '}': '{', ']': '[' };
  steps.push(
    createStep(id++, {
      action: "set",
      description: `const map = { ')': '(', '}': '{', ']': '[' }`,
      codeLineNumber: 3,
      data: { array: [...chars] },
      auxiliaryData: { stack: [] },
    }),
  );

  const MATCH_MAP: Record<string, string> = { ")": "(", "}": "{", "]": "[" };

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const isOpening = char === "(" || char === "{" || char === "[";

    // Line 4: for (let i = 0; i < s.length; i++) — condition true
    steps.push(
      createStep(id++, {
        action: "traverse",
        description: `for: i = ${i}, i < ${chars.length} → true`,
        highlights: [...processedHighlights(i), { index: i, color: "current" }],
        pointers: [{ index: i, label: "i", color: "current" }],
        codeLineNumber: 4,
        data: { array: [...chars], i },
        auxiliaryData: { stack: [...stack] },
      }),
    );

    // Line 5: if (s[i] === '(' || s[i] === '{' || s[i] === '[')
    steps.push(
      createStep(id++, {
        action: "compare",
        description: `s[${i}] === '(' || s[${i}] === '{' || s[${i}] === '['  →  '${char}' is ${isOpening ? "opening" : "closing"}  →  ${isOpening}`,
        highlights: [...processedHighlights(i), { index: i, color: "current" }],
        pointers: [{ index: i, label: "i", color: "current" }],
        codeLineNumber: 5,
        data: { array: [...chars], i, char },
        auxiliaryData: { stack: [...stack] },
      }),
    );

    if (isOpening) {
      // Line 6: stack.push(s[i]);
      stack.push(char);

      steps.push(
        createStep(id++, {
          action: "push",
          description: `stack.push('${char}')  →  stack = ${stackStr()}`,
          highlights: [
            ...processedHighlights(i),
            { index: i, color: "success" },
          ],
          pointers: [{ index: i, label: "i", color: "success" }],
          codeLineNumber: 6,
          data: { array: [...chars], i, char },
          auxiliaryData: { stack: [...stack] },
        }),
      );
    } else {
      // Line 8: if (stack.pop() !== map[s[i]]) return false;
      const expected = MATCH_MAP[char];
      const popped = stack.length > 0 ? stack.pop() : undefined;
      const isMatch = popped === expected;

      if (!isMatch) {
        const popDesc =
          popped === undefined
            ? `stack.pop() → undefined`
            : `stack.pop() → '${popped}'`;

        steps.push(
          createStep(id++, {
            action: "not-found",
            description: `${popDesc} !== map['${char}']('${expected}')  →  true  →  return false`,
            highlights: [
              ...processedHighlights(i),
              { index: i, color: "removed" },
            ],
            pointers: [{ index: i, label: "i", color: "removed" }],
            codeLineNumber: 8,
            data: { array: [...chars], i, char, result: false },
            auxiliaryData: { stack: [...stack] },
          }),
        );

        return steps;
      }

      // Match succeeded — pop happened but condition is false, no return
      steps.push(
        createStep(id++, {
          action: "pop",
          description: `stack.pop() → '${popped}' !== map['${char}']('${expected}')  →  false  →  continue  →  stack = ${stackStr()}`,
          highlights: [
            ...processedHighlights(i),
            { index: i, color: "success" },
          ],
          pointers: [{ index: i, label: "i", color: "success" }],
          codeLineNumber: 8,
          data: { array: [...chars], i, char },
          auxiliaryData: { stack: [...stack] },
        }),
      );
    }
  }

  // Line 4: for condition false (loop ended)
  steps.push(
    createStep(id++, {
      action: "traverse",
      description: `for: i = ${chars.length}, i < ${chars.length} → false, loop ended`,
      highlights: processedHighlights(chars.length),
      codeLineNumber: 4,
      data: { array: [...chars], i: chars.length },
      auxiliaryData: { stack: [...stack] },
    }),
  );

  // Line 11: return stack.length === 0;
  const isValid = stack.length === 0;

  steps.push(
    createStep(id++, {
      action: isValid ? "complete" : "not-found",
      description: `return stack.length === 0  →  ${stack.length} === 0  →  ${isValid}`,
      highlights: chars.map((_, idx) => ({
        index: idx,
        color: isValid ? ("success" as const) : ("processed" as const),
      })),
      codeLineNumber: 11,
      data: { array: [...chars], result: isValid },
      auxiliaryData: { stack: [...stack] },
    }),
  );

  return steps;
}
