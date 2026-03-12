"use client";

import { cn } from "@/lib/utils/cn";
import { type InputHTMLAttributes, forwardRef } from "react";

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex items-center gap-3">
        {label && (
          <label htmlFor={id} className="text-sm text-text-secondary whitespace-nowrap">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="range"
          id={id}
          className={cn(
            "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-elevated accent-accent-blue",
            "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-blue [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
