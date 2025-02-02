export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type JsonObject = { [key: string]: Json };

// Type guard to check if a value is a valid JSON object
export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Type guard to check if a value is valid JSON
export function isJson(value: unknown): value is Json {
  if (value === null) return true;
  if (typeof value === 'boolean') return true;
  if (typeof value === 'number') return true;
  if (typeof value === 'string') return true;
  if (Array.isArray(value)) return value.every(isJson);
  if (typeof value === 'object') {
    return Object.values(value as object).every(isJson);
  }
  return false;
}