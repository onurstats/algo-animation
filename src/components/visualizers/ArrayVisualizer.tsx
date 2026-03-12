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

interface ArrayVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function ArrayVisualizer({ step }: ArrayVisualizerProps) {
  const array = (step.data.array as number[]) ?? [];
  const highlightMap = new Map(
    step.highlights.map((h) => [h.index, h]),
  );
  const pointerMap = new Map(
    step.pointers.map((p) => [p.index, p]),
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-end justify-center gap-2">
        {array.map((value, index) => {
          const highlight = highlightMap.get(index);
          const pointer = pointerMap.get(index);
          const colorClass = highlight
            ? colorMap[highlight.color]
            : "border-border bg-elevated text-foreground";

          return (
            <div key={index} className="flex flex-col items-center gap-1">
              {pointer && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs font-medium ${
                    colorMap[pointer.color].split(" ").pop()
                  }`}
                >
                  {pointer.label}
                </motion.span>
              )}
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono text-sm font-semibold ${colorClass}`}
              >
                {value}
              </motion.div>
              <span className="text-[10px] text-text-muted">{index}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
