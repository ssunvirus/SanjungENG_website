import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="min-h-[340px] w-full bg-brand-navy py-6 text-white md:py-10 xl:py-[22px]">
      <div className="mx-auto w-full max-w-[1080px] px-5 xl:px-0">
        <div className="flex flex-col items-center gap-4 text-center md:gap-6 md:items-start md:text-left md:flex-row md:flex-wrap xl:h-[181px] xl:flex-nowrap xl:gap-[80px]">
          <section className="w-[260px] shrink-0">
            <Image
              src="/logo-white.svg"
              alt="산정엔지니어링"
              width={204}
              height={68}
              className="mx-auto h-auto w-[158px] md:mx-0"
            />
            <h2 className="mt-[16px] text-[19px] font-semibold leading-[24px]">
              30년 경험으로
              <br />더 나은 냉동공조 환경을 만듭니다.
            </h2>
            <p className="mt-2 md:mt-[16px] text-[11px] font-light text-white/75">
              HVAC&nbsp; 전문 기업 산정엔지니어링
            </p>
          </section>
          <span
            aria-hidden="true"
            className="mt-2 hidden h-[132px] w-px shrink-0 bg-white/15 xl:block"
          />
          <address className="w-full not-italic md:w-[250px] xl:w-[194px] xl:shrink-0">
            <p className="text-[11px] font-light text-white/75">상담 및 문의</p>
            <dl className="mx-auto mt-[9px] grid w-fit grid-cols-[48px_1fr] gap-y-[9px] text-left text-[14px] md:mx-0 xl:text-[11px]">
              <dt className="font-light text-white/75">Tel</dt>
              <dd className="flex flex-col items-start gap-1 font-medium">
                <a href="tel:01053401728" className="whitespace-nowrap">
                  010-5340-1728
                </a>
                <a href="tel:028911728" className="whitespace-nowrap">
                  02-891-1728
                </a>
              </dd>
              <dt className="font-light text-white/75">E-mail</dt>
              <dd className="font-medium">
                <a href="mailto:sanjungeng@naver.com">sanjungeng@naver.com</a>
              </dd>
            </dl>
            <p className="mt-[9px] text-[14px] font-medium leading-6 xl:whitespace-nowrap xl:text-[11px] xl:leading-[16px]">
              서울특별시 금천구 시흥대로 97, 6동 213호
              <br />
              (시흥동, 시흥산업용재유통센타)
            </p>
          </address>
          <span
            aria-hidden="true"
            className="mt-2 hidden h-[132px] w-px shrink-0 bg-white/15 xl:block"
          />
          <section className="flex items-center gap-4 shrink-0 md:block md:w-[93px] xl:ml-[60px]">
            <h2 className="whitespace-nowrap text-[19px] font-semibold">공식 블로그</h2>
            <Link
              href="https://blog.naver.com/sanjungeng"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="산정엔지니어링 공식 블로그 접속"
              className="block md:mt-5"
            >
              <Image
                src="/naver-blog.svg"
                alt=""
                width={95}
                height={74}
                className="h-auto w-[60px] md:w-[93px]"
              />
            </Link>
          </section>
        </div>
        <nav
          aria-label="푸터 메뉴"
          className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 border-y border-white/15 py-3 text-sm md:hidden"
        >
          <Link href="/about">회사소개</Link>
          <Link href="/solutions">냉동공조</Link>
          <Link href="/fabric-duct">패브릭덕트</Link>
          <Link href="/projects">시공사례</Link>
        </nav>
        <section className="mt-4 flex flex-col items-center gap-3 py-4 md:mt-8 md:gap-4 md:border-t md:border-white/15 md:py-6 md:flex-row md:items-center md:justify-between xl:mt-0 xl:h-[91px] xl:py-0">
          <h2 className="text-[19px] font-semibold text-white/75">파트너사</h2>
          <div className="grid w-full grid-cols-3 items-center gap-3 rounded-xl bg-white px-2 py-3 md:flex md:flex-nowrap md:gap-5 md:rounded-none md:bg-transparent md:p-0 md:justify-start md:w-auto xl:w-[442px]">
            <Image
              src="/partner-multixair.svg"
              alt="Multixair"
              width={119}
              height={63}
              className="h-12 min-w-0 w-full object-contain md:h-16 md:w-[85px] xl:w-[119px]"
            />
            <Image
              src="/partner-klimagiel.svg"
              alt="Klimagiel"
              width={119}
              height={79}
              className="h-12 min-w-0 w-full object-contain md:h-16 md:w-[85px] xl:w-[119px]"
            />
            <Image
              src="/partner-century-transparent.png"
              alt="Century"
              width={164}
              height={68}
              className="h-12 min-w-0 w-full object-contain md:h-16 md:w-[110px] xl:w-[164px]"
            />
          </div>
        </section>
        <div className="flex flex-wrap items-center gap-[10px] border-t border-white/15 pt-[10px] text-[13px] font-light text-white/75 xl:text-[11px]">
          <span>사업자 등록번호 : 119-81-58805</span>
          <span aria-hidden="true" className="h-[9px] w-px bg-white/15" />
          <span>대표자 : 김윤환</span>
        </div>
        <nav
          aria-label="정책 안내"
          className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-white/75 xl:text-[11px]"
        >
          <Link href="/privacy" className="hover:text-white">
            개인정보 처리방침
          </Link>
          <Link href="/email-collection" className="hover:text-white">
            이메일 무단수집 거부
          </Link>
        </nav>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-light text-white/50 md:justify-between">
          <p>© 2026 (주) 산정엔지니어링. All Rights Reserved</p>
          <Link
            href="/admin"
            className="py-2 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          >
            관리자
          </Link>
        </div>
        <a
          href="#"
          aria-label="페이지 맨 위로 이동"
          className="mx-auto mt-5 flex size-12 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-navy md:hidden"
        >
          ↑ TOP
        </a>
      </div>
    </footer>
  );
}
