export interface ApiResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: T
}
