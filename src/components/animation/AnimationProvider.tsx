"use client";

import { useEffect } from "react";
import { useAnimationStore } from "@/stores/animationStore";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import type { AnimationStep } from "@/lib/types";

interface AnimationProviderProps {
  steps: AnimationStep[];
  children: React.ReactNode;
}

export function AnimationProvider({ steps, children }: AnimationProviderProps) {
  const loadSteps = useAnimationStore((s) => s.loadSteps);

  useEffect(() => {
    loadSteps(steps);
  }, [steps, loadSteps]);

  useKeyboardShortcuts();

  return <>{children}</>;
}
