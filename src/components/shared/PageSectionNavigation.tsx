"use client";

import { useEffect, useRef, useState } from "react";
import SectionNavigation from "@/src/components/shared/SectionNavigation";

export default function PageSectionNavigation({
  items,
  label,
  compact = false,
}: {
  items: readonly (readonly [string, string])[];
  label: string;
  compact?: boolean;
}) {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [showRail, setShowRail] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const menu = railRef.current?.querySelector("nav");
      if (!menu || !menu.getClientRects().length) return;
      setFooterVisible(footer.getBoundingClientRect().top <= menu.getBoundingClientRect().bottom);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(footer);
    if (railRef.current) observer.observe(railRef.current);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [showRail]);
  useEffect(() => {
    const horizontal = horizontalRef.current;
    if (!horizontal) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowRail(!entry.isIntersecting && entry.boundingClientRect.bottom <= 98);
      },
      { rootMargin: "-98px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(horizontal);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div ref={horizontalRef}>
        <SectionNavigation items={items} label={label} compact={compact} sticky={false} />
      </div>
      {showRail && (
        <div ref={railRef} style={{ visibility: footerVisible ? "hidden" : "visible" }}>
          <SectionNavigation
            items={items}
            label={label}
            compact={compact}
            sticky={false}
            rightRail
          />
        </div>
      )}
    </>
  );
}
