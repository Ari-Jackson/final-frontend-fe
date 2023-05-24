import {
  useForm,
  type SubmitHandler,
  type UseFormSetValue,
} from "react-hook-form";
import { Inputs } from "../utils/types";
import { cn } from "../utils/cn";
import useGoogleBooks from "../hooks/queries/useGoogleBooks";
import { useState } from "react";

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

  const googleBooksForm = watch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmitFunc(data);
  };

  return (
    <div className="m-auto mt-10 w-full max-w-5xl border px-10 py-10">
      <GoogleBookSearch setValue={setValue} googleBooksForm={googleBooksForm} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(!googleBooksForm.googleBooksId && "hidden")}
      >
        <div className="flex">
          <img
            src={
              !googleBooksForm.imageLink
                ? "https://dummyimage.com/400x600/969696/dbdbdb"
                : googleBooksForm.imageLink
            }
            className="mr-5 h-80 w-auto"
          />
          <div>
            <h1 className="text-xl font-semibold">{googleBooksForm.title}</h1>
            <h1 className="text-lg">{googleBooksForm.authors}</h1>
            <label className="font-medium text-gray-600">My Rating</label>
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
            <label htmlFor="favorite" className=" font-medium text-gray-600">
              Favorite
            </label>
            <input
              type="checkbox"
              id="favorite"
              placeholder="Is this a favorite?"
              {...register("isFavorite", {})}
            />
            <label htmlFor="currentRead" className="font-medium text-gray-600">
              Current Read
            </label>
            <input
              type="checkbox"
              id="currentRead"
              placeholder="Is This A current read?"
              {...register("isCurrentRead", {})}
            />
            <label htmlFor="readBefore" className="font-medium text-gray-600">
              Read Before
            </label>
            <input
              type="checkbox"
              id="readBefore"
              placeholder="Have you read this before?"
              className=""
              {...register("wasCompletedBefore", {})}
            />

            {googleBooksForm.wasCompletedBefore && (
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

const GoogleBookSearch = ({
  setValue,
  googleBooksForm,
}: {
  setValue: UseFormSetValue<Inputs>;
  googleBooksForm: Inputs;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  //
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

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    setInputValue("");
  };

  const handleSubmit = () => {
    setValue("googleBooksId", selectedBook.googleBooksId);
    setValue("title", selectedBook.title);
    setValue("categories", selectedBook.categories);
    setValue("authors", selectedBook.authors);
    setValue("description", selectedBook.description);
    setValue("pageCount", selectedBook.pageCount);
    setValue("imageLink", selectedBook.imageLink);
  };

  return (
    <>
      <div className={cn(googleBooksForm.googleBooksId && "hidden")}>
        <form
          onSubmit={submitHandler}
          className="flex items-center justify-center"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded border border-solid border-gray-300 px-4 py-2 text-gray-700"
          />
          <input
            disabled={
              googleBooksIsLoading ||
              inputValue === "" ||
              (submittedValue === inputValue && submittedValue !== "")
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
                onClick={() =>
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
                  })
                }
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
            disabled={!selectedBook.googleBooksId}
            onClick={handleSubmit}
            className=" text-md mt-4 w-fit rounded border bg-pink-400 px-6 py-3 font-semibold text-white shadow disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-white xl:hover:bg-pink-200 xl:hover:text-pink-400"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};
