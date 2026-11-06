"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";

const categories = ["전체", "설치 및 교체", "수리 및 오버홀", "정기점검", "철거 및 반출"];
const questions = [
  {
    category: "설치 및 교체",
    question: "설치부터 시운전까지 얼마나 걸리나요?",
    answer:
      "장비 용량, 현장 조건, 반입 경로와 작업 범위에 따라 달라집니다. 현장 확인 후 장비 수급과 공정 일정을 검토하여 설치 및 시운전 일정을 안내합니다.",
  },
  {
    category: "설치 및 교체",
    question: "수리와 교체 중 어떤 작업이 필요한가요?",
    answer:
      "현재 설비 상태와 고장 이력, 부품 수급 여부, 필요한 냉동 용량을 검토한 후 현장에 맞는 작업 범위를 제안합니다.",
  },
  {
    category: "설치 및 교체",
    question: "견적 문의 시 무엇을 준비하면 되나요?",
    answer:
      "현장 위치, 장비 명판과 설비 사진, 필요한 작업 내용이나 고장 증상을 알려주시면 상담에 도움이 됩니다. 설치 공간과 반입 경로 사진도 함께 보내주시면 좋습니다.",
  },
  {
    category: "수리 및 오버홀",
    question: "어떤 증상이 있을 때 수리를 의뢰하면 되나요?",
    answer:
      "냉각 성능 저하, 반복적인 경보, 이상 소음과 진동, 누설 흔적 등이 있다면 점검을 통해 원인을 확인하는 것이 좋습니다. 장비 모델과 증상, 경보 내용을 알려주세요.",
  },
  {
    category: "수리 및 오버홀",
    question: "오버홀과 일반 수리는 어떻게 다른가요?",
    answer:
      "일반 수리는 고장 부위와 관련 계통을 중심으로 정비하고, 오버홀은 주요 장치를 분해하여 내부 부품의 마모와 상태를 확인하고 정비하는 작업입니다. 필요한 범위는 장비 상태를 점검한 후 안내합니다.",
  },
  {
    category: "정기점검",
    question: "유지보수는 어떤 주기로 진행하는 것이 좋나요?",
    answer:
      "장비 종류와 사용 시간, 운전 환경 및 제조사 관리 기준에 따라 달라집니다. 현장 운전 조건과 점검 이력을 확인해 적절한 점검 주기와 정비 항목을 협의합니다.",
  },
  {
    category: "정기점검",
    question: "정기점검에서는 어떤 항목을 확인하나요?",
    answer:
      "운전 압력과 온도, 냉각 성능, 진동 및 소음, 누설 흔적과 주요 부품 상태 등을 확인합니다. 장비 종류와 계약 범위에 따라 세부 점검 항목을 정합니다.",
  },
  {
    category: "정기점검",
    question: "공장 가동 중에도 점검할 수 있나요?",
    answer:
      "운전 중 확인할 수 있는 항목과 정지가 필요한 항목을 구분해 작업합니다. 생산 일정과 현장 조건을 확인한 후 가동 중단 여부와 작업 시간을 협의합니다.",
  },
  {
    category: "철거 및 반출",
    question: "기존 냉동기를 철거하고 교체할 수 있나요?",
    answer:
      "기존 장비와 연결 배관, 설치 위치 및 반출 경로를 확인한 후 철거와 신규 장비 설치 범위를 검토합니다. 장비 크기와 현장 여건에 따라 해체 및 인양 방법을 협의합니다.",
  },
  {
    category: "철거 및 반출",
    question: "냉동기 철거만 별도로 의뢰할 수 있나요?",
    answer:
      "철거와 반출 작업만 필요한 경우에도 상담할 수 있습니다. 장비 사진, 설치 위치, 반출 동선과 원하는 작업 일정을 알려주시면 현장 확인 후 작업 범위를 안내합니다.",
  },
];

type FaqProps = {
  categories?: string[];
  questions?: { category: string; question: string; answer: string }[];
  id?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  introduction?: string;
};

export default function EquipmentFaq({
  categories: faqCategories = categories,
  questions: faqQuestions = questions,
  id = "chiller-faq",
  image = "/images/chiller/hero-indoor-chillers.jpg",
  imageFit = "cover",
  introduction = "설치, 수리, 정기점검, 철거까지",
}: FaqProps = {}) {
  const [category, setCategory] = useState("전체");
  const filtered = faqQuestions.filter((item) => category === "전체" || item.category === category);
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="mx-auto w-full max-w-[1440px] px-5 py-12 lg:px-10 lg:py-16"
    >
      <div className="grid overflow-hidden rounded-2xl bg-brand-navy shadow-[0_8px_32px_rgba(16,46,73,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative isolate flex min-h-[430px] flex-col p-7 text-white lg:h-[540px] lg:min-h-0 lg:p-6">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1440px) 740px, 100vw"
            className={`-z-20 ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/95 to-brand-navy/80"
          />
          <p className="flex items-center gap-4 text-sm font-medium tracking-[6px] text-brand-blue lg:text-xl">
            FAQ
            <span aria-hidden="true" className="h-0.5 w-10 bg-brand-blue" />
          </p>
          <h2
            id={`${id}-title`}
            className="mt-5 text-[32px] font-bold leading-tight lg:text-[38px]"
          >
            자주 묻는 <span className="text-brand-blue">질문</span>
          </h2>
          <p className="mt-4 max-w-[370px] text-base font-medium leading-7 text-white/80">
            {introduction}
            <br />
            문의 전 궁금한 내용을 확인해보세요.
          </p>
          <div className="relative mt-3 h-[180px] shrink-0">
            <div className="absolute left-[155px] top-2 z-10 rounded-2xl bg-white px-4 py-3 text-base font-bold leading-6 text-brand-navy shadow-lg sm:left-[190px]">
              어떤 내용이
              <br />
              <span className="text-brand-blue">궁금하신가요?</span>
              <span
                aria-hidden="true"
                className="absolute -left-2 bottom-5 size-4 rotate-45 bg-white"
              />
            </div>
            <Image
              src="/images/chiller/faq-technician-logo.png"
              alt="턱에 손을 대고 궁금한 표정을 짓는 산정엔지니어링 기술자 캐릭터"
              width={240}
              height={260}
              sizes="240px"
              className="absolute bottom-0 left-0 h-[185px] w-[180px] object-contain object-bottom sm:w-[200px]"
            />
          </div>
          <div
            role="group"
            aria-label="질문 분야 선택"
            className="relative z-10 mt-auto flex flex-wrap gap-2 pt-5"
          >
            {faqCategories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${category === item ? "border-brand-blue bg-brand-blue text-white" : "border-white/25 bg-white/10 text-white hover:bg-white/20"}`}
              >
                {item} ({faqQuestions.filter((q) => item === "전체" || q.category === item).length})
              </button>
            ))}
          </div>
        </div>
        <div
          tabIndex={0}
          role="region"
          aria-label="자주 묻는 질문 목록"
          className="h-[380px] overflow-y-auto overscroll-contain bg-[#E3F6FC] p-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue lg:h-[540px] lg:p-6"
        >
          <div key={category} className="space-y-3">
            {filtered.map((item, index) => (
              <details
                key={item.question}
                name={id}
                open={index === 0}
                className="group overflow-hidden rounded-xl border border-brand-navy/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-4 font-bold text-brand-navy hover:bg-brand-blue/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-sm text-brand-blue"
                  >
                    Q
                  </span>
                  <span className="min-w-0 flex-1 break-keep pt-0.5 text-base leading-6 [overflow-wrap:anywhere]">
                    {item.question}
                  </span>
                  <Plus
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-brand-blue transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  />
                </summary>
                <div className="flex gap-3 border-t border-brand-blue/10 bg-[#F1FAFD] px-4 py-4">
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white"
                  >
                    A
                  </span>
                  <p className="min-w-0 flex-1 whitespace-pre-line break-keep text-[15px] font-medium leading-7 text-brand-text/80 [overflow-wrap:anywhere]">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
