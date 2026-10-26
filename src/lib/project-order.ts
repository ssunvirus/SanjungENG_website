export type ProjectOrder = { ids: string[]; version: number };

export function parseProjectOrder(value: unknown): ProjectOrder {
  if (!value || typeof value !== "object") throw new Error("InvalidOrder");
  const { ids, version } = value as Record<string, unknown>;
  if (
    !Array.isArray(ids) ||
    ids.length > 1000 ||
    !Number.isSafeInteger(version) ||
    (version as number) < 0 ||
    ids.some((id) => typeof id !== "string" || !/^[a-z0-9][a-z0-9-]{0,99}$/.test(id)) ||
    new Set(ids).size !== ids.length
  )
    throw new Error("InvalidOrder");
  return { ids, version: version as number };
}

export function applyProjectOrder<T extends { id: string }>(items: T[], ids: string[]): T[] {
  const positions = new Map(ids.map((id, index) => [id, index]));
  // Newly registered cases appear first until their position is explicitly saved.
  return [...items].sort((a, b) => (positions.get(a.id) ?? -1) - (positions.get(b.id) ?? -1));
}

export function moveProjectInList<T extends { id: string }>(
  items: T[],
  visible: T[],
  id: string,
  direction: -1 | 1,
) {
  const index = visible.findIndex((item) => item.id === id);
  const neighbor = visible[index + direction];
  if (index < 0 || !neighbor) return items;
  const next = [...items];
  const a = next.findIndex((item) => item.id === id);
  const b = next.findIndex((item) => item.id === neighbor.id);
  if (a < 0 || b < 0) return items;
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}
