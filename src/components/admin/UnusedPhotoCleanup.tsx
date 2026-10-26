"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Preview = { count: number; images: { key: string; bytes: number; modifiedAt: number }[] };

export default function UnusedPhotoCleanup({
  disabled,
  onBusy,
}: {
  disabled: boolean;
  onBusy: (busy: boolean) => void;
}) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const busyRef = useRef(false);

  async function run(deleting: boolean) {
    if (disabled || busyRef.current) return;
    if (
      deleting &&
      (!preview?.images.length ||
        !window.confirm(
          `미사용 사진 ${preview.images.length}장을 S3에서 완전히 삭제할까요? 복원할 수 없습니다. 다른 창에서 편집 중인 사례는 먼저 저장해주세요.`,
        ))
    )
      return;
    busyRef.current = true;
    setBusy(true);
    onBusy(true);
    try {
      if (deleting) {
        const response = await fetch("/api/admin/project-images/cleanup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keys: preview!.images.map((image) => image.key) }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setMessage(
          `${data.deleted}장 삭제 · ${data.skipped}장 제외 · ${data.failed}장 실패. 실패한 사진은 다시 정리할 수 있습니다.`,
        );
      } else {
        setMessage("");
      }
      const response = await fetch("/api/admin/project-images/cleanup", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setPreview(data);
    } catch (error) {
      setPreview(null);
      setMessage(
        error instanceof Error
          ? error.message
          : "처리 결과를 확인하지 못했습니다. 다시 조회해주세요.",
      );
    } finally {
      busyRef.current = false;
      setBusy(false);
      onBusy(false);
    }
  }

  const buttonClass =
    "cursor-pointer rounded-md border border-[#CEDCE6] px-4 py-2 text-[15px] font-semibold disabled:cursor-default disabled:opacity-50";
  return (
    <section
      aria-label="미사용 사진 정리"
      className="mt-6 rounded-xl border border-[#DFE7EF] bg-white p-5 text-brand-navy"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">미사용 사진 정리</h2>
          <p className="mt-2 text-[15px] text-slate-500">
            등록에 사용하지 않은 사진과 수정 중 뺀 사진을 확인합니다. 업로드 후 24시간이 지난 사진만
            정리할 수 있어요.
          </p>
        </div>
        <button
          type="button"
          disabled={disabled || busy}
          className={buttonClass}
          onClick={() => void run(false)}
        >
          {busy ? "처리 중…" : "미사용 사진 확인"}
        </button>
      </div>
      {message && (
        <p role="status" className="mt-4 text-[15px]">
          {message}
        </p>
      )}
      {preview && (
        <div className="mt-4">
          <p role="status">
            정리 가능한 사진 {preview.count}장
            {preview.count > preview.images.length
              ? ` · 오래된 ${preview.images.length}장부터 표시합니다.`
              : ""}
          </p>
          {preview.images.length > 0 && (
            <>
              <p className="mt-2 text-[15px] text-slate-500">
                다른 창에서 작성 중인 내용은 먼저 저장해주세요. 아래 사진은 삭제 후 복원할 수
                없습니다.
              </p>
              <div className="my-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {preview.images.map((image) => (
                  <figure key={image.key} className="min-w-0">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
                      <Image
                        src={`/api/admin/project-images/${image.key}`}
                        alt="미사용 사진 미리보기"
                        fill
                        unoptimized
                        sizes="200px"
                        className="object-contain"
                      />
                    </div>
                    <figcaption className="mt-1 break-all text-xs text-slate-500">
                      {new Date(image.modifiedAt).toLocaleDateString("ko-KR")} ·{" "}
                      {(image.bytes / 1024 / 1024).toFixed(2)}MB
                    </figcaption>
                  </figure>
                ))}
              </div>
              <button
                type="button"
                disabled={disabled || busy}
                className={`${buttonClass} border-red-200 text-red-600`}
                onClick={() => void run(true)}
              >
                위 사진 {preview.images.length}장 완전 삭제
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
