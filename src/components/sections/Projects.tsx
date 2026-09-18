"use client";

import Image from "next/image";
import { ArrowRight, ArrowRightCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
    { title: "농협 저온저장고 냉동설비 설치", description: "CDU / 유니클 쿨러 설치", image: "/images/projects/cold-storage.png" },
    { title: "구례 실내 수영장 섬유덕트 설치", description: "섬유덕트 설계 / 설치", image: "/images/projects/pool-fabric-duct.png" },
    { title: "반도체 공장 공냉식 냉동기 교체공사", description: "공냉식 냉동기 교체", image: "/images/projects/semiconductor-chiller.png" },
    { title: "서안성 냉동창고 정기점검", description: "정기점검 / 유지보수", image: "/images/projects/warehouse-maintenance.png" },
];

const CARD_STEP = 715;
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
        <section id="projects" aria-labelledby="projects-heading" className="relative h-[1297px] overflow-hidden bg-[#EFF7FB] pt-[71px]">
            <div className="mx-auto w-[1440px]">
                <div className="flex h-6 items-center gap-[50px] text-[#00ADDB]/60">
                    <span className="text-[20px] font-semibold tracking-[6px]">PROJECTS</span>
                    <span aria-hidden="true" className="h-[3px] w-[146px] bg-current" />
                </div>
                <h2 id="projects-heading" className="mt-[23px] text-[75px] font-bold leading-[90px] text-[#102D4A]">시공사례</h2>
                <div className="mt-[33px] flex w-[1485px] items-center justify-between">
                    <p className="text-[25px] font-semibold leading-[30px] text-[#243447]">
                        냉동공조 부터 섬유덕트까지, 산정엔지니어링의 시공사례를 소개합니다.
                    </p>
                    <div className="relative z-10 flex gap-[20px] text-[#243447]">
                        <button type="button" aria-label="이전 시공사례" aria-controls="project-cards" disabled={currentSlide === 0} onClick={() => move(-1)} className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#102D4A] text-white focus-visible:outline-2 focus-visible:outline-[#006EB8] disabled:cursor-default disabled:bg-[#AEBFCB] disabled:text-[#102D4A]">
                            <ChevronLeft size={34} strokeWidth={2.5} aria-hidden="true" />
                        </button>
                        <button type="button" aria-label="다음 시공사례" aria-controls="project-cards" disabled={currentSlide === LAST_SLIDE} onClick={() => move(1)} className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#102D4A] text-white focus-visible:outline-2 focus-visible:outline-[#006EB8] disabled:cursor-default disabled:bg-[#AEBFCB] disabled:text-[#102D4A]">
                            <ChevronRight size={34} strokeWidth={2.5} aria-hidden="true" />
                        </button>
                    </div>
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
                    className="mt-[52px] flex w-[1485px] snap-x snap-mandatory gap-[45px] overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-[#006EB8]"
                >
                    {projects.map((project) => (
                        <article key={project.image} className="h-[664px] w-[670px] shrink-0 snap-start overflow-hidden rounded-[10px] bg-white">
                            <button
                                type="button"
                                aria-label={`${project.title} 사진 크게 보기`}
                                aria-haspopup="dialog"
                                onClick={() => { setSelected(project); dialogRef.current?.showModal(); }}
                                className="group flex h-full w-full cursor-pointer flex-col items-stretch justify-start p-0 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#006EB8]"
                            >
                                <div className="relative h-[503px] w-full shrink-0 overflow-hidden">
                                    <Image src={project.image} alt={project.title} fill sizes="670px" className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]" />
                                    <span className="absolute top-[31px] left-[45px] flex h-[51px] items-center rounded-[20px] bg-[#00ADDB]/60 px-[18px] text-[24px] font-medium text-white/80">
                                        # 냉동설비
                                    </span>
                                </div>
                                <div className="relative px-[25px] pt-[31px] pr-[100px]">
                                    <h3 className="whitespace-nowrap text-[30px] font-bold leading-[38px] text-[#102D4A]">{project.title}</h3>
                                    <p className="mt-[14px] text-[25px] font-medium leading-8 text-[#102D4A]/50">{project.description}</p>
                                    <ArrowRightCircle size={56} strokeWidth={2} aria-hidden="true" className="absolute top-[42px] right-[25px] text-[#102D4A]" />
                                </div>
                            </button>
                        </article>
                    ))}
                </div>
                <div aria-hidden="true" className="mt-[33px] h-[3px] w-[1485px] bg-[#CBD3D7]">
                    <div className="h-full w-[192px] bg-[#00ADDB]" style={{ transform: `translateX(${progress * 1293}px)` }} />
                </div>
                <a
                    href="#contact"
                    className="mx-auto mt-[98px] flex h-[103px] w-[491px] items-center justify-center gap-[20px] rounded-[30px] border-[5px] border-[#102D4A] bg-[#102D4A] text-[30px] font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#16436b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ADDB]"
                >
                    시공사례 더 보기
                    <ArrowRight size={34} strokeWidth={2.4} aria-hidden="true" />
                </a>
            </div>
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[47px] bg-gradient-to-b from-[#EFF7FB] to-white" />
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
