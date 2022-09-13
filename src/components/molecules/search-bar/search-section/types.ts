import { SearchResultList } from "../types";

export enum SearchType {
  COLLECTIONS = "COLLECTIONS",
  TOPICS = "TOPICS",
}

export interface SearchSectionProps {
  title: string;
  data: SearchResultList[];
  type: SearchType;
}
