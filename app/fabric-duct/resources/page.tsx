import type { Metadata } from "next";
import ResourcesHero from "../../../src/components/fabric-duct/resources/Hero";
import DownloadCenter from "../../../src/components/fabric-duct/resources/DownloadCenter";

export const metadata: Metadata = {
  title: "섬유덕트 자료실 | 산정엔지니어링",
  description: "섬유덕트 제조사 인증서, 시험성적서 및 제품 카탈로그를 확인하세요.",
};

export default function ResourcesPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-[#243447]">
      <ResourcesHero />
      <div
        aria-hidden="true"
        className="relative z-10 h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <DownloadCenter />
    </main>
  );
}
