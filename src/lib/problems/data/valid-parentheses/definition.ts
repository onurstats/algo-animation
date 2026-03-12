import type { Problem } from "@/lib/types";

export const validParenthesesProblem: Problem = {
  slug: "valid-parentheses",
  title: "Valid Parentheses",
  number: 20,
  difficulty: "Easy",
  description:
    "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
  examples: [
    {
      input: 's = "()"',
      output: "true",
    },
    {
      input: 's = "()[]{}"',
      output: "true",
    },
    {
      input: 's = "(]"',
      output: "false",
    },
    {
      input: 's = "([)]"',
      output: "false",
      explanation:
        "The brackets are not closed in the correct order. '[' is closed by ')' instead of ']'.",
    },
  ],
  constraints: [
    "1 <= s.length <= 10^4",
    "s consists of parentheses only '()[]{}'",
  ],
  dataStructures: ["string", "stack"],
  patterns: ["stack-based"],
  tags: ["String", "Stack"],
  leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  solutions: [
    {
      language: "javascript",
      code: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i]);
    } else {
      if (stack.pop() !== map[s[i]]) return false;
    }
  }
  return stack.length === 0;
}`,
      lineCount: 12,
    },
    {
      language: "python",
      code: `def isValid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in '({[':
            stack.append(char)
        else:
            if not stack or stack.pop() != pairs[char]:
                return False
    return len(stack) == 0`,
      lineCount: 10,
    },
  ],
  testCases: [
    {
      input: { s: "()" },
      expected: true,
      description: "Simple matching pair",
    },
    {
      input: { s: "()[]{}" },
      expected: true,
      description: "Multiple matching pairs",
    },
    {
      input: { s: "(]" },
      expected: false,
      description: "Mismatched brackets",
    },
    {
      input: { s: "([)]" },
      expected: false,
      description: "Incorrect nesting order",
    },
  ],
  defaultInput: { s: "()[]{}" },
};
