import { cn } from "@/lib/utils/cn";
import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-surface p-6",
          interactive &&
            "cursor-pointer transition-all duration-200 hover:border-border-hover hover:bg-surface-hover hover:shadow-lg hover:shadow-black/20",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export { Card };
