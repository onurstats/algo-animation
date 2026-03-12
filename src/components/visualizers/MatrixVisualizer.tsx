"use client";

import { motion } from "framer-motion";
import type { AnimationStep } from "@/lib/types";
import { highlightClassMap } from "@/lib/constants/colors";
import { asNestedNumberArray } from "@/lib/utils/stepDataGuards";

interface MatrixVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function MatrixVisualizer({ step }: MatrixVisualizerProps) {
  const matrix = asNestedNumberArray(step.data.matrix);
  const highlightMap = new Map(step.highlights.map((h) => [h.index, h]));

  return (
    <div className="flex flex-col gap-1">
      {matrix.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1">
          {row.map((value, colIdx) => {
            const flatIndex = rowIdx * row.length + colIdx;
            const highlight = highlightMap.get(flatIndex);
            const colorClass = highlight
              ? highlightClassMap[highlight.color]
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
