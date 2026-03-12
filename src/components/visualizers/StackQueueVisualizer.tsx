"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { AnimationStep } from "@/lib/types";
import { highlightClassMap } from "@/lib/constants/colors";
import { asStringArray } from "@/lib/utils/stepDataGuards";

interface StackQueueVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function StackQueueVisualizer({ step }: StackQueueVisualizerProps) {
  const items =
    asStringArray(step.data.stack).length > 0
      ? asStringArray(step.data.stack)
      : asStringArray(step.data.queue);
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
              ? highlightClassMap[highlight.color]
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
