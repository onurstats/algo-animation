import { describe, it, expect, beforeEach } from "vitest";
import { useAnimationStore } from "@/stores/animationStore";
import type { AnimationStep } from "@/lib/types";

function makeSteps(n: number): AnimationStep[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    action: "highlight" as const,
    description: `Step ${i}`,
    highlights: [],
    pointers: [],
    codeLineNumber: i + 1,
    data: {},
  }));
}

describe("animationStore", () => {
  beforeEach(() => {
    useAnimationStore.setState({
      steps: [],
      currentStepIndex: 0,
      isPlaying: false,
      speed: 1,
    });
  });

  it("has correct initial state", () => {
    const state = useAnimationStore.getState();
    expect(state.steps).toEqual([]);
    expect(state.currentStepIndex).toBe(0);
    expect(state.isPlaying).toBe(false);
    expect(state.speed).toBe(1);
  });

  it("loadSteps sets steps and resets index", () => {
    const steps = makeSteps(5);
    useAnimationStore.getState().loadSteps(steps);
    const state = useAnimationStore.getState();
    expect(state.steps).toHaveLength(5);
    expect(state.currentStepIndex).toBe(0);
    expect(state.isPlaying).toBe(false);
  });

  it("stepForward increments index", () => {
    useAnimationStore.getState().loadSteps(makeSteps(5));
    useAnimationStore.getState().stepForward();
    expect(useAnimationStore.getState().currentStepIndex).toBe(1);
  });

  it("stepForward stops at last step", () => {
    useAnimationStore.getState().loadSteps(makeSteps(3));
    useAnimationStore.getState().stepForward();
    useAnimationStore.getState().stepForward();
    useAnimationStore.getState().stepForward(); // should not go past 2
    expect(useAnimationStore.getState().currentStepIndex).toBe(2);
  });

  it("stepForward pauses when reaching end", () => {
    useAnimationStore.getState().loadSteps(makeSteps(2));
    useAnimationStore.setState({ isPlaying: true });
    useAnimationStore.getState().stepForward(); // index 0 -> 1 (last)
    expect(useAnimationStore.getState().isPlaying).toBe(false);
  });

  it("stepBackward decrements index", () => {
    useAnimationStore.getState().loadSteps(makeSteps(5));
    useAnimationStore.getState().stepForward();
    useAnimationStore.getState().stepForward();
    useAnimationStore.getState().stepBackward();
    expect(useAnimationStore.getState().currentStepIndex).toBe(1);
  });

  it("stepBackward stops at 0", () => {
    useAnimationStore.getState().loadSteps(makeSteps(5));
    useAnimationStore.getState().stepBackward();
    expect(useAnimationStore.getState().currentStepIndex).toBe(0);
  });

  it("goToStep sets index within bounds", () => {
    useAnimationStore.getState().loadSteps(makeSteps(5));
    useAnimationStore.getState().goToStep(3);
    expect(useAnimationStore.getState().currentStepIndex).toBe(3);
  });

  it("goToStep ignores out-of-bounds", () => {
    useAnimationStore.getState().loadSteps(makeSteps(5));
    useAnimationStore.getState().goToStep(10);
    expect(useAnimationStore.getState().currentStepIndex).toBe(0);
    useAnimationStore.getState().goToStep(-1);
    expect(useAnimationStore.getState().currentStepIndex).toBe(0);
  });

  it("play sets isPlaying when steps exist", () => {
    useAnimationStore.getState().loadSteps(makeSteps(5));
    useAnimationStore.getState().play();
    expect(useAnimationStore.getState().isPlaying).toBe(true);
  });

  it("play does nothing when no steps", () => {
    useAnimationStore.getState().play();
    expect(useAnimationStore.getState().isPlaying).toBe(false);
  });

  it("play does nothing when at last step", () => {
    useAnimationStore.getState().loadSteps(makeSteps(2));
    useAnimationStore.getState().goToStep(1);
    useAnimationStore.getState().play();
    expect(useAnimationStore.getState().isPlaying).toBe(false);
  });

  it("pause sets isPlaying false", () => {
    useAnimationStore.getState().loadSteps(makeSteps(5));
    useAnimationStore.getState().play();
    useAnimationStore.getState().pause();
    expect(useAnimationStore.getState().isPlaying).toBe(false);
  });

  it("togglePlayPause toggles", () => {
    useAnimationStore.getState().loadSteps(makeSteps(5));
    useAnimationStore.getState().togglePlayPause();
    expect(useAnimationStore.getState().isPlaying).toBe(true);
    useAnimationStore.getState().togglePlayPause();
    expect(useAnimationStore.getState().isPlaying).toBe(false);
  });

  it("reset sets index to 0 and pauses", () => {
    useAnimationStore.getState().loadSteps(makeSteps(5));
    useAnimationStore.getState().goToStep(3);
    useAnimationStore.setState({ isPlaying: true });
    useAnimationStore.getState().reset();
    expect(useAnimationStore.getState().currentStepIndex).toBe(0);
    expect(useAnimationStore.getState().isPlaying).toBe(false);
  });

  it("setSpeed clamps between 0.25 and 4", () => {
    useAnimationStore.getState().setSpeed(2);
    expect(useAnimationStore.getState().speed).toBe(2);
    useAnimationStore.getState().setSpeed(0.1);
    expect(useAnimationStore.getState().speed).toBe(0.25);
    useAnimationStore.getState().setSpeed(10);
    expect(useAnimationStore.getState().speed).toBe(4);
  });
});
