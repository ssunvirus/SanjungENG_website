import SectionNavigation from "@/src/components/shared/SectionNavigation";
import WaveSurface from "@/src/components/shared/WaveSurface";
import type { Metadata } from "next";
import Hero from "@/src/components/fabric-duct/Hero";
import Introduction from "@/src/components/fabric-duct/Introduction";
import Advantages from "@/src/components/fabric-duct/Advantages";
import Applications from "@/src/components/fabric-duct/Applications";
import AirFlowDesign from "@/src/components/fabric-duct/AirFlowDesign";
import OneStopSolution from "@/src/components/fabric-duct/OneStopSolution";
import Partners from "@/src/components/fabric-duct/Partners";
import FabricDuctFaq from "@/src/components/fabric-duct/FabricDuctFaq";
import EstimateCta from "@/src/components/home/EstimateCta";
import MobileEstimate from "@/src/components/home/mobile/MobileEstimate";

export const metadata: Metadata = {
  alternates: { canonical: "/fabric-duct" },
  title: "섬유덕트·페브릭덕트 설계·시공 | 산정엔지니어링",
  description:
    "공간에 맞춘 섬유덕트(페브릭덕트) 설계와 설치, CFD를 활용한 공기 분배 설계 솔루션을 소개합니다.",
};

const estimateIntro = {
  title: (
    <>
      우리 현장에도 <span className="text-brand-blue">섬유덕트</span>를 적용할 수 있을까요?
    </>
  ),
  description:
    "현장 사진과 공간 크기, 사용 용도를 알려주시면 적용 가능 여부와 필요한 작업을 상담해드립니다.",
  note: "풍량과 정압은 알고 계신 경우에만 전달해주세요.",
};
const navigationItems = [
  ["fabric-introduction", "섬유덕트 소개"],
  ["fabric-applications", "적용 사례"],
  ["fabric-design", "공기 분배 설계"],
  ["fabric-partners", "파트너"],
  ["fabric-questions", "자주 묻는 질문"],
  ["fabric-inquiry", "견적문의"],
] as const;

export default function FabricDuctPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-text">
      <Hero />
      <SectionNavigation items={navigationItems} label="섬유덕트 페이지 구간 이동" />
      <WaveSurface>
        <div
          id="fabric-introduction"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <div className="bg-white">
            <Introduction />
          </div>
          <Advantages />
        </div>
        <div
          id="fabric-applications"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <Applications />
        </div>
        <div
          id="fabric-design"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <div className="bg-white">
            <AirFlowDesign />
          </div>
          <OneStopSolution />
        </div>
        <div
          id="fabric-partners"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <div className="bg-white">
            <Partners />
          </div>
        </div>
        <div
          id="fabric-questions"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <FabricDuctFaq />
        </div>
        <div
          id="fabric-inquiry"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <div className="lg:hidden">
            <MobileEstimate {...estimateIntro} />
          </div>
          <div className="hidden lg:block">
            <EstimateCta {...estimateIntro} />
          </div>
        </div>
      </WaveSurface>
    </main>
  );
}
