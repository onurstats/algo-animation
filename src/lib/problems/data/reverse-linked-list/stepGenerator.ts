import type { AnimationStep } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

export function generateSteps(
  input: Record<string, unknown>,
): AnimationStep[] {
  const head = input.head as number[];
  const steps: AnimationStep[] = [];
  let id = 0;

  // Step 0: Introduction
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `Start: head = [${head.join(" → ")}]. Reverse the linked list using iterative pointer manipulation.`,
      codeLineNumber: 1,
      data: { nodes: [...head] },
    }),
  );

  // Step 1: Initialize prev = null, curr = head
  steps.push(
    createStep(id++, {
      action: "set",
      description: `Initialize prev = null, curr = node(${head[0]}).`,
      pointers: [{ index: 0, label: "curr", color: "current" as const }],
      codeLineNumber: 2,
      data: { nodes: [...head] },
      auxiliaryData: { prev: null, curr: 0 },
    }),
  );

  // Simulate the reversal
  // We track which nodes have been reversed so far.
  const nodes = [...head];
  let prevIdx: number | null = null;
  let currIdx: number | null = 0;

  while (currIdx !== null && currIdx < nodes.length) {
    const nextIdx: number | null =
      currIdx + 1 < nodes.length ? currIdx + 1 : null;

    // Step: Save next pointer
    const nextLabel =
      nextIdx !== null ? `node(${nodes[nextIdx]})` : "null";
    steps.push(
      createStep(id++, {
        action: "traverse",
        description: `Save next = ${nextLabel}. Current node is ${nodes[currIdx]}.`,
        highlights: [
          { index: currIdx, color: "current" as const },
          ...(nextIdx !== null
            ? [{ index: nextIdx, color: "secondary" as const }]
            : []),
          // Show already-reversed nodes as success
          ...Array.from({ length: currIdx }, (_, i) => ({
            index: i,
            color: "success" as const,
          })),
        ],
        pointers: [
          ...(prevIdx !== null
            ? [{ index: prevIdx, label: "prev", color: "success" as const }]
            : []),
          { index: currIdx, label: "curr", color: "current" as const },
          ...(nextIdx !== null
            ? [{ index: nextIdx, label: "next", color: "secondary" as const }]
            : []),
        ],
        codeLineNumber: 5,
        data: { nodes: [...nodes] },
        auxiliaryData: { prev: prevIdx, curr: currIdx, next: nextIdx },
      }),
    );

    // Step: Reverse the link (curr.next = prev)
    const prevLabel =
      prevIdx !== null ? `node(${nodes[prevIdx]})` : "null";
    steps.push(
      createStep(id++, {
        action: "update",
        description: `Reverse link: node(${nodes[currIdx]}).next = ${prevLabel}.`,
        highlights: [
          { index: currIdx, color: "current" as const },
          ...(prevIdx !== null
            ? [{ index: prevIdx, color: "success" as const }]
            : []),
          ...Array.from({ length: currIdx }, (_, i) => ({
            index: i,
            color: "success" as const,
          })),
        ],
        pointers: [
          ...(prevIdx !== null
            ? [{ index: prevIdx, label: "prev", color: "success" as const }]
            : []),
          { index: currIdx, label: "curr", color: "current" as const },
          ...(nextIdx !== null
            ? [{ index: nextIdx, label: "next", color: "secondary" as const }]
            : []),
        ],
        codeLineNumber: 6,
        data: { nodes: [...nodes] },
        auxiliaryData: { prev: prevIdx, curr: currIdx, next: nextIdx },
      }),
    );

    // Step: Move prev and curr forward
    const newPrevIdx = currIdx;
    const newCurrIdx: number | null = nextIdx;

    steps.push(
      createStep(id++, {
        action: "move-pointer",
        description: `Move prev to node(${nodes[newPrevIdx]})${newCurrIdx !== null ? `, curr to node(${nodes[newCurrIdx]})` : ", curr = null"}.`,
        highlights: [
          // All nodes up to and including newPrevIdx are reversed
          ...Array.from({ length: newPrevIdx + 1 }, (_, i) => ({
            index: i,
            color: "success" as const,
          })),
          ...(newCurrIdx !== null
            ? [{ index: newCurrIdx, color: "current" as const }]
            : []),
        ],
        pointers: [
          { index: newPrevIdx, label: "prev", color: "success" as const },
          ...(newCurrIdx !== null
            ? [
                {
                  index: newCurrIdx,
                  label: "curr",
                  color: "current" as const,
                },
              ]
            : []),
        ],
        codeLineNumber: 8,
        data: { nodes: [...nodes] },
        auxiliaryData: { prev: newPrevIdx, curr: newCurrIdx },
      }),
    );

    prevIdx = newPrevIdx;
    currIdx = newCurrIdx;
  }

  // Final step: Return reversed list
  const reversed = [...nodes].reverse();
  steps.push(
    createStep(id++, {
      action: "complete",
      description: `Done! Reversed list: [${reversed.join(" → ")}]. Return prev.`,
      highlights: nodes.map((_, i) => ({
        index: i,
        color: "success" as const,
      })),
      codeLineNumber: 10,
      data: { nodes: reversed },
      auxiliaryData: { result: reversed },
    }),
  );

  return steps;
}
