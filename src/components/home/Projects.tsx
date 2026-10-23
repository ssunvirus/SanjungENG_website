"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { desktopFeaturedProjects, type Project } from "@/src/components/projects/data";

const CARD_STEP = 536.25;

export default function Projects({ projects = desktopFeaturedProjects }: { projects?: Project[] }) {
  const LAST_SLIDE = Math.max(0, projects.length - 2);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(
    () => () => {
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    },
    [],
  );

  function move(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const nextSlide = Math.min(LAST_SLIDE, Math.max(0, currentSlide + direction));
    const maxScroll = track.scrollWidth - track.clientWidth;

    track.scrollTo({
      left: Math.min(nextSlide * CARD_STEP, maxScroll),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setCurrentSlide(nextSlide);
  }

  if (!projects.length) return null;
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative mx-auto h-[929px] w-full max-w-[1440px] overflow-hidden bg-[#EFF7FB] pt-[40px]"
    >
      <div className="mx-auto w-[1192px]">
        <div className="flex h-6 items-center gap-[20px] text-brand-blue/60">
          <span className="text-[20px] font-medium tracking-[6px]">PROJECTS</span>
          <span aria-hidden="true" className="h-[2px] w-[46px] bg-current" />
        </div>
        <h2
          id="projects-heading"
          className="mt-[10px] text-[60px] font-bold leading-[72px] tracking-[3px] text-brand-navy"
        >
          시공사례
        </h2>
        <p className="mt-[25px] text-[19px] font-semibold leading-[29px] text-brand-text">
          냉동공조부터 섬유덕트까지, 산정엔지니어링의 시공사례를 소개합니다.
        </p>
        <div className="relative z-10 mt-[20px] flex h-10 justify-end gap-[15px] text-brand-text">
          <button
            type="button"
            aria-label="이전 시공사례"
            aria-controls="project-cards"
            disabled={currentSlide === 0}
            onClick={() => move(-1)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-brand-navy text-white focus-visible:outline-2 focus-visible:outline-[#006EB8] disabled:cursor-default disabled:bg-[#AEBFCB] disabled:text-brand-navy"
          >
            <ChevronLeft size={28} strokeWidth={2.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="다음 시공사례"
            aria-controls="project-cards"
            disabled={currentSlide === LAST_SLIDE}
            onClick={() => move(1)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-brand-navy text-white focus-visible:outline-2 focus-visible:outline-[#006EB8] disabled:cursor-default disabled:bg-[#AEBFCB] disabled:text-brand-navy"
          >
            <ChevronRight size={28} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
        <div
          id="project-cards"
          ref={trackRef}
          tabIndex={0}
          aria-label="시공사례 목록, 좌우 방향키로 이동"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              move(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
          onScroll={(event) => {
            const track = event.currentTarget;
            const max = track.scrollWidth - track.clientWidth;
            const position = max > 0 ? track.scrollLeft / max : 0;
            setProgress(position < 0.001 ? 0 : position > 0.999 ? 1 : position);

            if (scrollEndTimerRef.current !== null) {
              window.clearTimeout(scrollEndTimerRef.current);
            }
            scrollEndTimerRef.current = window.setTimeout(() => {
              setCurrentSlide(Math.min(LAST_SLIDE, Math.round(track.scrollLeft / CARD_STEP)));
              scrollEndTimerRef.current = null;
            }, 120);
          }}
          className="mt-[35px] flex h-[498px] w-[1192px] snap-x snap-mandatory gap-[33.75px] overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-[#006EB8]"
        >
          {projects.map((project) => {
            const cardClassName =
              "group flex h-full w-full cursor-pointer flex-col items-stretch justify-start p-0 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#006EB8]";
            const content = (
              <>
                <div className="relative h-[377px] w-full shrink-0 overflow-hidden">
                  <Image
                    src={project.homeImage ?? project.image}
                    alt={project.title}
                    fill
                    sizes="503px"
                    className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
                  />
                </div>
                <div className="relative px-[21px] pt-[23px] pr-[70px]">
                  <h3 className="whitespace-nowrap text-[23px] font-bold leading-[29px] text-brand-navy">
                    {project.title}
                  </h3>
                  <p className="mt-[11px] text-[19px] font-medium leading-6 text-brand-navy/50">
                    {project.description}
                  </p>
                  <ArrowRightCircle
                    size={42}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="absolute top-[30px] right-[20px] text-brand-navy"
                  />
                </div>
              </>
            );

            return (
              <article
                key={project.image}
                className="h-[498px] w-[502.5px] shrink-0 snap-start overflow-hidden rounded-[10px] bg-white"
              >
                <Link href={project.href} className={cardClassName}>
                  {content}
                </Link>
              </article>
            );
          })}
        </div>
        <div aria-hidden="true" className="mt-[26px] h-[2px] w-[1114px] bg-[#CBD3D7]">
          <div
            className="h-full w-[143px] bg-brand-blue"
            style={{ transform: `translateX(${progress * 971}px)` }}
          />
        </div>
        <Link
          href="/projects"
          className="mx-auto mt-[49px] flex h-[53px] w-[267px] items-center justify-center gap-[8px] rounded-[23px] border-[4px] border-brand-navy bg-brand-navy text-[30px] font-bold text-white shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#16436b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          시공사례 더 보기
          <ArrowRight size={34} strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
