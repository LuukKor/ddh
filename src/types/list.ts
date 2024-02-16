export interface List<T> {
  page: number;
  totalPage: number;
  perPage: number;
  list: T[];
}
