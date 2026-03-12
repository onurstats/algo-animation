"use client";

import { useEffect } from "react";
import { useAnimationStore } from "@/stores/animationStore";

export function useKeyboardShortcuts() {
  const { togglePlayPause, stepForward, stepBackward, reset, setSpeed } =
    useAnimationStore();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowRight":
          e.preventDefault();
          stepForward();
          break;
        case "ArrowLeft":
          e.preventDefault();
          stepBackward();
          break;
        case "r":
        case "R":
          reset();
          break;
        case "1":
          setSpeed(0.5);
          break;
        case "2":
          setSpeed(1);
          break;
        case "3":
          setSpeed(2);
          break;
        case "4":
          setSpeed(4);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause, stepForward, stepBackward, reset, setSpeed]);
}
