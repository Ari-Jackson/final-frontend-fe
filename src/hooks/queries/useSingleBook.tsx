import { useQuery } from "@tanstack/react-query";

export default function useSingleBook(id: string | undefined) {
  const API = import.meta.env.VITE_API_URL;

  const {
    isLoading,
    isError,
    data: book,
  } = useQuery({
    queryKey: ["books", id],
    queryFn: async () => {
      const response = await fetch(`${API}/books/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return {
    isLoading,
    isError,
    book,
  };
}
