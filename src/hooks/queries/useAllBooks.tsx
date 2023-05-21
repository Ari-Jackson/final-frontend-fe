import { useQuery } from "@tanstack/react-query";
import { fetchedBookType } from "../../utils/types";

type useAllBookType = {
  getBooksIsLoading: boolean;
  getBooksHasError: boolean;
  books: fetchedBookType[];
};

export default function useAllBooks(): useAllBookType {
  const API = import.meta.env.VITE_API_URL;
  const {
    isLoading: getBooksIsLoading,
    isError: getBooksHasError,
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
    getBooksIsLoading,
    getBooksHasError,
    books,
  };
}
