/** Normalize older saved labels without changing stored records or route paths. */
export function normalizeFabricDuctText(value: string): string {
  return value
    .replace(/\uC12C\uC720\s*\uB355\uD2B8/g, "패브릭덕트")
    .replace(/\uD398\uBE0C\uB9AD\uB355\uD2B8/g, "패브릭덕트");
}
