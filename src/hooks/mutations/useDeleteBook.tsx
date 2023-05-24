import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteBook() {
  const API = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    isSuccess: deleteIsSuccess,
  } = useMutation({
    mutationFn: async (id: string | undefined) => {
      const response = await fetch(`${API}/books/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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
    deleteIsLoading,
    deleteIsError,
    deleteIsSuccess,
  };
}
