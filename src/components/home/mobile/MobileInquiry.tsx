"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { submitEstimate } from "@/src/lib/submit-estimate";

export default function MobileInquiry() {
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setSending(true);
    setNotice("");
    try {
      await submitEstimate(fields);
      setNotice("문의가 접수되었습니다. 담당자가 확인 후 연락드립니다.");
      form.reset();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "연결을 확인하고 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  }
  const field =
    "mt-2 min-h-12 w-full rounded-lg border border-[#D1DFE8] bg-[#F7FBFD] px-3 text-base font-normal outline-none focus:border-[#00ADDB]";
  return (
    <form onSubmit={submit} className="mt-8 rounded-[20px] bg-white p-6">
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />
      <h3 className="text-[22px] font-bold">간편 견적 문의</h3>
      <p className="mt-2 text-sm leading-6 text-[#637382]">
        빠른 상담을 위해 아래 내용을 입력해 주세요.
      </p>
      <div className="mt-6 space-y-5 text-sm font-semibold">
        <label className="block">
          회사명
          <input
            name="company"
            autoComplete="organization"
            maxLength={100}
            placeholder="회사명을 입력해주세요"
            className={field}
          />
        </label>
        <label className="block">
          이름 <span className="text-red-600">*</span>
          <input
            required
            name="manager"
            autoComplete="name"
            maxLength={100}
            placeholder="이름을 입력해주세요"
            className={field}
          />
        </label>
        <label className="block">
          연락처 <span className="text-red-600">*</span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="연락처를 입력해주세요"
            className={field}
          />
        </label>
        <label className="block">
          문의 분야 <span className="text-red-600">*</span>
          <select required name="category" defaultValue="" className={field}>
            <option value="" disabled>
              문의 분야를 선택해주세요
            </option>
            <option>냉동공조</option>
            <option>섬유덕트</option>
          </select>
        </label>
        <label className="block">
          문의 사항 <span className="text-red-600">*</span>
          <textarea
            required
            name="message"
            maxLength={3000}
            rows={3}
            placeholder="예) 냉동기 설치, 섬유덕트, 유지보수 등"
            className={`${field} py-3`}
          />
        </label>
        <div className="text-xs font-normal leading-5 text-[#637382]">
          <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
            <label className="flex items-start gap-2">
              <input
                required
                type="checkbox"
                name="privacy"
                className="mt-1 size-4 shrink-0 accent-[#00ADDB]"
              />
              개인정보 수집 및 이용에 동의합니다.
            </label>
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007FA5] underline"
            >
              처리방침 보기
            </Link>
          </div>
        </div>
      </div>
      <button
        disabled={sending}
        className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#00ADDB] text-base font-bold text-white disabled:opacity-60"
      >
        {sending ? "전송 중…" : "무료 견적 요청하기"}
        <ArrowRight size={20} aria-hidden="true" />
      </button>
      <p role="status" className="mt-3 text-sm leading-5 text-[#006EB8]">
        {notice}
      </p>
    </form>
  );
}
