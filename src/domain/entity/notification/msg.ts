export class Msg {
  id: string;
  body: string;
  time: string;
  issent: boolean;
  isseen: boolean;

  static readonly defaultId: string = '';
  static readonly defaultBody: string = '';
  static readonly defaultTime: string = '';
  static readonly defaultIssent: boolean = false;
  static readonly defaultIsseen: boolean = false;

  constructor({
    id = Msg.defaultId,
    body = Msg.defaultBody,
    time = Msg.defaultTime,
    issent = Msg.defaultIssent,
    isseen = Msg.defaultIsseen,
  }: Partial<Msg> = {}) {
    this.id = id;
    this.body = body;
    this.time = time;
    this.issent = issent;
    this.isseen = isseen;
  }

  static fromJson(json: {[key: string]: any}): Msg {
    return new Msg({
      id: json.id ?? Msg.defaultId,
      body: json.body ?? Msg.defaultBody,
      time: json.time ?? Msg.defaultTime,
      issent: json.issent ?? Msg.defaultIssent,
      isseen: json.isseen ?? Msg.defaultIsseen,
    });
  }
}
