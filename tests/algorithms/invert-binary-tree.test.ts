import { describe, it, expect } from "vitest";
import { generateSteps } from "@/lib/problems/data/invert-binary-tree/stepGenerator";

describe("Invert Binary Tree stepGenerator", () => {
  const defaultInput = { root: [4, 2, 7, 1, 3, 6, 9] };

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

  it("completes the inversion", () => {
    const steps = generateSteps(defaultInput);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.action).toBe("complete");
  });

  it("handles single node tree", () => {
    const steps = generateSteps({ root: [1] });
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.action).toBe("complete");
  });

  it("handles empty tree", () => {
    const steps = generateSteps({ root: [] });
    expect(steps.length).toBeGreaterThan(0);
  });
});
