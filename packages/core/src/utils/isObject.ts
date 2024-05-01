export const isObject = (v: any): v is Record<string, any> =>
  v != null && typeof v === "object";
