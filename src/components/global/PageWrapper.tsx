import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const isPublicPage = (path: string) => {
  const publicPages = ["/"];

  return publicPages.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default function PageWrapper() {
  const { pathname } = useLocation();
  return (
    <>
      {isPublicPage(pathname) ? (
        <Page />
      ) : (
        <>
          <SignedIn>
            <Page />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </>
  );
}

const Page = () => {
  return (
    <>
      <div className="relative h-full min-h-screen">
        <NavBar />
        <main className="px-4 pb-20 pt-20 font-hand-writing text-lg tracking-wider sm:px-16">
          <div className=" mx-auto max-w-screen-2xl px-4 md:px-8">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
