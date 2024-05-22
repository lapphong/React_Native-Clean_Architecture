import {Msg, PagedList} from 'domain/domain';

export abstract class NotiRepository {
  abstract fetchNoti(page: number, limit: number): Promise<PagedList<Msg>>;

  // abstract setSeenAllMessage(): Promise<void>;

  // abstract setSeenMessage(idList: string[]): Promise<void>;
}
