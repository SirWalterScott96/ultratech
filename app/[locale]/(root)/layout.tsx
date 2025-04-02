import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import ScrollToTopWrapper from "@/components/shared/scroll-to-top";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <ScrollToTopWrapper />
      <Footer />
    </div>
  );
}
