import {LoadMoreOutput} from 'domain/domain';

export class PagedList<T> {
  data: T[];
  otherData: any | null;
  next: number | null;
  offset: number | null;
  total: number | null;

  constructor(
    {
      data,
      otherData,
      next = -99,
      offset = -99,
      total = -99,
    }: {data: T[]} & Partial<PagedList<T>> = {data: []},
  ) {
    this.data = data;
    this.otherData = otherData || null;
    this.next = next === -99 ? null : next;
    this.offset = offset === -99 ? null : offset;
    this.total = total === -99 ? null : total;
  }

  get isLastPage(): boolean {
    return this.data.length === 0 || this.next === null;
  }

  toLoadMoreOutput(): LoadMoreOutput<T> {
    return new LoadMoreOutput({
      data: this.data,
      otherData: this.otherData,
      isLastPage: this.isLastPage,
    });
  }
}
