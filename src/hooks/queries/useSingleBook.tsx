import { useQuery } from "@tanstack/react-query";
import { fetchedBookType } from "../../utils/types";

export default function useSingleBook(id: string | undefined) {
  const API = import.meta.env.VITE_API_URL;

  const {
    isLoading: getBookIsLoading,
    isError: getBookHasError,
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
    getBookIsLoading,
    getBookHasError,
    book,
  };
}
