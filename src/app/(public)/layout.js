import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
// import SmoothScroll from "@/hooks/SmoothScroll";

export default function PublicLayout({ children }) {
  return (
    <>
      {/* <SmoothScroll /> */}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}