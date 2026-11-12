"use client";
import Image from "next/image";
import { ArrowDown, ArrowUp, GripVertical, ImagePlus } from "lucide-react";
import { useRef, useState, type RefObject } from "react";
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
  const draggedPhoto = useRef<{ projectId: string; index: number; src: string } | null>(null);
  const [dropTarget, setDropTarget] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const dragType = "application/x-sanjung-project-photo";

  function movePhoto(from: number, to: number) {
    if (
      uploading ||
      from === to ||
      from < 0 ||
      to < 0 ||
      from >= editor.photos.length ||
      to >= editor.photos.length
    )
      return;
    const photos = [...editor.photos];
    const [photo] = photos.splice(from, 1);
    photos.splice(to, 0, photo);
    update({ photos });
    setAnnouncement(`${from + 1}번 사진을 ${to + 1}번째로 옮겼습니다. 저장하면 반영됩니다.`);
  }
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
      {editor.photos.length > 1 && (
        <p className={styles.photoReorderHint}>
          왼쪽 손잡이를 드래그하거나 위로, 아래로 이동하세요. 첫 번째 사진은 대표 사진이며, 저장 후
          반영됩니다.
        </p>
      )}
      <p role="status" aria-live="polite" className={styles.srOnly}>
        {announcement}
      </p>
      <div className={styles.photoList}>
        {editor.photos.map((photo, index) => (
          <div
            key={`${photo.src}:${editor.photos.slice(0, index).filter((item) => item.src === photo.src).length}`}
            data-photo-index={index}
            className={`${styles.photoRow} ${dropTarget === index ? styles.photoDropTarget : ""}`}
            onDragOver={(event) => {
              if (
                uploading ||
                draggedPhoto.current?.projectId !== editor.id ||
                !event.dataTransfer.types.includes(dragType)
              )
                return;
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              setDropTarget(index);
            }}
            onDrop={(event) => {
              const source = draggedPhoto.current;
              if (
                uploading ||
                !source ||
                source.projectId !== editor.id ||
                !event.dataTransfer.types.includes(dragType)
              )
                return;
              event.preventDefault();
              if (editor.photos[source.index]?.src === source.src) movePhoto(source.index, index);
              draggedPhoto.current = null;
              setDropTarget(null);
            }}
          >
            <button
              type="button"
              className={styles.photoDragHandle}
              aria-label={`사진 ${index + 1} 순서 변경`}
              title="드래그하여 사진 순서 변경"
              draggable={!uploading && editor.photos.length > 1}
              disabled={uploading || editor.photos.length < 2}
              onDragStart={(event) => {
                draggedPhoto.current = { projectId: editor.id, index, src: photo.src };
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData(dragType, photo.src);
              }}
              onDragEnd={() => {
                draggedPhoto.current = null;
                setDropTarget(null);
              }}
            >
              <GripVertical size={22} aria-hidden="true" />
            </button>
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
                placeholder="사진 설명(ALT) — 상세페이지 사진 아래에도 표시됩니다"
                onChange={(event) =>
                  update({
                    photos: editor.photos.map((item, i) =>
                      i === index ? { ...item, alt: event.target.value } : item,
                    ),
                  })
                }
              />
              <div className={styles.photoActions}>
                <button
                  type="button"
                  className={styles.photoMoveButton}
                  aria-label={`사진 ${index + 1} 위로 이동`}
                  disabled={uploading || index === 0}
                  onClick={() => movePhoto(index, index - 1)}
                >
                  <ArrowUp size={16} aria-hidden="true" />
                  위로
                </button>
                <button
                  type="button"
                  className={styles.photoMoveButton}
                  aria-label={`사진 ${index + 1} 아래로 이동`}
                  disabled={uploading || index === editor.photos.length - 1}
                  onClick={() => movePhoto(index, index + 1)}
                >
                  <ArrowDown size={16} aria-hidden="true" />
                  아래로
                </button>
                {index > 0 && (
                  <button type="button" disabled={uploading} onClick={() => movePhoto(index, 0)}>
                    대표로 지정
                  </button>
                )}
                <button
                  type="button"
                  disabled={uploading}
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
