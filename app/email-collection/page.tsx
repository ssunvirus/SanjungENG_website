import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/email-collection" },
  title: "이메일 무단수집 거부 | 산정엔지니어링",
};

export default function EmailCollectionPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] px-5 py-16 text-[#102D4A] lg:py-24">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-16 lg:py-14">
        <h1 className="text-3xl font-bold">이메일 무단수집 거부</h1>
        <p className="mt-6 leading-7 text-[#405468]">
          산정엔지니어링은 홈페이지에 게시된 이메일 주소를 자동 수집 프로그램이나 그 밖의 기술적
          장치를 이용해 사전 동의 없이 수집하는 것을 거부합니다. 수집한 주소를 판매·유통하거나
          광고성 정보 전송에 이용하지 마세요.
        </p>
      </article>
    </main>
  );
}
