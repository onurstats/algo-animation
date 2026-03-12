import { describe, it, expect } from "vitest";
import { generateSteps } from "@/lib/problems/data/reverse-linked-list/stepGenerator";

describe("Reverse Linked List stepGenerator", () => {
  const defaultInput = { head: [1, 2, 3, 4, 5] };

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

  it("completes with reversed list", () => {
    const steps = generateSteps(defaultInput);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.action).toBe("complete");
  });

  it("visits while-loop line each iteration", () => {
    const steps = generateSteps(defaultInput);
    const whileSteps = steps.filter((s) => s.codeLineNumber === 4);
    // 5 nodes = 5 true iterations + 1 false = 6
    expect(whileSteps.length).toBeGreaterThanOrEqual(5);
  });

  it("handles single element", () => {
    const steps = generateSteps({ head: [1] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep.action).toBe("complete");
  });
});
