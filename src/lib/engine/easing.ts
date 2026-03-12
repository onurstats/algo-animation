export type EasingFunction = (t: number) => number;

export const linear: EasingFunction = (t) => t;

export const easeInOut: EasingFunction = (t) =>
  t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

export const easeIn: EasingFunction = (t) => t * t;

export const easeOut: EasingFunction = (t) => 1 - (1 - t) ** 2;

export function interpolate(
  from: number,
  to: number,
  progress: number,
  easing: EasingFunction = easeInOut,
): number {
  return from + (to - from) * easing(progress);
}
