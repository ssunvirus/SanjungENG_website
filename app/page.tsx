import Hero from "../src/components/home/Hero";
import Business from "../src/components/home/Business";
import Projects from "../src/components/home/Projects";
import Customers from "../src/components/home/Customers";
import EstimateCta from "../src/components/home/EstimateCta";

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
