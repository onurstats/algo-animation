import type { Problem } from "@/lib/types";

export const twoSumProblem: Problem = {
  slug: "two-sum",
  title: "Two Sum",
  number: 1,
  difficulty: "Easy",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
    },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists.",
  ],
  dataStructures: ["array", "hash-map"],
  patterns: ["hash-table"],
  tags: ["Array", "Hash Table"],
  leetcodeUrl: "https://leetcode.com/problems/two-sum/",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  solutions: [
    {
      language: "javascript",
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      lineCount: 11,
    },
    {
      language: "python",
      code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      lineCount: 8,
    },
  ],
  testCases: [
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      expected: [0, 1],
      description: "Basic case: pair at start",
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      expected: [1, 2],
      description: "Pair in middle",
    },
    {
      input: { nums: [3, 3], target: 6 },
      expected: [0, 1],
      description: "Duplicate values",
    },
    {
      input: { nums: [1, 5, 3, 7, 2, 8], target: 10 },
      expected: [1, 0],
      description: "Longer array",
    },
  ],
  defaultInput: { nums: [2, 7, 11, 15], target: 9 },
};
