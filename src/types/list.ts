export interface List<T> {
  page: number;
  totalPage: number;
  perPage: number;
  hideNextPage: boolean;
  hidePrevPage: boolean;
  list: T[];
}
