"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import {
  projectCategories as categories,
  type ProjectCategory,
  readProjectListState,
  projectListHref,
  projectDetailHref,
  subscribeProjectListLocation,
  projectListLocationEvent,
  projectListStorageKey,
  resolveProjectListLocation,
} from "@/src/lib/project-list-navigation";
import { projects as existingProjects, type Project } from "./data";
import ProjectCard from "./ProjectCard";

const pageSize = 6;

function subscribeLocation(onChange: () => void) {
  return subscribeProjectListLocation(window, onChange);
}

function getLocation() {
  let remembered = null;
  try {
    remembered = window.sessionStorage.getItem(projectListStorageKey);
  } catch {
    // URL navigation still works when browser storage is unavailable.
  }
  return resolveProjectListLocation(window.location, remembered);
}
function getServerLocation() {
  return null;
}

function rememberListing(href: string) {
  try {
    window.sessionStorage.setItem(projectListStorageKey, href);
  } catch {
    // Browsers may disable storage in private or restricted contexts.
  }
}

export default function ProjectGallery({
  projects = existingProjects,
  initialSearch = "",
}: {
  projects?: Project[];
  initialSearch?: string;
}) {
  const location = useSyncExternalStore(subscribeLocation, getLocation, getServerLocation);
  const { category, page: selectedPage } = readProjectListState(
    new URLSearchParams(location === null ? initialSearch : location.split("#")[0]),
  );
  const targetId = location?.split("#")[1] ?? "";
  const filtered = projects.filter(
    (project) => category === "전체" || project.category === category,
  );
  const targetIndex = filtered.findIndex((project) => project.id === targetId);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(
    selectedPage ?? (targetIndex >= 0 ? Math.floor(targetIndex / pageSize) + 1 : 1),
    pageCount,
  );
  function setListing(nextPage: number, nextCategory: ProjectCategory = category) {
    const href = projectListHref(nextPage, nextCategory);
    rememberListing(href);
    window.history.replaceState(null, "", href);
    window.dispatchEvent(new Event(projectListLocationEvent));
  }
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => {
    if (location === null) return;
    const href = projectListHref(page, category);
    rememberListing(href);
    if (!window.location.search && !window.location.hash) {
      window.history.replaceState(null, "", href);
      window.dispatchEvent(new Event(projectListLocationEvent));
    }
  }, [location, page, category]);
  useEffect(() => {
    if (targetId && selectedPage === null) {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    }
  }, [targetId, selectedPage]);

  return (
    <section
      aria-labelledby="projects-list-heading"
      className="mx-auto w-full px-5 pt-9 lg:min-h-[1430px] lg:max-w-[1440px] lg:px-0 lg:pt-[81px]"
    >
      <div className="flex items-center gap-[20px]">
        <p className="text-xs lg:text-[20px] font-semibold leading-[24px] tracking-[3px] lg:tracking-[6px] text-brand-blue/60">
          PROJECTS
        </p>
        <span aria-hidden="true" className="h-[2px] w-[46.3058px] bg-brand-blue/60" />
      </div>
      <h2
        id="projects-list-heading"
        className="mt-3 lg:mt-[16px] text-[28px] lg:text-[45px] font-extrabold leading-normal lg:leading-[54px]"
      >
        시공사례
      </h2>
      <div
        role="group"
        aria-label="시공사례 분류"
        className="mt-6 flex gap-3 lg:mt-[46px] lg:h-[56px] lg:gap-[160px]"
      >
        {categories.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={category === value}
            aria-controls="projects-list"
            onClick={() => {
              setListing(1, value);
            }}
            className={`min-h-12 flex-1 lg:flex-none lg:w-[219px] border-b-2 pb-3 lg:border-0 lg:pb-0 cursor-pointer self-start whitespace-nowrap text-center lg:text-left text-base lg:text-[30px] font-semibold focus-visible:outline-2 focus-visible:outline-brand-blue ${category === value ? "text-brand-blue border-brand-blue" : "text-brand-navy/60 border-[#B7C6CF]"}`}
          >
            {value}
          </button>
        ))}
      </div>
      <div aria-hidden="true" className="relative hidden lg:block">
        <div className="h-[3px] w-full bg-brand-navy/20" />
        <div
          className="absolute top-0 h-[3px] w-[219px] bg-brand-blue transition-transform"
          style={{ transform: `translateX(${categories.indexOf(category) * 379}px)` }}
        />
      </div>
      <div id="projects-list" aria-live="polite" className="mt-6 lg:mt-[55px] lg:min-h-[912px]">
        {visible.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-[22.5px] lg:gap-y-[48px]">
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                href={projectDetailHref(project.href, page, category)}
              />
            ))}
          </div>
        ) : (
          <p className="flex min-h-[432px] items-center justify-center bg-white text-[25px] text-brand-navy/60">
            시공사례를 준비 중입니다.
          </p>
        )}
      </div>
      <nav
        aria-label="시공사례 페이지"
        className="mt-9 lg:mt-[86px] flex h-[56px] items-center justify-center gap-[5px] pb-[50px] box-content"
      >
        <button
          type="button"
          aria-label="이전 페이지"
          onClick={() => setListing(page - 1)}
          disabled={page === 1}
          className="flex size-[56px] cursor-pointer items-center justify-center text-brand-navy/65 disabled:cursor-default disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-brand-blue"
        >
          <ChevronLeft size={56} aria-hidden="true" />
        </button>
        <div className="flex items-center gap-[8px]">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              aria-label={`${number}페이지`}
              aria-current={page === number ? "page" : undefined}
              onClick={() => setListing(number)}
              className={`relative flex size-[48px] cursor-pointer items-center justify-center text-[30px] leading-none tracking-normal tabular-nums focus-visible:outline-2 focus-visible:outline-brand-blue ${page === number ? "text-white" : "text-brand-navy/65"}`}
            >
              {page === number && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-brand-blue/60"
                />
              )}
              <span className="relative">{number}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="다음 페이지"
          onClick={() => setListing(page + 1)}
          disabled={page === pageCount}
          className="flex size-[56px] cursor-pointer items-center justify-center text-brand-navy/65 disabled:cursor-default disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-brand-blue"
        >
          <ChevronRight size={56} aria-hidden="true" />
        </button>
      </nav>
    </section>
  );
}
