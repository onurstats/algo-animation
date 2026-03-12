"use client";

import { motion } from "framer-motion";
import type { AnimationStep } from "@/lib/types";
import { highlightStrokeColors, highlightFillColors } from "@/lib/constants/colors";

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
              fill={highlight ? highlightFillColors[highlight.color] : "#2a2d3e"}
              stroke={highlight ? highlightStrokeColors[highlight.color] : "#3b3f54"}
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
