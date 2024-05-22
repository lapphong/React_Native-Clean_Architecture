export class User {
  code: string;
  name: string;
  token: string;
  refeshToken: string;
  role: string;
  phone: string;
  expirationTime: number;

  static readonly defaultCode = '';
  static readonly defaultName = '';
  static readonly defaultToken = '';
  static readonly defaultRefeshToken = '';
  static readonly defaultRole = '';
  static readonly defaultPhone = '';
  static readonly defaultExpirationTime = 0;

  constructor({
    code = User.defaultCode,
    name = User.defaultName,
    token = User.defaultToken,
    refeshToken = User.defaultRefeshToken,
    role = User.defaultRole,
    phone = User.defaultPhone,
    expirationTime = User.defaultExpirationTime,
  }: Partial<User> = {}) {
    this.code = code;
    this.name = name;
    this.token = token;
    this.refeshToken = refeshToken;
    this.role = role;
    this.phone = phone;
    this.expirationTime = expirationTime;
  }

  static fromJson(json: any): User {
    return new User({
      code: json.code ?? User.defaultCode,
      name: json.name ?? User.defaultName,
      token: json.token ?? User.defaultToken,
      refeshToken: json.refeshToken ?? User.defaultRefeshToken,
      role: json.role ?? User.defaultRole,
      phone: json.phone ?? User.defaultPhone,
      expirationTime: json.expirationTime ?? User.defaultExpirationTime,
    });
  }
}
