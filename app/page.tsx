import Hero from "../src/components/sections/Hero";
import Business from "../src/components/sections/Business";
import Projects from "../src/components/sections/Projects";
import Customers from "../src/components/sections/Customers";
import EstimateCta from "../src/components/sections/EstimateCta";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Business />
      <Projects />
      <Customers />
      <EstimateCta />
    </main>
  );
}
