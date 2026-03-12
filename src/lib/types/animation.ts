export type HighlightColor =
  | "current"
  | "secondary"
  | "success"
  | "removed"
  | "comparing"
  | "processed";

export interface Highlight {
  index: number;
  color: HighlightColor;
  label?: string;
}

export interface Pointer {
  index: number;
  label: string;
  color: HighlightColor;
}

export type AnimationAction =
  | "compare"
  | "swap"
  | "set"
  | "push"
  | "pop"
  | "insert"
  | "remove"
  | "highlight"
  | "move-pointer"
  | "traverse"
  | "found"
  | "not-found"
  | "merge"
  | "split"
  | "update"
  | "complete";

export interface AnimationStep {
  id: number;
  action: AnimationAction;
  description: string;
  highlights: Highlight[];
  pointers: Pointer[];
  codeLineNumber: number;
  data: Record<string, unknown>;
  auxiliaryData?: Record<string, unknown>;
}

export interface VisualizationState {
  steps: AnimationStep[];
  currentStepIndex: number;
  totalSteps: number;
}

export interface AnimationPlaybackState {
  isPlaying: boolean;
  speed: number; // 0.5x to 4x
  direction: "forward" | "backward";
}
