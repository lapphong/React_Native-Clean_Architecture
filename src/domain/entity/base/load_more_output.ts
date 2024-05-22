import {Constants} from 'shared/shared';

export class LoadMoreOutput<T> {
  data: T[];
  otherData: any | null;
  page: number;
  isRefreshSuccess: boolean;
  offset: number;
  isLastPage: boolean;

  constructor({
    data,
    otherData,
    page,
    isRefreshSuccess,
    offset,
    isLastPage,
  }: Partial<LoadMoreOutput<T>> = {}) {
    this.data = data || [];
    this.otherData = otherData || null;
    this.page = page || Constants.initialPage;
    this.isRefreshSuccess = isRefreshSuccess ?? false;
    this.offset = offset ?? 0;
    this.isLastPage = isLastPage ?? false;
  }

  get nextPage(): number {
    return this.page + 1;
  }

  get previousPage(): number {
    return this.page - 1;
  }

  copyWith({
    data,
    otherData,
    page,
    isRefreshSuccess,
    offset,
    isLastPage,
  }: Partial<LoadMoreOutput<T>>): LoadMoreOutput<T> {
    return new LoadMoreOutput<T>({
      data: data ?? this.data,
      otherData: otherData ?? this.otherData,
      page: page ?? this.page,
      isRefreshSuccess: isRefreshSuccess ?? this.isRefreshSuccess,
      offset: offset ?? this.offset,
      isLastPage: isLastPage ?? this.isLastPage,
    });
  }
}
