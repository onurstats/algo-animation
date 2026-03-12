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

export const difficultyColors = {
  Easy: { bg: "bg-green-500/15", text: "text-green-400", border: "border-green-500/30" },
  Medium: { bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/30" },
  Hard: { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30" },
} as const;
