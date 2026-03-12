"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { AnimationStep, HighlightColor } from "@/lib/types";

const colorMap: Record<HighlightColor, string> = {
  current: "border-blue-500 bg-blue-500/20 text-blue-300",
  secondary: "border-purple-500 bg-purple-500/20 text-purple-300",
  success: "border-green-500 bg-green-500/20 text-green-300",
  removed: "border-red-500 bg-red-500/20 text-red-300",
  comparing: "border-yellow-500 bg-yellow-500/20 text-yellow-300",
  processed: "border-gray-500 bg-gray-500/20 text-gray-400",
};

interface StackQueueVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function StackQueueVisualizer({ step }: StackQueueVisualizerProps) {
  const items = (step.data.stack as string[]) ?? (step.data.queue as string[]) ?? [];
  const isStack = !!step.data.stack;
  const highlightMap = new Map(step.highlights.map((h) => [h.index, h]));

  const displayItems = isStack ? [...items].reverse() : items;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
        {isStack ? "Stack" : "Queue"} {isStack ? "(top)" : "(front)"}
      </span>
      <div className={`flex ${isStack ? "flex-col" : "flex-row"} gap-1`}>
        <AnimatePresence>
          {displayItems.map((item, displayIdx) => {
            const originalIdx = isStack ? items.length - 1 - displayIdx : displayIdx;
            const highlight = highlightMap.get(originalIdx);
            const colorClass = highlight
              ? colorMap[highlight.color]
              : "border-border bg-elevated text-foreground";

            return (
              <motion.div
                key={`${originalIdx}-${item}`}
                layout
                initial={{ scale: 0.8, opacity: 0, x: isStack ? 0 : -20, y: isStack ? -20 : 0 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, x: isStack ? 0 : 20, y: isStack ? -20 : 0 }}
                transition={{ duration: 0.2 }}
                className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg border-2 px-3 font-mono text-sm font-semibold ${colorClass}`}
              >
                {item}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
        {isStack ? "(bottom)" : "(back)"}
      </span>
    </div>
  );
}
