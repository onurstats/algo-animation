export type Difficulty = "Easy" | "Medium" | "Hard";

export type DataStructureType =
  | "array"
  | "linked-list"
  | "tree"
  | "graph"
  | "matrix"
  | "stack"
  | "queue"
  | "hash-map"
  | "string"
  | "heap";

export type AlgorithmPattern =
  | "two-pointers"
  | "sliding-window"
  | "binary-search"
  | "dfs"
  | "bfs"
  | "dynamic-programming"
  | "greedy"
  | "backtracking"
  | "divide-and-conquer"
  | "hash-table"
  | "stack-based"
  | "sorting"
  | "recursion";

export type Language = "python" | "javascript" | "java" | "cpp";

export interface TestCase {
  input: Record<string, unknown>;
  expected: unknown;
  description?: string;
}

export interface SolutionCode {
  language: Language;
  code: string;
  lineCount: number;
}

export interface Problem {
  slug: string;
  title: string;
  number: number;
  difficulty: Difficulty;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  dataStructures: DataStructureType[];
  patterns: AlgorithmPattern[];
  tags: string[];
  leetcodeUrl: string;
  timeComplexity: string;
  spaceComplexity: string;
  solutions: SolutionCode[];
  testCases: TestCase[];
  defaultInput: Record<string, unknown>;
}
