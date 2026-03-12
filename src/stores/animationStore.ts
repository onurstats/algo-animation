"use client";

import { create } from "zustand";
import type { AnimationStep } from "@/lib/types";

interface AnimationState {
  // State
  steps: AnimationStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;

  // Actions
  loadSteps: (steps: AnimationStep[]) => void;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  goToStep: (index: number) => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
}

export const useAnimationStore = create<AnimationState>((set, get) => ({
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  speed: 1,

  loadSteps: (steps) =>
    set({ steps, currentStepIndex: 0, isPlaying: false }),

  play: () => {
    const { steps, currentStepIndex } = get();
    if (steps.length === 0 || currentStepIndex >= steps.length - 1) return;
    set({ isPlaying: true });
  },

  pause: () => set({ isPlaying: false }),

  togglePlayPause: () => {
    const { isPlaying } = get();
    if (isPlaying) {
      get().pause();
    } else {
      get().play();
    }
  },

  stepForward: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
      if (currentStepIndex + 1 >= steps.length - 1) {
        set({ isPlaying: false });
      }
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goToStep: (index) => {
    const { steps } = get();
    if (index >= 0 && index < steps.length) {
      set({ currentStepIndex: index });
    }
  },

  reset: () => set({ currentStepIndex: 0, isPlaying: false }),

  setSpeed: (speed) => set({ speed: Math.max(0.25, Math.min(4, speed)) }),
}));
