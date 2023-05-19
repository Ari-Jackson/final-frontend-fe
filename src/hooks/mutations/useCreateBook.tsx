import { useMutation } from "@tanstack/react-query";
import { type Outputs } from "../../components/Form";

export default function useCreateBook() {
  const API = import.meta.env.VITE_API_URL;

  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
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
  });

  return {
    mutate,
    isLoading,
    isError,
    error,
    isSuccess,
  };
}
