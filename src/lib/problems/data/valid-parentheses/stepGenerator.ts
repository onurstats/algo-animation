import type { AnimationStep } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

const OPENING = new Set(["(", "{", "["]);
const MATCH_MAP: Record<string, string> = { ")": "(", "}": "{", "]": "[" };

export function generateSteps(
  input: Record<string, unknown>,
): AnimationStep[] {
  const s = input.s as string;
  const chars = s.split("");
  const steps: AnimationStep[] = [];
  let id = 0;

  // Step 0: Introduction
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `Start: s = "${s}". Determine if the parentheses are valid using a stack.`,
      codeLineNumber: 1,
      data: { array: [...chars] },
      auxiliaryData: { stack: [] },
    }),
  );

  // Step 1: Initialize stack and bracket map
  steps.push(
    createStep(id++, {
      action: "highlight",
      description:
        "Initialize an empty stack and a map of closing → opening bracket pairs.",
      codeLineNumber: 2,
      data: { array: [...chars] },
      auxiliaryData: { stack: [] },
    }),
  );

  const stack: string[] = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (OPENING.has(char)) {
      // Examining current character
      steps.push(
        createStep(id++, {
          action: "compare",
          description: `i=${i}: character '${char}' is an opening bracket. Push onto stack.`,
          highlights: [
            ...Array.from({ length: i }, (_, idx) => ({
              index: idx,
              color: "processed" as const,
            })),
            { index: i, color: "current" as const },
          ],
          pointers: [{ index: i, label: "i", color: "current" as const }],
          codeLineNumber: 5,
          data: { array: [...chars], i, char },
          auxiliaryData: { stack: [...stack] },
        }),
      );

      // Push onto stack
      stack.push(char);

      steps.push(
        createStep(id++, {
          action: "push",
          description: `Pushed '${char}' onto stack. Stack: [${stack.map((c) => `'${c}'`).join(", ")}]`,
          highlights: [
            ...Array.from({ length: i }, (_, idx) => ({
              index: idx,
              color: "processed" as const,
            })),
            { index: i, color: "success" as const },
          ],
          pointers: [{ index: i, label: "i", color: "success" as const }],
          codeLineNumber: 6,
          data: { array: [...chars], i, char },
          auxiliaryData: { stack: [...stack] },
        }),
      );
    } else {
      // Closing bracket
      const expected = MATCH_MAP[char];

      steps.push(
        createStep(id++, {
          action: "compare",
          description: `i=${i}: character '${char}' is a closing bracket. Expected matching opening: '${expected}'.`,
          highlights: [
            ...Array.from({ length: i }, (_, idx) => ({
              index: idx,
              color: "processed" as const,
            })),
            { index: i, color: "current" as const },
          ],
          pointers: [{ index: i, label: "i", color: "current" as const }],
          codeLineNumber: 7,
          data: { array: [...chars], i, char, expected },
          auxiliaryData: { stack: [...stack] },
        }),
      );

      const top = stack.length > 0 ? stack[stack.length - 1] : undefined;
      const popped = stack.pop();
      const isMatch = popped === expected;

      if (!isMatch) {
        // Mismatch — invalid
        const reason =
          popped === undefined
            ? `Stack is empty — no matching opening bracket for '${char}'.`
            : `Popped '${popped}' from stack, but expected '${expected}'. Mismatch!`;

        steps.push(
          createStep(id++, {
            action: "not-found",
            description: `${reason} The string is invalid. Return false.`,
            highlights: [
              ...Array.from({ length: i }, (_, idx) => ({
                index: idx,
                color: "processed" as const,
              })),
              { index: i, color: "removed" as const },
            ],
            pointers: [{ index: i, label: "i", color: "removed" as const }],
            codeLineNumber: 8,
            data: { array: [...chars], i, char, expected, result: false },
            auxiliaryData: { stack: [...stack] },
          }),
        );

        return steps;
      }

      // Successful pop and match
      steps.push(
        createStep(id++, {
          action: "pop",
          description: `Popped '${popped}' from stack — matches '${char}'. Stack: [${stack.map((c) => `'${c}'`).join(", ")}]`,
          highlights: [
            ...Array.from({ length: i }, (_, idx) => ({
              index: idx,
              color: "processed" as const,
            })),
            { index: i, color: "success" as const },
          ],
          pointers: [{ index: i, label: "i", color: "success" as const }],
          codeLineNumber: 8,
          data: { array: [...chars], i, char, popped },
          auxiliaryData: { stack: [...stack] },
        }),
      );
    }
  }

  // Final check: is the stack empty?
  const isValid = stack.length === 0;

  if (isValid) {
    steps.push(
      createStep(id++, {
        action: "complete",
        description:
          "All characters processed and stack is empty. The string is valid! Return true.",
        highlights: chars.map((_, idx) => ({
          index: idx,
          color: "success" as const,
        })),
        codeLineNumber: 11,
        data: { array: [...chars], result: true },
        auxiliaryData: { stack: [] },
      }),
    );
  } else {
    steps.push(
      createStep(id++, {
        action: "not-found",
        description: `All characters processed but stack is not empty: [${stack.map((c) => `'${c}'`).join(", ")}]. Unmatched opening brackets remain. Return false.`,
        highlights: chars.map((_, idx) => ({
          index: idx,
          color: "processed" as const,
        })),
        codeLineNumber: 11,
        data: { array: [...chars], result: false },
        auxiliaryData: { stack: [...stack] },
      }),
    );
  }

  return steps;
}
