import FilterButton from "../components/FilterButton";
import { Link } from "react-router-dom";
import { BsFillSuitHeartFill } from "react-icons/bs";
import useAllBooks from "../hooks/queries/useAllBooks";
import ServerDownPage from "./global/ServerDownPage";
import LoadingSpinner from "../components/LoadingSpinner";

type bookType = {
  id: string;
  title: string;
  genre: string;
  rating: number;
  is_favorite: boolean;
  is_current_read: boolean;
  was_completed_before: boolean;
};

export default function Index() {
  const { isLoading, isError, data: books } = useAllBooks();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ServerDownPage />;
  }

  return (
    <>
      <div className="mb-5 flex items-start justify-between border-b py-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Index</h3>
        </div>
        <div className="mt-0 flex items-center gap-x-3">
          <FilterButton />
        </div>
      </div>
      <div className=" flex flex-wrap">
        {books.map((book: bookType) => (
          <div
            key={book.id}
            className=" rounded-md p-2 duration-100 hover:bg-gray-50 lg:w-1/3"
          >
            <Link to={`${book.id}`}>
              <div className="flex h-full flex-col items-center justify-center text-center sm:flex-row sm:justify-start sm:text-left">
                <div className="relative">
                  <img
                    alt="team"
                    className="mb-4 h-40 w-36 flex-shrink-0 rounded-lg sm:mb-0"
                    src="https://dummyimage.com/144x160"
                  />
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
                  <h3 className="mb-3 text-gray-500">{book.genre}</h3>
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
