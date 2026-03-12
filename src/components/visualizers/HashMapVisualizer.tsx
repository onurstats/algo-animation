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

interface HashMapEntry {
  key: string;
  value: unknown;
}

interface HashMapVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function HashMapVisualizer({ step }: HashMapVisualizerProps) {
  const entries = (step.data.entries as HashMapEntry[]) ?? [];
  const highlightMap = new Map(step.highlights.map((h) => [h.index, h]));

  return (
    <div className="flex flex-col gap-1.5">
      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">Key</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">Value</span>
        {entries.map((entry, index) => {
          const highlight = highlightMap.get(index);
          const colorClass = highlight
            ? colorMap[highlight.color]
            : "border-border bg-elevated text-foreground";

          return (
            <motion.div
              key={index}
              className="col-span-2 grid grid-cols-[auto_1fr] gap-x-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`flex items-center rounded border-2 px-2 py-1 font-mono text-xs font-semibold ${colorClass}`}
              >
                {entry.key}
              </div>
              <div
                className={`flex items-center rounded border-2 px-2 py-1 font-mono text-xs ${colorClass}`}
              >
                {String(entry.value)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
