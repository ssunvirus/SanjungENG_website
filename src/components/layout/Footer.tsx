import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="min-h-[340px] w-full bg-[#102D4A] py-10 text-white xl:py-[22px]">
      <div className="mx-auto w-full max-w-[1080px] px-5 xl:px-0">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left md:flex-row md:flex-wrap xl:h-[181px] xl:flex-nowrap xl:gap-[80px]">
          <section className="w-[260px] shrink-0">
            <Image
              src="/logo-white.svg"
              alt="산정엔지니어링"
              width={158}
              height={48}
              className="mx-auto md:mx-0"
            />
            <h2 className="mt-[16px] text-[19px] font-semibold leading-[24px]">
              30년 경험으로
              <br />더 나은 냉동공조 환경을 만듭니다.
            </h2>
            <p className="mt-[16px] text-[11px] font-light text-white/75">
              HVAC&nbsp; 전문 기업 산정엔지니어링
            </p>
          </section>
          <span
            aria-hidden="true"
            className="mt-2 hidden h-[132px] w-px shrink-0 bg-white/15 xl:block"
          />
          <address className="w-full not-italic md:w-[250px] xl:w-[194px] xl:shrink-0">
            <p className="text-[11px] font-light text-white/75">상담 및 문의</p>
            <a href="tel:01053401728" className="mt-[9px] block text-[19px] font-Medium">
              010-5340-1728
            </a>
            <dl className="mx-auto mt-[9px] grid w-fit grid-cols-[48px_1fr] gap-y-[9px] text-left text-[14px] md:mx-0 xl:text-[11px]">
              <dt className="font-light text-white/75">Tel</dt>
              <dd className="font-Medium">
                <a href="tel:028911728">02-891-1728</a>
              </dd>
              <dt className="font-light text-white/75">E-mail</dt>
              <dd className="font-Medium">
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
          <section className="w-[93px] shrink-0 xl:ml-[60px]">
            <h2 className="whitespace-nowrap text-[19px] font-semibold">공식 블로그</h2>
            <Link
              href="https://blog.naver.com/sanjungeng"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="산정엔지니어링 공식 블로그 접속"
              className="mt-5 block"
            >
              <Image src="/naver-blog.svg" alt="" width={93} height={79} />
            </Link>
          </section>
        </div>
        <nav
          aria-label="푸터 메뉴"
          className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 border-y border-white/15 py-4 text-sm md:hidden"
        >
          <Link href="/about">회사소개</Link>
          <Link href="/solutions">냉동공조</Link>
          <Link href="/fabric-duct">섬유덕트</Link>
          <Link href="/projects">시공사례</Link>
        </nav>
        <section className="mt-8 flex flex-col items-center gap-4 border-t border-white/15 py-6 md:flex-row md:items-center md:justify-between xl:mt-0 xl:h-[91px] xl:py-0">
          <h2 className="text-[19px] font-semibold text-white/75">파트너사</h2>
          <div className="flex w-full flex-wrap items-center justify-center gap-5 md:justify-start md:w-auto xl:w-[442px]">
            <Image
              src="/partner-multixair.svg"
              alt="Multixair"
              width={119}
              height={63}
              className="h-auto w-[85px] xl:w-[119px]"
            />
            <Image
              src="/partner-klimagiel.svg"
              alt="Klimagiel"
              width={119}
              height={79}
              className="h-auto w-[85px] xl:w-[119px]"
            />
            <Image
              src="/partner-century.png"
              alt="Century"
              width={164}
              height={68}
              className="h-auto w-[110px] xl:w-[164px]"
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
        <p className="mt-2 text-center text-[11px] font-light text-white/50 md:text-left">
          © 2026 (주) 산정엔지니어링. All Rights Reserved
        </p>
        <a
          href="#"
          aria-label="페이지 맨 위로 이동"
          className="mx-auto mt-5 flex size-12 items-center justify-center rounded-full bg-white text-xs font-bold text-[#102D4A] md:hidden"
        >
          ↑ TOP
        </a>
      </div>
    </footer>
  );
}
