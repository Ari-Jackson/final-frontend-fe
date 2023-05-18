import { Link } from "react-router-dom";
import BookLover from "../components/BookLoverSVG";
export default function Home() {
  return (
    <section className="mx-auto mt-16 max-w-screen-xl items-center px-4 pb-12 md:px-8 lg:flex">
      <div className="flex-1 space-y-4 sm:text-center lg:text-left">
        <h1 className="text-4xl font-bold text-gray-800 xl:text-5xl">
          One place to track all your
          <span className="text-pink-400"> Reading</span>
        </h1>
        <p className="max-w-xl leading-relaxed text-gray-600 sm:mx-auto lg:ml-0">
          The perfect tracker for every type of reader. Track the books you've
          read, your current read, and all your future reads in one place.
        </p>
        <div className="items-center justify-center space-y-3 pt-10 sm:flex sm:space-x-6 sm:space-y-0 lg:justify-start">
          <Link
            to="books"
            className="block w-full rounded-md bg-pink-400 px-7 py-3 text-center text-white sm:w-auto"
          >
            Try it
          </Link>
        </div>
      </div>
      <div className="mt-7 flex-1 text-center lg:ml-3 lg:mt-0">
        <BookLover className="mx-auto w-full sm:w-10/12  lg:w-full " />
      </div>
    </section>
  );
}
