import type { AnimationStep } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

/**
 * Swap entire subtrees rooted at leftIdx and rightIdx in a level-order array.
 * Returns a new array with the subtrees swapped.
 */
function swapSubtrees(
  nodes: (number | null)[],
  parentIndex: number,
): (number | null)[] {
  const result = [...nodes];
  const leftIdx = 2 * parentIndex + 1;
  const rightIdx = 2 * parentIndex + 2;

  // Collect all indices in a subtree via BFS
  function collectSubtree(rootIdx: number): number[] {
    const indices: number[] = [];
    const queue = [rootIdx];
    while (queue.length > 0) {
      const idx = queue.shift()!;
      if (idx >= result.length) continue;
      indices.push(idx);
      const l = 2 * idx + 1;
      const r = 2 * idx + 2;
      if (l < result.length) queue.push(l);
      if (r < result.length) queue.push(r);
    }
    return indices;
  }

  const leftIndices = collectSubtree(leftIdx);
  const rightIndices = collectSubtree(rightIdx);

  const leftValues = leftIndices.map((i) => nodes[i] ?? null);
  const rightValues = rightIndices.map((i) => nodes[i] ?? null);

  const maxLen = Math.max(leftIndices.length, rightIndices.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < leftIndices.length) {
      result[leftIndices[i]] = i < rightValues.length ? rightValues[i] : null;
    }
    if (i < rightIndices.length) {
      result[rightIndices[i]] = i < leftValues.length ? leftValues[i] : null;
    }
  }

  return result;
}

/**
 * Format a node value for display: "node(4)" or "null".
 */
function fmt(val: number | null | undefined): string {
  return val === null || val === undefined ? "null" : `node(${val})`;
}

/**
 * Generate debugger-style line-by-line animation steps for inverting a binary tree.
 *
 * Traces the recursive invertTree function using post-order DFS.
 * Every line of code execution produces exactly one animation step.
 *
 * Solution code (line numbers for codeLineNumber):
 *   Line 1: function invertTree(root) {
 *   Line 2:   if (root === null) return null;
 *   Line 3:   const left = invertTree(root.left);
 *   Line 4:   const right = invertTree(root.right);
 *   Line 5:   root.left = right;
 *   Line 6:   root.right = left;
 *   Line 7:   return root;
 *   Line 8: }
 */
export function generateSteps(
  input: Record<string, unknown>,
): AnimationStep[] {
  const rootArray = input.root as (number | null)[];
  const steps: AnimationStep[] = [];
  let id = 0;

  if (!rootArray || rootArray.length === 0) {
    steps.push(
      createStep(id++, {
        action: "highlight",
        description: "The tree is empty. Nothing to invert.",
        codeLineNumber: 2,
        data: { nodes: [] },
      }),
    );
    return steps;
  }

  // Working copy of the level-order array — mutated as swaps happen
  let nodes = [...rootArray];

  /**
   * Recursively trace invertTree for the node at `nodeIndex` in the level-order array.
   * `depth` tracks the current recursion depth for the call stack display.
   * `callStack` is the current stack of node values being processed.
   */
  function trace(
    nodeIndex: number,
    depth: number,
    callStack: string[],
  ): void {
    const nodeVal =
      nodeIndex < nodes.length ? nodes[nodeIndex] : null;
    const isNull = nodeVal === null || nodeVal === undefined;

    const indent = "  ".repeat(depth);
    const stackLabel = callStack.join(" → ");

    // --- Line 1: function invertTree(root) { ---
    steps.push(
      createStep(id++, {
        action: "traverse",
        description: `${indent}invertTree(${fmt(nodeVal)}) called`,
        codeLineNumber: 1,
        highlights: isNull
          ? []
          : [{ index: nodeIndex, color: "current" as const }],
        data: { nodes: [...nodes], currentNode: isNull ? null : nodeIndex },
        auxiliaryData: {
          depth,
          callStack: [...callStack],
          stackLabel: `Call stack: ${stackLabel}`,
        },
      }),
    );

    // --- Line 2: if (root === null) return null; ---
    if (isNull) {
      steps.push(
        createStep(id++, {
          action: "highlight",
          description: `${indent}root === null → true, return null`,
          codeLineNumber: 2,
          highlights: [],
          data: { nodes: [...nodes], currentNode: null },
          auxiliaryData: {
            depth,
            callStack: [...callStack],
            stackLabel: `Call stack: ${stackLabel}`,
          },
        }),
      );
      return;
    }

    // Node exists — null check is false
    steps.push(
      createStep(id++, {
        action: "highlight",
        description: `${indent}root === null → false (root = ${fmt(nodeVal)})`,
        codeLineNumber: 2,
        highlights: [{ index: nodeIndex, color: "current" as const }],
        data: { nodes: [...nodes], currentNode: nodeIndex },
        auxiliaryData: {
          depth,
          callStack: [...callStack],
          stackLabel: `Call stack: ${stackLabel}`,
        },
      }),
    );

    const leftIdx = 2 * nodeIndex + 1;
    const rightIdx = 2 * nodeIndex + 2;
    const leftVal = leftIdx < nodes.length ? nodes[leftIdx] : null;

    // --- Line 3: const left = invertTree(root.left); ---
    steps.push(
      createStep(id++, {
        action: "traverse",
        description: `${indent}const left = invertTree(${fmt(nodeVal)}.left) → invertTree(${fmt(leftVal)})`,
        codeLineNumber: 3,
        highlights: [
          { index: nodeIndex, color: "current" as const },
          ...(leftVal !== null && leftVal !== undefined
            ? [{ index: leftIdx, color: "comparing" as const }]
            : []),
        ],
        data: { nodes: [...nodes], currentNode: nodeIndex },
        auxiliaryData: {
          depth,
          callStack: [...callStack],
          stackLabel: `Call stack: ${stackLabel}`,
        },
      }),
    );

    // Recurse into left child
    trace(leftIdx, depth + 1, [...callStack, `L:${fmt(leftVal)}`]);

    // --- Line 4: const right = invertTree(root.right); ---
    // Re-read rightVal since tree may have been modified by left recursion (shouldn't affect right subtree, but be safe)
    const currentRightVal = rightIdx < nodes.length ? nodes[rightIdx] : null;

    steps.push(
      createStep(id++, {
        action: "traverse",
        description: `${indent}const right = invertTree(${fmt(nodeVal)}.right) → invertTree(${fmt(currentRightVal)})`,
        codeLineNumber: 4,
        highlights: [
          { index: nodeIndex, color: "current" as const },
          ...(currentRightVal !== null && currentRightVal !== undefined
            ? [{ index: rightIdx, color: "comparing" as const }]
            : []),
        ],
        data: { nodes: [...nodes], currentNode: nodeIndex },
        auxiliaryData: {
          depth,
          callStack: [...callStack],
          stackLabel: `Call stack: ${stackLabel}`,
        },
      }),
    );

    // Recurse into right child
    trace(rightIdx, depth + 1, [...callStack, `R:${fmt(currentRightVal)}`]);

    // --- Line 5: root.left = right; ---
    // Before the swap, read current children
    const preSwapLeft = leftIdx < nodes.length ? nodes[leftIdx] : null;
    const preSwapRight = rightIdx < nodes.length ? nodes[rightIdx] : null;

    steps.push(
      createStep(id++, {
        action: "swap",
        description: `${indent}${fmt(nodeVal)}.left = right → ${fmt(nodeVal)}.left = ${fmt(preSwapRight)}`,
        codeLineNumber: 5,
        highlights: [
          { index: nodeIndex, color: "current" as const },
          ...(preSwapRight !== null && preSwapRight !== undefined
            ? [{ index: rightIdx, color: "comparing" as const }]
            : []),
          ...(preSwapLeft !== null && preSwapLeft !== undefined
            ? [{ index: leftIdx, color: "secondary" as const }]
            : []),
        ],
        data: { nodes: [...nodes], currentNode: nodeIndex },
        auxiliaryData: {
          depth,
          callStack: [...callStack],
          stackLabel: `Call stack: ${stackLabel}`,
          swap: {
            leftBefore: preSwapLeft,
            rightBefore: preSwapRight,
          },
        },
      }),
    );

    // --- Line 6: root.right = left; ---
    steps.push(
      createStep(id++, {
        action: "swap",
        description: `${indent}${fmt(nodeVal)}.right = left → ${fmt(nodeVal)}.right = ${fmt(preSwapLeft)}`,
        codeLineNumber: 6,
        highlights: [
          { index: nodeIndex, color: "current" as const },
          ...(preSwapLeft !== null && preSwapLeft !== undefined
            ? [{ index: leftIdx, color: "comparing" as const }]
            : []),
          ...(preSwapRight !== null && preSwapRight !== undefined
            ? [{ index: rightIdx, color: "secondary" as const }]
            : []),
        ],
        data: { nodes: [...nodes], currentNode: nodeIndex },
        auxiliaryData: {
          depth,
          callStack: [...callStack],
          stackLabel: `Call stack: ${stackLabel}`,
          swap: {
            leftBefore: preSwapLeft,
            rightBefore: preSwapRight,
          },
        },
      }),
    );

    // Perform the actual swap in the level-order array
    nodes = swapSubtrees(nodes, nodeIndex);

    const postSwapLeft = leftIdx < nodes.length ? nodes[leftIdx] : null;
    const postSwapRight = rightIdx < nodes.length ? nodes[rightIdx] : null;

    // --- Line 7: return root; ---
    steps.push(
      createStep(id++, {
        action: "highlight",
        description: `${indent}return ${fmt(nodeVal)} (children now: left=${fmt(postSwapLeft)}, right=${fmt(postSwapRight)})`,
        codeLineNumber: 7,
        highlights: [
          { index: nodeIndex, color: "success" as const },
          ...(postSwapLeft !== null && postSwapLeft !== undefined
            ? [{ index: leftIdx, color: "success" as const }]
            : []),
          ...(postSwapRight !== null && postSwapRight !== undefined
            ? [{ index: rightIdx, color: "success" as const }]
            : []),
        ],
        data: { nodes: [...nodes], currentNode: nodeIndex },
        auxiliaryData: {
          depth,
          callStack: [...callStack],
          stackLabel: `Call stack: ${stackLabel}`,
        },
      }),
    );
  }

  // Start the recursive trace from the root
  const rootVal = nodes[0];
  trace(0, 0, [`invertTree(${fmt(rootVal)})`]);

  // Final completion step
  steps.push(
    createStep(id++, {
      action: "complete",
      description: `Inversion complete! The inverted tree is [${nodes.filter((n) => n !== null).join(", ")}].`,
      codeLineNumber: 8,
      data: { nodes: [...nodes] },
      auxiliaryData: {
        depth: 0,
        callStack: [],
        stackLabel: "Done",
      },
    }),
  );

  return steps;
}
