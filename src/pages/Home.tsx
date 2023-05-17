import BookLover from "../components/Booklover";
export default function Home() {
  return (
    <section className="mt-16 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
      <div className="space-y-4 flex-1 sm:text-center lg:text-left">
        <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
          One place to track all your
          <span className="text-pink-400"> Reading</span>
        </h1>
        <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
          The perfect tracker for every type of reader. Track the books you've
          read, your current read, and all your future reads in one place.
        </p>
        <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
          <a
            href="javascript:void(0)"
            className="px-7 py-3 w-full bg-pink-400 text-white text-center rounded-md block sm:w-auto"
          >
            Try it out
          </a>
        </div>
      </div>
      <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
        <BookLover className="w-full mx-auto sm:w-10/12  lg:w-full " />
      </div>
    </section>
  );
}
