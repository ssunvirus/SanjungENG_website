import WaveSurface from "@/src/components/shared/WaveSurface";
import type { Metadata } from "next";
import Hero from "@/src/components/home/Hero";
import { BusinessOverview, BusinessAreas } from "@/src/components/home/Business";
import Projects from "@/src/components/home/Projects";
import Customers from "@/src/components/home/Customers";
import EstimateCta from "@/src/components/home/EstimateCta";
import MobileHero from "@/src/components/home/mobile/MobileHero";
import {
  MobileBusinessOverview,
  MobileBusinessAreas,
} from "@/src/components/home/mobile/MobileBusiness";
import MobileProjects from "@/src/components/home/mobile/MobileProjects";
import MobileCustomers from "@/src/components/home/mobile/MobileCustomers";
import MobileEstimate from "@/src/components/home/mobile/MobileEstimate";
import { siteDescription, siteName } from "@/src/lib/site-metadata";
import { connection } from "next/server";
import { publicProjectCards } from "@/src/lib/public-projects";
import { desktopFeaturedProjects, mobileFeaturedProjects } from "@/src/components/projects/data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "냉동공조·섬유덕트 설계 및 시공 | 산정엔지니어링",
  description: siteDescription,
};

export default async function Home() {
  await connection();
  const cards = await publicProjectCards();
  const desktopCases = cards.filter((project) =>
    desktopFeaturedProjects.some((featured) => featured.id === project.id),
  );
  const mobileCases = cards.filter((project) =>
    mobileFeaturedProjects.some((featured) => featured.id === project.id),
  );
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: "https://www.sanjungeng.co.kr",
    sameAs: ["https://blog.naver.com/sanjungeng"],
  };

  return (
    <main id="page-top" className="min-w-0 flex-1">
      <h1 className="sr-only">냉동공조·섬유덕트 설계 및 시공 | 산정엔지니어링</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <div className="w-full min-w-0 bg-gradient-to-b from-[#EFF7FB] to-[#F3FBFE] text-brand-navy lg:hidden">
        <MobileHero />
        <MobileBusinessOverview />
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-20 z-10 h-20 bg-gradient-to-b from-transparent to-[#EFF7FB] lg:-top-28 lg:h-28"
          />
          <WaveSurface blendTop>
            <MobileBusinessAreas />
            <MobileProjects cases={mobileCases} />
            <MobileCustomers />
            <MobileEstimate />
          </WaveSurface>
        </div>
      </div>
      <div className="hidden lg:block">
        <Hero />
        <BusinessOverview />
        <div className="relative -mt-[2px]">
          <WaveSurface blendTop>
            <BusinessAreas />
            <Projects projects={desktopCases} />
            <Customers />
            <EstimateCta />
          </WaveSurface>
        </div>
      </div>
    </main>
  );
}
