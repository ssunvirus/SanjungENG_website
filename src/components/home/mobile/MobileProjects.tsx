"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import Eyebrow from "@/src/components/shared/SectionEyebrow";
import { mobileFeaturedProjects, type Project } from "@/src/components/projects/data";
import useCardAutoplay from "@/src/components/home/useCardAutoplay";
import { projectListHref } from "@/src/lib/project-list-navigation";

export default function MobileProjects({ cases = mobileFeaturedProjects }: { cases?: Project[] }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const pauseUntil = useRef(0);
  const pauseAfterInteraction = () => {
    pauseUntil.current = Date.now() + 10000;
  };
  useCardAutoplay(trackRef, cases.length, autoplay && !interacting, pauseUntil);
  if (!cases.length) return null;
  return (
    <section
      ref={sectionRef}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setInteracting(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          pauseAfterInteraction();
          setInteracting(false);
        }
      }}
      onFocusCapture={(event) => {
        if (event.target.matches(":focus-visible")) setInteracting(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pauseAfterInteraction();
          setInteracting(false);
        }
      }}
      className="mx-auto max-w-[600px] px-5 py-8"
    >
      <Eyebrow variant="compact">PROJECTS</Eyebrow>
      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-[28px] font-extrabold">시공사례</h2>
        <Link
          href={projectListHref(1, "전체")}
          className="flex min-h-11 items-center gap-2 text-sm"
        >
          전체 보기
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div
        ref={trackRef}
        className="relative mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onTouchStart={() => setInteracting(true)}
        onTouchEnd={() => {
          pauseAfterInteraction();
          setInteracting(false);
        }}
        onTouchCancel={() => {
          pauseAfterInteraction();
          setInteracting(false);
        }}
        onWheel={pauseAfterInteraction}
        onKeyDown={pauseAfterInteraction}
        onScroll={(event) => {
          const width = event.currentTarget.clientWidth + 16;
          setCaseIndex(Math.round(event.currentTarget.scrollLeft / width) % cases.length);
        }}
      >
        {cases.map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            href={project.href}
            className="block w-full shrink-0 snap-start snap-always overflow-hidden rounded-xl bg-white"
          >
            <div className="relative aspect-[1.7]">
              {(project.homeImage ?? project.image) ? (
                <Image
                  src={
                    project.thumbnailImage ===
                    "/images/projects/pharmaceutical-cold-storage-fabric-duct/thumbnail.jpg"
                      ? "/images/projects/pharmaceutical-cold-storage-fabric-duct/cover-mobile.webp"
                      : (project.thumbnailImage ?? project.homeImage ?? project.image)
                  }
                  alt={project.title}
                  fill
                  sizes="(max-width: 600px) 100vw, 600px"
                  quality={project.id === "pharmaceutical-cold-storage-fabric-duct" ? 90 : 75}
                  unoptimized={project.image.startsWith("/api/project-images/")}
                  className={
                    project.imageFit === "contain" ? "bg-[#E3EDF3] object-contain" : "object-cover"
                  }
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#E3EDF3] text-[#637382]">
                  사진 준비 중
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-[#637382]">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1">
        <button
          type="button"
          aria-label={autoplay ? "시공사례 자동재생 정지" : "시공사례 자동재생 시작"}
          onClick={() => setAutoplay((value) => !value)}
          className="flex min-h-11 w-8 items-center justify-center text-brand-navy"
        >
          {autoplay ? (
            <Pause size={16} aria-hidden="true" />
          ) : (
            <Play size={16} aria-hidden="true" />
          )}
        </button>
        {cases.map((item, index) => (
          <button
            key={item.href}
            onClick={() => {
              pauseAfterInteraction();
              const track = trackRef.current;
              track?.scrollTo({
                left: index * (track.clientWidth + 16),
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              });
              setCaseIndex(index);
            }}
            aria-label={`${item.title} 보기`}
            aria-pressed={caseIndex === index}
            className="flex min-h-11 w-8 items-center justify-center"
          >
            <span
              className={`h-[6px] w-5 rounded-full ${caseIndex === index ? "bg-[#006EB8]" : "bg-[#D9E5EC]"}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
