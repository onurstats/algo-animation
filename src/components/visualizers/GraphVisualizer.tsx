"use client";

import { motion } from "framer-motion";
import type { AnimationStep, HighlightColor } from "@/lib/types";

const strokeColors: Record<HighlightColor, string> = {
  current: "#3b82f6",
  secondary: "#8b5cf6",
  success: "#22c55e",
  removed: "#ef4444",
  comparing: "#eab308",
  processed: "#6b7280",
};

const fillColors: Record<HighlightColor, string> = {
  current: "#3b82f633",
  secondary: "#8b5cf633",
  success: "#22c55e33",
  removed: "#ef444433",
  comparing: "#eab30833",
  processed: "#6b728033",
};

interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: number;
  to: number;
}

interface GraphVisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export function GraphVisualizer({ step, width, height }: GraphVisualizerProps) {
  const nodes = (step.data.graphNodes as GraphNode[]) ?? [];
  const edges = (step.data.graphEdges as GraphEdge[]) ?? [];
  const highlightMap = new Map(step.highlights.map((h) => [h.index, h]));

  const svgWidth = Math.max(width, 200);
  const svgHeight = Math.max(height, 200);

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg width={svgWidth} height={svgHeight} className="overflow-visible">
      {/* Edges */}
      {edges.map((edge, i) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#3b3f54"
            strokeWidth={2}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const highlight = highlightMap.get(node.id);
        return (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={22}
              fill={highlight ? fillColors[highlight.color] : "#2a2d3e"}
              stroke={highlight ? strokeColors[highlight.color] : "#3b3f54"}
              strokeWidth={2}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-foreground font-mono text-sm font-semibold"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
