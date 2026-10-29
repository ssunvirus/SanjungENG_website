"use client";

import { useEffect, type RefObject } from "react";

export default function useProjectAutoplay(
  container: RefObject<HTMLElement | null>,
  count: number,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let previous = 0;
    let position = container.current?.scrollLeft ?? 0;
    let written = position;
    function animate(time: number) {
      const element = container.current;
      const elapsed = previous ? Math.min(time - previous, 64) : 0;
      previous = time;
      if (
        element &&
        !document.hidden &&
        element.getClientRects().length &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const bounds = element.getBoundingClientRect();
        const first = element.children[0] as HTMLElement | undefined;
        const repeat = element.children[count] as HTMLElement | undefined;
        const distance = first && repeat ? repeat.offsetLeft - first.offsetLeft : 0;
        if (bounds.bottom > 0 && bounds.top < window.innerHeight && distance > 0) {
          if (Math.abs(element.scrollLeft - written) > 1) position = element.scrollLeft;
          position = (position + elapsed * 0.028) % distance;
          element.scrollLeft = position;
          written = element.scrollLeft;
        }
      }
      frame = window.requestAnimationFrame(animate);
    }
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [container, count, enabled]);
}
