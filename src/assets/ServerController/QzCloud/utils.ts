export const S = (v: unknown, d = ""): string => v == null ? d : String(v);
export const N = (v: unknown, d = 0): number =>typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" && v !== "" ? (Number(v) || d) : d;
export const B01= (v: unknown): boolean => Boolean(N(v, 0));
