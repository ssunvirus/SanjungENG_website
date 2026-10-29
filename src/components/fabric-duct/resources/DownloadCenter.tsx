"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ResourceDocument = {
  title: string;
  image?: string;
  format?: string;
  manufacturer?: string;
};
const documents: (ResourceDocument & { file: string })[] = [
  {
    title: "KLIMAGIEL 카탈로그",
    manufacturer: "Klimagiel",
    file: "/documents/fabric-duct/klimagiel-catalogue.pdf",
    image: "/images/fabric-duct/resources/catalog-cover.png",
  },
  {
    title: "MultixAir 카탈로그",
    manufacturer: "MultiXair",
    file: "/documents/fabric-duct/multixair-product-catalog.pdf",
    image: "/images/fabric-duct/resources/multixair-catalog-cover.png",
  },
];
const tabs = ["인증서/시험성적서", "카탈로그"];
const assetRoot = "/images/fabric-duct/resources";
const certificateDocuments: ResourceDocument[] = [
  {
    title: "ISO 9001:2015",
    image: `${assetRoot}/multixair-iso-9001.jpeg`,
    format: "JPG",
  },
  {
    title: "ISO 14001:2015",
    image: `${assetRoot}/multixair-iso-14001.jpeg`,
    format: "JPG",
  },
  {
    title: "ISO 45001:2018",
    image: `${assetRoot}/multixair-iso-45001.jpeg`,
    format: "JPG",
  },
  {
    title: "A2급 연소성능 시험성적서",
    image: `${assetRoot}/multixair-a2-combustion-test.png`,
    format: "PDF",
  },
  {
    title: "유해가스 방출 시험성적서",
    image: `${assetRoot}/multixair-harmful-gas-emission-test.png`,
    format: "PDF",
  },
  {
    title: "덕트 내압/강도 시험성적서",
    image: `${assetRoot}/multixair-duct-pressure-strength-test.png`,
    format: "PDF",
  },
  {
    title: "대장균 항균성 시험성적서",
    image: `${assetRoot}/multixair-antibacterial-ecoli.png`,
    format: "PDF",
  },
  {
    title: "폐렴간균 항균성 시험성적서",
    image: `${assetRoot}/multixair-antibacterial-klebsiella.png`,
    format: "PDF",
  },
  {
    title: "황색포도상구균 항균성 시험성적서",
    image: `${assetRoot}/multixair-antibacterial-staphylococcus.png`,
    format: "PDF",
  },
  {
    title: "섬유탈락성능 시험성적서",
    manufacturer: "MultiXair",
    image: `${assetRoot}/multixair-fiber-shedding-test.png`,
    format: "PDF",
  },
  {
    title: "결로방지성능 시험성적서",
    manufacturer: "MultiXair",
    image: `${assetRoot}/multixair-condensation-prevention-test.png`,
    format: "PDF",
  },
  {
    title: "고온 열노화성능 시험성적서",
    manufacturer: "MultiXair",
    image: `${assetRoot}/multixair-high-temperature-aging-test.png`,
    format: "PDF",
  },
  {
    title: "내열 공기노화성능 시험성적서",
    manufacturer: "MultiXair",
    image: `${assetRoot}/multixair-heat-air-aging-test.png`,
    format: "PDF",
  },
  {
    title: "섬유제품 안전성 시험성적서 (A등급)",
    manufacturer: "MultiXair",
    image: `${assetRoot}/multixair-textile-safety-category-a-test.png`,
    format: "PDF",
  },
  {
    title: "세탁 후 치수변화율 시험성적서",
    manufacturer: "MultiXair",
    image: `${assetRoot}/multixair-washing-dimensional-change-test.png`,
    format: "PDF",
  },
  {
    title: "원단 인열강도 시험성적서",
    manufacturer: "MultiXair",
    image: `${assetRoot}/multixair-fabric-tear-strength-test.png`,
    format: "PDF",
  },
  {
    title: "원단 파단강도 시험성적서",
    manufacturer: "MultiXair",
    image: `${assetRoot}/multixair-fabric-breaking-strength-test.png`,
    format: "PDF",
  },
];
const pageSize = 8;

export default function DownloadCenter() {
  const [preview, setPreview] = useState<ResourceDocument | null>(null);
  const previewRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = previewRef.current;
    if (!preview || !dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const tabDocuments = activeTab === 1 ? documents.slice(0, 2) : certificateDocuments;
  const pageCount = Math.ceil(tabDocuments.length / pageSize);
  const visibleDocuments = tabDocuments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function selectPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(pageCount, page)));
  }

  return (
    <section
      className="mx-auto mt-1 w-full px-5 py-9 lg:min-h-[1416px] lg:max-w-[1440px] lg:px-0 lg:pt-[30px] lg:pb-[60px]"
      aria-labelledby="download-title"
    >
      <header className="ml-0 mt-0 lg:ml-[78px] lg:mt-[30px]">
        <p className="flex items-center gap-3 text-[10px] font-semibold tracking-[2px] lg:gap-[20px] lg:text-[20px] lg:tracking-[6px] text-brand-blue/60">
          CERTIFICATIONS & CATALOGS
          <Image
            src={`${assetRoot}/heading-line.svg`}
            width={46.3058}
            height={2}
            alt=""
            aria-hidden="true"
          />
        </p>
        <h2
          id="download-title"
          className="mt-[10px] text-[28px] lg:text-[55px] font-bold leading-[1.2] tracking-[1px] lg:tracking-[2.75px] text-brand-navy"
        >
          자료실
        </h2>
        <p className="mt-3 text-sm lg:mt-[25px] lg:text-[18.75px] font-semibold">
          제품 사양과 인증/시험 자료를 확인하실 수 있습니다.
        </p>
      </header>
      <div className="relative mt-7 ml-0 w-full lg:mt-[50px] lg:ml-[78px] lg:w-[1294px]">
        <div
          role="tablist"
          aria-label="자료 종류"
          className="flex gap-4 lg:h-[56px] lg:gap-[204px]"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`resource-tab-${index}`}
              aria-selected={activeTab === index}
              aria-controls="resource-panel"
              tabIndex={activeTab === index ? 0 : -1}
              onClick={() => {
                setActiveTab(index);
                setCurrentPage(1);
              }}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
                setActiveTab(next);
                setCurrentPage(1);
                document.getElementById(`resource-tab-${next}`)?.focus();
              }}
              className={`min-h-12 flex-1 lg:flex-none lg:w-[219px] cursor-pointer self-start border-b-2 pb-3 lg:border-0 lg:pb-0 text-left text-[16px] lg:text-[30px] font-semibold focus-visible:outline-2 focus-visible:outline-brand-blue ${activeTab === index ? "text-brand-blue border-brand-blue" : "text-brand-navy/60 border-[#B7C6CF]"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div aria-hidden="true" className="relative hidden lg:block">
          <div className="h-[2px] w-[1294px] bg-brand-navy/20" />
          <div
            className="absolute top-0 h-[2px] w-[219px] bg-brand-blue transition-transform"
            style={{ transform: `translateX(${activeTab * 423}px)` }}
          />
        </div>
        <div
          role="tabpanel"
          id="resource-panel"
          aria-labelledby={`resource-tab-${activeTab}`}
          tabIndex={0}
          className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 lg:mt-[40px] lg:grid-cols-4 lg:gap-x-[62px] lg:gap-y-[50px]"
        >
          {visibleDocuments.map((item, index) => (
            <article
              key={`${activeTab}-${currentPage}-${index}`}
              className="min-w-0 w-full lg:w-[277.02px] shrink-0 overflow-hidden bg-white"
            >
              <div className="relative bg-black/10 px-3 py-3 lg:px-[24.3px] lg:py-[14.58px]">
                <div className="relative aspect-[228.42/321.57] w-full lg:aspect-auto lg:h-[321.57px] lg:w-[228.42px] shadow-[4.86px_4.86px_3.24px_rgba(0,0,0,0.25)]">
                  <Image
                    src={item.image ?? `${assetRoot}/catalog-cover.png`}
                    alt={`${item.title} 표지`}
                    fill
                    sizes="(max-width: 1023px) 45vw, 228.42px"
                    className={item.format === "JPG" ? "object-contain" : "object-cover"}
                  />
                </div>
                <span
                  className={`absolute left-[7.29px] top-[7.29px] flex h-[16.2px] w-[32.4px] items-center justify-center text-[12.15px] text-white ${item.format === "JPG" ? "bg-[#0075FF]" : "bg-[#E12D31]"}`}
                >
                  {item.format ?? "PDF"}
                </span>
              </div>
              <div className="relative flex min-h-[210px] flex-col px-3 py-3 lg:block lg:min-h-0 lg:h-[166.08px] lg:px-[29.16px] lg:pt-[12.15px] lg:pb-0">
                <p className="text-[12.15px] font-semibold text-brand-blue">
                  {activeTab === 1 ? "카탈로그" : "인증서/시험성적서"}
                </p>
                <h3 className="mt-[10px] break-words text-sm lg:break-keep lg:text-[16.2px] font-bold leading-[22px] tracking-[0.81px] text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-[8px] text-[14.58px] font-semibold leading-[20px] tracking-[0.73px] text-brand-navy/80">
                  {item.manufacturer ?? (activeTab === 0 ? "MultiXair" : "")}
                </p>
                {"file" in item && typeof item.file === "string" && (
                  <>
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute left-[29.97px] top-[120.72px] h-[0.81px] w-[217.082px] bg-brand-navy/20"
                    />
                    <a
                      href={item.file}
                      download
                      className="mt-auto flex min-h-11 justify-end border-t border-[#D1DFE8] pt-2 lg:mt-0 lg:absolute lg:left-[165.24px] lg:top-[128.82px] lg:min-h-0 lg:h-[24.3px] lg:border-0 lg:pt-0 items-center gap-[5px] text-[14.58px] font-bold text-brand-blue"
                    >
                      다운로드
                      <Download size={19.44} aria-hidden="true" />
                    </a>
                  </>
                )}
                {activeTab === 0 && (
                  <>
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute left-[29.97px] top-[120.72px] h-[0.81px] w-[217.082px] bg-brand-navy/20"
                    />
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      aria-label={`${item.title} 자세히 보기`}
                      onClick={() => setPreview(item)}
                      className="mt-auto flex min-h-11 cursor-pointer items-center justify-end gap-[5px] border-t border-[#D1DFE8] pt-2 text-[14.58px] font-bold text-brand-blue lg:absolute lg:right-[29px] lg:top-[128.82px] lg:mt-0 lg:h-[24.3px] lg:min-h-0 lg:border-0 lg:pt-0 focus-visible:outline-2 focus-visible:outline-brand-blue"
                    >
                      자세히 보기
                      <Search size={19.44} aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
        <nav
          aria-label="자료 페이지"
          className="mt-9 lg:mt-[77px] flex h-[56px] items-center justify-center gap-[5px] text-[30px] text-brand-navy/65"
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => selectPage(currentPage - 1)}
            aria-label="이전 페이지"
            className="flex size-[56px] cursor-pointer items-center justify-center disabled:cursor-default disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <ChevronLeft size={56} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-[8px]">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => selectPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`${page}페이지`}
                className="relative flex size-[48px] cursor-pointer items-center justify-center leading-none tracking-normal tabular-nums focus-visible:outline-2 focus-visible:outline-brand-blue"
              >
                {page === currentPage && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-brand-blue/60"
                  />
                )}
                <span className={`relative ${page === currentPage ? "text-white" : ""}`}>
                  {page}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={currentPage === pageCount}
            onClick={() => selectPage(currentPage + 1)}
            aria-label="다음 페이지"
            className="flex size-[56px] cursor-pointer items-center justify-center disabled:cursor-default disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <ChevronRight size={56} aria-hidden="true" />
          </button>
        </nav>

        <div aria-hidden="true" className="mt-[16px] min-h-[28px]" />
      </div>
      <dialog
        ref={previewRef}
        aria-labelledby="resource-preview-title"
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              setPreview(null);
          }
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[min(92vw,800px)] max-w-none overflow-y-auto rounded-2xl bg-[#303030] p-4 text-white shadow-2xl backdrop:bg-brand-navy/60 sm:p-6"
      >
        {preview && (
          <>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id="resource-preview-title" className="text-lg font-bold sm:text-xl">
                {preview.title}
              </h2>
              <button
                type="button"
                autoFocus
                aria-label="상세보기 닫기"
                onClick={() => setPreview(null)}
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-brand-navy hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-brand-blue"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="relative h-[70dvh] w-full bg-[#303030]">
              <Image
                src={preview.image ?? `${assetRoot}/catalog-cover.png`}
                alt={`${preview.title} 상세 이미지`}
                fill
                sizes="(max-width: 870px) 92vw, 752px"
                quality={100}
                className="object-contain"
              />
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
