import { useMutation } from "@tanstack/react-query";
import { type Inputs } from "../../components/Form";

type PutTypes = {
  updatedBook: Inputs;
};

export default function useUpdateBook() {
  const API = import.meta.env.VITE_API_URL;

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async ({ updatedBook }: PutTypes) => {
      const response = await fetch(`${API}/books/`, {
        method: "POST",
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
