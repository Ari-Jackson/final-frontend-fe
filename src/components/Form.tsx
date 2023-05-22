import { useForm, type SubmitHandler } from "react-hook-form";
import { Inputs } from "../utils/types";
import { cn } from "../utils/cn";
// import useGoogleBooks from "../hooks/queries/useGoogleBooks";
// import { useEffect, useState } from "react";

export default function Form({
  values,
  onSubmitFunc,
}: {
  values?: Inputs;
  onSubmitFunc: SubmitHandler<Inputs>;
}) {
  const {
    // setValue,
    register,
    handleSubmit,
    // watch,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      // bookInfo: {
      //   id: "",
      //   volumeInfo: {},
      // },
      title: "",
      genre: "",
      rating: 0,
      isFavorite: false,
      isCurrentRead: false,
      wasCompletedBefore: false,
    },
    values,
    mode: "onTouched",
  });

  // const [googleBooksForm, setGoogleBooksForm] = useState({
  //   id: "",
  //   volumeInfo: {
  //     title: "",
  //     authors: [""],
  //     description: "string",
  //     pageCount: 0,
  //     categories: [""],
  //     imageLinks: {
  //       smallThumbnail: "",
  //       thumbnail: "",
  //       small: "",
  //       medium: "",
  //       large: "",
  //       extraLarge: "",
  //     },
  //   },
  // });

  // const { bookInfo } = watch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmitFunc(data);
  };

  // useEffect(() => {
  //   setValue("bookInfo", googleBooksForm);
  // }, [setValue, googleBooksForm]);

  return (
    <div className="m-auto mt-10 w-full max-w-5xl border px-10 py-10">
      {/* <GoogleBookSearch
        setGoogleBooksForm={setGoogleBooksForm}
        bookInfo={bookInfo}
      /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        // className={cn(!bookInfo.id && "hidden")}
      >
        <div className="flex">
          <img
            src={
              // !bookInfo.volumeInfo.imageLinks ?
              "https://dummyimage.com/400x600/969696/dbdbdb"
              // : bookInfo.volumeInfo.imageLinks.smallThumbnail
            }
            className="mr-5 w-1/2"
          />
          <div>
            <label className={cn("font-medium text-gray-600")}>
              Book Title
            </label>
            <input
              className="w-full rounded border border-solid border-gray-300 px-4 py-2 text-gray-700"
              type="text"
              placeholder="Book Title"
              {...register("title", {
                required: "Title is required",
                maxLength: { value: 500, message: "Title is too long" },
              })}
            />
            {errors.title && (
              <div className="text-normal mb-3 text-red-500 ">
                {errors.title.message}
              </div>
            )}
            <label className="font-medium text-gray-600">Book Genre</label>
            <input
              type="text"
              className="w-full rounded border border-solid border-gray-300 px-4
    py-2 text-gray-700"
              placeholder="Book Genre"
              {...register("genre", {
                required: "Genre is required",
                maxLength: { value: 255, message: "Genre is too long" },
              })}
            />
            {errors.genre && (
              <div className="text-normal mb-3 text-red-500 ">
                {errors.genre.message}
              </div>
            )}
            <label className="font-medium text-gray-600">Rating</label>
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
            <input
              type="checkbox"
              placeholder="Is this a favorite>"
              {...register("isFavorite", {})}
            />
            <label className="font-medium text-gray-600">Favorite</label>
            <input
              type="checkbox"
              placeholder="Is This A current read?"
              {...register("isCurrentRead", {})}
            />
            <label className="font-medium text-gray-600">Current Read</label>
            <input
              type="checkbox"
              placeholder="Have you read this before?"
              {...register("wasCompletedBefore", {})}
            />
            <label className="font-medium text-gray-600">Read Before</label>
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

// const GoogleBookSearch = ({ setGoogleBooksForm, bookInfo }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [submittedValue, setSubmittedValue] = useState("");
//   //
//   const [selectedBook, setSelectedBook] = useState({ id: "", volumeInfo: {} });
//   const { googleBooks, googleBooksIsLoading } = useGoogleBooks(submittedValue);

//   const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSubmittedValue(inputValue);
//     setInputValue("");
//   };

//   return (
//     <>
//       <div className={cn(bookInfo.id && "hidden")}>
//         <form onSubmit={SubmitHandler} className="flex flex-col items-center">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="w-full rounded border border-solid border-gray-300 px-4 py-2 text-gray-700"
//           />
//           <input
//             disabled={
//               googleBooksIsLoading ||
//               inputValue === "" ||
//               (submittedValue === inputValue && submittedValue !== "")
//             }
//             className="mt-5 rounded-md bg-pink-400 p-2 text-white hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
//             type="submit"
//           />
//         </form>
//         <div className={cn("mt-5 grid grid-cols-2 gap-y-5 md:grid-cols-3")}>
//           {googleBooks &&
//             googleBooks?.items.map(({ id, volumeInfo }) => (
//               <div
//                 key={id}
//                 className={cn(
//                   "mx-auto flex h-full w-11/12 flex-col items-center rounded-md border-pink-100 bg-pink-200 p-2 hover:cursor-pointer sm:flex-row sm:items-start",
//                   selectedBook.id === id && "bg-gray-400"
//                 )}
//                 onClick={() => setSelectedBook({ id, volumeInfo })}
//               >
//                 <img
//                   src={
//                     !volumeInfo.imageLinks
//                       ? "https://dummyimage.com/400x600/969696/dbdbdb"
//                       : volumeInfo.imageLinks.smallThumbnail
//                   }
//                   className="h-auto w-24 self-center"
//                 />
//                 <div className="flex flex-col items-center text-center md:text-left">
//                   <h1>{volumeInfo.title}</h1>
//                   {volumeInfo.authors && (
//                     <h3> by {volumeInfo.authors.join(", ")}</h3>
//                   )}
//                 </div>
//               </div>
//             ))}
//         </div>
//         {googleBooks && (
//           <button
//             disabled={!selectedBook.id}
//             onClick={() => setGoogleBooksForm(selectedBook)}
//             className=" text-md mt-4 w-fit rounded border bg-pink-400 px-6 py-3 font-semibold text-white shadow disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-white xl:hover:bg-pink-200 xl:hover:text-pink-400"
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </>
//   );
// };
