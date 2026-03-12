"use client";

import { useAnimationStore } from "@/stores/animationStore";
import { useResponsiveCanvas } from "@/hooks/useResponsiveCanvas";
import type { DataStructureType } from "@/lib/types";
import { visualizerRegistry } from "@/components/visualizers";

interface AnimationCanvasProps {
  dataStructure: DataStructureType;
}

export function AnimationCanvas({ dataStructure }: AnimationCanvasProps) {
  const { containerRef, dimensions } = useResponsiveCanvas();
  const currentStepIndex = useAnimationStore((s) => s.currentStepIndex);
  const steps = useAnimationStore((s) => s.steps);
  const currentStep = steps[currentStepIndex] ?? null;

  const Visualizer = visualizerRegistry[dataStructure];

  return (
    <div
      ref={containerRef}
      className="relative flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-6"
    >
      {currentStep && Visualizer ? (
        <Visualizer
          step={currentStep}
          width={dimensions.width - 48}
          height={dimensions.height - 48}
        />
      ) : (
        <p className="text-text-muted">No animation data</p>
      )}
    </div>
  );
}
