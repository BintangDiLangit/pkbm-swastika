import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";

/** Layout halaman publik. Admin (app/admin) sengaja tidak memakai header/footer ini. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
