import {
  useForm,
  type SubmitHandler,
  type UseFormSetValue,
} from "react-hook-form";
import { Inputs } from "../utils/types";
import { cn } from "../utils/cn";
import useGoogleBooks from "../hooks/queries/useGoogleBooks";
import { LegacyRef, useEffect, useRef, useState } from "react";

export default function Form({
  values,
  onSubmitFunc,
}: {
  values?: Inputs;
  onSubmitFunc: SubmitHandler<Inputs>;
}) {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      categories: "",
      rating: 0,
      isFavorite: false,
      isCurrentRead: false,
      wasCompletedBefore: false,
      googleBooksId: "",
      authors: "",
      description: "",
      pageCount: 0,
      imageLink: "string",
      numberOfCompletions: 0,
    },
    values,
    mode: "all",
  });

  const bookInfo = watch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmitFunc(data);
  };

  return (
    <div className="m-auto mt-10 w-full border px-10 py-10">
      <GoogleBookSearch setValue={setValue} bookInfo={bookInfo} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(!bookInfo.googleBooksId && "hidden")}
      >
        <div className="flex flex-col rounded-md md:flex-row">
          <div className="relative mr-5">
            <img
              src={
                !bookInfo.imageLink
                  ? "https://dummyimage.com/400x600/969696/dbdbdb"
                  : bookInfo.imageLink
              }
              className=" h-80 w-auto rounded-md"
            />
            <div className="absolute bottom-0 flex h-full w-full justify-center rounded-md bg-pink-400 opacity-0 duration-100 hover:cursor-pointer hover:opacity-70">
              <button
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("googleBooksId", "");
                }}
              >
                Click to reset book details
              </button>
            </div>
          </div>
          <div className="mx-5 flex-grow">
            <h1 className="text-xl font-semibold">{bookInfo.title}</h1>
            <h1 className="mb-3 text-lg">{bookInfo.authors}</h1>
            <label className=" font-medium text-gray-600">My Rating</label>
            <input
              type="number"
              className="w-full rounded border border-solid border-gray-300 px-4
    py-2 text-gray-700"
              placeholder="0"
              {...register("rating", {
                max: { value: 10, message: "Rating cannot be higher than 10" },
                min: { value: 0, message: "Rating cannot be lower than 0" },
                valueAsNumber: true,
              })}
            />
            {errors.rating && (
              <div className="text-normal mb-3 text-red-500 ">
                {errors.rating.message}
              </div>
            )}
            <div className="my-5 flex justify-between px-20">
              <div className="space-x-2">
                <label
                  htmlFor="favorite"
                  className=" font-medium text-gray-600"
                >
                  Favorite
                </label>
                <input
                  type="checkbox"
                  id="favorite"
                  placeholder="Is this a favorite?"
                  {...register("isFavorite", {})}
                />
              </div>

              <div className="space-x-2">
                <label
                  htmlFor="currentRead"
                  className="font-medium text-gray-600"
                >
                  Current Read
                </label>
                <input
                  type="checkbox"
                  id="currentRead"
                  placeholder="Is This A current read?"
                  {...register("isCurrentRead", {})}
                />
              </div>
              <div className="space-x-2">
                <label
                  htmlFor="readBefore"
                  className="font-medium text-gray-600"
                >
                  Read Before
                </label>
                <input
                  type="checkbox"
                  id="readBefore"
                  {...register("wasCompletedBefore", {
                    onChange: (e) => {
                      if (!e.target.checked) {
                        setValue("numberOfCompletions", 0);
                      }
                    },
                  })}
                />
              </div>
            </div>
            {bookInfo.wasCompletedBefore && (
              <>
                <label
                  htmlFor="numberOfCompletions"
                  className={cn("block font-medium text-gray-600")}
                >
                  Number of Re-reads
                </label>
                <input
                  className={cn(
                    "w-full rounded border border-solid border-gray-300 px-4 py-2 text-gray-700"
                  )}
                  type="number"
                  id="numberOfCompletions"
                  placeholder="0"
                  {...register("numberOfCompletions", {
                    min: { value: 0, message: "Number cannot be lower than 0" },
                    valueAsNumber: true,
                  })}
                />
                {errors.numberOfCompletions && (
                  <div className="text-normal mb-3 text-red-500 ">
                    {errors.numberOfCompletions.message}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <input
          disabled={!isDirty || !isValid}
          className=" text-md mt-4 w-full rounded border bg-pink-400 px-6 py-3 font-semibold text-white shadow disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-white xl:hover:bg-pink-200 xl:hover:text-pink-400"
          type="submit"
        />
      </form>
    </div>
  );
}

type GoogleSearchInputs = {
  search: string;
};

const GoogleBookSearch = ({
  setValue,
  bookInfo,
}: {
  setValue: UseFormSetValue<Inputs>;
  bookInfo: Inputs;
}) => {
  const ref = useRef<HTMLButtonElement>();
  const [submittedValue, setSubmittedValue] = useState("");
  const { register, handleSubmit, reset, watch } = useForm<GoogleSearchInputs>({
    defaultValues: {
      search: "",
    },
  });
  const { search } = watch();
  const [selectedBook, setSelectedBook] = useState({
    googleBooksId: "",
    title: "",
    categories: "",
    authors: "",
    description: "",
    pageCount: 0,
    imageLink: "",
  });
  const { googleBooks, googleBooksIsLoading } = useGoogleBooks(submittedValue);

  useEffect(() => {
    if (bookInfo.title) {
      setSubmittedValue(bookInfo.title);
    }
  }, [bookInfo.title]);

  const submitHandler = (data: GoogleSearchInputs) => {
    setSubmittedValue(data.search);
    reset(() => ({
      search: "",
    }));
  };

  const handleNext = () => {
    setValue("googleBooksId", selectedBook.googleBooksId, {
      shouldDirty: true,
    });
    setValue("title", selectedBook.title);
    setValue(
      "categories",
      selectedBook.categories ? selectedBook.categories : ""
    );
    setValue("authors", selectedBook.authors ? selectedBook.authors : "");
    setValue(
      "description",
      selectedBook.description ? selectedBook.description : ""
    );
    setValue("pageCount", selectedBook.pageCount ? selectedBook.pageCount : 1);
    setValue("imageLink", selectedBook.imageLink ? selectedBook.imageLink : "");
  };
  return (
    <>
      <div className={cn(bookInfo.googleBooksId && "hidden")}>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex items-center justify-center"
        >
          <input
            type="text"
            {...register("search")}
            className="w-full rounded border border-solid border-gray-300 px-4 py-2 text-gray-700"
          />
          <input
            disabled={
              googleBooksIsLoading ||
              search === "" ||
              (submittedValue === search && submittedValue !== "")
            }
            className=" ml-5 rounded-md bg-pink-400 p-2 text-white hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
            type="submit"
          />
        </form>
        <div className={cn("mt-5 grid grid-cols-2 gap-y-5 md:grid-cols-3")}>
          {googleBooks &&
            googleBooks?.items.map(({ id, volumeInfo }) => (
              <div
                key={id}
                className={cn(
                  "mx-auto flex h-full w-11/12 flex-col items-center rounded-md border-pink-100 bg-pink-200 p-2 hover:cursor-pointer sm:flex-row sm:items-start",
                  selectedBook.googleBooksId === id &&
                    "bg-pink-500 shadow-lg duration-100"
                )}
                onClick={() => {
                  setSelectedBook({
                    googleBooksId: id,
                    title: volumeInfo.title,
                    authors: volumeInfo.authors?.join(", "),
                    description: volumeInfo.description,
                    pageCount: volumeInfo.pageCount,
                    categories: volumeInfo.categories?.join(", "),
                    imageLink: !volumeInfo.imageLinks
                      ? "https://dummyimage.com/400x600/969696/dbdbdb"
                      : volumeInfo.imageLinks.smallThumbnail,
                  });
                  ref.current?.scrollIntoView();
                }}
              >
                <img
                  src={
                    !volumeInfo.imageLinks
                      ? "https://dummyimage.com/400x600/969696/dbdbdb"
                      : volumeInfo.imageLinks.smallThumbnail
                  }
                  className="h-auto w-24 self-center"
                />
                <div className="ml-4 flex flex-col md:text-left">
                  <h1>{volumeInfo.title}</h1>
                  {volumeInfo.authors && (
                    <h3>by {volumeInfo.authors.join(", ")}</h3>
                  )}
                </div>
              </div>
            ))}
        </div>
        {googleBooks && (
          <button
            ref={ref}
            disabled={!selectedBook.googleBooksId}
            onClick={() => handleNext()}
            className=" text-md mt-4 w-fit rounded border bg-pink-400 px-6 py-3 font-semibold text-white shadow disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-white xl:hover:bg-pink-200 xl:hover:text-pink-400"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};
