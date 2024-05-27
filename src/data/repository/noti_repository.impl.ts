import {NetworkingFactory, RestMethod} from 'data/data';
import {Msg, NotiRepository, Notification, PagedList} from 'domain/domain';
import {inject, injectable} from 'tsyringe';

class NotiApiConstant {
  static readonly listMessage: string = 'User/listMessage';
  static readonly setseenMessage: string = 'User/setseenMessage';
  static readonly setseenAllMessage: string = 'User/setseenAllMessage';
}

@injectable()
export class NotiRepositoryImpl implements NotiRepository {
  constructor(@inject('NetworkingFactory') private _networkingFactory: NetworkingFactory) {}

  async fetchNoti(page: number, limit: number): Promise<PagedList<Msg>> {
    let response = await this._networkingFactory.request<Notification>({
      method: RestMethod.get,
      path: NotiApiConstant.listMessage,
      queryParameters: {index: page, limit: limit},
    });
    if (response !== null) {
      return new PagedList({
        data: response.msg,
        otherData: response.numberNew,
        total: response.total,
      });
    }
    return new PagedList({data: []});
  }
}
