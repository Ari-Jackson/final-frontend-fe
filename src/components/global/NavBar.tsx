import { Link } from "react-router-dom";
import { AiFillHome, AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";

export default function NavBar() {
  return (
    <>
      <nav className="absolute top-0 z-50 flex h-14 w-screen justify-between bg-pink-400 px-5">
        <div className="flex space-x-5">
          <AiOutlineMenu className=" my-auto h-full text-3xl text-zinc-50 sm:hover:text-pink-100" />

          <Link to="/books">
            <AiFillHome className=" my-auto h-full text-3xl text-zinc-50 sm:hover:text-pink-100" />
          </Link>
        </div>
        <Link to="/books/new">
          <AiOutlinePlus className=" my-auto h-full text-3xl text-zinc-50 sm:hover:text-pink-100" />
        </Link>
      </nav>
    </>
  );
}
