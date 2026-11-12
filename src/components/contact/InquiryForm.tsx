"use client";

import Image from "next/image";
import { ArrowRight, Paperclip } from "lucide-react";
import { type DragEvent, type FormEvent, useRef, useState } from "react";
import { useEstimateForm } from "@/src/hooks/use-estimate-form";
import {
  attachmentAccept,
  estimateCategories,
  estimateLimits,
  readEstimateFields,
  validateAttachments,
  validateEstimateFields,
} from "@/src/lib/estimate-rules";

const inputClass =
  "text-base lg:text-[20px] mt-[10px] block h-[50px] w-full border-2 border-brand-navy/10 bg-white px-3 lg:px-[19px] font-semibold placeholder:text-brand-navy/20 focus:border-brand-blue focus:outline-none";

function Field({
  name,
  label,
  placeholder,
  required = false,
  type = "text",
  maxLength = estimateLimits.company,
}: {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
}) {
  return (
    <label className="block text-[14px] lg:text-[20px] font-semibold leading-[24px]">
      {label}
      {required && <span className="ml-1 text-red-600">*</span>}
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={
          name === "company"
            ? "organization"
            : name === "manager"
              ? "name"
              : type === "tel"
                ? "tel"
                : type === "email"
                  ? "email"
                  : "off"
        }
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

export default function InquiryForm() {
  const [category, setCategory] = useState<(typeof estimateCategories)[number]>("냉동공조");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [draggingFiles, setDraggingFiles] = useState(false);
  const dragDepth = useRef(0);
  const { status, notice, send, showError, clearNotice } = useEstimateForm();

  function addFiles(incoming: File[]) {
    if (status === "sending" || !incoming.length) return;
    const combined = [...selectedFiles];
    for (const file of incoming) {
      if (
        !combined.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.type === file.type &&
            existing.lastModified === file.lastModified,
        )
      )
        combined.push(file);
    }
    const error = validateAttachments(combined);
    if (error) {
      showError(error);
      return;
    }
    setSelectedFiles(combined);
    clearNotice();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current = 0;
    setDraggingFiles(false);
    addFiles(Array.from(event.dataTransfer.files));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    // Dropped files live in state; both selection methods use the same payload.
    fields.delete("attachments");
    for (const file of selectedFiles) fields.append("attachments", file);
    for (const key of ["company", "manager", "phone", "email", "location", "message"]) {
      const value = fields.get(key);
      if (typeof value === "string") fields.set(key, value.trim());
    }
    const files = fields
      .getAll("attachments")
      .filter((file): file is File => file instanceof File && file.size > 0);
    const input = readEstimateFields({
      ...Object.fromEntries(fields),
      privacy: fields.get("privacy") === "on",
    });
    const validationError = validateEstimateFields(input) || validateAttachments(files);
    if (validationError) {
      showError(validationError);
      return;
    }
    if (await send(fields, true)) {
      form.reset();
      setCategory("냉동공조");
      setSelectedFiles([]);
      setDraggingFiles(false);
      dragDepth.current = 0;
    }
  }

  return (
    <form
      id="inquiry-form"
      data-estimate-form
      onSubmit={handleSubmit}
      aria-labelledby="inquiry-form-heading"
      aria-busy={status === "sending"}
      className="scroll-mt-24 mt-[24px] lg:mt-[88px] lg:min-h-[1189px] bg-white px-5 lg:px-[58px] pb-[24px] pt-[18px] lg:rounded-2xl lg:pb-10 lg:pt-10 lg:ring-1 lg:ring-inset lg:ring-brand-navy/5 lg:shadow-[0_16px_48px_-12px_rgba(16,45,74,0.16),0_4px_12px_rgba(16,45,74,0.04)]"
    >
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />
      <div className="relative ml-0 lg:-ml-[14px] w-full lg:w-[735px]">
        <h2
          id="inquiry-form-heading"
          className="text-[28px] lg:text-[40px] font-bold leading-[36px] lg:leading-[48px]"
        >
          문의 내용 작성
        </h2>
        <p className="relative mt-2 lg:mt-0 lg:absolute lg:right-0 lg:top-[38px] text-right text-[14px] lg:text-[20px] leading-[24px] text-brand-navy/80">
          <span className="mr-2 text-red-600">*</span>필수 입력
        </p>
        <Image
          src="/images/contact/form-line.svg"
          width={735}
          height={2}
          alt=""
          aria-hidden="true"
          className="mt-[12px] lg:mt-[19px]"
        />
      </div>
      <fieldset className="mt-[24px] lg:mt-[26px]" disabled={status === "sending"}>
        <legend className="text-[14px] lg:text-[20px] font-semibold leading-[24px]">
          문의 분야 <span className="text-red-600">*</span>
        </legend>
        <div className="mt-[12px] lg:mt-[16px] flex gap-[20px] lg:gap-[66px]">
          {estimateCategories.map((value) => (
            <label
              key={value}
              className="relative flex cursor-pointer items-center gap-[12px] lg:gap-[8px] text-[16px] lg:text-[25px] font-semibold leading-[24px] lg:leading-[30px]"
            >
              <input
                type="radio"
                name="category"
                value={value}
                checked={category === value}
                onChange={() => setCategory(value)}
                required
                className="peer sr-only"
              />
              <Image
                src={`/images/contact/${category === value ? "radio-selected" : "radio-empty"}.svg`}
                width={24.7}
                height={24.7}
                alt=""
                aria-hidden="true"
                className="peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-brand-blue"
              />
              {value}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset
        disabled={status === "sending"}
        className="mt-[24px] lg:mt-[38px] w-full lg:w-[708px]"
      >
        <legend className="sr-only">담당자 및 현장 정보</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-x-[68px] lg:gap-y-[35px]">
          <Field name="company" label="회사명" placeholder="회사명을 입력해 주세요" />
          <Field name="manager" label="담당자명" placeholder="성함을 입력해 주세요" required />
          <Field
            name="phone"
            label="연락처"
            placeholder="연락 가능한 번호"
            required
            type="tel"
            maxLength={estimateLimits.phone}
          />
          <Field
            name="email"
            label="이메일"
            placeholder="이메일 주소"
            type="email"
            maxLength={estimateLimits.email}
          />
        </div>
        <div className="mt-[24px] lg:mt-[29px]">
          <Field
            name="location"
            label="현장 위치"
            placeholder="시/군/구 또는 현장 주소"
            maxLength={estimateLimits.location}
          />
        </div>
        <label className="mt-[24px] lg:mt-[44px] block text-[14px] lg:text-[20px] font-semibold leading-[24px]">
          문의 내용 <span className="text-red-600">*</span>
          <textarea
            required
            name="message"
            maxLength={estimateLimits.message}
            placeholder="설비 종류, 필요한 작업, 현장 상황을 알려주세요."
            className={`${inputClass} h-[232px] resize-y py-[19px] leading-[30px]`}
          />
        </label>
        <div className="mt-[24px] lg:mt-[44px]">
          <label
            htmlFor="inquiry-files"
            className="text-[14px] lg:text-[20px] font-semibold leading-[24px]"
          >
            첨부파일
          </label>
          <div
            onDragEnter={(event) => {
              if (status === "sending" || !event.dataTransfer.types.includes("Files")) return;
              event.preventDefault();
              dragDepth.current += 1;
              setDraggingFiles(true);
            }}
            onDragOver={(event) => {
              if (!event.dataTransfer.types.includes("Files")) return;
              event.preventDefault();
              event.dataTransfer.dropEffect = status === "sending" ? "none" : "copy";
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              dragDepth.current = Math.max(0, dragDepth.current - 1);
              if (!dragDepth.current) setDraggingFiles(false);
            }}
            onDrop={handleDrop}
            className={`mt-[12px] lg:mt-[10px] flex flex-wrap min-h-[100px] py-3 items-center gap-[12px] lg:gap-[20px] border-2 border-dashed px-[16px] lg:px-[19px] transition-colors ${draggingFiles ? "border-brand-blue bg-[#EFF7FB]" : "border-brand-navy/20"}`}
          >
            <Paperclip size={30} className="shrink-0 text-brand-navy/20" aria-hidden="true" />
            <label className="relative shrink-0 cursor-pointer border border-brand-navy/10 bg-brand-text/10 px-[16px] py-[16px] lg:py-[11px] text-[14px] lg:text-[20px] font-semibold text-brand-navy/80 focus-within:outline-2 focus-within:outline-brand-blue">
              파일 선택
              <input
                id="inquiry-files"
                name="attachments"
                type="file"
                accept={attachmentAccept}
                multiple
                disabled={status === "sending"}
                aria-describedby="inquiry-file-help"
                onChange={(event) => {
                  addFiles(Array.from(event.target.files ?? []));
                  event.target.value = "";
                }}
                className="absolute inset-0 w-full cursor-pointer opacity-0"
              />
            </label>
            <span className="min-w-0 text-sm lg:text-[18px] text-brand-navy/60" aria-live="polite">
              {draggingFiles
                ? "여기에 놓으면 첨부됩니다."
                : "사진·도면을 여기로 끌어다 놓거나 파일을 선택해주세요."}
            </span>
            {selectedFiles.length > 0 && (
              <ul className="w-full space-y-2" aria-label="선택한 첨부파일">
                {selectedFiles.map((file, index) => (
                  <li key={`${file.name}-${index}`} className="flex items-center gap-3 text-sm">
                    <span className="min-w-0 flex-1 break-all">{file.name}</span>
                    <button
                      type="button"
                      disabled={status === "sending"}
                      aria-label={`${file.name} 첨부 삭제`}
                      className="shrink-0 px-2 py-1 text-brand-blue underline disabled:opacity-50"
                      onClick={() => {
                        setSelectedFiles(
                          selectedFiles.filter((_, selectedIndex) => selectedIndex !== index),
                        );
                        clearNotice();
                      }}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p id="inquiry-file-help" className="mt-2 text-[14px] text-brand-navy/60">
            JPG, PNG, WEBP, PDF, ZIP · 최대 5개 / 전체 20MB
          </p>
          <p className="mt-1 text-[14px] text-brand-navy/60">
            사진이 많으면 ZIP 파일로 압축해 첨부해주세요.
          </p>
        </div>
        <div className="mt-[12px] lg:mt-[17px] text-brand-navy">
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-medium leading-[24px] lg:text-[18px]">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="privacy"
                required
                className="size-[18px] shrink-0 accent-brand-blue"
              />
              개인정보 수집 및 이용에 동의합니다.
            </label>
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007FA5] underline underline-offset-2"
            >
              처리방침 보기
            </a>
          </div>
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="relative mt-[12px] lg:mt-[23px] flex h-[58px] w-full items-center justify-center rounded-[5px] bg-brand-navy text-[16px] lg:text-[25px] font-semibold text-white transition-colors hover:bg-[#164366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "전송 중…" : "견적문의 보내기"}
          <ArrowRight size={30} className="absolute right-[28px]" aria-hidden="true" />
        </button>
      </fieldset>
      {notice && (
        <p
          aria-live={status === "error" ? "assertive" : "polite"}
          role={status === "error" ? "alert" : "status"}
          className={`mt-4 w-full lg:w-[708px] text-sm lg:text-[18px] ${status === "error" ? "text-red-600" : "text-[#007FA5]"}`}
        >
          {notice}
        </p>
      )}
    </form>
  );
}
