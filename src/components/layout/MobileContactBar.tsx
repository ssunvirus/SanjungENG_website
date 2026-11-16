"use client";

import { Phone } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  subscribeBrowserLocation,
  getBrowserPathname,
  getServerPathname,
} from "@/src/lib/browser-location-store";

export default function MobileContactBar() {
  const pathname = useSyncExternalStore(
    subscribeBrowserLocation,
    getBrowserPathname,
    getServerPathname,
  );
  const [visible, setVisible] = useState(false);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const expanded = expandedPath === pathname;

  useEffect(() => {
    function collapse(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setExpandedPath(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setExpandedPath(null);
    }
    document.addEventListener("pointerdown", collapse);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", collapse);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const forms = new Map<Element, boolean>();
    const viewport = window.visualViewport;
    let frame = 0;
    function updateVisibility() {
      const focused = document.activeElement;
      const editing =
        focused instanceof HTMLElement &&
        focused.matches("input, textarea, select, [contenteditable='true']");
      const keyboardOpen =
        viewport && viewport.scale === 1 && viewport.height < window.innerHeight * 0.75;
      const menuOpen = Boolean(document.getElementById("mobile-navigation"));
      const show = !editing && !keyboardOpen && !menuOpen && ![...forms.values()].some(Boolean);
      setVisible(show);
      if (!show) setExpandedPath(null);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) forms.set(entry.target, entry.isIntersecting);
        updateVisibility();
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    function refreshForms() {
      for (const form of forms.keys()) {
        if (!form.isConnected) {
          observer.unobserve(form);
          forms.delete(form);
        }
      }
      for (const form of document.querySelectorAll("[data-estimate-form]")) {
        if (!forms.has(form)) {
          const bounds = form.getBoundingClientRect();
          forms.set(
            form,
            form.getClientRects().length > 0 &&
              bounds.bottom > 0 &&
              bounds.top < window.innerHeight - 80,
          );
          observer.observe(form);
        }
      }
      updateVisibility();
    }
    function onFocusChange() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateVisibility);
    }
    const mutations = new MutationObserver(refreshForms);
    mutations.observe(document.body, { childList: true, subtree: true });
    frame = requestAnimationFrame(refreshForms);
    document.addEventListener("focusin", onFocusChange);
    document.addEventListener("focusout", onFocusChange);
    viewport?.addEventListener("resize", updateVisibility);
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
      document.removeEventListener("focusin", onFocusChange);
      document.removeEventListener("focusout", onFocusChange);
      viewport?.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  return (
    <>
      <aside
        ref={containerRef}
        aria-label="빠른 상담"
        hidden={!visible}
        className="fixed left-4 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-40 lg:hidden"
      >
        {expanded ? (
          <a
            href="tel:01053401728"
            aria-label="전화문의, 010-5340-1728로 전화 연결"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-brand-navy px-4 text-sm font-bold text-white shadow-[0_4px_16px_rgba(16,45,74,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <Phone size={20} aria-hidden="true" />
            전화문의
          </a>
        ) : (
          <button
            type="button"
            aria-label="전화문의 펼치기"
            aria-expanded={false}
            onClick={() => setExpandedPath(pathname)}
            className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-brand-navy text-white shadow-[0_4px_16px_rgba(16,45,74,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <Phone size={20} aria-hidden="true" />
          </button>
        )}
      </aside>
    </>
  );
}
