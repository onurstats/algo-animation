import { cn } from "@/lib/utils/cn";
import { difficultyColors } from "@/lib/constants/colors";

type Difficulty = "Easy" | "Medium" | "Hard";

interface BadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export function Badge({ difficulty, className }: BadgeProps) {
  const colors = difficultyColors[difficulty];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        colors.border,
        className,
      )}
    >
      {difficulty}
    </span>
  );
}
