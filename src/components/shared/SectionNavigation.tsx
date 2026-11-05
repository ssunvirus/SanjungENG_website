"use client";

import { useEffect, useRef, useState } from "react";

const mobileLabels: Record<string, string> = {
  "산정엔지니어링 소개": "소개",
  "섬유덕트 소개": "소개",
  "공기 분배 설계": "공기 분배",
  "자주 묻는 질문": "FAQ",
  "주요 항온항습기": "주요 장비",
};

export default function SectionNavigation({ items, label }: { items: readonly (readonly [string, string])[]; label: string }) {
  const [active, setActive] = useState<string>(items[0][0]);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => setCanScrollRight(list.scrollLeft + list.clientWidth < list.scrollWidth - 2);
    const observer = new ResizeObserver(update);
    observer.observe(list);
    list.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", update);
    };
  }, [items]);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const list = listRef.current;
    const selected = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !selected) return;
    const itemRect = selected.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    list.scrollTo({
      left: list.scrollLeft + itemRect.left - listRect.left - (list.clientWidth - itemRect.width) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [active]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = navRef.current;
      if (!nav) return;
      const offset = parseFloat(getComputedStyle(nav).top) + nav.offsetHeight + 24;
      let current: string = items[0][0];
      for (const [id] of items) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= offset) {
          current = id;
        }
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = items[items.length - 1][0];
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <nav
      ref={navRef}
      aria-label={label}
      className="sticky top-[64px] z-40 mb-4 w-full border-b border-brand-navy/10 bg-white min-[768px]:top-[72px] min-[768px]:-mt-5 min-[768px]:border-0 min-[768px]:bg-transparent min-[768px]:px-4 lg:top-[98px] lg:-mt-6 lg:px-10"
    >
      <div ref={listRef} className="mx-auto flex max-w-[1280px] items-center gap-1 overflow-x-auto bg-white px-3 py-2 [scrollbar-width:none] min-[768px]:gap-2 min-[768px]:rounded-[24px] min-[768px]:border min-[768px]:border-brand-navy/10 min-[768px]:py-3 min-[768px]:shadow-[0_6px_16px_rgba(16,47,73,0.2)] lg:gap-3 lg:px-5 [&::-webkit-scrollbar]:hidden">
        {items.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={(event) => {
              const target = document.getElementById(id);
              if (!target) return;
              event.preventDefault();
              const nav = navRef.current!;
              const offset = parseFloat(getComputedStyle(nav).top) + nav.offsetHeight + 16;
              target.focus({ preventScroll: true });
              window.scrollTo({
                top: window.scrollY + target.getBoundingClientRect().top - offset,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              });
              history.replaceState(null, "", `#${id}`);
            }}
            className={`flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-[16px] font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue min-[768px]:px-5 min-[768px]:text-[17px] min-[1200px]:flex-1 lg:px-6 lg:text-[20px] ${active === id ? "bg-brand-blue text-white min-[768px]:shadow-[0_3px_8px_rgba(0,173,219,0.2)]" : "bg-transparent text-brand-navy hover:bg-brand-blue/15 hover:text-[#006EB8] min-[768px]:bg-[#EFF5FC]"}`}
          >
            <span className="min-[768px]:hidden">{mobileLabels[label] ?? label}</span>
            <span className="hidden min-[768px]:inline">{label}</span>
          </a>
        ))}
      </div>
      {canScrollRight && (
        <button
          type="button"
          aria-label="오른쪽 이동메뉴 더 보기"
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-end bg-gradient-to-l from-white via-white/95 to-transparent pr-2 text-brand-navy min-[768px]:hidden"
          onClick={() => listRef.current?.scrollBy({ left: Math.max(140, listRef.current.clientWidth * 0.6), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 5 7 7-7 7" /></svg>
        </button>
      )}
    </nav>
  );
}


