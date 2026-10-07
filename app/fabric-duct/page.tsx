import type { Metadata } from "next";
import Hero from "../../src/components/fabric-duct/Hero";
import Introduction from "../../src/components/fabric-duct/Introduction";
import Advantages from "../../src/components/fabric-duct/Advantages";
import Applications from "../../src/components/fabric-duct/Applications";
import AirFlowDesign from "../../src/components/fabric-duct/AirFlowDesign";
import OneStopSolution from "../../src/components/fabric-duct/OneStopSolution";
import Partners from "../../src/components/fabric-duct/Partners";

export const metadata: Metadata = {
  title: "섬유덕트 | 산정엔지니어링",
  description: "공간에 맞춘 섬유덕트 설계와 공급, 설치 및 CFD 공기분배 설계 솔루션을 소개합니다.",
};

export default function FabricDuctPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-[#243447]">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 mx-auto h-[64px] w-[1920px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <div className="h-[4px]" aria-hidden="true" />
      <Introduction />
      <Advantages />
      <Applications />
      <AirFlowDesign />
      <OneStopSolution />
      <Partners />
    </main>
  );
}
