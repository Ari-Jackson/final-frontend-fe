import Footer from "./Footer";
import NavBar from "./NavBar";

export default function PageWrapper({ children }) {
  return (
    <>
      <div className="relative min-h-screen">
        <NavBar />
        <main className=" px-16 pt-16">
          <div className=" mx-auto max-w-screen-2xl px-4 md:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
