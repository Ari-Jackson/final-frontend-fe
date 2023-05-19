import { Link } from "react-router-dom";
import BookLover from "../assets/BookLoverSVG";

export default function Home() {
  return (
    <section className="mx-auto flex max-w-screen-xl flex-col-reverse items-center px-4 pb-12 md:px-8 lg:mt-16 lg:flex-row lg:space-x-10  lg:space-y-0">
      <div className="flex-1 space-y-4 sm:mt-10">
        <h1 className="text-4xl font-bold text-gray-800 xl:text-5xl">
          One place to track all your
          <span className="text-pink-400"> Reading</span>
        </h1>
        <p className="max-w-xl leading-relaxed text-gray-600 sm:mx-auto lg:ml-0">
          The perfect tracker for every type of reader. Track the books you've
          read, your current read, and all your future reads in one place.
        </p>
        <div className="items-center justify-start space-y-3 pt-10 sm:flex sm:space-x-6 sm:space-y-0">
          <Link
            to="books"
            className="block w-full rounded-full bg-pink-400 px-7 py-3 text-center text-white sm:w-auto"
          >
            Try it
          </Link>
        </div>
      </div>
      <div className="mb-10 mt-7 flex-1 text-center lg:mb-0 lg:ml-3 lg:mt-0">
        <BookLover className="mx-auto h-full w-full" />
      </div>
    </section>
  );
}
