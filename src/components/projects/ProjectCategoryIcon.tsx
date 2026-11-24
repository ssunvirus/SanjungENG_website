import type { ProjectCategory } from "@/src/lib/project-list-navigation";

export default function ProjectCategoryIcon({ category }: { category: ProjectCategory }) {
  return (
    <svg
      viewBox={category === "저온저장고" ? "0 0 1254 1254" : "-2 -2 36 36"}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="size-[30px] shrink-0 lg:size-10 xl:size-11"
    >
      {category === "전체" && (
        <>
          <rect x="4" y="4" width="10" height="10" rx="2.5" />
          <rect x="18" y="4" width="10" height="10" rx="2.5" />
          <rect x="4" y="18" width="10" height="10" rx="2.5" />
          <rect x="18" y="18" width="10" height="10" rx="2.5" />
        </>
      )}
      {category === "냉동기" && (
        <>
          <path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13" />
          <path d="m12.5 5 3.5 3.5L19.5 5m-7 22 3.5-3.5 3.5 3.5M5 14l4.8-1.3L8.5 8M23.5 24l-1.3-4.7L27 18M8.5 24l1.3-4.7L5 18m22-4-4.8-1.3L23.5 8" />
        </>
      )}
      {category === "항온항습기" && (
        <>
          <path d="M12 19.2V7a4 4 0 0 1 8 0v12.2a7 7 0 1 1-8 0Z" />
          <path d="M16 11v12" />
          <circle cx="16" cy="24" r="2" fill="currentColor" stroke="none" />
        </>
      )}
      {category === "저온저장고" && (
        <>
          <path
            strokeWidth={86}
            d="M624 164 Q624 164 640 175 L1070 469 Q1093 485 1093 509 V1045 Q1093 1086 1052 1086 H196 Q154 1086 154 1045 V509 Q154 485 178 469 L608 175 Q624 164 624 164 Z"
          />
          <g transform="translate(624 691) scale(.75)" strokeWidth={80}>
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <path
                key={angle}
                d="M0 0 V-384 M-104 -348 L0 -244 L104 -348"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
        </>
      )}
      {category === "냉각탑" && (
        <>
          <path d="M4 28h24M6 28l4-16h12l4 16" />
          <rect x="9" y="9" width="14" height="3" rx=".7" />
          <path d="M12 6c-2-2 2-2 0-4m4 4c-2-2 2-2 0-4m4 4c-2-2 2-2 0-4" />
        </>
      )}
      {category === "패브릭덕트" && (
        <>
          <ellipse cx="7" cy="20" rx="4" ry="8" />
          <path d="M7 12h17c6.7 0 6.7 16 0 16H7M7 5h19M10 5v7m13-7v7" />
          <path d="M13 17h1m4 0h1m4 0h1" />
        </>
      )}
    </svg>
  );
}
