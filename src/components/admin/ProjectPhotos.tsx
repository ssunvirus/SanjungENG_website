"use client";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import type { RefObject } from "react";
import type { ProjectRecord as Entry } from "@/src/lib/project-record";
import styles from "./admin.module.css";

export type PhotoFeedback = { message: string; error: boolean } | null;
type Props = {
  editor: Entry;
  uploading: boolean;
  photoInput: RefObject<HTMLInputElement | null>;
  photoFeedback: PhotoFeedback;
  upload: (files: FileList | null) => Promise<void>;
  update: (patch: Partial<Entry>) => void;
};

export default function ProjectPhotos({
  editor,
  uploading,
  photoInput,
  photoFeedback,
  upload,
  update,
}: Props) {
  return (
    <section className={styles.formPanel}>
      <h2>
        <span>02</span>현장 사진
      </h2>
      <div className={styles.upload}>
        <input
          ref={photoInput}
          id="admin-photos"
          type="file"
          className={styles.uploadInput}
          aria-label="시공사례 사진 추가"
          aria-describedby="photo-upload-feedback"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(event) => void upload(event.target.files)}
        />
        <ImagePlus size={28} />
        <strong>{uploading ? "사진 업로드 중…" : "사진 선택하기"}</strong>
        <small>JPG·PNG·WEBP · 사진당 3MB 이하 · 최대 30장</small>
      </div>
      <p
        id="photo-upload-feedback"
        role={photoFeedback?.error ? "alert" : "status"}
        className={photoFeedback?.error ? styles.photoError : styles.photoStatus}
      >
        {photoFeedback?.message ||
          (editor.photos.length === 0
            ? "등록된 사진이 없습니다. 위에서 사진을 선택해 추가해주세요."
            : `현재 사진 ${editor.photos.length}장 · 사진을 더 추가할 수 있어요.`)}
      </p>
      <div className={styles.photoList}>
        {editor.photos.map((photo, index) => (
          <div key={photo.src + index} className={styles.photoRow}>
            <div className={styles.photoThumb}>
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="90px"
                unoptimized={photo.src.startsWith("/api/")}
              />
            </div>
            <div>
              <span className={styles.photoLabel}>
                {index === 0 ? "대표 사진" : `현장 사진 ${index + 1}`}
              </span>
              <input
                aria-label={`사진 ${index + 1} 대체 설명`}
                maxLength={300}
                value={photo.alt}
                placeholder="사진 설명(ALT)을 입력해주세요"
                onChange={(event) =>
                  update({
                    photos: editor.photos.map((item, i) =>
                      i === index ? { ...item, alt: event.target.value } : item,
                    ),
                  })
                }
              />
              <div className={styles.photoActions}>
                {index > 0 && (
                  <button
                    onClick={() =>
                      update({
                        photos: [photo, ...editor.photos.filter((_, i) => i !== index)],
                      })
                    }
                  >
                    대표로 지정
                  </button>
                )}
                <button
                  onClick={() => update({ photos: editor.photos.filter((_, i) => i !== index) })}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
