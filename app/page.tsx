import Hero from "../src/components/home/Hero";
import Business from "../src/components/home/Business";
import Projects from "../src/components/home/Projects";
import Customers from "../src/components/home/Customers";
import EstimateCta from "../src/components/home/EstimateCta";
import MobileHero from "../src/components/home/mobile/MobileHero";
import MobileBusiness from "../src/components/home/mobile/MobileBusiness";
import MobileProjects from "../src/components/home/mobile/MobileProjects";
import MobileCustomers from "../src/components/home/mobile/MobileCustomers";
import MobileEstimate from "../src/components/home/mobile/MobileEstimate";

export default function Home() {
  return (
    <main id="page-top" className="min-w-0 flex-1">
      <div className="w-full min-w-0 bg-gradient-to-b from-[#EFF7FB] to-[#F3FBFE] text-[#102D4A] lg:hidden">
        <MobileHero />
        <MobileBusiness />
        <MobileProjects />
        <MobileCustomers />
        <MobileEstimate />
      </div>
      <div className="hidden lg:block">
      <Hero />
      <Business />
      <Projects />
      <Customers />
      <EstimateCta />
      </div>
    </main>
  );
}
