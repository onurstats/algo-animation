import type { AnimationStep, Highlight, Pointer } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

// Helper: format a node value or null for display
function nodeLabel(nodes: number[], idx: number | null): string {
  return idx !== null && idx >= 0 && idx < nodes.length
    ? `node(${nodes[idx]})`
    : "null";
}

export function generateSteps(
  input: Record<string, unknown>,
): AnimationStep[] {
  const head = input.head as number[];
  const steps: AnimationStep[] = [];
  let id = 0;

  // If empty list, show minimal trace
  if (head.length === 0) {
    steps.push(
      createStep(id++, {
        action: "highlight",
        description:
          "function reverseList(head) — called with head = null (empty list)",
        codeLineNumber: 1,
        data: { nodes: [] },
      }),
    );
    steps.push(
      createStep(id++, {
        action: "set",
        description: "let prev = null → prev = null",
        codeLineNumber: 2,
        data: { nodes: [] },
        auxiliaryData: { prev: null, curr: null, next: null },
      }),
    );
    steps.push(
      createStep(id++, {
        action: "set",
        description: "let curr = head → curr = null",
        codeLineNumber: 3,
        data: { nodes: [] },
        auxiliaryData: { prev: null, curr: null, next: null },
      }),
    );
    steps.push(
      createStep(id++, {
        action: "compare",
        description: "while (curr !== null) → null !== null → false — skip loop",
        codeLineNumber: 4,
        data: { nodes: [] },
        auxiliaryData: { prev: null, curr: null, next: null },
      }),
    );
    steps.push(
      createStep(id++, {
        action: "complete",
        description: "return prev → return null — reversed list is empty",
        codeLineNumber: 10,
        data: { nodes: [] },
        auxiliaryData: { prev: null, curr: null, next: null },
      }),
    );
    return steps;
  }

  const nodes = [...head];

  // Track simulation state as indices (null means null pointer)
  let prevIdx: number | null = null;
  let currIdx: number | null = 0;
  let nextIdx: number | null = null;

  // Helper to build highlights for current state
  function buildHighlights(): Highlight[] {
    const h: Highlight[] = [];
    // Already-reversed nodes shown as success
    if (prevIdx !== null) {
      for (let i = prevIdx; i >= 0; i--) {
        if (i !== currIdx && i !== nextIdx) {
          h.push({ index: i, color: "success" as const });
        }
      }
    }
    if (currIdx !== null) {
      h.push({ index: currIdx, color: "current" as const });
    }
    if (nextIdx !== null) {
      h.push({ index: nextIdx, color: "secondary" as const });
    }
    return h;
  }

  // Helper to build pointers for current state
  function buildPointers(): Pointer[] {
    const p: Pointer[] = [];
    if (prevIdx !== null) {
      p.push({ index: prevIdx, label: "prev", color: "success" as const });
    }
    if (currIdx !== null) {
      p.push({ index: currIdx, label: "curr", color: "current" as const });
    }
    if (nextIdx !== null) {
      p.push({ index: nextIdx, label: "next", color: "secondary" as const });
    }
    return p;
  }

  function auxData() {
    return {
      prev: prevIdx !== null ? nodes[prevIdx] : null,
      curr: currIdx !== null ? nodes[currIdx] : null,
      next: nextIdx !== null ? nodes[nextIdx] : null,
    };
  }

  // ── Line 1: function reverseList(head) ──
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `function reverseList(head) — called with head = [${head.join(" → ")}]`,
      codeLineNumber: 1,
      data: { nodes: [...nodes] },
    }),
  );

  // ── Line 2: let prev = null ──
  steps.push(
    createStep(id++, {
      action: "set",
      description: "let prev = null → prev = null",
      codeLineNumber: 2,
      data: { nodes: [...nodes] },
      auxiliaryData: { prev: null, curr: null, next: null },
    }),
  );

  // ── Line 3: let curr = head ──
  steps.push(
    createStep(id++, {
      action: "set",
      description: `let curr = head → curr = ${nodeLabel(nodes, currIdx)}`,
      codeLineNumber: 3,
      pointers: [
        { index: 0, label: "curr", color: "current" as const },
      ],
      highlights: [{ index: 0, color: "current" as const }],
      data: { nodes: [...nodes] },
      auxiliaryData: { prev: null, curr: nodes[0], next: null },
    }),
  );

  // ── While loop iterations ──
  while (currIdx !== null && currIdx < nodes.length) {
    // ── Line 4: while (curr !== null) — condition TRUE ──
    steps.push(
      createStep(id++, {
        action: "compare",
        description: `while (curr !== null) → ${nodeLabel(nodes, currIdx)} !== null → true`,
        codeLineNumber: 4,
        highlights: buildHighlights(),
        pointers: buildPointers(),
        data: { nodes: [...nodes] },
        auxiliaryData: auxData(),
      }),
    );

    // ── Line 5: const next = curr.next ──
    nextIdx = currIdx + 1 < nodes.length ? currIdx + 1 : null;
    steps.push(
      createStep(id++, {
        action: "traverse",
        description: `const next = curr.next → next = ${nodeLabel(nodes, nextIdx)}`,
        codeLineNumber: 5,
        highlights: buildHighlights(),
        pointers: buildPointers(),
        data: { nodes: [...nodes] },
        auxiliaryData: auxData(),
      }),
    );

    // ── Line 6: curr.next = prev ──
    steps.push(
      createStep(id++, {
        action: "update",
        description: `curr.next = prev → ${nodeLabel(nodes, currIdx)}.next = ${nodeLabel(nodes, prevIdx)}`,
        codeLineNumber: 6,
        highlights: buildHighlights(),
        pointers: buildPointers(),
        data: { nodes: [...nodes] },
        auxiliaryData: auxData(),
      }),
    );

    // ── Line 7: prev = curr ──
    prevIdx = currIdx;
    steps.push(
      createStep(id++, {
        action: "move-pointer",
        description: `prev = curr → prev = ${nodeLabel(nodes, prevIdx)}`,
        codeLineNumber: 7,
        highlights: buildHighlights(),
        pointers: buildPointers(),
        data: { nodes: [...nodes] },
        auxiliaryData: auxData(),
      }),
    );

    // ── Line 8: curr = next ──
    currIdx = nextIdx;
    nextIdx = null;
    steps.push(
      createStep(id++, {
        action: "move-pointer",
        description: `curr = next → curr = ${nodeLabel(nodes, currIdx)}`,
        codeLineNumber: 8,
        highlights: buildHighlights(),
        pointers: buildPointers(),
        data: { nodes: [...nodes] },
        auxiliaryData: auxData(),
      }),
    );

    // ── Line 9: } (end of while body, loop back to condition) ──
    // Not a separate step — the while condition check at the top of the
    // next iteration (or the false-check after the last iteration) covers line 4.
  }

  // ── Line 4: while (curr !== null) — condition FALSE ──
  steps.push(
    createStep(id++, {
      action: "compare",
      description: "while (curr !== null) → null !== null → false — exit loop",
      codeLineNumber: 4,
      highlights:
        prevIdx !== null
          ? nodes.map((_, i) => ({
              index: i,
              color: "success" as const,
            }))
          : [],
      pointers:
        prevIdx !== null
          ? [{ index: prevIdx, label: "prev", color: "success" as const }]
          : [],
      data: { nodes: [...nodes] },
      auxiliaryData: {
        prev: prevIdx !== null ? nodes[prevIdx] : null,
        curr: null,
        next: null,
      },
    }),
  );

  // ── Line 10: return prev ──
  const reversed = [...nodes].reverse();
  steps.push(
    createStep(id++, {
      action: "complete",
      description: `return prev → return ${nodeLabel(nodes, prevIdx)} — reversed list: [${reversed.join(" → ")}]`,
      codeLineNumber: 10,
      highlights: nodes.map((_, i) => ({
        index: i,
        color: "success" as const,
      })),
      pointers:
        prevIdx !== null
          ? [{ index: prevIdx, label: "prev", color: "success" as const }]
          : [],
      data: { nodes: reversed },
      auxiliaryData: {
        prev: prevIdx !== null ? nodes[prevIdx] : null,
        curr: null,
        next: null,
        result: reversed,
      },
    }),
  );

  return steps;
}
