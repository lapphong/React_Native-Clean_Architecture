import {Log} from 'shared/shared';

export enum Flavor {
  develop,
  qa,
  staging,
  production,
}

class EnvConstants {
  private constructor() {}

  static readonly flavorKey = 'FLAVOR';
  static readonly appBasicAuthNameKey = 'APP_BASIC_AUTH_NAME';
  static readonly appBasicAuthPasswordKey = 'APP_BASIC_AUTH_PASSWORD';

  static flavor: Flavor = process.env[EnvConstants.flavorKey]
    ? Flavor[process.env[EnvConstants.flavorKey] as keyof typeof Flavor] || Flavor.develop
    : Flavor.develop;
  static appBasicAuthName: string = process.env[EnvConstants.appBasicAuthNameKey] || '';
  static appBasicAuthPassword: string = process.env[EnvConstants.appBasicAuthPasswordKey] || '';

  static init(): void {
    Log.d(Flavor[EnvConstants.flavor], {name: EnvConstants.flavorKey});
    Log.d(EnvConstants.appBasicAuthName, {name: EnvConstants.appBasicAuthNameKey});
    Log.d(EnvConstants.appBasicAuthPassword, {name: EnvConstants.appBasicAuthPasswordKey});
  }
}

export default EnvConstants;
