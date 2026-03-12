import type { AnimationStep } from "@/lib/types";
import { createStep } from "@/lib/engine/stepGenerator";

/**
 * Convert a level-order array into an array-based binary tree representation.
 * Index 0 is root; for node at index i, left child = 2i+1, right child = 2i+2.
 */
function toLevelOrder(nodes: (number | null)[]): (number | null)[] {
  return [...nodes];
}

/**
 * Swap children of a node at the given index in a level-order array.
 * Swaps the entire subtrees rooted at the left and right children.
 */
function swapChildren(
  nodes: (number | null)[],
  parentIndex: number,
): (number | null)[] {
  const result = [...nodes];
  const leftIdx = 2 * parentIndex + 1;
  const rightIdx = 2 * parentIndex + 2;

  // Collect all indices in the left and right subtrees
  function collectSubtree(rootIdx: number): number[] {
    const indices: number[] = [];
    const queue = [rootIdx];
    while (queue.length > 0) {
      const idx = queue.shift()!;
      if (idx >= nodes.length) break;
      indices.push(idx);
      const l = 2 * idx + 1;
      const r = 2 * idx + 2;
      if (l < nodes.length) queue.push(l);
      if (r < nodes.length) queue.push(r);
    }
    return indices;
  }

  const leftSubtreeIndices = collectSubtree(leftIdx);
  const rightSubtreeIndices = collectSubtree(rightIdx);

  // Build maps of relative positions to values
  const leftValues = leftSubtreeIndices.map((i) => nodes[i] ?? null);
  const rightValues = rightSubtreeIndices.map((i) => nodes[i] ?? null);

  // Place right subtree values into left subtree positions and vice versa
  const maxLen = Math.max(leftSubtreeIndices.length, rightSubtreeIndices.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < leftSubtreeIndices.length) {
      result[leftSubtreeIndices[i]] =
        i < rightValues.length ? rightValues[i] : null;
    }
    if (i < rightSubtreeIndices.length) {
      result[rightSubtreeIndices[i]] =
        i < leftValues.length ? leftValues[i] : null;
    }
  }

  return result;
}

/**
 * Generate animation steps for inverting a binary tree.
 * Uses BFS to visit each node and swap its children, producing
 * a step-by-step visualization of the inversion process.
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

  let nodes = toLevelOrder(rootArray);

  // Step: Introduction
  steps.push(
    createStep(id++, {
      action: "highlight",
      description: `Start: binary tree with nodes [${nodes.filter((n) => n !== null).join(", ")}]. We will invert the tree by swapping left and right children at every node.`,
      codeLineNumber: 1,
      data: { nodes: [...nodes] },
    }),
  );

  // Single node — nothing to swap
  if (rootArray.length === 1) {
    steps.push(
      createStep(id++, {
        action: "complete",
        description: `Tree has only one node (${rootArray[0]}). No children to swap. The tree is already inverted.`,
        codeLineNumber: 7,
        data: { nodes: [...nodes] },
      }),
    );
    return steps;
  }

  // BFS traversal to visit each node and swap its children
  const queue: number[] = [0];

  while (queue.length > 0) {
    const nodeIndex = queue.shift()!;
    const nodeVal = nodes[nodeIndex];

    if (nodeVal === null || nodeVal === undefined) continue;

    const leftIdx = 2 * nodeIndex + 1;
    const rightIdx = 2 * nodeIndex + 2;
    const leftVal =
      leftIdx < nodes.length ? nodes[leftIdx] : null;
    const rightVal =
      rightIdx < nodes.length ? nodes[rightIdx] : null;

    const hasLeft = leftVal !== null && leftVal !== undefined;
    const hasRight = rightVal !== null && rightVal !== undefined;

    // Step: Visiting node
    steps.push(
      createStep(id++, {
        action: "traverse",
        description: `Visit node ${nodeVal}. Left child: ${hasLeft ? leftVal : "none"}, Right child: ${hasRight ? rightVal : "none"}.`,
        highlights: [{ index: nodeIndex, color: "current" }],
        codeLineNumber: 2,
        data: { nodes: [...nodes], currentNode: nodeIndex },
      }),
    );

    if (!hasLeft && !hasRight) {
      // Leaf node — no children to swap
      steps.push(
        createStep(id++, {
          action: "highlight",
          description: `Node ${nodeVal} is a leaf node. No children to swap.`,
          highlights: [{ index: nodeIndex, color: "processed" }],
          codeLineNumber: 2,
          data: { nodes: [...nodes], currentNode: nodeIndex },
        }),
      );
    } else {
      // Step: Highlight children before swap
      const childHighlights = [];
      if (hasLeft) {
        childHighlights.push({ index: leftIdx, color: "comparing" as const });
      }
      if (hasRight) {
        childHighlights.push({ index: rightIdx, color: "comparing" as const });
      }

      steps.push(
        createStep(id++, {
          action: "compare",
          description: `Preparing to swap children of node ${nodeVal}: left (${hasLeft ? leftVal : "none"}) and right (${hasRight ? rightVal : "none"}).`,
          highlights: [
            { index: nodeIndex, color: "current" },
            ...childHighlights,
          ],
          codeLineNumber: 3,
          data: { nodes: [...nodes], currentNode: nodeIndex },
        }),
      );

      // Perform the swap
      nodes = swapChildren(nodes, nodeIndex);

      const newLeftVal =
        leftIdx < nodes.length ? nodes[leftIdx] : null;
      const newRightVal =
        rightIdx < nodes.length ? nodes[rightIdx] : null;

      // Step: After swap
      steps.push(
        createStep(id++, {
          action: "swap",
          description: `Swapped children of node ${nodeVal}. Now left: ${newLeftVal ?? "none"}, right: ${newRightVal ?? "none"}.`,
          highlights: [
            { index: nodeIndex, color: "success" },
            ...(newLeftVal !== null && newLeftVal !== undefined
              ? [{ index: leftIdx, color: "success" as const }]
              : []),
            ...(newRightVal !== null && newRightVal !== undefined
              ? [{ index: rightIdx, color: "success" as const }]
              : []),
          ],
          codeLineNumber: 5,
          data: { nodes: [...nodes], currentNode: nodeIndex },
        }),
      );
    }

    // Enqueue children for further processing
    if (leftIdx < nodes.length && nodes[leftIdx] !== null && nodes[leftIdx] !== undefined) {
      queue.push(leftIdx);
    }
    if (rightIdx < nodes.length && nodes[rightIdx] !== null && nodes[rightIdx] !== undefined) {
      queue.push(rightIdx);
    }
  }

  // Step: Complete
  steps.push(
    createStep(id++, {
      action: "complete",
      description: `Inversion complete! The inverted tree is [${nodes.filter((n) => n !== null).join(", ")}].`,
      codeLineNumber: 7,
      data: { nodes: [...nodes] },
    }),
  );

  return steps;
}
