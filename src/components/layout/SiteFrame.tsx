import Header from "./Header";
import Footer from "./Footer";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
