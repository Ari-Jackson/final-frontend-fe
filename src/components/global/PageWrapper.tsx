import Footer from "./Footer";
import NavBar from "./NavBar";
interface AppProps {
  children?: React.ReactNode;
}

export default function PageWrapper({ children }: AppProps) {
  return (
    <>
      <div className="relative h-full min-h-screen">
        <NavBar />
        <main className="px-4 pb-20 pt-20 sm:px-16">
          <div className=" mx-auto max-w-screen-2xl px-4 md:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
