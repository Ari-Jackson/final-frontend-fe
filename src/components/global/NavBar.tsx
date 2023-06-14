import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { SignInButton, UserButton, useAuth } from "@clerk/clerk-react";

export default function NavBar() {
  const { isLoaded, userId } = useAuth();

  return (
    <>
      <nav className="absolute top-0 z-50 flex h-14 w-screen justify-between bg-pink-400 px-5">
        <div className="flex space-x-5">
          {/* <AiOutlineMenu className=" my-auto h-full text-3xl text-zinc-50 lg:hover:text-pink-100" /> */}
          <Link to="/books" className=" h-full">
            <h1 className="mt-2 font-hand-writing text-3xl text-pink-100 lg:hover:text-zinc-50">
              The Shelf
            </h1>
          </Link>
        </div>
        <div className="flex h-full items-center space-x-5">
          <Link to="/books/new">
            <AiOutlinePlus className="my-auto h-full text-3xl text-zinc-50 lg:hover:text-pink-100" />
          </Link>
          {isLoaded && userId && (
            <div className="">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
          {isLoaded && !userId && (
            <SignInButton>
              <button className="h-fit rounded-md border bg-white p-2 text-pink-500 duration-200 hover:border-pink-200 hover:bg-pink-200 ">
                Login
              </button>
            </SignInButton>
          )}
        </div>
      </nav>
    </>
  );
}
