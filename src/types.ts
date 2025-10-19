export type PersonPhoto = {
  id: string;
  url: string;
};

export type Person = {
  id: string;
  name: string;
  age: number;
  location: string;
  like_count?: number;
  photos: PersonPhoto[];
};

export type PaginatedResponse<T> = {
  data: T[];
  current_page: number;
  last_page: number;
};