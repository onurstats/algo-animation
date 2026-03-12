import type { Problem } from "@/lib/types";

export const reverseLinkedListProblem: Problem = {
  slug: "reverse-linked-list",
  title: "Reverse Linked List",
  number: 206,
  difficulty: "Easy",
  description:
    "Given the head of a singly linked list, reverse the list, and return the reversed list.",
  examples: [
    {
      input: "head = [1,2,3,4,5]",
      output: "[5,4,3,2,1]",
    },
    {
      input: "head = [1,2]",
      output: "[2,1]",
    },
    {
      input: "head = []",
      output: "[]",
    },
  ],
  constraints: [
    "The number of nodes in the list is the range [0, 5000].",
    "-5000 <= Node.val <= 5000",
  ],
  dataStructures: ["linked-list"],
  patterns: ["recursion"],
  tags: ["Linked List", "Recursion"],
  leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  solutions: [
    {
      language: "javascript",
      code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
      lineCount: 11,
    },
    {
      language: "python",
      code: `def reverseList(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
      lineCount: 9,
    },
  ],
  testCases: [
    {
      input: { head: [1, 2, 3, 4, 5] },
      expected: [5, 4, 3, 2, 1],
      description: "Standard case",
    },
    {
      input: { head: [1, 2] },
      expected: [2, 1],
      description: "Two elements",
    },
    {
      input: { head: [1] },
      expected: [1],
      description: "Single element",
    },
  ],
  defaultInput: { head: [1, 2, 3, 4, 5] },
};
