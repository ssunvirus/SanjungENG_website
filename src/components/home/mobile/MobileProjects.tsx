"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Eyebrow from "@/src/components/shared/SectionEyebrow";
import { mobileFeaturedProjects, type Project } from "@/src/components/projects/data";

export default function MobileProjects({ cases = mobileFeaturedProjects }: { cases?: Project[] }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swipeHandled = useRef(false);
  const project = cases[Math.min(caseIndex, cases.length - 1)];
  if (!project) return null;
  return (
    <section className="mx-auto max-w-[600px] px-5 py-8">
      <Eyebrow variant="compact">PROJECTS</Eyebrow>
      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-[28px] font-extrabold">시공사례</h2>
        <Link href="/projects" className="flex min-h-11 items-center gap-2 text-sm">
          전체 보기
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <Link
        href={project.href}
        className="mt-5 block overflow-hidden rounded-xl bg-white"
        onTouchStart={(event) => {
          swipeHandled.current = false;
          if (event.touches.length !== 1) {
            touchStart.current = null;
            return;
          }
          const touch = event.touches[0];
          touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start || event.changedTouches.length === 0) return;

          const touch = event.changedTouches[0];
          const deltaX = touch.clientX - start.x;
          const deltaY = touch.clientY - start.y;
          if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

          swipeHandled.current = true;
          if (event.cancelable) event.preventDefault();
          setCaseIndex((index) => (index + (deltaX < 0 ? 1 : -1) + cases.length) % cases.length);
        }}
        onTouchCancel={() => {
          touchStart.current = null;
          swipeHandled.current = false;
        }}
        onClick={(event) => {
          if (swipeHandled.current) {
            event.preventDefault();
            swipeHandled.current = false;
          }
        }}
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
      <div className="mt-3 flex justify-center gap-1">
        {cases.map((item, index) => (
          <button
            key={item.href}
            onClick={() => setCaseIndex(index)}
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
