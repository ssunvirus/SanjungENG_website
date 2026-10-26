import "@/app/globals.css";

export { metadata } from "@/src/lib/site-layout-metadata";

// A separate root layout prevents previously loaded public analytics scripts
// from surviving client navigation into the admin area.
export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-[#EFF7FB]">
        {children}
      </body>
    </html>
  );
}
