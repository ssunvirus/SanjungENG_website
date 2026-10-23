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
  ImagePlus,
  LayoutGrid,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { projects } from "@/src/components/projects/data";
import { mergeAdminProjects, type ProjectRecord } from "@/src/lib/project-record";
import { MAX_PROJECT_IMAGE_BYTES } from "@/src/lib/project-images";
import styles from "./admin.module.css";

type Entry = ProjectRecord;
const initialEntries: Entry[] = projects.map((project) => ({
  id: project.id,
  title: project.title,
  category: project.tag,
  location: "",
  description: project.description,
  status: "공개",
  version: 0,
  photos: [{ src: project.image, alt: project.title }],
}));
const categories = ["냉동기", "항온항습기", "냉각탑", "저온저장고", "섬유덕트", "기타"];
const emptyEntry = (): Entry => ({
  id: "",
  title: "",
  category: "냉동기",
  location: "",
  description: "",
  status: "공개",
  version: 0,
  photos: [],
});

export default function AdminWorkspace() {
  const [entries, setEntries] = useState(initialEntries);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const savingRef = useRef(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("전체");
  const [editor, setEditor] = useState<Entry | null>(null);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    let active = true;
    fetch("/api/admin/projects", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        if (active) {
          const saved: Entry[] = data.projects;
          setEntries(mergeAdminProjects(initialEntries, saved));
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
      setEntries((current) => [saved, ...current.filter((entry) => entry.id !== saved.id)]);
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
    if (
      !window.confirm(
        `‘${entry.title}’ 시공사례를 삭제할까요?\n관리자 목록과 홈페이지에서 제외됩니다. 원본 사진 파일은 유지됩니다.`,
      )
    )
      return;
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
      setNotice("시공사례를 삭제했습니다. 홈페이지에서도 제외됩니다.");
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

  const visible = entries.filter(
    (entry) =>
      (filter === "전체" ||
        (filter === "섬유덕트" ? entry.category === "섬유덕트" : entry.category !== "섬유덕트")) &&
      `${entry.title} ${entry.category} ${entry.location}`.includes(query.trim()),
  );
  const update = (patch: Partial<Entry>) =>
    setEditor((current) => (current ? { ...current, ...patch } : current));
  function open(entry: Entry) {
    setEditor({ ...entry, photos: entry.photos.map((photo) => ({ ...photo })) });
    setNotice("");
  }

  async function upload(files: FileList | null) {
    if (!files?.length || !editor || savingRef.current) return;
    const selected = Array.from(files);
    if (selected.length + editor.photos.length > 30) {
      setNotice("사진은 최대 30장까지 등록할 수 있어요.");
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
      if (photoInput.current) photoInput.current.value = "";
      return;
    }
    savingRef.current = true;
    setUploading(true);
    let completed = 0;
    try {
      for (const file of selected) {
        const response = await fetch("/api/admin/project-images", {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
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
    } catch (error) {
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
                disabled={!!deletingId || loading}
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

          {!editor ? (
            <>
              <div className={styles.stats}>
                {[
                  {
                    label: "전체 시공사례",
                    count: entries.length,
                    detail: "등록된 현장 이야기",
                    icon: <LayoutGrid size={19} />,
                  },
                  {
                    label: "등록 완료",
                    count: entries.filter((entry) => entry.version > 0).length,
                    detail: "관리자에서 등록한 시공사례",
                    icon: <FolderOpen size={19} />,
                  },
                ].map((stat) => (
                  <section key={stat.label} className={styles.stat}>
                    <div>
                      {stat.label}
                      {stat.icon}
                    </div>
                    <strong>
                      {stat.count}
                      <small>건</small>
                    </strong>
                    <p>{stat.detail}</p>
                  </section>
                ))}
              </div>
              <section className={styles.panel} aria-label="시공사례 목록">
                <div className={styles.tools}>
                  <div className={styles.tabs}>
                    {["전체", "냉동공조", "섬유덕트"].map((tab) => (
                      <button
                        key={tab}
                        aria-pressed={filter === tab}
                        className={filter === tab ? styles.selectedTab : ""}
                        onClick={() => setFilter(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <label className={styles.search}>
                    <Search size={17} />
                    <input
                      aria-label="시공사례 검색"
                      placeholder="현장명, 분야로 검색"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                </div>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>현장명</th>
                        <th>분야</th>
                        <th>상태</th>
                        <th>
                          <span className={styles.srOnly}>편집</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((entry) => (
                        <tr key={entry.id}>
                          <td>
                            <div className={styles.projectCell}>
                              <div className={styles.thumbnail}>
                                {entry.photos[0] ? (
                                  <Image
                                    src={entry.photos[0].src}
                                    alt=""
                                    fill
                                    sizes="64px"
                                    unoptimized={entry.photos[0].src.startsWith("/api/")}
                                  />
                                ) : (
                                  <ImagePlus size={20} />
                                )}
                              </div>
                              <div>
                                <strong>{entry.title}</strong>
                                <small>{entry.description || "작업 내용을 추가해주세요."}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={styles.category}>{entry.category}</span>
                          </td>
                          <td>
                            <span className={styles.published}>
                              {entry.version > 0 ? "등록 완료" : "기존 사례"}
                            </span>
                          </td>
                          <td>
                            <div className={styles.rowActions}>
                              <button
                                className={styles.editButton}
                                disabled={!!deletingId || loading}
                                onClick={() => open(entry)}
                                aria-label={`${entry.title} 수정`}
                              >
                                <Pencil size={15} />
                                수정
                              </button>
                              <button
                                type="button"
                                className={styles.deleteButton}
                                disabled={!!deletingId || loading}
                                onClick={() => void remove(entry)}
                                aria-label={`${entry.title} 삭제`}
                              >
                                <Trash2 size={16} aria-hidden="true" />
                                {deletingId === entry.id ? "삭제 중…" : "삭제"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {!visible.length && (
                  <div className={styles.empty}>
                    <Search size={28} />
                    <strong>표시할 시공사례가 없어요.</strong>
                    <p>검색어나 필터를 바꿔보세요.</p>
                  </div>
                )}
                <div className={styles.listFooter}>
                  총 {visible.length}건
                  <span>기존 사례도 관리자에서 수정하고 등록할 수 있습니다.</span>
                </div>
              </section>
            </>
          ) : (
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
                  <section className={styles.formPanel}>
                    <h2>
                      <span>02</span>현장 사진
                    </h2>
                    <input
                      ref={photoInput}
                      id="admin-photos"
                      type="file"
                      className={styles.srOnly}
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={(event) => void upload(event.target.files)}
                    />
                    <label htmlFor="admin-photos" className={styles.upload}>
                      <ImagePlus size={28} />
                      <strong>{uploading ? "사진 업로드 중…" : "사진 선택하기"}</strong>
                      <small>JPG·PNG·WEBP · 사진당 3MB 이하 · 최대 30장</small>
                    </label>
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
                                      photos: [
                                        photo,
                                        ...editor.photos.filter((_, i) => i !== index),
                                      ],
                                    })
                                  }
                                >
                                  대표로 지정
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  update({ photos: editor.photos.filter((_, i) => i !== index) })
                                }
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
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
                    <h3>좋은 시공사례를 위한 팁</h3>
                    <p>현장명에는 설비와 작업을 함께 적어주세요.</p>
                    <p>완공 사진을 대표 사진으로 선택하면 목록에서 보기 좋아요.</p>
                    <p>사진 설명에는 실제 설비와 작업 내용을 적어주세요.</p>
                  </section>
                </aside>
              </div>
            </fieldset>
          )}
          <footer className={styles.bottom}>
            SANJUNG ENGINEERING<span>콘텐츠 관리 워크스페이스</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
