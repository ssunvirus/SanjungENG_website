import Header from "./Header";
import Footer from "./Footer";
import FloatingBlogLink from "./FloatingBlogLink";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingBlogLink />
    </>
  );
}
