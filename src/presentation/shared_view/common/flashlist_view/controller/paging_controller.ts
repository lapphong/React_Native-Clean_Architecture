import {LoadMoreOutput} from 'domain/domain';
import {AppException, Constants} from 'shared/shared';

export class PagingController<T> {
  private static instance: PagingController<any> | null = null;

  constructor(
    public pageKey: number = Constants.initialPage,
    public itemList: T[] = [],
    public error: AppException | null = null,
  ) {}

  public static getInstance<T>(): PagingController<T> {
    if (!PagingController.instance) {
      PagingController.instance = new PagingController<T>();
    }
    return PagingController.instance;
  }

  get getItemList(): T[] {
    return this.itemList;
  }

  set setError(appException: AppException) {
    this.error = appException;
  }

  appendLoadMoreOutput(loadMoreOutput: LoadMoreOutput<T>): void {
    if (loadMoreOutput.isRefreshSuccess) {
      this.pageKey = 0;
      this.itemList = [];
    }

    if (loadMoreOutput.isLastPage) {
      this.itemList.push(...loadMoreOutput.data);
    } else {
      this.pageKey++;
      this.itemList.push(...loadMoreOutput.data);
    }
  }
}
