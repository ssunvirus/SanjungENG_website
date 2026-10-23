import "server-only";
import { unstable_cache } from "next/cache";
import type { Metadata } from "next";
import { connection } from "next/server";
import { projects } from "@/src/components/projects/data";
import { listProjects } from "./projects-db";
import { mergePublicProjects } from "./public-project-data";

export const PUBLIC_PROJECTS_TAG = "public-projects";
// This project does not enable Cache Components; use the supported Data Cache API.
const cachedRecords = unstable_cache(
  async (table: string, region: string) => {
    if (!table || !region) throw new Error("DatabaseUnconfigured");
    return listProjects();
  },
  ["public-projects-v1"],
  { revalidate: 60, tags: [PUBLIC_PROJECTS_TAG] },
);

export async function publicProjectRecords() {
  if (!process.env.PROJECTS_TABLE_NAME || !process.env.PROJECTS_AWS_REGION) return [];
  return cachedRecords(process.env.PROJECTS_TABLE_NAME, process.env.PROJECTS_AWS_REGION);
}

export async function publicProjectCards() {
  try {
    return mergePublicProjects(projects, await publicProjectRecords());
  } catch (error) {
    console.error(
      "Public projects unavailable",
      error instanceof Error ? error.name : "UnknownError",
    );
    return projects;
  }
}

export async function publicProject(id: string) {
  try {
    return (await publicProjectRecords()).find((record) => record.id === id) || null;
  } catch {
    return null;
  }
}

export async function publicProjectMetadata(id: string, fallback: Metadata): Promise<Metadata> {
  await connection();
  const project = await publicProject(id);
  return project
    ? {
        ...fallback,
        title: `${project.title} | 산정엔지니어링`,
        description: project.description.slice(0, 160),
      }
    : fallback;
}
