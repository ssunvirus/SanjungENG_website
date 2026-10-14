import { createHash } from "node:crypto";
import { isIP } from "node:net";

type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

function clientIp(headers: Headers): string | null {
  // The rightmost address is appended by the trusted edge proxy. Do not trust
  // the leftmost value, which a client can supply itself.
  const forwarded = headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  if (forwarded && isIP(forwarded)) return forwarded;
  const realIp = headers.get("x-real-ip")?.trim();
  return realIp && isIP(realIp) ? realIp : null;
}

function digest(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function takeEstimateSlot(headers: Headers, phone: string, now = Date.now()): number | null {
  const ip = clientIp(headers);
  const phoneKey = digest(phone.replace(/\D/g, ""));
  const rules = [
    { key: `phone:${phoneKey}`, limit: 3, windowMs: 60 * 60 * 1000 },
    ...(ip ? [{ key: `ip:${digest(ip)}`, limit: 5, windowMs: 10 * 60 * 1000 }] : []),
  ];

  // Expired entries are removed, and the map stays bounded if bots rotate keys.
  if (buckets.size > 10000) {
    for (const [key, entry] of buckets) {
      if (entry.resetAt <= now) buckets.delete(key);
    }
    while (buckets.size > 10000) {
      const oldestKey = buckets.keys().next().value;
      if (!oldestKey) break;
      buckets.delete(oldestKey);
    }
  }

  let retryAfter = 0;
  for (const rule of rules) {
    const entry = buckets.get(rule.key);
    if (entry && entry.resetAt > now && entry.count >= rule.limit) {
      retryAfter = Math.max(retryAfter, Math.ceil((entry.resetAt - now) / 1000));
    }
  }
  if (retryAfter) return retryAfter;

  for (const rule of rules) {
    const entry = buckets.get(rule.key);
    if (entry && entry.resetAt > now) entry.count += 1;
    else buckets.set(rule.key, { count: 1, resetAt: now + rule.windowMs });
  }
  return null;
}
