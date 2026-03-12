/**
 * Runtime type guards for safely extracting typed data from
 * AnimationStep.data (which is Record<string, unknown>).
 */

export function asNumberArray(val: unknown): number[] {
  if (!Array.isArray(val)) return [];
  return val.filter((v): v is number => typeof v === "number");
}

export function asNullableNumberArray(val: unknown): (number | null)[] {
  if (!Array.isArray(val)) return [];
  return val.filter(
    (v): v is number | null => v === null || typeof v === "number",
  );
}

export function asNumber(val: unknown, fallback = 0): number {
  return typeof val === "number" ? val : fallback;
}

export function asStringArray(val: unknown): string[] {
  if (!Array.isArray(val)) return [];
  return val.filter((v): v is string => typeof v === "string");
}

export function asNestedNumberArray(val: unknown): number[][] {
  if (!Array.isArray(val)) return [];
  return val.filter(
    (row): row is number[] =>
      Array.isArray(row) && row.every((v) => typeof v === "number"),
  );
}

export function asString(val: unknown, fallback = ""): string {
  return typeof val === "string" ? val : fallback;
}

export function asRecord(val: unknown): Record<string, unknown> {
  if (val && typeof val === "object" && !Array.isArray(val))
    return val as Record<string, unknown>;
  return {};
}
