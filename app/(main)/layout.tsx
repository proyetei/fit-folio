import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="relative flex min-h-[100dvh] flex-col repeating-bg">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
}