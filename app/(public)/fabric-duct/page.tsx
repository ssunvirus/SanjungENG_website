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
export default function FabricDuctPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-text">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 w-full lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <div className="h-[4px]" aria-hidden="true" />
      <div className="bg-white">
        <Introduction />
      </div>
      <Advantages />
      <Applications />
      <div className="bg-white">
        <AirFlowDesign />
      </div>
      <OneStopSolution />
      <div className="bg-white">
        <Partners />
      </div>
      <FabricDuctFaq />
      <div className="lg:hidden">
        <MobileEstimate {...estimateIntro} />
      </div>
      <div className="hidden lg:block">
        <EstimateCta {...estimateIntro} />
      </div>
    </main>
  );
}
