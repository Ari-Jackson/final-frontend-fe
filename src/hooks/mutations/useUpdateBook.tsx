import { useMutation } from "@tanstack/react-query";
import { type Inputs } from "../../components/Form";

type PutTypes = {
  id: string | undefined;
  updatedBook: Inputs;
};

export default function useUpdateBook() {
  const API = import.meta.env.VITE_API_URL;

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async ({ id, updatedBook }: PutTypes) => {
      const response = await fetch(`${API}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return {
    mutate,
    isLoading,
    isError,
    isSuccess,
  };
}
