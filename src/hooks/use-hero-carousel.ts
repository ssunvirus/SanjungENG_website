"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const desktopQuery = "(min-width: 90rem)";

function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function isDesktop() {
  return window.matchMedia(desktopQuery).matches;
}

function serverSnapshot() {
  return false;
}

export function useHeroCarousel(length: number, desktop: boolean) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const desktopVisible = useSyncExternalStore(subscribeDesktop, isDesktop, serverSnapshot);
  const enabled = desktop === desktopVisible;

  useEffect(() => {
    if (!enabled || !isPlaying || isInteracting) return;
    const timer = window.setTimeout(() => {
      setCurrentSlide((current) => (current + 1) % length);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [currentSlide, enabled, isPlaying, isInteracting, length]);

  function move(direction: number) {
    setCurrentSlide((current) => (current + direction + length) % length);
  }

  return { currentSlide, setCurrentSlide, isPlaying, setIsPlaying, setIsInteracting, move };
}
