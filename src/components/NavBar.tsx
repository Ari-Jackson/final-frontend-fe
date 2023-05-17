import { Link } from "react-router-dom";
import { AiFillHome, AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";

export default function NavBar() {
  return (
    <>
      <nav className="bg-pink-400 w-screen h-16 px-5 flex justify-between fixed top-0">
        <div className="flex space-x-5">
          <AiOutlineMenu className=" text-zinc-50 text-4xl my-auto h-full sm:hover:text-pink-100" />

          <Link to="/books">
            <AiFillHome className=" text-zinc-50 text-4xl my-auto h-full sm:hover:text-pink-100" />
          </Link>
        </div>
        <Link to="/new">
          <AiOutlinePlus className=" text-zinc-50 text-4xl my-auto h-full sm:hover:text-pink-100" />
        </Link>
      </nav>
    </>
  );
}
