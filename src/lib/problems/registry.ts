import type { Problem, Difficulty, DataStructureType, AlgorithmPattern, AnimationStep } from "@/lib/types";

export interface ProblemModule {
  problem: Problem;
  generateSteps: (input: Record<string, unknown>) => AnimationStep[];
}

const registry = new Map<string, ProblemModule>();

export function registerProblem(mod: ProblemModule) {
  registry.set(mod.problem.slug, mod);
}

export function getProblemBySlug(slug: string): ProblemModule | undefined {
  return registry.get(slug);
}

export function getAllProblems(): Problem[] {
  return Array.from(registry.values()).map((m) => m.problem);
}

export function filterProblems(options?: {
  difficulty?: Difficulty;
  dataStructure?: DataStructureType;
  pattern?: AlgorithmPattern;
  search?: string;
}): Problem[] {
  let problems = getAllProblems();

  if (options?.difficulty) {
    problems = problems.filter((p) => p.difficulty === options.difficulty);
  }
  if (options?.dataStructure) {
    problems = problems.filter((p) =>
      p.dataStructures.includes(options.dataStructure!),
    );
  }
  if (options?.pattern) {
    problems = problems.filter((p) => p.patterns.includes(options.pattern!));
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    problems = problems.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  return problems.sort((a, b) => a.number - b.number);
}
