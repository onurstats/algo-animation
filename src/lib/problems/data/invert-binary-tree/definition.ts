import type { Problem } from "@/lib/types";

export const invertBinaryTreeProblem: Problem = {
  slug: "invert-binary-tree",
  title: "Invert Binary Tree",
  number: 226,
  difficulty: "Easy",
  description:
    "Given the root of a binary tree, invert the tree, and return its root. Inverting a binary tree means swapping the left and right children of every node in the tree.",
  examples: [
    {
      input: "root = [4,2,7,1,3,6,9]",
      output: "[4,7,2,9,6,3,1]",
      explanation:
        "Every node's left and right children are swapped, producing the mirror image of the original tree.",
    },
    {
      input: "root = [2,1,3]",
      output: "[2,3,1]",
    },
    {
      input: "root = [1]",
      output: "[1]",
      explanation: "A single node has no children to swap.",
    },
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 100].",
    "-100 <= Node.val <= 100",
  ],
  dataStructures: ["tree"],
  patterns: ["dfs"],
  tags: ["Tree", "DFS", "Recursion"],
  leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  solutions: [
    {
      language: "javascript",
      code: `function invertTree(root) {
  if (root === null) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}`,
      lineCount: 8,
    },
    {
      language: "python",
      code: `def invertTree(root):
    if not root:
        return None
    left = invertTree(root.left)
    right = invertTree(root.right)
    root.left = right
    root.right = left
    return root`,
      lineCount: 8,
    },
  ],
  testCases: [
    {
      input: { root: [4, 2, 7, 1, 3, 6, 9] },
      expected: [4, 7, 2, 9, 6, 3, 1],
      description: "Complete tree",
    },
    {
      input: { root: [2, 1, 3] },
      expected: [2, 3, 1],
      description: "Small tree",
    },
    {
      input: { root: [1] },
      expected: [1],
      description: "Single node",
    },
  ],
  defaultInput: { root: [4, 2, 7, 1, 3, 6, 9] },
};
