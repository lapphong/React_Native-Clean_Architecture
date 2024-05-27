import {InternalAxiosRequestConfig} from 'axios';
import {AppPreferences, BaseInterceptor} from 'data/data';
import {AppInfoHelper, Constants, DeviceHelper} from 'shared/shared';
import {injectable, inject} from 'tsyringe';

@injectable()
export class ApiTokenInterceptor extends BaseInterceptor {
  constructor(
    @inject('AppInfoHelper') private _appInfoHelper: AppInfoHelper,
    @inject('DeviceHelper') private _deviceHelper: DeviceHelper,
    @inject('AppPreferences') private _appPreferences: AppPreferences,
  ) {
    super();
  }

  _headers: Map<string, any> = new Map();

  get priority(): number {
    return BaseInterceptor.apiTokenPriority;
  }

  async onRequest(
    config: InternalAxiosRequestConfig<any>,
  ): Promise<InternalAxiosRequestConfig<any>> {
    // Xử lý HeaderInterceptor
    const userAgentValue: string = await this.userAgentClientHintsHeader();
    config.headers[Constants.userAgentKey] = userAgentValue;
    const headersObject = Object.fromEntries(this._headers);
    config.headers = Object.assign({}, config.headers, headersObject);

    // Xử lý AccessTokenInterceptor
    const token = await this._appPreferences.accessToken;
    if (token !== null) {
      config.headers![Constants.basicAuthorization] = `${Constants.bearer} ${token}`;
    }

    return config;
  }

  async userAgentClientHintsHeader(): Promise<string> {
    return `${this._deviceHelper.operatingSystem} - ${await this._appInfoHelper.versionName}(${
      this._appInfoHelper.versionCode
    })`;
  }
}
