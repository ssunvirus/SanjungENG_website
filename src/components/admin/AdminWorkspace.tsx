"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  FileText,
  FolderOpen,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import { projects } from "@/src/components/projects/data";
import { mergeAdminProjects, type ProjectRecord } from "@/src/lib/project-record";
import { MAX_PROJECT_IMAGE_BYTES } from "@/src/lib/project-images";
import { initialLegacyPhotos } from "@/src/lib/legacy-project-photos";
import { applyProjectOrder, moveProjectInList, type ProjectOrder } from "@/src/lib/project-order";
import styles from "./admin.module.css";
import UnusedPhotoCleanup from "./UnusedPhotoCleanup";
import ProjectList from "./ProjectList";
import ProjectEditor from "./ProjectEditor";
import type { PhotoFeedback } from "./ProjectPhotos";

type Entry = ProjectRecord;
const initialEntries: Entry[] = projects.map((project) => ({
  id: project.id,
  title: project.title,
  category: project.tag,
  location: project.location || "",
  description: project.workDescription || project.description,
  summary: project.description.slice(0, 50),
  status: "공개",
  version: 0,
  photos: initialLegacyPhotos(project.id, project.image, project.title),
  photosVersion: 1,
}));
const emptyEntry = (): Entry => ({
  id: "",
  title: "",
  category: "냉동기",
  location: "",
  description: "",
  summary: "",
  status: "공개",
  version: 0,
  photos: [],
  photosVersion: 1,
});

export default function AdminWorkspace() {
  const [entries, setEntries] = useState(initialEntries);
  const [order, setOrder] = useState<ProjectOrder>({ ids: [], version: 0 });
  const [ordering, setOrdering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDeletions, setPendingDeletions] = useState<Entry[]>([]);
  const photoInput = useRef<HTMLInputElement>(null);
  const savingRef = useRef(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("전체");
  const [editor, setEditor] = useState<Entry | null>(null);
  const [notice, setNotice] = useState("");
  const [photoFeedback, setPhotoFeedback] = useState<PhotoFeedback>(null);
  useEffect(() => {
    let active = true;
    fetch("/api/admin/projects", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        if (active) {
          const saved: Entry[] = data.projects;
          const savedOrder: ProjectOrder = data.order || { ids: [], version: 0 };
          setOrder(savedOrder);
          setEntries(mergeAdminProjects(initialEntries, saved, savedOrder.ids));
          setPendingDeletions(data.pendingDeletions || []);
        }
      })
      .catch((error) => {
        if (active) setNotice(error instanceof Error ? error.message : "목록 불러오기 실패");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function save() {
    if (!editor || savingRef.current || loading) return;
    if (!editor.title.trim()) {
      setNotice("현장명을 입력해주세요.");
      return;
    }
    savingRef.current = true;
    setSaving(true);
    const draft = { ...editor, id: editor.id || crypto.randomUUID() };
    setEditor(draft);
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      const saved: Entry = data.project;
      setEntries((current) =>
        applyProjectOrder(
          current.some((item) => item.id === saved.id)
            ? current.map((item) => (item.id === saved.id ? saved : item))
            : [saved, ...current],
          order.ids,
        ),
      );
      setEditor(saved);
      setNotice("저장했습니다. 홈페이지 시공사례 목록과 상세 페이지에 반영됩니다.");
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "저장 결과를 확인하지 못했습니다. 새로고침 후 확인해주세요.",
      );
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  async function remove(entry: Entry) {
    if (savingRef.current || loading) return;
    if (!window.confirm(`‘${entry.title}’ 시공사례를 완전히 삭제할까요?`)) return;
    savingRef.current = true;
    setDeletingId(entry.id);
    try {
      const response = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setEntries((current) => current.filter((item) => item.id !== entry.id));
      if (data.cleanupPending) {
        setPendingDeletions((current) => [
          ...current.filter((item) => item.id !== entry.id),
          { ...entry, deleted: true },
        ]);
        setNotice(
          "시공사례는 삭제했지만 파일 정리가 남았습니다. ‘삭제 파일 정리’로 다시 시도해주세요.",
        );
      } else {
        setPendingDeletions((current) => current.filter((item) => item.id !== entry.id));
        setNotice("시공사례와 사용하지 않는 S3 사진을 삭제했습니다.");
      }
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "삭제 결과를 확인하지 못했습니다. 새로고침 후 확인해주세요.",
      );
    } finally {
      savingRef.current = false;
      setDeletingId(null);
    }
  }

  async function cleanupDeleted() {
    if (savingRef.current || !pendingDeletions.length) return;
    if (
      !window.confirm(
        "이전에 삭제한 시공사례의 남은 사진과 DB 기록을 정리할까요? 삭제한 사진은 복원할 수 없습니다.",
      )
    )
      return;
    savingRef.current = true;
    setDeletingId("cleanup");
    let remaining = 0;
    try {
      for (const entry of pendingDeletions) {
        try {
          const response = await fetch("/api/admin/projects", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
          });
          const data = await response.json();
          if (!response.ok || data.cleanupPending) {
            remaining++;
            continue;
          }
          setPendingDeletions((current) => current.filter((item) => item.id !== entry.id));
        } catch {
          remaining++;
        }
      }
      setNotice(
        remaining
          ? `${remaining}건의 파일 정리가 남았습니다. 서버 권한을 확인한 뒤 다시 시도해주세요.`
          : "삭제된 사례의 파일 정리를 완료했습니다.",
      );
    } finally {
      savingRef.current = false;
      setDeletingId(null);
    }
  }

  const visible = entries.filter(
    (entry) =>
      (filter === "전체" ||
        (filter === "섬유덕트" ? entry.category === "섬유덕트" : entry.category !== "섬유덕트")) &&
      `${entry.title} ${entry.category} ${entry.location}`.includes(query.trim()),
  );
  const update = (patch: Partial<Entry>) =>
    setEditor((current) => (current ? { ...current, ...patch } : current));
  function open(entry: Entry) {
    if (savingRef.current) return;
    setEditor({ ...entry, photos: entry.photos.map((photo) => ({ ...photo })) });
    setNotice("");
    setPhotoFeedback(null);
  }

  async function move(entry: Entry, direction: -1 | 1) {
    if (savingRef.current || loading) return;
    const next = moveProjectInList(entries, visible, entry.id, direction);
    if (next === entries) return;
    savingRef.current = true;
    setOrdering(true);
    try {
      const response = await fetch("/api/admin/projects/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((item) => item.id), version: order.version }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setOrder(data.order);
      setEntries(next);
      setNotice("순서를 저장했습니다. 홈페이지 목록에도 반영됩니다.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "순서를 저장하지 못했습니다.");
    } finally {
      savingRef.current = false;
      setOrdering(false);
    }
  }

  async function upload(files: FileList | null) {
    if (!files?.length || !editor || savingRef.current) return;
    const selected = Array.from(files);
    if (selected.length + editor.photos.length > 30) {
      setNotice("사진은 최대 30장까지 등록할 수 있어요.");
      setPhotoFeedback({ message: "사진은 최대 30장까지 등록할 수 있어요.", error: true });
      if (photoInput.current) photoInput.current.value = "";
      return;
    }
    if (
      selected.some(
        (file) =>
          !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
          !file.size ||
          file.size > MAX_PROJECT_IMAGE_BYTES,
      )
    ) {
      setNotice("JPG·PNG·WEBP, 사진당 3MB 이하만 선택해주세요.");
      setPhotoFeedback({
        message:
          "사진이 추가되지 않았습니다. JPG·PNG·WEBP 형식인지, 사진 한 장이 3MB 이하인지 확인해주세요.",
        error: true,
      });
      if (photoInput.current) photoInput.current.value = "";
      return;
    }
    savingRef.current = true;
    setUploading(true);
    let completed = 0;
    setPhotoFeedback({ message: `선택한 사진 ${selected.length}장을 업로드합니다.`, error: false });
    try {
      for (const file of selected) {
        setPhotoFeedback({
          message: `${selected.length}장 중 ${completed + 1}번째 사진 업로드 중…`,
          error: false,
        });
        const response = await fetch("/api/admin/project-images", {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const data = await response.json().catch(() => ({
          error:
            response.status === 413
              ? "사진 용량이 너무 큽니다. 3MB 이하 사진으로 다시 선택해주세요."
              : "사진 전송 결과를 확인하지 못했습니다. 다시 로그인하거나 잠시 후 시도해주세요.",
        }));
        if (!response.ok) throw new Error(data.error);
        if (typeof data.src !== "string" || !data.src.startsWith("/api/admin/project-images/"))
          throw new Error("업로드한 사진 경로를 확인하지 못했습니다. 다시 시도해주세요.");
        setEditor((current) =>
          current
            ? { ...current, photos: [...current.photos, { src: data.src, alt: "" }] }
            : current,
        );
        completed++;
      }
      setNotice(
        `${completed}장 업로드 완료. 사진 설명을 입력하고 시공사례 등록 또는 수정사항 저장을 눌러주세요.`,
      );
      setPhotoFeedback({
        message: `${completed}장 추가했습니다. 아래 사진을 확인하고 수정사항 저장 또는 시공사례 등록을 눌러주세요.`,
        error: false,
      });
    } catch (error) {
      setPhotoFeedback({
        message: `${completed}장 업로드 완료. ${error instanceof Error ? error.message : "사진 업로드에 실패했습니다."}`,
        error: true,
      });
      setNotice(
        `${completed}장 업로드 완료. ${error instanceof Error ? error.message : "업로드 결과를 확인하지 못했습니다."} 성공한 사진은 등록 또는 수정사항 저장 버튼으로 반영해주세요.`,
      );
    } finally {
      savingRef.current = false;
      setUploading(false);
      if (photoInput.current) photoInput.current.value = "";
    }
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/projects" className={styles.brand}>
          <Image
            src="/logo-white.svg"
            alt="산정엔지니어링"
            width={158}
            height={48}
            className={styles.brandImage}
          />
        </Link>
        <p className={styles.navLabel}>워크스페이스</p>
        <button
          disabled={saving || uploading}
          className={styles.activeNav}
          onClick={() => {
            setEditor(null);
          }}
        >
          <FolderOpen size={19} />
          시공사례<span>{entries.length}</span>
        </button>
        <button className={styles.disabledNav} disabled>
          <FileText size={19} />
          자료실<small>준비 중</small>
        </button>
        <div className={styles.sidebarBottom}>
          <ShieldCheck size={20} />
          <div>
            관리자 전용<small>인증된 계정으로 콘텐츠 관리</small>
          </div>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <span>
            산정엔지니어링 <b>/</b> 콘텐츠 관리
          </span>
          <div className="flex items-center gap-5">
            <form action="/api/auth/logout" method="post">
              <button className="cursor-pointer text-[15px] text-slate-500 hover:text-brand-navy">
                로그아웃
              </button>
            </form>
            <Link href="/" target="_blank" rel="noopener noreferrer">
              홈페이지 보기 <ArrowUpRight size={16} />
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.demo}>
            <span>시공사례 관리</span>시공사례를 등록하거나 수정사항을 저장하면 홈페이지에
            공개됩니다.
          </div>
          <div className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>PROJECTS</p>
              <h1>{editor ? (editor.id ? "시공사례 수정" : "새 시공사례") : "시공사례 관리"}</h1>
              {!editor && <p>산정의 경험을 기록하고, 새로운 고객에게 보여주세요.</p>}
            </div>
            {editor ? (
              <button
                type="button"
                className={styles.backToList}
                disabled={saving || uploading}
                onClick={() => setEditor(null)}
              >
                <ArrowLeft size={21} aria-hidden="true" />
                시공사례 목록으로
              </button>
            ) : (
              <button
                className={styles.primary}
                disabled={!!deletingId || ordering || loading}
                onClick={() => open(emptyEntry())}
              >
                <Plus size={18} />
                시공사례 등록
              </button>
            )}
          </div>
          {notice && (
            <div role="status" className={styles.notice}>
              <Check size={17} />
              {notice}
              <button aria-label="알림 닫기" onClick={() => setNotice("")}>
                <X size={16} />
              </button>
            </div>
          )}
          {!editor && pendingDeletions.length > 0 && (
            <div className={styles.notice}>
              <span>삭제된 사례 {pendingDeletions.length}건의 파일 정리가 남아 있습니다.</span>
              <button
                type="button"
                className={styles.deleteButton}
                disabled={!!deletingId || ordering || loading}
                onClick={() => void cleanupDeleted()}
              >
                {deletingId === "cleanup" ? "정리 중…" : "삭제 파일 정리"}
              </button>
            </div>
          )}

          {!editor && (
            <UnusedPhotoCleanup
              disabled={!!deletingId || ordering || loading}
              onBusy={(busy) => {
                savingRef.current = busy;
                setDeletingId(busy ? "unused-photos" : null);
              }}
            />
          )}

          {!editor ? (
            <ProjectList
              entries={entries}
              visible={visible}
              filter={filter}
              query={query}
              ordering={ordering}
              deletingId={deletingId}
              loading={loading}
              setFilter={setFilter}
              setQuery={setQuery}
              move={move}
              open={open}
              remove={remove}
            />
          ) : (
            <ProjectEditor
              editor={editor}
              saving={saving}
              uploading={uploading}
              loading={loading}
              photoInput={photoInput}
              photoFeedback={photoFeedback}
              upload={upload}
              update={update}
              save={save}
            />
          )}
          <footer className={styles.bottom}>
            SANJUNG ENGINEERING<span>콘텐츠 관리 워크스페이스</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
