"use client";
import type { RefObject } from "react";
import type { ProjectRecord as Entry } from "@/src/lib/project-record";
import ProjectPhotos, { type PhotoFeedback } from "./ProjectPhotos";
import styles from "./admin.module.css";

const categories = ["냉동기", "항온항습기", "냉각탑", "저온저장고", "섬유덕트", "기타"];
type Props = {
  editor: Entry;
  saving: boolean;
  uploading: boolean;
  loading: boolean;
  photoInput: RefObject<HTMLInputElement | null>;
  photoFeedback: PhotoFeedback;
  upload: (files: FileList | null) => Promise<void>;
  update: (patch: Partial<Entry>) => void;
  save: () => Promise<void>;
};

export default function ProjectEditor({
  editor,
  saving,
  uploading,
  loading,
  photoInput,
  photoFeedback,
  upload,
  update,
  save,
}: Props) {
  return (
    <fieldset disabled={saving || uploading} className="min-w-0 border-0 p-0">
      <div className={styles.editorGrid}>
        <div>
          <section className={styles.formPanel}>
            <h2>
              <span>01</span>기본 정보
            </h2>
            <label>
              현장명 <em>필수</em>
              <input
                autoFocus
                maxLength={150}
                value={editor.title}
                placeholder="예: 용인 ○○공장 냉각탑 교체"
                onChange={(event) => update({ title: event.target.value })}
              />
            </label>
            <div className={styles.twoFields}>
              <label>
                설비 분야
                <select
                  value={editor.category}
                  onChange={(event) => update({ category: event.target.value })}
                >
                  {Array.from(new Set([...categories, editor.category])).map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                현장 위치
                <input
                  value={editor.location}
                  maxLength={100}
                  placeholder="예: 경기도 용인"
                  onChange={(event) => update({ location: event.target.value })}
                />
              </label>
            </div>
            <label>
              한 줄 소개
              <input
                value={editor.summary ?? ""}
                maxLength={50}
                placeholder="예: 페브릭덕트 설계 및 설치"
                onChange={(event) => update({ summary: event.target.value })}
              />
              <small className={styles.fieldHint}>
                목록에서 제목 아래에 표시됩니다. {(editor.summary ?? "").length}/50자
              </small>
            </label>
            <label>
              작업 내용
              <textarea
                rows={6}
                value={editor.description}
                maxLength={5000}
                placeholder="작업 배경, 설치 설비, 주요 공정 등을 작성해주세요."
                onChange={(event) => update({ description: event.target.value })}
              />
            </label>
          </section>
          <ProjectPhotos
            editor={editor}
            uploading={uploading}
            photoInput={photoInput}
            photoFeedback={photoFeedback}
            upload={upload}
            update={update}
          />
        </div>
        <aside className={styles.editorAside}>
          <section className={styles.formPanel}>
            <h2>{editor.version > 0 ? "시공사례 수정" : "시공사례 등록"}</h2>
            <p>저장하면 글과 사진이 홈페이지 시공사례 목록과 상세 페이지에 공개됩니다.</p>
            <button
              onClick={save}
              disabled={saving || uploading || loading}
              className={styles.primary}
            >
              {uploading
                ? "사진 업로드 중…"
                : saving
                  ? editor.version > 0
                    ? "수정사항 저장 중…"
                    : "등록 중…"
                  : loading
                    ? "목록 불러오는 중…"
                    : editor.version > 0
                      ? "수정사항 저장"
                      : "시공사례 등록"}
            </button>
          </section>
          <section className={styles.tips}>
            <h3>시공사례 등록방법</h3>
            <p>현장명에는 설비와 작업을 함께 적어주세요.</p>
            <p>완공 사진을 대표 사진으로 선택하면 목록에서 보기 좋아요.</p>
            <p>사진 설명에는 실제 설비와 작업 내용을 적어주세요.</p>
          </section>
        </aside>
      </div>
    </fieldset>
  );
}
