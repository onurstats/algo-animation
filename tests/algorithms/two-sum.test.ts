import { describe, it, expect } from "vitest";
import { generateSteps } from "@/lib/problems/data/two-sum/stepGenerator";

describe("Two Sum stepGenerator", () => {
  const defaultInput = { nums: [2, 7, 11, 15], target: 9 };

  it("returns a non-empty array of steps", () => {
    const steps = generateSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("has sequential IDs starting at 0", () => {
    const steps = generateSteps(defaultInput);
    steps.forEach((step, i) => {
      expect(step.id).toBe(i);
    });
  });

  it("every step has required fields", () => {
    const steps = generateSteps(defaultInput);
    for (const step of steps) {
      expect(step).toHaveProperty("action");
      expect(step).toHaveProperty("description");
      expect(step).toHaveProperty("codeLineNumber");
      expect(step).toHaveProperty("data");
      expect(step.codeLineNumber).toBeGreaterThan(0);
    }
  });

  it("finds the correct result [0, 1]", () => {
    const steps = generateSteps(defaultInput);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.action).toBe("found");
    expect(lastStep.data.result).toEqual([0, 1]);
  });

  it("visits the for-loop line each iteration", () => {
    const steps = generateSteps(defaultInput);
    const forLoopSteps = steps.filter((s) => s.codeLineNumber === 3);
    // At least 2 iterations (i=0 finds complement at i=1) + the loop entry
    expect(forLoopSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("returns not-found when no pair exists", () => {
    const steps = generateSteps({ nums: [1, 2, 3], target: 100 });
    const lastStep = steps[steps.length - 1];
    expect(lastStep.action).toBe("not-found");
  });
});
