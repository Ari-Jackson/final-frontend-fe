import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  genre: string;
  rating: number;
  favorite: boolean;
  currentRead: boolean;
  readBefore: boolean;
  list: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="title"
        {...register("title", { required: true, maxLength: 500 })}
      />
      <input
        type="text"
        placeholder="genre"
        {...register("genre", { required: true, maxLength: 255 })}
      />
      <input
        type="number"
        placeholder="rating"
        {...register("rating", { max: 10, min: 0 })}
      />
      <input type="text" placeholder="list" {...register("list", {})} />
      <input
        type="checkbox"
        placeholder="favorite"
        {...register("favorite", {})}
      />
      <input
        type="checkbox"
        placeholder="currentRead"
        {...register("currentRead", {})}
      />
      <input
        type="checkbox"
        placeholder="readBefore"
        {...register("readBefore", {})}
      />

      <input type="submit" />
    </form>
  );
}
