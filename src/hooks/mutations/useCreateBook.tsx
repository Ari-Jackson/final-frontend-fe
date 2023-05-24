import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Outputs } from "../../utils/types";

export default function useCreateBook() {
  const API = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: createIsLoading,
    isError: createIsError,
    isSuccess: createIsSuccess,
    error: createError,
  } = useMutation({
    mutationFn: async (updatedBook: Outputs) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return {
    mutate,
    createIsLoading,
    createIsError,
    createError,
    createIsSuccess,
  };
}
