"use client";

import { ChevronDown, Mail, PhoneCall } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { submitEstimate } from "@/src/lib/submit-estimate";

const fieldClass =
  "h-[50px] rounded-[8px] border border-[#D1DFE8] bg-[#F7FBFD] px-[14px] text-[14px] text-[#102D4A] outline-none transition-colors placeholder:text-[#6E7D8C] focus:border-[#00ADDB]";

function RequiredInput({
  name,
  label,
  hint,
  type = "text",
  required = true,
}: {
  name: string;
  label: string;
  hint: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="relative min-w-0">
      <input
        required={required}
        name={name}
        type={type}
        aria-label={label}
        placeholder=" "
        className={`${fieldClass} peer w-full`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden items-center gap-1 px-[14px] text-[14px] text-[#6E7D8C] peer-placeholder-shown:flex"
      >
        <span>
          {label} {required && <span className="text-red-600">*</span>}
        </span>
        <span>{hint}</span>
      </span>
    </label>
  );
}

export default function EstimateCta() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const sending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    sending.current = true;
    setStatus("sending");
    setNotice("문의를 전송하고 있습니다.");
    try {
      await submitEstimate(fields);
      setStatus("success");
      setNotice("문의가 접수되었습니다. 담당자가 확인 후 연락드립니다.");
      form.reset();
      setCategory("");
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "연결을 확인하고 다시 시도해주세요.");
    } finally {
      sending.current = false;
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="estimate-heading"
      className="mx-auto min-h-[696px] w-full max-w-[1440px] bg-[#EFF7FB] px-[105px] py-[75px]"
    >
      <div className="flex min-h-[546px] w-[1230px] items-center justify-center gap-[60px]">
        <div className="flex w-[525px] shrink-0 flex-col items-start gap-[21px] text-[#102D4A]">
          <div className="flex h-6 items-center gap-[20px] text-[20px] font-medium tracking-[6px] text-[#00ADDB]/60">
            <span>SOLUTION</span>
            <span aria-hidden="true" className="h-[2px] w-[46px] bg-current" />
          </div>
          <h2 id="estimate-heading" className="text-[44px] font-bold leading-[57px]">
            현장에 필요한 답을,
            <br />
            <span className="text-[#00ADDB]">빠르고 정확하게</span> 제안합니다.
          </h2>
          <p className="text-[16px] leading-[26px] text-[#4F6173]">
            냉동공조 설비부터 섬유덕트, 유지보수까지
            <br />
            현장 조건과 필요한 작업을 남겨주시면 담당자가 확인 후 연락드립니다.
          </p>
          <span aria-hidden="true" className="h-[3px] w-[60px] rounded-sm bg-[#00ADDB]" />
          <p className="text-[14px] font-medium leading-[21px]">
            30년 현장 경험　·　설계부터 시공까지　·　설치 이후 유지관리
          </p>
          <div className="flex flex-col gap-[15px] rounded-[15px] bg-[#102D4A] px-[23px] py-[15px] text-white shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
            <p className="text-[12px] font-medium leading-[17px] text-[#ADC9DB]">
              바로 상담이 필요하신가요?
            </p>
            <div className="flex flex-col gap-[6px]">
              <PhoneCall size={36} strokeWidth={1.8} aria-hidden="true" />
              <p className="text-[23px] font-bold leading-[35px]">대표번호 : 010 - 5340 - 1728</p>
              <p className="text-[23px] font-bold leading-[35px]">회사번호 : 02 - 891 - 1728</p>
            </div>
            <div className="flex items-center gap-3 text-[#D1E3ED]">
              <Mail size={30} strokeWidth={1.8} aria-hidden="true" />
              <p className="text-[19px] font-medium">sanjungeng@naver.com</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-[570px] w-[570px] shrink-0 flex-col gap-[15px] rounded-[15px] bg-white px-[39px] py-[34px] shadow-[0_14px_34px_rgba(16,45,74,0.12)]"
        >
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px]"
          />
          <div>
            <h3 className="text-[26px] font-bold leading-[34px] text-[#102D4A]">간편 견적 문의</h3>
            <p className="mt-1 text-[14px] leading-[20px] text-[#637382]">
              필수 정보만 남겨주시면 담당자가 확인 후 연락드립니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RequiredInput
              name="company"
              label="업체명"
              hint="회사명을 입력해주세요"
              required={false}
            />
            <RequiredInput name="manager" label="담당자명" hint="성함을 입력해주세요" />
          </div>
          <div className="relative w-full">
            <select
              required
              name="category"
              aria-label="문의 분야"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={`${fieldClass} w-full appearance-none pr-[38px]`}
            >
              <option value="" disabled>
                문의 분야를 선택해주세요
              </option>
              <option>냉동공조</option>
              <option>섬유덕트</option>
            </select>
            {!category && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-px left-px right-[35px] flex min-w-0 items-center overflow-hidden rounded-l-[7px] bg-[#F7FBFD] pl-[13px] text-[14px] text-[#102D4A]"
              >
                <span className="shrink-0">
                  문의 분야 <span className="ml-1 text-red-600">*</span>
                </span>
                <span className="ml-3 min-w-0 truncate">냉동공조 / 섬유덕트</span>
              </span>
            )}
            <ChevronDown
              aria-hidden="true"
              size={16}
              strokeWidth={2.5}
              className="pointer-events-none absolute top-1/2 right-[14px] -translate-y-1/2 text-[#102D4A]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RequiredInput name="phone" type="tel" label="연락처" hint="010-0000-0000" />
            <input
              name="email"
              type="email"
              aria-label="이메일"
              placeholder="이메일  example@company.com"
              className={fieldClass}
            />
          </div>
          <textarea
            required
            maxLength={3000}
            name="message"
            aria-label="현장 및 문의 내용"
            placeholder="현장 및 문의 내용&#10;현장 위치, 설비 종류, 요청 작업을 간단히 입력해주세요."
            className={`${fieldClass} h-[87px] resize-none py-[8px]`}
          />
          <div className="text-[12px] leading-[18px] text-[#637382]">
            <div className="mt-1 flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  required
                  name="privacy"
                  type="checkbox"
                  className="size-[15px] accent-[#00ADDB]"
                />
                개인정보 수집 및 이용에 동의합니다.
              </label>
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[#007FA5] underline"
              >
                처리방침 보기
              </Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[51px] shrink-0 rounded-[8px] bg-[#00ADDB] text-[17px] font-bold text-white transition-colors hover:bg-[#0098c2] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102D4A]"
          >
            {status === "sending" ? "전송 중…" : "무료 견적 요청하기　→"}
          </button>
          <p
            aria-live="polite"
            className={`min-h-[32px] text-center text-[12px] leading-[16px] ${status === "error" ? "text-red-600" : "text-[#007FA5]"}`}
          >
            {notice}
          </p>
        </form>
      </div>
    </section>
  );
}
