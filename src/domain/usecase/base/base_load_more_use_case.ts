import {DI_Type, container} from 'initializer/initializer';
import {AxiosErrorMapper} from 'data/data';
import {LoadMoreOutput, PagedList} from 'domain/domain';
import {Constants, Log, LogConfig} from 'shared/shared';

export abstract class BaseLoadMoreUseCase<T> {
  constructor(
    private initPage: number = Constants.initialPage,
    private initOffset: number = 0,
    private limit: number = Constants.itemsPerPage,
  ) {
    this._output = new LoadMoreOutput<T>({data: [], page: this.initPage, offset: this.initOffset});
    this._oldOutput = new LoadMoreOutput<T>({
      data: [],
      page: this.initPage,
      offset: this.initOffset,
    });
  }

  private _output: LoadMoreOutput<T>;
  private _oldOutput: LoadMoreOutput<T>;

  get page(): number {
    return this._output.page;
  }

  get offset(): number {
    return this._output.offset;
  }

  abstract buildUseCase(page: number, limit: number): Promise<PagedList<T>>;

  async execute(isInitialLoad: boolean): Promise<LoadMoreOutput<T>> {
    try {
      if (isInitialLoad) {
        this._output = new LoadMoreOutput<T>({
          data: [],
          page: this.initPage,
          offset: this.initOffset,
        });
      }
      if (LogConfig.enableLogUseCaseInput) {
        Log.d(`LoadMoreUseCase Page: ${this.page}, offset: ${this.offset}`, {
          name: (this.constructor as any).name,
        });
      }

      const pagedList = await this.buildUseCase(this.page, this.limit);

      const newOutput = this._oldOutput.copyWith({
        data: pagedList.data,
        otherData: pagedList.otherData,
        page: isInitialLoad
          ? this.initPage + (pagedList.data.length ? 1 : 0)
          : this._oldOutput.page + (pagedList.data.length ? 1 : 0),
        offset: isInitialLoad
          ? this.initOffset + pagedList.data.length
          : this._oldOutput.offset + pagedList.data.length,
        isLastPage: pagedList.isLastPage,
        isRefreshSuccess: isInitialLoad,
      });

      this._output = newOutput;
      this._oldOutput = newOutput;
      if (LogConfig.enableLogUseCaseOutput) {
        Log.d(
          `LoadMoreUseCase Output: pagedList: ${JSON.stringify(pagedList)}, inputPage: ${
            this.page
          }, inputOffset: ${this.offset}, newOutput: ${JSON.stringify(newOutput)}`,
          {name: (this.constructor as any).name},
        );
      }

      return newOutput;
    } catch (e) {
      if (LogConfig.enableLogUseCaseError) {
        Log.e(`FutureUseCase Error: ${e}`, {name: (this.constructor as any).name});
      }

      this._output = this._oldOutput;

      throw container.resolve<AxiosErrorMapper>(DI_Type.AxiosErrorMapper).map(e);
    }
  }
}
