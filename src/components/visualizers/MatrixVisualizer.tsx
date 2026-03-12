"use client";

import { motion } from "framer-motion";
import type { AnimationStep, HighlightColor } from "@/lib/types";

const colorMap: Record<HighlightColor, string> = {
  current: "border-blue-500 bg-blue-500/20 text-blue-300",
  secondary: "border-purple-500 bg-purple-500/20 text-purple-300",
  success: "border-green-500 bg-green-500/20 text-green-300",
  removed: "border-red-500 bg-red-500/20 text-red-300",
  comparing: "border-yellow-500 bg-yellow-500/20 text-yellow-300",
  processed: "border-gray-500 bg-gray-500/20 text-gray-400",
};

interface MatrixVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function MatrixVisualizer({ step }: MatrixVisualizerProps) {
  const matrix = (step.data.matrix as number[][]) ?? [];
  const highlightMap = new Map(step.highlights.map((h) => [h.index, h]));

  return (
    <div className="flex flex-col gap-1">
      {matrix.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1">
          {row.map((value, colIdx) => {
            const flatIndex = rowIdx * row.length + colIdx;
            const highlight = highlightMap.get(flatIndex);
            const colorClass = highlight
              ? colorMap[highlight.color]
              : "border-border bg-elevated text-foreground";

            return (
              <motion.div
                key={colIdx}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className={`flex h-10 w-10 items-center justify-center rounded border-2 font-mono text-xs font-semibold ${colorClass}`}
              >
                {value}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
