"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Keep the illustration and its annotations in the same 1920px coordinate space.
export default function BusinessOverviewFrame({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    const resize = () => {
      canvas.style.transform = `scale(${frame.clientWidth / 1920})`;
      canvas.style.visibility = "visible";
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative mx-auto aspect-[1920/1081] w-full max-w-[1920px] overflow-hidden"
    >
      <div
        ref={canvasRef}
        className="invisible absolute left-0 top-0 h-[1081px] w-[1920px] origin-top-left"
      >
        {children}
      </div>
    </div>
  );
}
