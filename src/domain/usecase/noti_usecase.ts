import {injectable, inject} from 'tsyringe';
import {BaseLoadMoreUseCase, Msg, NotiRepository, PagedList} from 'domain/domain';
import {Constants} from 'shared/shared';

@injectable()
export class NotiUsecase extends BaseLoadMoreUseCase<Msg> {
  constructor(@inject('NotiRepository') private _notiRepository: NotiRepository) {
    super(Constants.initialPage);
  }

  buildUseCase(page: number, limit: number): Promise<PagedList<Msg>> {
    return this._notiRepository.fetchNoti(page, limit);
  }

  // Additional methods
  // async setSeenAllMessage(): Promise<void> {
  //   return await this._notiRepository.setSeenAllMessage();
  // }

  // async setSeenMessage(idList: string[]): Promise<void> {
  //   return await this._notiRepository.setSeenMessage(idList);
  // }
}
