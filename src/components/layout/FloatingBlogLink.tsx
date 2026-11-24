"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, FileText, MessageCircle, Phone, X } from "lucide-react";

export default function FloatingBlogLink() {
  const [expanded, setExpanded] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const phoneId = useId();
  const phoneInput = useRef<HTMLInputElement>(null);
  const phoneToggle = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  async function copyPhone() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText("010-5340-1728");
      } else {
        phoneInput.current?.select();
        if (!document.execCommand("copy")) throw new Error("CopyUnavailable");
      }
      setCopyStatus("전화번호를 복사했습니다.");
    } catch {
      phoneInput.current?.select();
      setCopyStatus("선택된 번호를 Ctrl+C로 복사해주세요.");
    }
  }
  return (
    <aside
      aria-label="빠른 문의와 공식 블로그"
      className="fixed right-4 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-40 lg:right-6 lg:bottom-6"
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          if (phoneOpen) {
            setPhoneOpen(false);
            phoneToggle.current?.focus();
          } else {
            setExpanded(false);
            toggleRef.current?.focus();
          }
        }
      }}
    >
      {expanded && (
        <nav
          id={menuId}
          aria-label="빠른 메뉴"
          className="absolute right-0 bottom-[calc(100%+12px)] flex max-h-[calc(100dvh-120px)] w-[104px] flex-col divide-y divide-white/20 overflow-y-auto rounded-[28px] border border-white/15 bg-brand-navy px-3 py-2 text-white shadow-[4px_8px_24px_rgba(16,45,74,0.2)]"
        >
          <Link
            href="/contact"
            className="flex min-h-[106px] flex-col items-center justify-center gap-2 rounded-t-2xl text-[18px] font-bold transition-colors hover:text-[#6CDEFA] focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <FileText size={34} strokeWidth={1.8} aria-hidden="true" />
            견적문의
          </Link>
          <a
            href="tel:01053401728"
            aria-label="전화상담, 010-5340-1728로 전화 연결"
            className="flex min-h-[106px] flex-col items-center justify-center gap-2 text-[18px] font-bold transition-colors hover:text-[#6CDEFA] focus-visible:outline-2 focus-visible:outline-brand-blue lg:hidden"
          >
            <Phone size={34} strokeWidth={1.8} aria-hidden="true" />
            전화상담
          </a>
          <button
            ref={phoneToggle}
            type="button"
            aria-expanded={phoneOpen}
            aria-controls={phoneId}
            onClick={() => {
              setPhoneOpen((current) => !current);
              setCopyStatus("");
            }}
            className="hidden min-h-[106px] cursor-pointer flex-col items-center justify-center gap-2 text-[18px] font-bold transition-colors hover:text-[#6CDEFA] focus-visible:outline-2 focus-visible:outline-brand-blue lg:flex"
          >
            <Phone size={34} strokeWidth={1.8} aria-hidden="true" />
            전화상담
          </button>
          <a
            href="https://blog.naver.com/sanjungeng"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="산정엔지니어링 공식 블로그, 새 탭으로 열기"
            className="flex min-h-[106px] flex-col items-center justify-center gap-2 rounded-b-2xl text-[18px] font-bold transition-colors hover:text-[#6CDEFA] focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <Image src="/naver-blog.svg" alt="" width={95} height={74} className="h-auto w-11" />
            공식블로그
          </a>
        </nav>
      )}
      {expanded && phoneOpen && (
        <section
          id={phoneId}
          aria-label="전화상담 안내"
          className="absolute right-[120px] bottom-[130px] hidden w-[310px] rounded-2xl border border-brand-navy/10 bg-white p-6 text-brand-navy shadow-[0_10px_30px_rgba(16,45,74,0.15)] lg:block"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">전화상담</h2>
            <button
              type="button"
              aria-label="전화번호 안내 닫기"
              onClick={() => {
                setPhoneOpen(false);
                phoneToggle.current?.focus();
              }}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full hover:bg-brand-navy/5 focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <input
            ref={phoneInput}
            aria-label="상담 전화번호"
            value="010-5340-1728"
            readOnly
            onFocus={(event) => event.currentTarget.select()}
            className="mt-2 w-full rounded bg-transparent text-[30px] font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-brand-blue"
          />
          <button
            type="button"
            onClick={copyPhone}
            className="mt-5 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-navy px-4 py-3 text-lg font-semibold text-white hover:bg-[#16436b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <Copy size={20} aria-hidden="true" />
            전화번호 복사
          </button>
          <p role="status" className="mt-3 text-sm font-medium leading-6 text-brand-navy/75">
            {copyStatus || "휴대폰으로 전화주시면 상담해드립니다."}
          </p>
        </section>
      )}
      <button
        ref={toggleRef}
        type="button"
        aria-label={expanded ? "빠른 메뉴 닫기" : "빠른 메뉴 열기"}
        aria-expanded={expanded}
        aria-controls={menuId}
        onClick={() => {
          setExpanded((current) => !current);
          setPhoneOpen(false);
          setCopyStatus("");
        }}
        className="flex size-14 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-brand-navy text-white shadow-[0_10px_30px_rgba(16,45,74,0.2)] transition-colors hover:bg-[#16436b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transition-none lg:size-16"
      >
        {expanded ? (
          <X size={30} aria-hidden="true" />
        ) : (
          <MessageCircle size={30} aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
