interface ComplexityDisplayProps {
  timeComplexity: string;
  spaceComplexity: string;
}

export function ComplexityDisplay({
  timeComplexity,
  spaceComplexity,
}: ComplexityDisplayProps) {
  return (
    <div className="flex gap-4">
      <div className="rounded-lg bg-surface px-3 py-2">
        <span className="text-[10px] uppercase tracking-wider text-text-muted">
          Time
        </span>
        <p className="font-mono text-sm font-medium text-accent-blue">
          {timeComplexity}
        </p>
      </div>
      <div className="rounded-lg bg-surface px-3 py-2">
        <span className="text-[10px] uppercase tracking-wider text-text-muted">
          Space
        </span>
        <p className="font-mono text-sm font-medium text-accent-purple">
          {spaceComplexity}
        </p>
      </div>
    </div>
  );
}
