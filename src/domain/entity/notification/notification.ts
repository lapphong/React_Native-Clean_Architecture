import {Msg} from 'domain/domain';

export class Notification {
  total: number;
  numberNew: number;
  msg: Msg[];

  static readonly defaultTotal: number = 0;
  static readonly defaultNumberNew: number = 0;
  static readonly defaultMsg: Msg[] = [];

  constructor({
    total = Notification.defaultTotal,
    numberNew = Notification.defaultNumberNew,
    msg = Notification.defaultMsg,
  }: Partial<Notification> = {}) {
    this.total = total;
    this.numberNew = numberNew;
    this.msg = msg;
  }

  static fromJson(json: {[key: string]: any}): Notification {
    return new Notification({
      total: json.total ?? Notification.defaultTotal,
      numberNew: json.numberNew ?? Notification.defaultNumberNew,
      msg: json.msg
        ? json.msg.map((msgJson: any) => Msg.fromJson(msgJson))
        : Notification.defaultMsg,
    });
  }
}
