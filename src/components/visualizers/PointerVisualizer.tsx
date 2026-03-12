"use client";

import { motion } from "framer-motion";
import type { AnimationStep } from "@/lib/types";
import { highlightTextMap, highlightClassMap } from "@/lib/constants/colors";

interface PointerVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function PointerVisualizer({ step }: PointerVisualizerProps) {
  const array =
    (step.data.array as number[] | undefined) ??
    (step.data.nums as number[] | undefined) ??
    [];

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Pointer labels above */}
      <div className="flex gap-2" style={{ minWidth: array.length * 56 }}>
        {array.map((_, index) => {
          const pointer = step.pointers.find((p) => p.index === index);
          return (
            <div key={index} className="flex w-12 justify-center">
              {pointer && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col items-center ${highlightTextMap[pointer.color]}`}
                >
                  <span className="text-xs font-bold">{pointer.label}</span>
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 12L1 4h10L6 12z" />
                  </svg>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Array boxes */}
      <div className="flex gap-2">
        {array.map((value, index) => {
          const highlight = step.highlights.find((h) => h.index === index);
          const baseColor = highlight
            ? highlightClassMap[highlight.color]
            : "border-border bg-elevated text-foreground";

          return (
            <motion.div
              key={index}
              layout
              className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono text-sm font-semibold ${baseColor}`}
            >
              {value}
            </motion.div>
          );
        })}
      </div>

      {/* Indices */}
      <div className="flex gap-2">
        {array.map((_, index) => (
          <div key={index} className="flex w-12 justify-center">
            <span className="text-[10px] text-text-muted">{index}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
