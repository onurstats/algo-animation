export const colors = {
  // Backgrounds
  bg: {
    primary: "#0F1117",
    surface: "#1A1D2E",
    surfaceHover: "#242738",
    elevated: "#2A2D3E",
  },

  // Text
  text: {
    primary: "#F1F5F9",
    secondary: "#94A3B8",
    muted: "#64748B",
  },

  // Animation highlights
  highlight: {
    current: "#3B82F6", // blue — active element
    secondary: "#8B5CF6", // purple — secondary focus
    success: "#22C55E", // green — correct/done
    removed: "#EF4444", // red — removed/wrong
    comparing: "#EAB308", // yellow — comparing
    processed: "#6B7280", // gray — already visited
  },

  // UI accents
  accent: {
    blue: "#3B82F6",
    purple: "#8B5CF6",
    green: "#22C55E",
    red: "#EF4444",
    yellow: "#EAB308",
    orange: "#F97316",
  },

  // Borders
  border: {
    default: "#2A2D3E",
    hover: "#3B3F54",
    focus: "#3B82F6",
  },
} as const;

// ── Shared visualizer color maps ──

import type { HighlightColor } from "@/lib/types";

/** Tailwind classes for DOM-based visualizers (border + bg + text) */
export const highlightClassMap: Record<HighlightColor, string> = {
  current: "border-blue-500 bg-blue-500/20 text-blue-300",
  secondary: "border-purple-500 bg-purple-500/20 text-purple-300",
  success: "border-green-500 bg-green-500/20 text-green-300",
  removed: "border-red-500 bg-red-500/20 text-red-300",
  comparing: "border-yellow-500 bg-yellow-500/20 text-yellow-300",
  processed: "border-gray-500 bg-gray-500/20 text-gray-400",
};

/** Text-only color classes for pointer/label overlays */
export const highlightTextMap: Record<HighlightColor, string> = {
  current: "text-blue-400",
  secondary: "text-purple-400",
  success: "text-green-400",
  removed: "text-red-400",
  comparing: "text-yellow-400",
  processed: "text-gray-400",
};

/** Hex stroke colors for SVG-based visualizers */
export const highlightStrokeColors: Record<HighlightColor, string> = {
  current: "#3b82f6",
  secondary: "#8b5cf6",
  success: "#22c55e",
  removed: "#ef4444",
  comparing: "#eab308",
  processed: "#6b7280",
};

/** Hex fill colors (with alpha) for SVG-based visualizers */
export const highlightFillColors: Record<HighlightColor, string> = {
  current: "#3b82f633",
  secondary: "#8b5cf633",
  success: "#22c55e33",
  removed: "#ef444433",
  comparing: "#eab30833",
  processed: "#6b728033",
};

export const difficultyColors = {
  Easy: { bg: "bg-green-500/15", text: "text-green-400", border: "border-green-500/30" },
  Medium: { bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/30" },
  Hard: { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30" },
} as const;
