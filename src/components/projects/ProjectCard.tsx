import Image from "next/image";
import Link from "next/link";
import type { Project } from "./data";

export default function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className="group relative h-[316px] overflow-hidden">
        <div
          className="absolute h-[125.08%] w-full"
          style={{ top: project.imageTop, left: project.imageLeft ?? "0%" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="465px"
            quality={100}
            className="object-fill transition-transform duration-300 ease-out motion-safe:group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>
      </div>
      <div className="px-[17px] pt-[10px]">
        <p className="text-[20px] font-semibold leading-[24px] text-[#00ADDB]">{project.tag}</p>
        <h3 className="mt-[9px] whitespace-nowrap text-[22.5px] font-bold leading-[27px]">
          {project.title}
        </h3>
        <p className="mt-[9px] text-[15px] font-medium leading-[18px] text-[#102D4A]/50">
          {project.description}
        </p>
      </div>
    </>
  );

  return (
    <article className="h-[432px] overflow-hidden bg-white">
      {project.href ? (
        <Link
          href={project.href}
          className="block h-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#00ADDB]"
        >
          {content}
        </Link>
      ) : content}
    </article>
  );
}
