"use client";

import { motion } from "framer-motion";
import type { AnimationStep } from "@/lib/types";
import { highlightClassMap } from "@/lib/constants/colors";

interface LinkedListVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function LinkedListVisualizer({ step }: LinkedListVisualizerProps) {
  const nodes = (step.data.nodes as number[]) ?? [];
  const highlightMap = new Map(step.highlights.map((h) => [h.index, h]));
  const pointerMap = new Map(step.pointers.map((p) => [p.index, p]));

  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {nodes.map((value, index) => {
        const highlight = highlightMap.get(index);
        const pointer = pointerMap.get(index);
        const colorClass = highlight
          ? highlightClassMap[highlight.color]
          : "border-border bg-elevated text-foreground";

        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              {pointer && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-xs font-medium ${highlightClassMap[pointer.color].split(" ").pop()}`}
                >
                  {pointer.label}
                </motion.span>
              )}
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex h-12 w-16 items-center justify-center rounded-lg border-2 font-mono text-sm font-semibold ${colorClass}`}
              >
                {value}
              </motion.div>
            </div>
            {index < nodes.length - 1 && (
              <svg className="mx-1 h-4 w-6 text-text-muted" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M2 8h16m0 0l-4-4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        );
      })}
      <div className="ml-1 flex h-12 items-center rounded-lg border-2 border-dashed border-border px-3 font-mono text-xs text-text-muted">
        null
      </div>
    </div>
  );
}
