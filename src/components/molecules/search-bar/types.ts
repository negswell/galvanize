export interface SearchResultList {
  id: string;
  title: string;
  slug: string;
  cover_photo: {
    urls: {
      small: string;
    };
  };
}
