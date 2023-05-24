export type fetchedBookType = {
  id: string;
  title: string;
  categories: string;
  rating: number;
  is_favorite: boolean;
  is_current_read: boolean;
  was_completed_before: boolean;
  google_books_id: string;
  authors: string;
  description: string;
  page_count: number;
  image_link: string;
  number_of_completions: number;
};

export type Inputs = {
  title: string;
  categories: string;
  rating: number;
  isFavorite: boolean;
  isCurrentRead: boolean;
  wasCompletedBefore: boolean;
  googleBooksId: string;
  authors: string;
  description: string;
  pageCount: number;
  imageLink: string;
  numberOfCompletions: number;
};

export type Outputs = {
  title: string;
  categories: string;
  rating: number;
  is_favorite: boolean;
  is_current_read: boolean;
  was_completed_before: boolean;
  google_books_id: string;
  authors: string;
  description: string;
  page_count: number;
  image_link: string;
  number_of_completions: number;
};

export type googleBookResult = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    pageCount: number;
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
  };
};
