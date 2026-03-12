"use client";

import { motion } from "framer-motion";
import type { AnimationStep } from "@/lib/types";
import { highlightClassMap } from "@/lib/constants/colors";
import { asNumberArray } from "@/lib/utils/stepDataGuards";

interface ArrayVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function ArrayVisualizer({ step }: ArrayVisualizerProps) {
  const array =
    asNumberArray(step.data.array).length > 0
      ? asNumberArray(step.data.array)
      : asNumberArray(step.data.nums);
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
            ? highlightClassMap[highlight.color]
            : "border-border bg-elevated text-foreground";

          return (
            <div key={index} className="flex flex-col items-center gap-1">
              {pointer && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs font-medium ${
                    highlightClassMap[pointer.color].split(" ").pop()
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
