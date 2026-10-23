import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "관리자 로그인 | 산정엔지니어링",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message =
    error === "denied"
      ? "관리자 권한이 없는 계정입니다. Admins 그룹 등록을 확인해주세요."
      : error === "configuration"
        ? "로그인 서비스를 준비하지 못했습니다. 서버 설정을 확인해주세요."
        : error
          ? "로그인이 만료되었거나 인증하지 못했습니다. 다시 로그인해주세요."
          : "허용된 관리자 계정으로 로그인해주세요.";
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f5f7fa] px-5 py-12">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 inline-block rounded-xl bg-brand-navy px-6 py-4">
          <Image src="/logo-white.svg" alt="산정엔지니어링" width={158} height={48} />
        </div>
        <p className="text-xs font-semibold tracking-widest text-slate-400">ADMIN WORKSPACE</p>
        <h1 className="mt-3 text-2xl font-bold text-brand-navy">관리자 로그인</h1>
        <p role={error ? "alert" : undefined} className="mt-4 text-sm leading-7 text-slate-600">
          {message}
        </p>
        <a
          href="/api/auth/signin/cognito"
          className="mt-8 block rounded-lg bg-brand-navy px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#1d4867] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          관리자 계정으로 로그인
        </a>
        <p className="mt-4 text-xs leading-6 text-slate-400">
          Cognito 인증 화면으로 이동합니다. 관리자 계정은 별도 승인 후 사용할 수 있습니다.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-xs text-slate-500 underline underline-offset-4"
        >
          홈페이지로 돌아가기
        </Link>
      </section>
    </main>
  );
}
