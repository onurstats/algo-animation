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

interface TreeVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

interface TreeNode {
  value: number | null;
  index: number;
}

function getTreeLevels(nodes: (number | null)[]): TreeNode[][] {
  const levels: TreeNode[][] = [];
  let levelStart = 0;
  let levelSize = 1;

  while (levelStart < nodes.length) {
    const level: TreeNode[] = [];
    for (let i = 0; i < levelSize && levelStart + i < nodes.length; i++) {
      level.push({ value: nodes[levelStart + i], index: levelStart + i });
    }
    levels.push(level);
    levelStart += levelSize;
    levelSize *= 2;
  }

  return levels;
}

export function TreeVisualizer({ step, width }: TreeVisualizerProps) {
  const nodes = (step.data.nodes as (number | null)[]) ?? [];
  const highlightMap = new Map(step.highlights.map((h) => [h.index, h]));
  const levels = getTreeLevels(nodes);

  const nodeSize = 44;
  const verticalGap = 60;

  return (
    <div className="flex flex-col items-center gap-0">
      <svg
        width={Math.max(width, 200)}
        height={levels.length * verticalGap + nodeSize}
        className="overflow-visible"
      >
        {/* Edges */}
        {levels.map((level, levelIdx) =>
          level.map((node) => {
            if (node.value === null) return null;
            const leftChildIdx = node.index * 2 + 1;
            const rightChildIdx = node.index * 2 + 2;
            const levelWidth = Math.max(width, 200);
            const nodeCount = level.length;
            const parentX =
              ((level.indexOf(node) + 0.5) / nodeCount) * levelWidth;
            const parentY = levelIdx * verticalGap + nodeSize / 2;

            const nextLevel = levels[levelIdx + 1];
            if (!nextLevel) return null;

            return [leftChildIdx, rightChildIdx].map((childIdx) => {
              const childNode = nextLevel.find((n) => n.index === childIdx);
              if (!childNode || childNode.value === null) return null;
              const childCount = nextLevel.length;
              const childX =
                ((nextLevel.indexOf(childNode) + 0.5) / childCount) *
                levelWidth;
              const childY = (levelIdx + 1) * verticalGap + nodeSize / 2;

              return (
                <line
                  key={`${node.index}-${childIdx}`}
                  x1={parentX}
                  y1={parentY}
                  x2={childX}
                  y2={childY}
                  stroke="#3b3f54"
                  strokeWidth={2}
                />
              );
            });
          }),
        )}

        {/* Nodes */}
        {levels.map((level, levelIdx) => {
          const levelWidth = Math.max(width, 200);
          const nodeCount = level.length;

          return level.map((node, nodeIdx) => {
            if (node.value === null) return null;
            const highlight = highlightMap.get(node.index);
            const x = ((nodeIdx + 0.5) / nodeCount) * levelWidth;
            const y = levelIdx * verticalGap + nodeSize / 2;
            const fillColor = highlight
              ? {
                  current: "#3b82f633",
                  secondary: "#8b5cf633",
                  success: "#22c55e33",
                  removed: "#ef444433",
                  comparing: "#eab30833",
                  processed: "#6b728033",
                }[highlight.color]
              : "#2a2d3e";
            const strokeColor = highlight
              ? {
                  current: "#3b82f6",
                  secondary: "#8b5cf6",
                  success: "#22c55e",
                  removed: "#ef4444",
                  comparing: "#eab308",
                  processed: "#6b7280",
                }[highlight.color]
              : "#3b3f54";

            return (
              <g key={node.index}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={nodeSize / 2}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={2}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-foreground font-mono text-sm font-semibold"
                >
                  {node.value}
                </text>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
}
