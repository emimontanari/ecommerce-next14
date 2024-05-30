import { Footer, Sidebar, TopMenu } from "@/components";
import { Toaster } from "sonner";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />

      <div className="px-0 sm:px-10">
        <Toaster />
        {children}
      </div>

      <Footer />
    </main>
  );
}
