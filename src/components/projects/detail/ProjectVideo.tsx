import { projects } from "@/src/components/projects/data";

export default function ProjectVideo({ projectId }: { projectId: string }) {
  const video = projects.find((project) => project.id === projectId)?.video;
  if (!video) return null;

  return (
    <figure className="mx-auto mt-8 w-full max-w-[1000px]">
      <video
        controls
        playsInline
        preload="metadata"
        poster={video.poster}
        aria-label={video.caption}
        className="mx-auto max-h-[75vh] w-full rounded-lg bg-black"
      >
        <source src={video.src} type="video/mp4" />
        동영상 재생을 지원하는 브라우저에서 확인해주세요.
      </video>
      <figcaption className="px-1 pb-2 pt-3 text-[15px] leading-6 text-slate-500 sm:text-[16px]">
        {video.caption}
      </figcaption>
    </figure>
  );
}
