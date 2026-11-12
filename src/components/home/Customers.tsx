import Image from "next/image";

const customerLogos = [
  ["akzo", "AkzoNobel"],
  ["plakor", "PLAKOR"],
  ["nonghyup", "농협"],
  ["logiport", "LOGIPORT"],
  ["orion", "오리온"],
  ["sungmin", "성민글로벌"],
  ["aju", "아주약품"],
  ["bbq", "BBQ"],
  ["pkc", "백광산업"],
  ["hwaseong", "화성도시공사"],
  ["db", "DB Schenker"],
];

export default function Customers() {
  return (
    <section
      aria-label="함께한 주요 현장"
      className="relative mx-auto my-8 w-full max-w-[600px] px-5 py-14 text-center text-brand-navy before:absolute before:inset-x-5 before:top-0 before:h-px before:bg-brand-navy/10 after:absolute after:inset-x-5 after:bottom-0 after:h-px after:bg-brand-navy/10 lg:my-[60px] lg:max-w-[1440px] lg:px-[80px] lg:py-[100px] lg:before:inset-x-[80px] lg:after:inset-x-[80px]"
    >
      <p className="text-xs font-semibold tracking-[4px] text-brand-blue lg:text-base lg:tracking-[6px]">
        CUSTOMER
      </p>
      <h2 className="mt-4 text-[28px] font-extrabold leading-tight lg:text-[48px]">
        산정이 함께한 <span className="text-brand-blue">주요 현장</span>
      </h2>
      <p className="mx-auto mt-4 max-w-[900px] text-sm leading-7 text-brand-navy/80 lg:text-lg">
        산정엔지니어링은 다양한 산업의 주요 기업과 기관 현장에 최적의 냉동공조 솔루션을
        제공해왔습니다.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-8 lg:mt-10 lg:grid-cols-[repeat(30,minmax(0,1fr))] lg:gap-4">
        {customerLogos.map(([file, name], index) => (
          <li
            key={file}
            className={`flex h-[100px] items-center justify-center rounded-2xl border border-brand-navy/10 bg-white/90 px-4 shadow-[0_3px_12px_rgba(16,47,73,0.05)] sm:col-span-2 sm:px-3 lg:col-start-auto lg:h-[118px] lg:px-6 ${index === 8 ? "sm:col-start-2" : ""} ${index < 5 ? "lg:col-span-6" : "lg:col-span-5"}`}
          >
            <div className="relative h-14 w-full lg:h-16">
              <Image
                src={
                  file === "hwaseong"
                    ? "/images/home-refresh/customer-hwaseong-updated.png"
                    : ["orion", "pkc", "bbq"].includes(file)
                      ? `/images/home-refresh/customer-${file}-transparent.png`
                      : `/images/home-refresh/customer-${file}.png`
                }
                alt={name}
                fill
                sizes="(min-width: 1440px) 210px, (min-width: 640px) 120px, (min-width: 600px) 232px, calc(50vw - 42px)"
                className="object-contain"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
