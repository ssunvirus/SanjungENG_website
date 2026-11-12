export const projectCategories = ["전체", "냉동공조", "패브릭덕트"] as const;
export type ProjectCategory = (typeof projectCategories)[number];
type SearchValues = Pick<URLSearchParams, "get">;

const categoryKeys = ["all", "refrigeration", "fabric"] as const;

export const projectListLocationEvent = "projects-list-location-change";
export const projectListStorageKey = "sanjung-projects-last-list";

export function resolveProjectListLocation(
  location: Pick<Location, "search" | "hash">,
  remembered: string | null,
) {
  const current = location.search + location.hash;
  const params = new URLSearchParams(location.search);
  if (
    params.has("page") ||
    params.has("category") ||
    (location.hash && location.hash !== "#projects-list-heading") ||
    !remembered
  )
    return current;
  try {
    const url = new URL(remembered, "https://navigation.invalid");
    if (url.origin !== "https://navigation.invalid" || url.pathname !== "/projects") return current;
    const state = readProjectListState(url.searchParams);
    if (!state.page) return current;
    const restored = new URL(projectListHref(state.page, state.category), url.origin);
    return restored.search + (location.hash || restored.hash);
  } catch {
    return current;
  }
}

export function subscribeProjectListLocation(
  target: Pick<Window, "addEventListener" | "removeEventListener">,
  onChange: () => void,
) {
  const events = ["popstate", "hashchange", "pageshow", projectListLocationEvent];
  for (const event of events) target.addEventListener(event, onChange);
  return () => {
    for (const event of events) target.removeEventListener(event, onChange);
  };
}

export function readProjectListState(params: SearchValues) {
  const rawPage = params.get("page") ?? "";
  const parsed = /^\d+$/.test(rawPage) ? Number(rawPage) : NaN;
  const page = Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, 1000000) : null;
  const index = categoryKeys.findIndex((key) => key === params.get("category"));
  return { page, category: projectCategories[index < 0 ? 0 : index] };
}

export function projectListHref(page: number, category: ProjectCategory) {
  const params = new URLSearchParams({
    page: String(page),
    category: categoryKeys[projectCategories.indexOf(category)],
  });
  return `/projects?${params}#projects-list-heading`;
}

export function projectDetailHref(href: string, page: number, category: ProjectCategory) {
  const url = new URL(href, "https://navigation.invalid");
  if (url.origin !== "https://navigation.invalid") return href;
  url.searchParams.set("listPage", String(page));
  url.searchParams.set("listCategory", categoryKeys[projectCategories.indexOf(category)]);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function projectListReturnHref(params: SearchValues) {
  const state = readProjectListState({
    get: (key) => params.get(key === "page" ? "listPage" : "listCategory"),
  });
  return state.page ? projectListHref(state.page, state.category) : "/projects";
}
