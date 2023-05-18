import { useQuery } from "@tanstack/react-query";

export default function useAllBooks() {
  const API = import.meta.env.VITE_API_URL;
  const {
    isLoading,
    isError,
    data: books,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await fetch(`${API}/books`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return {
    isLoading,
    isError,
    data: books,
  };
}
