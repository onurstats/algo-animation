"use client";

import { useAnimationStore } from "@/stores/animationStore";

export function StepIndicator() {
  const currentStepIndex = useAnimationStore((s) => s.currentStepIndex);
  const steps = useAnimationStore((s) => s.steps);
  const goToStep = useAnimationStore((s) => s.goToStep);

  const totalSteps = steps.length;
  const progress = totalSteps > 1 ? currentStepIndex / (totalSteps - 1) : 0;

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-elevated"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          const targetStep = Math.round(ratio * (totalSteps - 1));
          goToStep(targetStep);
        }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent-blue transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
