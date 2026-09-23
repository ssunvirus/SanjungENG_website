import Image from "next/image";

const chillers = [
  { title: "스크류 냉동기", image: "/images/solutions/chiller-screw.png", width: 375 },
  { title: "터보 냉동기", image: "/images/solutions/chiller-turbo.png", width: 455 },
  { title: "흡수식 냉동기", image: "/images/solutions/chiller-absorption.png", width: 338 },
];

export default function ChillerTypes() {
  return (
    <section className="mx-auto h-[690px] w-[1440px] bg-white px-[120px] py-[50px]">
      <div className="flex h-[179px] items-center gap-[300px]">
        <div className="relative h-[121px] w-[337px] overflow-hidden"><Image src="/images/solutions/carrier.png" alt="Carrier" fill sizes="337px" className="object-contain" /></div>
        <div>
          <p className="flex items-center gap-[20px] text-[20px] font-medium tracking-[6px] text-[#00ADDB]/60">CHILLER <span className="h-[2px] w-[46px] bg-[#00ADDB]/60" /></p>
          <h2 className="mt-[10px] text-[45px] font-bold tracking-[2px] text-[#102D4A]">주요 취급 냉동기</h2>
          <p className="mt-[25px] text-[19px] font-semibold leading-[30px]">산정엔지니어링은<br />최첨단 냉동공조시스템 전문 기업 (주)센추리의 파트너사입니다.</p>
        </div>
      </div>
      <div className="mt-[80px] flex items-start gap-[40px]">
        {chillers.map((chiller) => (
          <article key={chiller.title} className="text-center" style={{ width: chiller.width }}>
            <div className="relative h-[250px] w-full overflow-hidden bg-[#F4F4F4]">
              <Image src={chiller.image} alt={chiller.title} fill sizes={`${chiller.width}px`} className="object-contain" /><span aria-hidden="true" className="absolute inset-0 bg-black/10" />
            </div>
            <h3 className="mt-[33px] text-[40px] font-semibold">{chiller.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
