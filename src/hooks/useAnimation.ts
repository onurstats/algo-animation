"use client";

import { useEffect, useRef, useCallback } from "react";
import { useAnimationStore } from "@/stores/animationStore";
import type { AnimationStep } from "@/lib/types";

export function useAnimation() {
  const store = useAnimationStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Auto-advance when playing
  useEffect(() => {
    if (!store.isPlaying) {
      clearTimer();
      return;
    }

    const intervalMs = 800 / store.speed;
    timerRef.current = setTimeout(() => {
      store.stepForward();
    }, intervalMs);

    return clearTimer;
  }, [store.isPlaying, store.currentStepIndex, store.speed, store, clearTimer]);

  const currentStep: AnimationStep | null =
    store.steps[store.currentStepIndex] ?? null;

  const progress =
    store.steps.length > 1
      ? store.currentStepIndex / (store.steps.length - 1)
      : 0;

  return {
    ...store,
    currentStep,
    totalSteps: store.steps.length,
    progress,
  };
}
