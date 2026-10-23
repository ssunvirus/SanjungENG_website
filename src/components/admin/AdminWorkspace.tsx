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
  X,
} from "lucide-react";
import { projects } from "@/src/components/projects/data";
import type { ProjectsConnection } from "@/src/lib/projects-db";
import styles from "./admin.module.css";

type Photo = { src: string; alt: string };
type Entry = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: "공개";
  photos: Photo[];
};
const initialEntries: Entry[] = projects.map((project) => ({
  id: project.id,
  title: project.title,
  category: project.tag,
  location: "",
  description: project.description,
  status: "공개",
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
  photos: [],
});

export default function AdminWorkspace({ dbConnection }: { dbConnection: ProjectsConnection }) {
  const entries = initialEntries;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("전체");
  const [editor, setEditor] = useState<Entry | null>(null);
  const [notice, setNotice] = useState("");
  const urls = useRef<string[]>([]);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => () => urls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const visible = entries.filter(
    (entry) =>
      (filter === "전체" || entry.status === filter) &&
      `${entry.title} ${entry.category} ${entry.location}`.includes(query.trim()),
  );
  const update = (patch: Partial<Entry>) =>
    setEditor((current) => (current ? { ...current, ...patch } : current));
  function open(entry: Entry) {
    setEditor({ ...entry, photos: entry.photos.map((photo) => ({ ...photo })) });
    setNotice("");
  }
  function upload(files: FileList | null) {
    if (!files || !editor) return;
    const photos: Photo[] = [];
    let rejected = false;
    for (const file of Array.from(files)) {
      if (
        !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size > 10 * 1024 * 1024
      ) {
        rejected = true;
        continue;
      }
      const src = URL.createObjectURL(file);
      urls.current.push(src);
      photos.push({ src, alt: "" });
    }
    update({ photos: [...editor.photos, ...photos] });
    setNotice(
      rejected
        ? "JPG·PNG·WEBP, 사진당 10MB 이하만 추가할 수 있어요."
        : "사진을 추가했어요. 사진 설명도 입력해주세요.",
    );
    if (input.current) input.current.value = "";
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
            관리자 UI 체험<small>로그인·서버 저장 연결 전</small>
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
              <button className="cursor-pointer text-xs text-slate-500 hover:text-brand-navy">
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
            <span>UI PREVIEW</span>실제 홈페이지와 연결되지 않은 체험 화면입니다. 변경 내용은
            새로고침하면 초기화됩니다.
          </div>
          <p className="mt-3 text-xs text-slate-600" role="status">
            {dbConnection === "test-found"
              ? "DB 연결 완료 · 테스트 항목 읽기 성공"
              : dbConnection === "connected"
                ? "DB 연결 완료 · 테스트 항목은 아직 없습니다."
                : dbConnection === "unconfigured"
                  ? "DB 설정 대기 · 테이블 이름과 리전을 설정해주세요."
                  : "DB 연결 확인 필요 · 서버 설정과 읽기 권한을 확인해주세요."}
          </p>
          <div className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>PROJECTS</p>
              <h1>{editor ? (editor.id ? "시공사례 수정" : "새 시공사례") : "시공사례 관리"}</h1>
              <p>
                {editor
                  ? "현장의 이야기와 사진을 차근차근 채워주세요."
                  : "산정의 경험을 기록하고, 새로운 고객에게 보여주세요."}
              </p>
            </div>
            {!editor && (
              <button className={styles.primary} onClick={() => open(emptyEntry())}>
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
                    label: "공개",
                    count: entries.filter((entry) => entry.status === "공개").length,
                    detail: "기존 공개 사례 참고 데이터",
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
                    {["전체", "공개"].map((tab) => (
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
                                    unoptimized={entry.photos[0].src.startsWith("blob:")}
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
                            <span className={styles.published}>{entry.status}</span>
                          </td>
                          <td>
                            <button
                              className={styles.editButton}
                              onClick={() => open(entry)}
                              aria-label={`${entry.title} 수정`}
                            >
                              <Pencil size={15} />
                              수정
                            </button>
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
                  총 {visible.length}건<span>기존 사례를 바탕으로 한 UI 체험</span>
                </div>
              </section>
            </>
          ) : (
            <>
              <div className={styles.editorActions}>
                <button
                  className={styles.textButton}
                  onClick={() => {
                    setEditor(null);
                  }}
                >
                  <ArrowLeft size={17} />
                  목록으로
                </button>
              </div>
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
                      ref={input}
                      className={styles.srOnly}
                      id="admin-photos"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={(event) => upload(event.target.files)}
                    />
                    <label htmlFor="admin-photos" className={styles.upload}>
                      <ImagePlus size={28} />
                      <strong>사진 선택하기</strong>
                      <small>여러 장 선택 가능 · JPG, PNG, WEBP · 사진당 10MB 이하</small>
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
                              unoptimized={photo.src.startsWith("blob:")}
                            />
                          </div>
                          <div>
                            <span className={styles.photoLabel}>
                              {index === 0 ? "대표 사진" : `현장 사진 ${index + 1}`}
                            </span>
                            <input
                              aria-label={`사진 ${index + 1} 대체 설명`}
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
                    <h2>게시 설정</h2>
                    <p>
                      지금은 화면 체험 단계입니다. 입력한 내용과 사진은 저장되거나 서버에 전송되지
                      않아요.
                    </p>
                    <button disabled className={styles.publishDisabled}>
                      홈페이지에 게시 · 연결 준비 중
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
            </>
          )}
          <footer className={styles.bottom}>
            SANJUNG ENGINEERING<span>콘텐츠 관리 워크스페이스</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
