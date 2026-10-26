"use client";
import Image from "next/image";
import {
  ArrowUp,
  ArrowDown,
  FolderOpen,
  ImagePlus,
  LayoutGrid,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import type { ProjectRecord as Entry } from "@/src/lib/project-record";
import styles from "./admin.module.css";

type Props = {
  entries: Entry[];
  visible: Entry[];
  filter: string;
  query: string;
  ordering: boolean;
  deletingId: string | null;
  loading: boolean;
  setFilter: (filter: string) => void;
  setQuery: (query: string) => void;
  move: (entry: Entry, direction: -1 | 1) => Promise<void>;
  open: (entry: Entry) => void;
  remove: (entry: Entry) => Promise<void>;
};

export default function ProjectList({
  entries,
  visible,
  filter,
  query,
  ordering,
  deletingId,
  loading,
  setFilter,
  setQuery,
  move,
  open,
  remove,
}: Props) {
  return (
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
              {visible.map((entry, index) => (
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
                        <small>
                          {entry.summary || entry.description || "한 줄 소개를 추가해주세요."}
                        </small>
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
                        type="button"
                        className={styles.orderButton}
                        disabled={ordering || !!deletingId || loading || index === 0}
                        onClick={() => void move(entry, -1)}
                        aria-label={`${entry.title} 위로 이동`}
                        title="위로 이동"
                      >
                        <ArrowUp size={18} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={styles.orderButton}
                        disabled={
                          ordering || !!deletingId || loading || index === visible.length - 1
                        }
                        onClick={() => void move(entry, 1)}
                        aria-label={`${entry.title} 아래로 이동`}
                        title="아래로 이동"
                      >
                        <ArrowDown size={18} aria-hidden="true" />
                      </button>
                      <button
                        className={styles.editButton}
                        disabled={!!deletingId || ordering || loading}
                        onClick={() => open(entry)}
                        aria-label={`${entry.title} 수정`}
                      >
                        <Pencil size={15} />
                        수정
                      </button>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        disabled={!!deletingId || ordering || loading}
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
          <span>
            {ordering ? "순서 저장 중…" : "↑·↓ 버튼으로 이동하면 순서가 자동 저장됩니다."}
          </span>
        </div>
      </section>
    </>
  );
}
