import Footer from "./Footer";
import NavBar from "./NavBar";
export declare interface AppProps {
  children?: React.ReactNode; // best, accepts everything React can render
}

export default function PageWrapper({ children }: AppProps) {
  return (
    <>
      <div className="relative h-full min-h-screen">
        <NavBar />
        <main className="px-16 pb-20 pt-20">
          <div className=" mx-auto max-w-screen-2xl px-4 md:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
