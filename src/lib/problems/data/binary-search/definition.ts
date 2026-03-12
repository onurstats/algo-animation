import type { Problem } from "@/lib/types";

export const binarySearchProblem: Problem = {
  slug: "binary-search",
  title: "Binary Search",
  number: 704,
  difficulty: "Easy",
  description:
    "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.",
  examples: [
    {
      input: "nums = [-1,0,3,5,9,12], target = 9",
      output: "4",
      explanation: "9 exists in nums and its index is 4.",
    },
    {
      input: "nums = [-1,0,3,5,9,12], target = 2",
      output: "-1",
      explanation: "2 does not exist in nums so return -1.",
    },
  ],
  constraints: [
    "1 <= nums.length <= 10^4",
    "-10^4 < nums[i], target < 10^4",
    "All the integers in nums are unique.",
    "nums is sorted in ascending order.",
  ],
  dataStructures: ["array"],
  patterns: ["binary-search"],
  tags: ["Array", "Binary Search"],
  leetcodeUrl: "https://leetcode.com/problems/binary-search/",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",
  solutions: [
    {
      language: "javascript",
      code: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
      lineCount: 15,
    },
    {
      language: "python",
      code: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      lineCount: 11,
    },
  ],
  testCases: [
    {
      input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
      expected: 4,
      description: "Target exists in array",
    },
    {
      input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 },
      expected: -1,
      description: "Target does not exist",
    },
    {
      input: { nums: [5], target: 5 },
      expected: 0,
      description: "Single element array",
    },
  ],
  defaultInput: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
};
