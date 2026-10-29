import { Award, Factory, Wind } from "lucide-react";

const highlights = [
  { icon: Award, title: "30 YEARS", description: "30년의 현장경험과 기술" },
  { icon: Factory, title: "다양한 산업현장", description: "공장, 물류센터, 공공시설 등" },
  { icon: Wind, title: "ONE-STOP", description: "냉동기부터 섬유덕트까지" },
];

export default function Highlights() {
  return (
    <section className="mx-auto flex h-auto lg:h-[130px] w-full lg:max-w-[1920px] items-center justify-center px-5 py-7 lg:px-0 lg:py-0 bg-brand-blue/10">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-[104px]">
        {highlights.map(({ icon: Icon, title, description }) => (
          <article key={title} className="flex items-center gap-[16px] lg:gap-[15px]">
            <Icon
              size={59}
              strokeWidth={1.8}
              className="size-10 lg:size-[59px] shrink-0 text-brand-navy"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-[20px] lg:text-[30px] font-bold tracking-[0px] lg:tracking-[-3px] text-brand-navy">
                {title}
              </h3>
              <p className="mt-[10px] lg:mt-[5px] text-[14px] lg:text-[20px] font-semibold tracking-[0px] lg:tracking-[-2px] text-brand-text/60">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
