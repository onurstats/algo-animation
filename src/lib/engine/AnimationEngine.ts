import type { AnimationStep } from "@/lib/types";

export interface AnimationEngineState {
  steps: AnimationStep[];
  currentIndex: number;
  isPlaying: boolean;
  speed: number;
}

export class AnimationEngine {
  private steps: AnimationStep[] = [];
  private currentIndex = 0;
  private isPlaying = false;
  private speed = 1;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private onUpdate: ((state: AnimationEngineState) => void) | null = null;

  loadSteps(steps: AnimationStep[]) {
    this.steps = steps;
    this.currentIndex = 0;
    this.isPlaying = false;
    this.clearTimer();
    this.notify();
  }

  setOnUpdate(callback: (state: AnimationEngineState) => void) {
    this.onUpdate = callback;
  }

  play() {
    if (this.steps.length === 0) return;
    if (this.currentIndex >= this.steps.length - 1) return;
    this.isPlaying = true;
    this.notify();
    this.scheduleNext();
  }

  pause() {
    this.isPlaying = false;
    this.clearTimer();
    this.notify();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  stepForward() {
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++;
      this.notify();
    }
    if (this.currentIndex >= this.steps.length - 1) {
      this.pause();
    }
  }

  stepBackward() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.notify();
    }
  }

  goToStep(index: number) {
    if (index >= 0 && index < this.steps.length) {
      this.currentIndex = index;
      this.notify();
    }
  }

  reset() {
    this.pause();
    this.currentIndex = 0;
    this.notify();
  }

  setSpeed(speed: number) {
    this.speed = Math.max(0.25, Math.min(4, speed));
    if (this.isPlaying) {
      this.clearTimer();
      this.scheduleNext();
    }
    this.notify();
  }

  getState(): AnimationEngineState {
    return {
      steps: this.steps,
      currentIndex: this.currentIndex,
      isPlaying: this.isPlaying,
      speed: this.speed,
    };
  }

  getCurrentStep(): AnimationStep | null {
    return this.steps[this.currentIndex] ?? null;
  }

  private getIntervalMs(): number {
    return 800 / this.speed;
  }

  private scheduleNext() {
    this.clearTimer();
    this.timerId = setTimeout(() => {
      if (!this.isPlaying) return;
      this.stepForward();
      if (this.isPlaying) {
        this.scheduleNext();
      }
    }, this.getIntervalMs());
  }

  private clearTimer() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private notify() {
    this.onUpdate?.(this.getState());
  }

  destroy() {
    this.clearTimer();
    this.onUpdate = null;
  }
}
