"use client";

import { motion } from "framer-motion";
import type { AnimationStep, HighlightColor } from "@/lib/types";

const colorMap: Record<HighlightColor, string> = {
  current: "text-blue-400",
  secondary: "text-purple-400",
  success: "text-green-400",
  removed: "text-red-400",
  comparing: "text-yellow-400",
  processed: "text-gray-400",
};

interface PointerVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function PointerVisualizer({ step }: PointerVisualizerProps) {
  const array = (step.data.array as number[]) ?? [];

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
                  className={`flex flex-col items-center ${colorMap[pointer.color]}`}
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
            ? {
                current: "border-blue-500 bg-blue-500/20 text-blue-300",
                secondary: "border-purple-500 bg-purple-500/20 text-purple-300",
                success: "border-green-500 bg-green-500/20 text-green-300",
                removed: "border-red-500 bg-red-500/20 text-red-300",
                comparing: "border-yellow-500 bg-yellow-500/20 text-yellow-300",
                processed: "border-gray-500 bg-gray-500/20 text-gray-400",
              }[highlight.color]
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
