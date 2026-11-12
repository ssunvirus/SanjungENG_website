"use client";

import Link from "next/link";
import { List } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  projectListReturnHref,
  subscribeProjectListLocation,
} from "@/src/lib/project-list-navigation";

function subscribeLocation(onChange: () => void) {
  return subscribeProjectListLocation(window, onChange);
}

function getSearch() {
  return window.location.search;
}

function getServerSearch() {
  return "";
}

export default function ProjectListButton({ className = "" }: { className?: string }) {
  const search = useSyncExternalStore(subscribeLocation, getSearch, getServerSearch);
  const href = projectListReturnHref(new URLSearchParams(search));
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[5px] bg-brand-navy px-4 py-2 text-base font-medium leading-7 text-white transition-colors hover:bg-[#164366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue lg:min-h-12 lg:min-w-[240px] lg:gap-3 lg:text-[25px] motion-reduce:transition-none ${className}`}
    >
      <List aria-hidden="true" className="size-[22px] shrink-0 lg:size-[30px]" />
      <span>목록으로 가기</span>
    </Link>
  );
}
