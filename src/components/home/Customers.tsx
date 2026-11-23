import Image from "next/image";
import styles from "./Customers.module.css";

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
  ["avenue-france", "아브뉴프랑"],
  ["hyundai-terratower", "현대테라타워"],
  ["sk-shieldus", "SK쉴더스"],
  ["kanavi-mobility", "카나비모빌리티"],
  ["kogas", "한국가스공사"],
];

export default function Customers() {
  return (
    <section
      aria-label="함께한 주요 현장"
      className="relative mx-auto my-8 w-full max-w-[600px] px-5 py-14 text-center text-brand-navy before:absolute before:inset-x-5 before:top-0 before:h-px before:bg-brand-navy/10 after:absolute after:inset-x-5 after:bottom-0 after:h-px after:bg-brand-navy/10 lg:my-[60px] lg:max-w-[1440px] lg:px-[80px] lg:py-[100px] lg:before:inset-x-[80px] lg:after:inset-x-[80px]"
    >
      <p
        data-section-eyebrow
        className="text-xs font-semibold tracking-[4px] text-brand-blue lg:text-base lg:tracking-[6px]"
      >
        CUSTOMER
      </p>
      <h2 className="mt-4 text-[28px] font-extrabold leading-tight lg:text-[48px]">
        산정이 함께한 <span className="text-brand-blue">주요 현장</span>
      </h2>
      <p className="mx-auto mt-4 max-w-[900px] text-sm leading-7 text-brand-navy/80 lg:text-lg">
        산정엔지니어링은 다양한 산업의 주요 기업과 기관 현장에 최적의 냉동공조 솔루션을
        제공해왔습니다.
      </p>
      <div className="mt-8 space-y-3 overflow-hidden py-2 lg:mt-10 lg:space-y-4">
        {[customerLogos.slice(0, 8), customerLogos.slice(8)].map((logos, row) => (
          <div key={row} className={styles.viewport}>
            <div className={`${styles.track} ${row === 0 ? styles.right : styles.left}`}>
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className={styles.group}>
                  {logos.map(([file, name]) => (
                    <li
                      key={file}
                      className={`flex h-[100px] w-[160px] shrink-0 items-center justify-center rounded-2xl border border-brand-navy/10 bg-white/90 shadow-[0_3px_12px_rgba(16,47,73,0.05)] lg:h-[118px] lg:w-[200px] ${file === "kogas" ? "px-2" : "px-4 sm:px-3 lg:px-6"}`}
                    >
                      <div
                        className={`relative w-full ${file === "avenue-france" ? "h-[68px] lg:h-[78px]" : "h-14 lg:h-16"}`}
                      >
                        <Image
                          src={
                            file === "avenue-france"
                              ? "/images/home-refresh/customer-avenue-france.svg"
                              : file === "hwaseong"
                                ? "/images/home-refresh/customer-hwaseong-updated.png"
                                : ["orion", "pkc", "bbq"].includes(file)
                                  ? `/images/home-refresh/customer-${file}-transparent.png`
                                  : `/images/home-refresh/customer-${file}.${file === "kogas" ? "jpg" : "png"}`
                          }
                          alt={copy === 0 ? name : ""}
                          fill
                          sizes={file === "kogas" ? "(min-width: 1024px) 184px, 144px" : "(min-width: 1024px) 152px, 128px"}
                          className="object-contain"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
