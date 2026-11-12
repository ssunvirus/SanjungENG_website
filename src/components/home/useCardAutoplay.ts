"use client";

import { useEffect, type RefObject } from "react";

export default function useCardAutoplay(
  container: RefObject<HTMLElement | null>,
  count: number,
  enabled: boolean,
  pauseUntil: RefObject<number>,
) {
  useEffect(() => {
    if (!enabled || count < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    function schedule() {
      timer = setTimeout(advance, Math.max(6000, pauseUntil.current - Date.now()));
    }
    function advance() {
      const remaining = pauseUntil.current - Date.now();
      if (remaining > 0) {
        timer = setTimeout(advance, remaining);
        return;
      }
      const element = container.current;
      if (
        element &&
        !document.hidden &&
        element.getClientRects().length &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const bounds = element.getBoundingClientRect();
        const first = element.children[0] as HTMLElement | undefined;
        const second = element.children[1] as HTMLElement | undefined;
        const step = first && second ? second.offsetLeft - first.offsetLeft : 0;
        if (bounds.bottom > 0 && bounds.top < window.innerHeight && step > 0) {
          const next = (Math.round(element.scrollLeft / step) + 1) % count;
          element.scrollTo({ left: next * step, behavior: "smooth" });
        }
      }
      schedule();
    }
    schedule();
    return () => clearTimeout(timer);
  }, [container, count, enabled, pauseUntil]);
}
