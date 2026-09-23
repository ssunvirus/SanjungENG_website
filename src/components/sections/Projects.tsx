"use client";

import Image from "next/image";
import { ArrowRight, ArrowRightCircle, ChevronLeft, ChevronRight, Tag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
    { title: "농협 저온저장고 냉동설비 설치", tag: "저온저장고", description: "CDU / 유니클 쿨러 설치", image: "/images/projects/cold-storage.png" },
    { title: "구례 실내 수영장 섬유덕트 설치", tag: "섬유덕트", description: "섬유덕트 설계 / 설치", image: "/images/projects/pool-fabric-duct.png" },
    { title: "반도체 공장 공냉식 냉동기 교체공사", tag: "냉동기", description: "공냉식 냉동기 교체", image: "/images/projects/semiconductor-chiller.png" },
    { title: "서안성 냉동창고 정기점검", tag: "유지보수", description: "정기점검 / 유지보수", image: "/images/projects/warehouse-maintenance.png" },
];

const CARD_STEP = 536.25;
const LAST_SLIDE = projects.length - 2;

export default function Projects() {
    const trackRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const scrollEndTimerRef = useRef<number | null>(null);
    const [progress, setProgress] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selected, setSelected] = useState(projects[0]);

    useEffect(() => () => {
        if (scrollEndTimerRef.current !== null) {
            window.clearTimeout(scrollEndTimerRef.current);
        }
    }, []);

    function move(direction: number) {
        const track = trackRef.current;
        if (!track) return;
        const nextSlide = Math.min(LAST_SLIDE, Math.max(0, currentSlide + direction));
        const maxScroll = track.scrollWidth - track.clientWidth;

        track.scrollTo({
            left: Math.min(nextSlide * CARD_STEP, maxScroll),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
        setCurrentSlide(nextSlide);
    }

    return (
        <section id="projects" aria-labelledby="projects-heading" className="relative mx-auto h-[951px] w-[1440px] overflow-hidden bg-[#EFF7FB] pt-[40px]">
            <div className="mx-auto w-[1192px]">
                <div className="flex h-6 items-center gap-[20px] text-[#00ADDB]/60">
                    <span className="text-[20px] font-medium tracking-[6px]">PROJECTS</span>
                    <span aria-hidden="true" className="h-[2px] w-[46px] bg-current" />
                </div>
                <h2 id="projects-heading" className="mt-[10px] text-[60px] font-bold leading-[72px] tracking-[3px] text-[#102D4A]">시공사례</h2>
                <p className="mt-[25px] text-[19px] font-semibold leading-[29px] text-[#243447]">
                    냉동공조 부터 섬유덕트까지, 산정엔지니어링의 시공사례를 소개합니다.
                </p>
                <div className="relative z-10 mt-[20px] flex h-10 justify-end gap-[15px] text-[#243447]">
                    <button type="button" aria-label="이전 시공사례" aria-controls="project-cards" disabled={currentSlide === 0} onClick={() => move(-1)} className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#102D4A] text-white focus-visible:outline-2 focus-visible:outline-[#006EB8] disabled:cursor-default disabled:bg-[#AEBFCB] disabled:text-[#102D4A]">
                        <ChevronLeft size={28} strokeWidth={2.5} aria-hidden="true" />
                    </button>
                    <button type="button" aria-label="다음 시공사례" aria-controls="project-cards" disabled={currentSlide === LAST_SLIDE} onClick={() => move(1)} className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#102D4A] text-white focus-visible:outline-2 focus-visible:outline-[#006EB8] disabled:cursor-default disabled:bg-[#AEBFCB] disabled:text-[#102D4A]">
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
                    {projects.map((project) => (
                        <article key={project.image} className="h-[498px] w-[502.5px] shrink-0 snap-start overflow-hidden rounded-[10px] bg-white">
                            <button
                                type="button"
                                aria-label={`${project.title} 사진 크게 보기`}
                                aria-haspopup="dialog"
                                onClick={() => { setSelected(project); dialogRef.current?.showModal(); }}
                                className="group flex h-full w-full cursor-pointer flex-col items-stretch justify-start p-0 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#006EB8]"
                            >
                                <div className="relative h-[377px] w-full shrink-0 overflow-hidden">
                                    <Image src={project.image} alt={project.title} fill sizes="503px" className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]" />
                                    <span className="absolute top-[23px] left-[34px] flex h-[38px] items-center rounded-[20px] bg-[#00ADDB]/60 px-[14px] text-[18px] font-medium text-white/80">
                                        # {project.tag}
                                    </span>
                                </div>
                                <div className="relative px-[21px] pt-[23px] pr-[70px]">
                                    <h3 className="whitespace-nowrap text-[23px] font-bold leading-[29px] text-[#102D4A]">{project.title}</h3>
                                    <p className="mt-[11px] text-[19px] font-medium leading-6 text-[#102D4A]/50">{project.description}</p>
                                    <ArrowRightCircle size={42} strokeWidth={2} aria-hidden="true" className="absolute top-[30px] right-[20px] text-[#102D4A]" />
                                </div>
                            </button>
                        </article>
                    ))}
                </div>
                <div aria-hidden="true" className="mt-[26px] h-[2px] w-[1114px] bg-[#CBD3D7]">
                    <div className="h-full w-[143px] bg-[#00ADDB]" style={{ transform: `translateX(${progress * 971}px)` }} />
                </div>
                <a
                    href="#contact"
                    className="mx-auto mt-[49px] flex h-[53px] w-[267px] items-center justify-center gap-[8px] rounded-[23px] border-[4px] border-[#102D4A] bg-[#102D4A] text-[30px] font-bold text-white shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#16436b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ADDB]"
                >
                    시공사례 더 보기
                    <ArrowRight size={34} strokeWidth={2.4} aria-hidden="true" />
                </a>
            </div>
            <dialog ref={dialogRef} aria-labelledby="project-dialog-heading" onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }} className="fixed inset-0 m-auto max-h-[90vh] w-[1100px] max-w-[90vw] overflow-auto rounded-xl bg-white p-8 text-[#102D4A] backdrop:bg-[#102D4A]/70">
                <div className="mb-6 flex items-center justify-between gap-6">
                    <h2 id="project-dialog-heading" className="text-3xl font-bold">{selected.title}</h2>
                    <button type="button" aria-label="시공사례 사진 닫기" onClick={() => dialogRef.current?.close()} className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded focus-visible:outline-2"><X size={32} aria-hidden="true" /></button>
                </div>
                <div className="relative h-[60vh]"><Image src={selected.image} alt={selected.title} fill sizes="1100px" className="object-contain" /></div>
                <p className="mt-6 text-xl">{selected.description}</p>
            </dialog>
        </section>
    );
}
