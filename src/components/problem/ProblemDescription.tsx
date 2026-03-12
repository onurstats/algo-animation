import type { Problem } from "@/lib/types";

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
      <p className="text-sm leading-relaxed text-text-secondary">
        {problem.description}
      </p>

      {problem.examples.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">Examples</h3>
          {problem.examples.map((ex, i) => (
            <div
              key={i}
              className="rounded-lg bg-elevated p-3 font-mono text-xs"
            >
              <div>
                <span className="text-text-muted">Input: </span>
                <span className="text-foreground">{ex.input}</span>
              </div>
              <div>
                <span className="text-text-muted">Output: </span>
                <span className="text-accent-green">{ex.output}</span>
              </div>
              {ex.explanation && (
                <div className="mt-1 font-sans text-text-secondary">
                  {ex.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {problem.constraints.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold text-foreground">Constraints</h3>
          <ul className="list-inside list-disc text-xs text-text-secondary">
            {problem.constraints.map((c, i) => (
              <li key={i} className="font-mono">
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
