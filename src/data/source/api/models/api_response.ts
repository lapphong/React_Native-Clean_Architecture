export class ApiResponse<T> {
  private _data: T | null;

  constructor(data: T | null = null) {
    this._data = data;
  }

  static fromJson<T>(json: any, fromT: (json: any) => T): ApiResponse<T> {
    const newJson = {data: json};
    const response = _$ApiResponseFromJson(newJson, fromT);

    return response;
  }

  get data(): T | null {
    return this._getData();
  }

  private _getData(): T | null {
    return this._data as T;
  }
}

function nullableGenericFromJson<T>(input: any, fromJson: (json: any) => T): T | null {
  return input === null ? null : fromJson(input);
}

function _$ApiResponseFromJson<T>(json: any, fromT: (json: any) => T): ApiResponse<T> {
  return new ApiResponse(nullableGenericFromJson(json, fromT));
}
