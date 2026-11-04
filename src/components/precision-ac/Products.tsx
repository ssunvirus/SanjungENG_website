import Image from "next/image";

const products = [
  { title: "상부 토출형", image: "/images/precision-ac/product-upflow-current.png" },
  { title: "하부 토출형", image: "/images/precision-ac/product-downflow-current.png" },
];
export default function Products() {
  return (
    <section className="mx-auto w-full max-w-[1440px] bg-white px-5 py-9 lg:px-10 lg:py-[60px]">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div>
          <p className="flex items-center gap-3 text-xs font-medium tracking-[3px] text-brand-blue/60 lg:gap-5 lg:text-[20px] lg:tracking-[6px]">
            AIR CONDITIONER <span aria-hidden="true" className="h-[2px] w-[46px] bg-brand-blue/60" />
          </p>
          <h2 className="mt-3 text-[28px] font-bold tracking-[1px] text-brand-navy lg:mt-[10px] lg:text-[45px] lg:tracking-[2px]">
            주요 항온항습기
          </h2>
          <p className="mt-3 text-[15px] font-semibold leading-[30px] lg:mt-5 lg:text-[19px]">
            산정엔지니어링은
            <br />
            최첨단 냉동공조시스템 전문 기업 (주)센추리의 파트너사입니다.
          </p>
        </div>
        <Image
          src="/images/precision-ac/century-logo-current.png"
          alt="Century 센추리"
          width={400}
          height={167}
          sizes="(min-width: 1440px) 400px, 260px"
          className="h-[110px] w-[260px] max-w-full shrink-0 object-contain lg:h-[167px] lg:w-[400px]"
        />
      </header>
      <div className="mt-8 grid grid-cols-1 gap-5 lg:mt-10 lg:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.title}
            className="overflow-hidden rounded-xl border border-brand-navy/10 bg-[#F1FAFD] p-6 shadow-[0_4px_16px_rgba(16,46,73,0.06)] transition-[border-color,box-shadow] duration-200 hover:border-brand-blue/40 hover:shadow-[0_8px_24px_rgba(16,46,73,0.1)] motion-reduce:transition-none"
          >
            <h3 className="text-[28px] font-bold text-brand-navy lg:text-[34px]">
              {product.title}
            </h3>
            <div className="relative mt-5 h-[260px] w-full sm:h-[300px] lg:h-[310px]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1440px) 610px, (min-width: 1024px) 45vw, 85vw"
                className="object-contain"
              />
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-brand-blue/15 bg-[#F1FAFD] p-5 lg:mt-8 lg:px-7 lg:py-6">
        <p className="break-keep text-[16px] font-semibold leading-7 text-brand-navy lg:text-[19px] lg:leading-8">
          다양한 제조사의 기존 항온항습기 교체, 수리 및 유지보수를 상담해드립니다.
        </p>
        <p className="mt-2 break-keep text-sm leading-6 text-brand-navy/70 lg:text-base lg:leading-7">
          제조사와 모델, 장비 상태에 따라 작업 가능 여부를 안내드립니다.
        </p>
      </div>
    </section>
  );
}
