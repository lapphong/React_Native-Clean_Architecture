import {CaseReducer, PayloadAction, Draft} from '@reduxjs/toolkit';
import {BaseRedux, BaseReduxEvents, BaseReduxState} from 'app/base_redux/base_redux';
import {AppUsecase} from 'domain/domain';
import {AppThemeSetting, AppThemeType} from 'presentation/presentation';
import {inject, injectable} from 'tsyringe';

export class AppState extends BaseReduxState {
  //   languageCode: LanguageCode = LanguageCode.en;
  isLoggedIn: boolean = false;
  isDarkTheme: boolean = false;
}

export class AppEvents extends BaseReduxEvents<AppState> {
  get name(): string {
    return 'AppRedux';
  }

  createReducers(): Record<string, CaseReducer<AppState, PayloadAction<any>>> {
    return {
      isLoggedInStatusChanged: (state: Draft<AppState>, action: PayloadAction<any>) => {
        return {...state, isLoggedIn: action.payload};
      },
      appThemeChanged: (state: Draft<AppState>, action: PayloadAction<any>) => {
        return {...state, isDarkTheme: action.payload};
      },
      appInitiated: (state: Draft<AppState>, action: PayloadAction<any>) => {
        return {
          ...state,
          isDarkTheme: action.payload.isDarkTheme,
          isLoggedIn: action.payload.isLoggedIn,
        };
      },
      //   appLanguageChanged: (state: Draft<AppState>, action: PayloadAction<any>) => {
      //     return {...state, languageCode: action.payload};
      //   },
    };
  }
}

@injectable()
export class AppRedux extends BaseRedux<AppState, AppEvents> {
  constructor(@inject('AppUsecase') private _appUsecase: AppUsecase) {
    super(new AppState(), new AppEvents());
  }

  _onIsLoggedInStatusChanged(isLoggedIn: boolean): void {
    this.dispatchApp(this.slice.actions.isLoggedInStatusChanged(isLoggedIn));
  }

  async _onAppThemeChanged(isDarkMode: boolean): Promise<void> {
    await this._appUsecase.saveIsDarkModeUseCase(isDarkMode);
    this._updateThemeSetting(isDarkMode);
    this.dispatchApp(this.slice.actions.appThemeChanged(isDarkMode));
  }

  //   async _onAppLanguageChanged(languageCode: LanguageCode): Promise<void> {
  //     await this._appUsecase.saveLanguageCode(languageCode);
  //     this.dispatchApp({type: 'appLanguageChanged', payload: {languageCode: languageCode}});
  //   }

  async _onAppInitiated(): Promise<void> {
    const outputLoggedIn = await this._appUsecase.isLoggedInUseCase;
    const outputDarkMode = await this._appUsecase.isDarkModeUseCase;
    this._updateThemeSetting(outputDarkMode);
    this.dispatchApp(
      this.slice.actions.appInitiated({isLoggedIn: outputLoggedIn, isDarkTheme: outputDarkMode}),
    );
  }

  _updateThemeSetting(isDarkTheme: boolean): void {
    AppThemeSetting.currentAppThemeType = isDarkTheme ? AppThemeType.dark : AppThemeType.light;
  }

  async _onAppLogoutPressed(): Promise<void> {
    return this.runBlocCatching({
      action: async () => {
        // await this._appUsecase.logoutUseCase(LoginRoute());
      },
    });
  }
}
