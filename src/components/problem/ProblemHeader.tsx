import { Badge } from "@/components/ui/Badge";
import type { Problem } from "@/lib/types";

interface ProblemHeaderProps {
  problem: Problem;
}

export function ProblemHeader({ problem }: ProblemHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="text-sm text-text-muted">#{problem.number}</span>
        <h1 className="text-2xl font-bold text-foreground">{problem.title}</h1>
        <Badge difficulty={problem.difficulty} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-elevated px-2 py-0.5 text-xs text-text-secondary"
          >
            {tag}
          </span>
        ))}
        <a
          href={problem.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-xs text-accent-blue hover:underline"
        >
          View on LeetCode
        </a>
      </div>
    </div>
  );
}
