import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { publicProject } from "@/src/lib/public-projects";
import SavedProjectDetail from "@/src/components/projects/detail/SavedProjectDetail";

type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connection();
  const { id } = await params;
  const project = await publicProject(id);
  if (!project) return { title: "시공사례를 찾을 수 없습니다", robots: { index: false } };
  return {
    title: `${project.title} | 산정엔지니어링`,
    description: project.description.slice(0, 160),
    alternates: { canonical: `/projects/${id}` },
  };
}
export default async function ProjectPage({ params }: Props) {
  await connection();
  const { id } = await params;
  const project = /^[a-z0-9][a-z0-9-]{0,99}$/.test(id) ? await publicProject(id) : null;
  if (!project) notFound();
  return <SavedProjectDetail project={project} />;
}
