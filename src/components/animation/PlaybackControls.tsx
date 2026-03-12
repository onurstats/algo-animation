"use client";

import { useAnimation } from "@/hooks/useAnimation";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";

const speedOptions = [0.5, 1, 2, 4];

export function PlaybackControls() {
  const {
    isPlaying,
    speed,
    currentStepIndex,
    totalSteps,
    togglePlayPause,
    stepForward,
    stepBackward,
    reset,
    setSpeed,
  } = useAnimation();

  const atStart = currentStepIndex === 0;
  const atEnd = currentStepIndex >= totalSteps - 1;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
      {/* Transport controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          disabled={atStart}
          aria-label="Reset"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={stepBackward}
          disabled={atStart}
          aria-label="Step backward"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={togglePlayPause}
          disabled={totalSteps === 0}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="min-w-[72px]"
        >
          {isPlaying ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          <span className="text-xs">{isPlaying ? "Pause" : "Play"}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={stepForward}
          disabled={atEnd}
          aria-label="Step forward"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>

      {/* Step counter */}
      <span className="text-sm text-text-secondary tabular-nums">
        {totalSteps > 0 ? `${currentStepIndex + 1} / ${totalSteps}` : "0 / 0"}
      </span>

      {/* Speed control */}
      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs text-text-muted">Speed:</span>
        {speedOptions.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
              speed === s
                ? "bg-accent-blue text-white"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
