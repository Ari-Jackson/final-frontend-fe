import { useForm, type SubmitHandler } from "react-hook-form";

export type Inputs = {
  title: string;
  genre: string;
  rating: number;
  isFavorite: boolean;
  isCurrentRead: boolean;
  wasCompletedBefore: boolean;
};

export type Outputs = {
  title: string;
  genre: string;
  rating: number;
  is_favorite: boolean;
  is_current_read: boolean;
  was_completed_before: boolean;
};

export default function Form({
  values,
  onSubmitFunc,
}: {
  values?: Inputs;
  onSubmitFunc: SubmitHandler<Inputs>;
}) {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      title: "",
      genre: "",
      rating: 0,
      isFavorite: false,
      isCurrentRead: false,
      wasCompletedBefore: false,
    },
    values,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmitFunc(data);
  };

  return (
    <form
      className="m-auto mt-10 w-full max-w-lg border px-10 py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="font-medium text-gray-600">Book Title</label>
      <input
        className="w-full  rounded border border-solid border-gray-300 px-4
      py-2 text-gray-700"
        type="text"
        placeholder="Book Title"
        {...register("title", { required: true, maxLength: 500 })}
      />

      <label className="font-medium text-gray-600">Book Genre</label>
      <input
        type="text"
        className="w-full rounded border border-solid border-gray-300 px-4
    py-2 text-gray-700"
        placeholder="Book Genre"
        {...register("genre", { required: true, maxLength: 255 })}
      />
      <label className="font-medium text-gray-600">Rating</label>
      <input
        type="number"
        className="w-full rounded border border-solid border-gray-300 px-4
    py-2 text-gray-700"
        placeholder="Rating"
        {...register("rating", { max: 10, min: 0, valueAsNumber: true })}
      />
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

      <input
        className="text-md mt-4 w-full rounded border bg-pink-400 px-6 py-3 font-semibold text-white shadow xl:hover:bg-pink-200 xl:hover:text-pink-400"
        type="submit"
      />
    </form>
  );
}
