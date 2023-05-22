export type fetchedBookType = {
  id: string;
  title: string;
  genre: string;
  rating: number;
  is_favorite: boolean;
  is_current_read: boolean;
  was_completed_before: boolean;
};

export type Inputs = {
  title: string;
  genre: string;
  rating: number;
  isFavorite: boolean;
  isCurrentRead: boolean;
  wasCompletedBefore: boolean;
};

export type Outputs = {
  title: string;
  genre: string;
  rating: number;
  is_favorite: boolean;
  is_current_read: boolean;
  was_completed_before: boolean;
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
