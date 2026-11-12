import Header from "./Header";
import Footer from "./Footer";
import MobileContactBar from "./MobileContactBar";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <MobileContactBar />
    </>
  );
}
