import { useMutation } from "@tanstack/react-query";

export default function useSingleBook(id: string | undefined) {
  const API = import.meta.env.VITE_API_URL;

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API}/books/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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
