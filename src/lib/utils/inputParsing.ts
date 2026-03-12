export interface InputField {
  name: string;
  label: string;
  type: "array" | "number" | "string" | "matrix" | "linked-list";
  defaultValue: unknown;
}

export function parseValue(raw: string, type: InputField["type"]): unknown {
  try {
    switch (type) {
      case "array":
      case "matrix":
      case "linked-list":
        return JSON.parse(raw);
      case "number":
        return Number(raw);
      case "string":
        return raw;
      default:
        return raw;
    }
  } catch {
    return raw;
  }
}

export function formatDefault(value: unknown): string {
  if (Array.isArray(value) || typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value ?? "");
}
