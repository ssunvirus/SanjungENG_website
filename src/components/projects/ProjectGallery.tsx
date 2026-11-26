"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import {
  projectCategories as categories,
  matchesProjectCategory,
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
import ProjectCategoryIcon from "./ProjectCategoryIcon";

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
  const filtered = projects.filter((project) => matchesProjectCategory(project, category));
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
      <div data-section-eyebrow className="flex items-center gap-[20px]">
        <p className="text-xs lg:text-[20px] font-semibold leading-[24px] tracking-[3px] lg:tracking-[6px] text-brand-blue/60">
          PROJECTS
        </p>
        <span aria-hidden="true" className="h-[2px] w-[46.3058px] bg-brand-blue/60" />
      </div>
      <h2
        id="projects-list-heading"
        className="mt-3 scroll-mt-24 lg:mt-[16px] lg:scroll-mt-[110px] text-[28px] lg:text-[45px] font-extrabold leading-normal lg:leading-[54px]"
      >
        시공사례
      </h2>
      <div
        role="group"
        aria-label="시공사례 분류"
        className="mt-6 grid grid-cols-3 gap-2 px-1 py-3 lg:mt-[34px] lg:flex lg:gap-3 lg:overflow-x-auto"
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
            onFocus={(event) => {
              if (window.matchMedia("(min-width: 75rem)").matches) {
                event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
              }
            }}
            className={`flex min-h-[88px] min-w-0 flex-1 flex-col cursor-pointer items-center justify-center gap-1.5 rounded-2xl border px-1 py-2.5 text-[16px] min-[360px]:text-[18px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none lg:min-h-[76px] lg:min-w-max lg:flex-row lg:rounded-full lg:gap-1.5 lg:px-2 lg:py-3 lg:text-[22px] xl:gap-2 xl:text-[28px] ${category === value ? "border-brand-blue bg-brand-blue text-white shadow-[0_6px_20px_rgba(0,173,219,0.18)]" : "border-white/80 bg-white/75 text-brand-navy shadow-[0_4px_16px_rgba(16,45,74,0.04)] hover:border-brand-blue/25 hover:bg-white hover:text-brand-blue"}`}
          >
            <ProjectCategoryIcon category={value} />
            <span>{value}</span>
          </button>
        ))}
      </div>
      <div id="projects-list" aria-live="polite" className="mt-6 lg:mt-[36px] lg:min-h-[912px]">
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
        className="mt-9 lg:mt-[86px] flex flex-wrap items-center justify-center gap-2 pb-[50px]"
      >
        <button
          type="button"
          aria-label="이전 페이지"
          onClick={() => setListing(page - 1)}
          disabled={page === 1}
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl text-brand-navy transition-colors hover:bg-brand-blue/10 active:bg-brand-blue/20 disabled:cursor-default disabled:text-brand-navy/25 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue lg:size-12"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              aria-label={`${number}페이지`}
              aria-current={page === number ? "page" : undefined}
              onClick={() => setListing(number)}
              className={`flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl text-lg font-semibold leading-none tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue lg:size-12 lg:text-xl ${page === number ? "bg-brand-navy text-white" : "text-brand-navy/75 hover:bg-brand-blue/10 hover:text-brand-navy active:bg-brand-blue/20"}`}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="다음 페이지"
          onClick={() => setListing(page + 1)}
          disabled={page === pageCount}
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl text-brand-navy transition-colors hover:bg-brand-blue/10 active:bg-brand-blue/20 disabled:cursor-default disabled:text-brand-navy/25 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue lg:size-12"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </nav>
    </section>
  );
}
