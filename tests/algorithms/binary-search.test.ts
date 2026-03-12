import { describe, it, expect } from "vitest";
import { generateSteps } from "@/lib/problems/data/binary-search/stepGenerator";

describe("Binary Search stepGenerator", () => {
  const defaultInput = { nums: [-1, 0, 3, 5, 9, 12], target: 9 };

  it("returns a non-empty array of steps", () => {
    const steps = generateSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("has sequential IDs", () => {
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

  it("finds target at correct index", () => {
    const steps = generateSteps(defaultInput);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.action).toBe("found");
    expect(lastStep.data.result).toBe(4);
  });

  it("visits while-loop line each iteration", () => {
    const steps = generateSteps(defaultInput);
    const whileSteps = steps.filter((s) => s.codeLineNumber === 4);
    expect(whileSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("returns not-found for missing target", () => {
    const steps = generateSteps({ nums: [-1, 0, 3, 5, 9, 12], target: 2 });
    const lastStep = steps[steps.length - 1];
    expect(lastStep.action).toBe("not-found");
    expect(lastStep.data.result).toBe(-1);
  });

  it("handles single element array", () => {
    const steps = generateSteps({ nums: [5], target: 5 });
    const lastStep = steps[steps.length - 1];
    expect(lastStep.action).toBe("found");
    expect(lastStep.data.result).toBe(0);
  });
});
