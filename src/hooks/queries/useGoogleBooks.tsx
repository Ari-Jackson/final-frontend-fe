import { useQuery } from "@tanstack/react-query";
import { googleBookResult } from "../../utils/types";

type useAllBookType = {
  googleBooksIsLoading?: boolean;
  googleBooksHasError?: boolean;
  googleBooks: {
    items: googleBookResult[];
  };
};

export default function useGoogleBooks(
  search: string | undefined
): useAllBookType {
  const googleBooksAPI = import.meta.env.VITE_GOOGLE_BOOKS_URL;
  const googleBooksKey = import.meta.env.VITE_GOOGLE_BOOKS_KEY;

  const {
    isInitialLoading: googleBooksIsLoading,
    // isError: googleBooksHasError,
    data: googleBooks,
  } = useQuery({
    queryKey: ["googleBooks", { search }],
    queryFn: async () => {
      const response = await fetch(
        `${googleBooksAPI}?q=${search}&printType=books&fields=items(id, volumeInfo(title, authors, pageCount, description, imageLinks, categories))&maxResults=12&key=${googleBooksKey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!search,
  });

  return { googleBooks, googleBooksIsLoading };
}
