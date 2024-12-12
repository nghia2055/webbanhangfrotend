import Footer from "../component/header/footer";
import Header from "../component/header/header";

export default function Layout({
  children,
}: {
  children: Readonly<{
    children: React.ReactNode;
  }>;
}) {
  return (
    <>
      <Header /> {children} <Footer />
    </>
  );
}
