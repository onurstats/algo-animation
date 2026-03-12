import type { ComponentType } from "react";
import type { AnimationStep, DataStructureType } from "@/lib/types";
import { ArrayVisualizer } from "./ArrayVisualizer";
import { LinkedListVisualizer } from "./LinkedListVisualizer";
import { TreeVisualizer } from "./TreeVisualizer";
import { GraphVisualizer } from "./GraphVisualizer";
import { MatrixVisualizer } from "./MatrixVisualizer";
import { StackQueueVisualizer } from "./StackQueueVisualizer";
import { HashMapVisualizer } from "./HashMapVisualizer";
import { PointerVisualizer } from "./PointerVisualizer";

export interface VisualizerProps {
  step: AnimationStep;
  width: number;
  height: number;
}

export const visualizerRegistry: Partial<
  Record<DataStructureType, ComponentType<VisualizerProps>>
> = {
  array: ArrayVisualizer,
  "linked-list": LinkedListVisualizer,
  tree: TreeVisualizer,
  graph: GraphVisualizer,
  matrix: MatrixVisualizer,
  stack: StackQueueVisualizer,
  queue: StackQueueVisualizer,
  "hash-map": HashMapVisualizer,
  string: ArrayVisualizer, // strings visualized as char arrays
};

// PointerVisualizer is an overlay, exported separately
export { PointerVisualizer };
