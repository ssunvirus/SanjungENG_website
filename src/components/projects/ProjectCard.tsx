import Image from "next/image";
import Link from "next/link";
import type { Project } from "./data";

export default function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className="group relative aspect-[465/316] overflow-hidden lg:aspect-auto lg:h-[316px]">
        <div
          className="absolute h-[125.08%] w-full"
          style={{ top: project.imageTop, left: project.imageLeft ?? "0%" }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 465px"
              quality={100}
              unoptimized={project.image.startsWith("/api/")}
              className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-105 motion-reduce:transition-none"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100 text-brand-navy/50">
              사진 준비 중
            </div>
          )}
        </div>
      </div>
      <div className="px-[17px] pt-[10px] pb-5 lg:pb-0">
        <p className="text-sm font-semibold leading-[24px] text-brand-blue lg:text-[20px]">
          {project.tag}
        </p>
        <h3 className="mt-[9px] line-clamp-2 break-words text-lg font-bold leading-[27px] lg:text-[22.5px]">
          {project.title}
        </h3>
        <p className="mt-[9px] line-clamp-2 break-words text-[15px] font-medium leading-[18px] text-brand-navy/50">
          {project.description}
        </p>
      </div>
    </>
  );

  return (
    <article id={project.id} className="min-w-0 scroll-mt-24 overflow-hidden bg-white lg:h-[432px]">
      <Link
        href={project.href}
        className="block h-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#006EB8]"
      >
        {content}
      </Link>
    </article>
  );
}
