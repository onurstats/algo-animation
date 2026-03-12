import { describe, it, expect } from "vitest";
import { parseValue, formatDefault } from "@/lib/utils/inputParsing";

describe("parseValue", () => {
  it("parses array strings", () => {
    expect(parseValue("[1,2,3]", "array")).toEqual([1, 2, 3]);
  });

  it("parses nested arrays (matrix)", () => {
    expect(parseValue("[[1,2],[3,4]]", "matrix")).toEqual([[1, 2], [3, 4]]);
  });

  it("parses linked-list arrays", () => {
    expect(parseValue("[1,2,3]", "linked-list")).toEqual([1, 2, 3]);
  });

  it("parses numbers", () => {
    expect(parseValue("42", "number")).toBe(42);
    expect(parseValue("-5", "number")).toBe(-5);
    expect(parseValue("3.14", "number")).toBe(3.14);
  });

  it("returns strings as-is", () => {
    expect(parseValue("hello", "string")).toBe("hello");
    expect(parseValue("()[]{}", "string")).toBe("()[]{}");
  });

  it("returns raw string on invalid JSON for array type", () => {
    expect(parseValue("not-json", "array")).toBe("not-json");
  });
});

describe("formatDefault", () => {
  it("formats arrays", () => {
    expect(formatDefault([1, 2, 3])).toBe("[1,2,3]");
  });

  it("formats objects", () => {
    expect(formatDefault({ a: 1 })).toBe('{"a":1}');
  });

  it("formats numbers", () => {
    expect(formatDefault(42)).toBe("42");
  });

  it("formats strings", () => {
    expect(formatDefault("hello")).toBe("hello");
  });

  it("handles null/undefined", () => {
    expect(formatDefault(null)).toBe("null");
    expect(formatDefault(undefined)).toBe("");
  });
});
