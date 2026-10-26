import type { Metadata } from "next";
import Hero from "@/src/components/home/Hero";
import Business from "@/src/components/home/Business";
import Projects from "@/src/components/home/Projects";
import Customers from "@/src/components/home/Customers";
import EstimateCta from "@/src/components/home/EstimateCta";
import MobileHero from "@/src/components/home/mobile/MobileHero";
import MobileBusiness from "@/src/components/home/mobile/MobileBusiness";
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
        <MobileBusiness />
        <MobileProjects cases={mobileCases} />
        <MobileCustomers />
        <MobileEstimate />
      </div>
      <div className="hidden lg:block">
        <Hero />
        <Business />
        <Projects projects={desktopCases} />
        <Customers />
        <EstimateCta />
      </div>
    </main>
  );
}
