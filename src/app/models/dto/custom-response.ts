interface Paginated<TPaginatedItems> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  sort: string[];
  items: TPaginatedItems[];
}

export interface CustomResponse<TData = object> {
  timestamp: Date | string;
  message: string;
  statusCode: number;
  status: string;
  data: TData extends (infer U)[] ? Paginated<U> : TData;
}
