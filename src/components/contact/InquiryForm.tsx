"use client";

import Image from "next/image";
import { ArrowRight, Paperclip } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";

const inputClass =
  "text-base lg:text-[20px] mt-[10px] block h-[50px] w-full border-2 border-[#102D4A]/10 bg-white px-3 lg:px-[19px] font-semibold placeholder:text-[#102D4A]/20 focus:border-[#00ADDB] focus:outline-none";
const categories = ["냉동공조", "섬유덕트"] as const;

function attachmentError(files: File[]) {
  if (
    files.length > 3 ||
    files.reduce((total, file) => total + file.size, 0) > 3 * 1024 * 1024
  ) {
    return "첨부파일은 최대 3개, 전체 3MB 이내로 선택해주세요.";
  }
  if (
    files.some(
      (file) =>
        !/\.(jpe?g|png|webp|pdf)$/i.test(file.name) ||
        !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(
          file.type,
        ),
    )
  ) {
    return "JPG, PNG, WEBP 또는 PDF 파일을 선택해주세요.";
  }
  return "";
}

function Field({
  name,
  label,
  placeholder,
  required = false,
  type = "text",
  maxLength = 100,
}: {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
}) {
  return (
    <label className="block text-[14px] lg:text-[20px] font-semibold leading-[24px] lg:leading-[24px]">
      {label}
      {required && name !== "company" && (
        <span className="ml-1 text-red-600">*</span>
      )}
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
  const [category, setCategory] =
    useState<(typeof categories)[number]>("냉동공조");
  const [fileNames, setFileNames] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [notice, setNotice] = useState("");
  const sending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    for (const key of [
      "company",
      "manager",
      "phone",
      "email",
      "location",
      "message",
    ]) {
      const value = fields.get(key);
      if (typeof value === "string") fields.set(key, value.trim());
    }
    const files = fields
      .getAll("attachments")
      .filter((file): file is File => file instanceof File && file.size > 0);
    const phone = String(fields.get("phone") ?? "");
    const validationError = !fields.get("manager")
        ? "담당자명을 입력해주세요."
        : !/^[+\d()\s-]{8,30}$/.test(phone) ||
            phone.replace(/\D/g, "").length < 8
          ? "연락처를 확인해주세요."
          : !fields.get("message")
            ? "문의 내용을 입력해주세요."
            : attachmentError(files);
    if (validationError) {
      setStatus("error");
      setNotice(validationError);
      return;
    }
    sending.current = true;
    setStatus("sending");
    setNotice("문의를 전송하고 있습니다.");
    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        body: fields,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result) {
        throw new Error(
          typeof result?.message === "string"
            ? result.message
            : "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
        );
      }
      setStatus("success");
      setNotice("문의가 접수되었습니다. 담당자가 확인 후 연락드립니다.");
      form.reset();
      setCategory("냉동공조");
      setFileNames("");
    } catch (error) {
      setStatus("error");
      setNotice(
        error instanceof Error
          ? error.message
          : "연결을 확인하고 다시 시도해주세요.",
      );
    } finally {
      sending.current = false;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="inquiry-form-heading"
      aria-busy={status === "sending"}
      className="mt-[24px] lg:mt-[88px] lg:min-h-[1189px] bg-white px-5 lg:px-[58px] pb-[24px] pt-[18.0px] lg:pt-[18px]"
    >
      <div className="relative ml-0 lg:-ml-[14px] w-full lg:w-[735px]">
        <h2
          id="inquiry-form-heading"
          className="text-[28px] lg:text-[40px] font-bold leading-[36px] lg:leading-[48px]"
        >
          문의 내용 작성
        </h2>
        <p className="relative mt-2 lg:mt-0 lg:absolute lg:right-0 lg:top-[38px] text-right text-[14px] lg:text-[20px] leading-[24px] lg:leading-[24px] text-[#102D4A]/80">
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
      <fieldset
        className="mt-[24px] lg:mt-[26px]"
        disabled={status === "sending"}
      >
        <legend className="text-[14px] lg:text-[20px] font-semibold leading-[24px] lg:leading-[24px]">
          문의 분야 <span className="text-red-600">*</span>
        </legend>
        <div className="mt-[12px] lg:mt-[16px] flex gap-[20px] lg:gap-[66px]">
          {categories.map((value) => (
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
                className="peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#00ADDB]"
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
          <Field
            name="company"
            label="회사명"
            placeholder="회사명을 입력해 주세요"
          />
          <Field
            name="manager"
            label="담당자명"
            placeholder="성함을 입력해 주세요"
            required
          />
          <Field
            name="phone"
            label="연락처"
            placeholder="연락 가능한 번호"
            required
            type="tel"
            maxLength={30}
          />
          <Field
            name="email"
            label="이메일"
            placeholder="이메일 주소"
            type="email"
            maxLength={254}
          />
        </div>
        <div className="mt-[24px] lg:mt-[29px]">
          <Field
            name="location"
            label="현장 위치"
            placeholder="시/군/구 또는 현장 주소"
            maxLength={300}
          />
        </div>
        <label className="mt-[24px] lg:mt-[44px] block text-[14px] lg:text-[20px] font-semibold leading-[24px] lg:leading-[24px]">
          문의 내용 <span className="text-red-600">*</span>
          <textarea
            required
            name="message"
            maxLength={3000}
            placeholder="설비 종류, 필요한 작업, 현장 상황을 알려주세요."
            className={`${inputClass} h-[232px] resize-y py-[19px] leading-[30px]`}
          />
        </label>
        <div className="mt-[24px] lg:mt-[44px]">
          <label
            htmlFor="inquiry-files"
            className="text-[14px] lg:text-[20px] font-semibold leading-[24px] lg:leading-[24px]"
          >
            첨부파일
          </label>
          <div className="mt-[12px] lg:mt-[10px] flex flex-wrap lg:flex-nowrap min-h-[75px] py-3 lg:py-0 items-center gap-[12px] lg:gap-[20px] border-2 border-[#102D4A]/10 px-[16px] lg:px-[19px]">
            <Paperclip
              size={30}
              className="shrink-0 text-[#102D4A]/20"
              aria-hidden="true"
            />
            <label className="relative shrink-0 cursor-pointer border border-[#102D4A]/10 bg-[#243447]/10 px-[16px] lg:px-[16px] py-[16px] lg:py-[11px] text-[14px] lg:text-[20px] font-semibold text-[#102D4A]/80 focus-within:outline-2 focus-within:outline-[#00ADDB]">
              파일 선택
              <input
                id="inquiry-files"
                name="attachments"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files ?? []);
                  const error = attachmentError(files);
                  if (error) {
                    event.target.value = "";
                    setFileNames("");
                    setStatus("error");
                    setNotice(error);
                    return;
                  }
                  setFileNames(files.map((file) => file.name).join(", "));
                  setStatus("idle");
                  setNotice("");
                }}
                className="absolute inset-0 w-full cursor-pointer opacity-0"
              />
            </label>
            <span
              className={`min-w-0 break-all text-sm lg:text-[20px] font-semibold ${fileNames ? "text-[#102D4A]/80" : "text-[#102D4A]/20"}`}
            >
              {fileNames || "현장 사진 / 설비 명판 / 도면 등 (선택)"}
            </span>
          </div>
          <p className="mt-2 text-[14px] lg:text-[14px] text-[#102D4A]/60">
            JPG, PNG, WEBP, PDF · 최대 3개 / 전체 3MB
          </p>
        </div>
        <label className="mt-[12px] lg:mt-[17px] flex cursor-pointer items-center gap-2 text-[14px] lg:text-[20px] font-medium leading-[24px] lg:leading-[24px]">
          <input
            type="checkbox"
            name="privacy"
            required
            className="size-[18px] shrink-0 accent-[#00ADDB]"
          />
          개인정보 수집 및 이용에 동의합니다.
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="relative mt-[12px] lg:mt-[23px] flex h-[58px] w-full items-center justify-center rounded-[5px] bg-[#102D4A] text-[16px] lg:text-[25px] font-semibold text-white transition-colors hover:bg-[#164366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ADDB] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "전송 중…" : "견적문의 보내기"}
          <ArrowRight
            size={30}
            className="absolute right-[28px]"
            aria-hidden="true"
          />
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
