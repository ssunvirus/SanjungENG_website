"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { projects } from "./data";
import ProjectCard from "./ProjectCard";

const categories = ["전체", "냉동공조", "섬유덕트"] as const;
const pageSize = 6;

export default function ProjectGallery() {
  const [category, setCategory] = useState<(typeof categories)[number]>("전체");
  const [page, setPage] = useState(1);
  const filtered = projects.filter((project) => category === "전체" || project.category === category);
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  // Figma의 전체 목록 3페이지 구성. 추가 사례는 data.ts에 이어서 등록합니다.
  const pageCount = category === "전체" ? Math.max(3, Math.ceil(filtered.length / pageSize)) : Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <section aria-labelledby="projects-list-heading" className="mx-auto min-h-[1430px] w-[1440px] pt-[81px]">
      <div className="flex items-center gap-[20px]">
        <p className="text-[20px] font-semibold leading-[24px] tracking-[6px] text-[#00ADDB]/60">PROJECTS</p>
        <Image
          src="/images/projects-page/heading-line.svg"
          width={46.3058}
          height={2}
          alt=""
          aria-hidden="true"
        />
      </div>
      <h2 id="projects-list-heading" className="mt-[16px] text-[45px] font-extrabold leading-[54px]">시공사례</h2>
      <div
        role="group"
        aria-label="시공사례 분류"
        className="mt-[46px] flex h-[56px] gap-[160px]"
      >
        {categories.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={category === value}
            aria-controls="projects-list"
            onClick={() => { setCategory(value); setPage(1); }}
            className={`w-[219px] cursor-pointer self-start whitespace-nowrap text-left text-[30px] font-semibold focus-visible:outline-2 focus-visible:outline-[#00ADDB] ${category === value ? "text-[#00ADDB]" : "text-[#102D4A]/60"}`}
          >
            {value}
          </button>
        ))}
      </div>
      <div aria-hidden="true" className="relative">
        <Image
          src="/images/projects-page/tabs-line.svg"
          width={1472}
          height={2.03808}
          alt=""
          aria-hidden="true"
        />
        <Image
          src="/images/fabric-duct/resources/tab-active-line.svg"
          width={219}
          height={2}
          alt=""
          className="absolute top-0 transition-transform"
          style={{ transform: `translateX(${categories.indexOf(category) * 379}px)` }}
        />
      </div>
      <div id="projects-list" aria-live="polite" className="mt-[55px] min-h-[912px]">
        {visible.length ? (
          <div className="grid grid-cols-3 gap-x-[22.5px] gap-y-[48px]">
            {visible.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        ) : (
          <p className="flex min-h-[432px] items-center justify-center bg-white text-[25px] text-[#102D4A]/60">
            시공사례를 준비 중입니다.
          </p>
        )}
      </div>
      <nav aria-label="시공사례 페이지" className="mt-[86px] flex h-[48px] items-center justify-center gap-[5px] pb-[50px] box-content">
        <button
          type="button"
          aria-label="이전 페이지"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="flex size-[48px] cursor-pointer items-center justify-center text-[#102D4A]/65 disabled:cursor-default disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-[#00ADDB]"
        >
          <ChevronLeft size={48} aria-hidden="true" />
        </button>
        <div className="flex items-center gap-[8px]">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              aria-label={`${number}페이지`}
              aria-current={page === number ? "page" : undefined}
              onClick={() => setPage(number)}
              className={`relative flex size-[40px] cursor-pointer items-center justify-center text-[30px] leading-[36px] tracking-[1.5px] focus-visible:outline-2 focus-visible:outline-[#00ADDB] ${page === number ? "text-white" : "text-[#102D4A]/65"}`}
            >
              {page === number && (
                <Image
                  src="/images/projects-page/page-active.svg"
                  width={40}
                  height={40}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0"
                />
              )}
              <span className="relative">{number}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="다음 페이지"
          onClick={() => setPage(page + 1)}
          disabled={page === pageCount}
          className="flex size-[48px] cursor-pointer items-center justify-center text-[#102D4A]/65 disabled:cursor-default disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-[#00ADDB]"
        >
          <ChevronRight size={48} aria-hidden="true" />
        </button>
      </nav>
    </section>
  );
}
