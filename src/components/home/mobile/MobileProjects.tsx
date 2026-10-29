"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import Eyebrow from "@/src/components/shared/SectionEyebrow";
import { mobileFeaturedProjects, type Project } from "@/src/components/projects/data";
import useProjectAutoplay from "@/src/components/home/useProjectAutoplay";

export default function MobileProjects({ cases = mobileFeaturedProjects }: { cases?: Project[] }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  useProjectAutoplay(trackRef, cases.length, autoplay && !interacting && cases.length > 1);
  if (!cases.length) return null;
  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={(event) => setInteracting(event.currentTarget.contains(document.activeElement))}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setInteracting(event.currentTarget.matches(":hover"));
      }}
      className="mx-auto max-w-[600px] px-5 py-8"
    >
      <Eyebrow variant="compact">PROJECTS</Eyebrow>
      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-[28px] font-extrabold">시공사례</h2>
        <Link href="/projects" className="flex min-h-11 items-center gap-2 text-sm">
          전체 보기
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div
        ref={trackRef}
        className="relative mt-5 flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onTouchStart={() => setInteracting(true)}
        onTouchEnd={() => setInteracting(false)}
        onTouchCancel={() => setInteracting(false)}
        onScroll={(event) => {
          const width = event.currentTarget.clientWidth + 16;
          setCaseIndex(Math.round(event.currentTarget.scrollLeft / width) % cases.length);
        }}
      >
        {[...cases, ...cases].map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            href={project.href}
            aria-hidden={index >= cases.length || undefined}
            tabIndex={index >= cases.length ? -1 : undefined}
            className="block w-full shrink-0 overflow-hidden rounded-xl bg-white"
          >
            <div className="relative aspect-[1.7]">
              {(project.homeImage ?? project.image) ? (
                <Image
                  src={project.homeImage ?? project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 600px) 100vw, 600px"
                  unoptimized={project.image.startsWith("/api/project-images/")}
                  className="object-cover"
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
