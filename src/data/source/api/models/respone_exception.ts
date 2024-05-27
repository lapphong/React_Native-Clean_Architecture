export class ResponeException {
  message?: string | null;
  code?: string | null;
  errors?: any;

  constructor({
    message,
    code,
    errors,
  }: {message?: string | null; code?: string | null; errors?: any} = {}) {
    this.message = message;
    this.code = code;
    this.errors = errors;
  }

  static fromJson(json: any): ResponeException {
    return new ResponeException({
      message: json.message ?? null,
      code: json.code ?? null,
      errors: json.errors ?? null,
    });
  }
}
