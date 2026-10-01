import { Award, Factory, Wind } from "lucide-react";

const highlights = [
  { icon: Award, title: "30 YEARS", description: "30년의 현장경험과 기술" },
  { icon: Wind, title: "ONE-STOP", description: "냉동기부터 섬유덕트까지" },
  { icon: Factory, title: "다양한 산업현장", description: "공장, 물류센터, 공공시설 등" },
];

export default function Highlights() {
  return (
    <section className="mx-auto flex h-[130px] w-[1920px] items-center justify-center bg-[#00ADDB]/10">
      <div className="flex items-center gap-[104px]">
        {highlights.map(({ icon: Icon, title, description }) => (
          <article key={title} className="flex items-center gap-[15px]">
            <Icon size={59} strokeWidth={1.8} className="shrink-0 text-[#102D4A]" aria-hidden="true" />
            <div><h3 className="text-[30px] font-bold tracking-[-3px] text-[#102D4A]">{title}</h3><p className="mt-[5px] text-[20px] font-semibold tracking-[-2px] text-[#243447]/60">{description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
