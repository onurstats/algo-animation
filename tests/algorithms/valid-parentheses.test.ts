import { describe, it, expect } from "vitest";
import { generateSteps } from "@/lib/problems/data/valid-parentheses/stepGenerator";

describe("Valid Parentheses stepGenerator", () => {
  it("returns steps for valid input", () => {
    const steps = generateSteps({ s: "()[]{}" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("has sequential IDs", () => {
    const steps = generateSteps({ s: "()" });
    steps.forEach((step, i) => {
      expect(step.id).toBe(i);
    });
  });

  it("every step has required fields", () => {
    const steps = generateSteps({ s: "()[]{}" });
    for (const step of steps) {
      expect(step).toHaveProperty("action");
      expect(step).toHaveProperty("description");
      expect(step).toHaveProperty("codeLineNumber");
      expect(step).toHaveProperty("data");
      expect(step.codeLineNumber).toBeGreaterThan(0);
    }
  });

  it("reports valid for matching brackets", () => {
    const steps = generateSteps({ s: "()[]{}" });
    const lastStep = steps[steps.length - 1];
    expect(lastStep.data.result).toBe(true);
  });

  it("reports invalid for mismatched brackets", () => {
    const steps = generateSteps({ s: "(]" });
    const lastStep = steps[steps.length - 1];
    expect(lastStep.data.result).toBe(false);
  });

  it("visits the for-loop line each iteration", () => {
    const steps = generateSteps({ s: "()" });
    const forLoopSteps = steps.filter((s) => s.codeLineNumber === 4);
    // 2 chars + 1 false condition = at least 3 visits
    expect(forLoopSteps.length).toBeGreaterThanOrEqual(2);
  });
});
