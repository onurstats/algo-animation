import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Problem } from "@/lib/types";

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link href={`/problems/${problem.slug}`}>
      <Card interactive className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">#{problem.number}</span>
            <h3 className="font-medium text-foreground">{problem.title}</h3>
          </div>
          <Badge difficulty={problem.difficulty} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-elevated px-2 py-0.5 text-xs text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span>Time: {problem.timeComplexity}</span>
          <span>Space: {problem.spaceComplexity}</span>
        </div>
      </Card>
    </Link>
  );
}
