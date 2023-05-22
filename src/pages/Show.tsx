import { Link, useNavigate, useParams } from "react-router-dom";
import { BsFillBookmarkCheckFill, BsRepeat } from "react-icons/bs";
import { SlBookOpen } from "react-icons/sl";
import useSingleBook from "../hooks/queries/useSingleBook";
import useDeleteBook from "../hooks/mutations/useDeleteBook";
import ServerDownPage from "./global/ServerDownPage";
import LoadingSpinner from "../components/radix/LoadingSpinner";
import { cn } from "../utils/cn";
import Tooltip from "../components/radix/ToolTip";
import DeleteButton from "../components/radix/DeleteButton";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookIsLoading, getBookHasError, book } = useSingleBook(id);
  const { mutate, deleteIsSuccess } = useDeleteBook();

  if (getBookIsLoading) {
    return <LoadingSpinner />;
  }

  if (getBookHasError) {
    return <ServerDownPage />;
  }

  const handleDelte = () => mutate(id);

  if (deleteIsSuccess) {
    navigate("/books");
  }

  return (
    <>
      <div className="mb-5 items-start justify-between border-b py-4 md:flex ">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Show</h3>
        </div>
        <div className="mt-6 items-center gap-x-3 sm:flex md:mt-0"></div>
      </div>
      <BreadCrumb title={book.title} />
      <div className=" py-6">
        <div className="mx-auto w-fit px-4 md:px-8">
          <div className="flex w-full flex-col justify-center gap-20 md:flex-row">
            <img
              src="https://dummyimage.com/640x720"
              alt="Photo by Himanshu Dewangan"
              className="h-full w-full rounded-lg object-cover object-center md:w-1/3"
            />
            <div className="w-full md:w-fit">
              <div className="mb-2 md:mb-3">
                <span className="mb-0.5 inline-block text-gray-500">
                  Rick Rordan
                </span>
                <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                  {book.title}
                </h2>
              </div>
              <RatingSection rating={book.rating} />
              <div className="mb-8 md:mb-10">
                <div className="flex flex-col justify-start gap-3 xl:flex-row">
                  <div className="flex items-center space-x-3">
                    <Tooltip
                      text={`This book ${
                        !book.is_favorite ? "is not" : "is"
                      } a favorite`}
                    >
                      <BsFillBookmarkCheckFill
                        className={cn(
                          "h-10 w-12 items-center justify-center bg-white  text-center text-gray-800 transition duration-100 hover:cursor-pointer",
                          book.is_favorite ? "fill-green-500" : "fill-gray-200"
                        )}
                      />
                    </Tooltip>
                    <p className="xl:hidden">
                      This book is {!book.is_favorite && "not"} a favorite
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Tooltip
                      text={`This book ${
                        !book.is_current_read ? "is not" : "is"
                      } a current read`}
                    >
                      <SlBookOpen
                        className={cn(
                          "h-10 w-12 items-center justify-center bg-white fill-red-500 text-center text-gray-800 transition duration-100 hover:cursor-pointer",
                          book.is_current_read
                            ? "fill-red-500"
                            : "fill-gray-200"
                        )}
                      />
                    </Tooltip>
                    <p className="xl:hidden">
                      This book is {!book.is_current_read && "not"} a current
                      read
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Tooltip
                      text={`You ${
                        !book.was_completed_before ? "have not" : "have"
                      } read this book before.`}
                    >
                      <BsRepeat
                        className={cn(
                          " h-10 w-12 items-center justify-center bg-white fill-red-500 text-center text-gray-800 transition duration-100 hover:cursor-pointer",
                          book.was_completed_before
                            ? "fill-orange-500"
                            : "fill-gray-200"
                        )}
                      />
                    </Tooltip>
                    <p className="whitespace-pre-line xl:hidden">
                      You have {!book.was_completed_before && "not"} read this
                      book before.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5">
                <DeleteButton handleDelete={handleDelte}>
                  <button className="inline-block flex-1 rounded-lg bg-gray-400 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-300 transition duration-100 hover:bg-red-500 focus-visible:ring active:bg-red-500 sm:flex-none md:text-base">
                    Delete
                  </button>
                </DeleteButton>
                <Link
                  to={`/books/${id}/edit`}
                  className="inline-block flex-1 rounded-lg bg-pink-400 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-pink-300 transition duration-100 hover:bg-pink-500 sm:flex-none md:text-base"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const BreadCrumb = ({ title }: { title: string }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="flex items-center gap-1 text-sm text-gray-600">
        <li>
          <Link to="/books" className="block transition hover:text-gray-700">
            <span className="sr-only"> Home </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </li>

        <li className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>
        <li className="block text-gray-400 transition">{title}</li>
      </ol>
    </nav>
  );
};

const RatingSection = ({ rating }: { rating: number }) => {
  const starRating = [];
  for (let i = 1; i <= 10; i += 2) {
    if (i < rating) {
      starRating.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          key={`${i}+stars`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else {
      starRating.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
          key={`${i}+stars`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  }
  return (
    <div className="mb-5 flex">
      {starRating}
      {rating}
    </div>
  );
};
