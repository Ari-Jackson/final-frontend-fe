// import FilterButton from "../components/radix/FilterButton";
import { Link } from "react-router-dom";
import { BsFillSuitHeartFill } from "react-icons/bs";
import useAllBooks from "../hooks/queries/useAllBooks";
import ServerDownPage from "./global/ServerDownPage";
import LoadingSpinner from "../components/radix/LoadingSpinner";

export default function Index() {
  const { getBooksIsLoading, getBooksHasError, books } = useAllBooks();

  if (getBooksIsLoading) {
    return <LoadingSpinner />;
  }

  if (getBooksHasError) {
    return <ServerDownPage />;
  }

  return (
    <>
      <div className="mb-5 flex items-start justify-between border-b py-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">My Bookshelf</h3>
        </div>
        <div className="mt-0 flex items-center gap-x-3">
          {/* <FilterButton /> */}
        </div>
      </div>
      <div className=" flex flex-wrap">
        {books.map((book) => (
          <div
            key={book.id}
            className="w-1/2 rounded-md p-2 duration-100 hover:bg-gray-100 lg:w-1/3"
          >
            <Link to={`/books/${book.id}`}>
              <div className="flex h-full flex-col items-center justify-center text-center sm:flex-row sm:justify-start sm:text-left">
                <div className="relative">
                  <div className="mb-4 h-auto w-24 flex-shrink-0 rounded-md sm:mb-0">
                    <img
                      alt={`${book.title} Cover`}
                      className="rounded-md"
                      src={book.image_link}
                    />
                  </div>
                  {book.is_favorite && (
                    <span className="absolute right-1 top-2 inline-flex items-center gap-0.5 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">
                      <BsFillSuitHeartFill className="fill-pink-200" />
                    </span>
                  )}
                </div>
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font text-lg font-medium text-gray-900">
                    {book.title}
                  </h2>
                  <h3 className="mb-3 text-gray-500">{book.authors}</h3>
                  <p className="mb-4"></p>
                  <span className="inline-flex"></span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
