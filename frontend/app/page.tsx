import Image from "next/image";
import Navbar from "@/website-components/Navbar";
import Footer from "@/website-components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar activePage="home" />
      <Footer />
    </div>
  );
}
