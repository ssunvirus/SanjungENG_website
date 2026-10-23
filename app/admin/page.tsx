import type { Metadata } from "next";
import { connection } from "next/server";
import AdminWorkspace from "@/src/components/admin/AdminWorkspace";
import { checkProjectsConnection } from "@/src/lib/projects-db";
import { requireAdmin } from "@/src/lib/admin-auth";

export const metadata: Metadata = {
  title: "콘텐츠 관리 | 산정엔지니어링",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  await connection();
  await requireAdmin();
  const dbConnection = await checkProjectsConnection();
  return <AdminWorkspace dbConnection={dbConnection} />;
}
