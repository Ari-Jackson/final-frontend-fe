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
