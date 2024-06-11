import {inject, injectable} from 'tsyringe';
import {CaseReducer, PayloadAction, Draft} from '@reduxjs/toolkit';
import {BaseRedux, BaseReduxEvents, BaseReduxState} from 'app/base_redux/base_redux';
import {AuthUsecase} from 'domain/domain';
import {ValidationUtils} from 'shared/shared';

export class LoginState extends BaseReduxState {
  email: string = '';
  password: string = '';
  isLoginButtonEnabled: boolean = false;
  onPageError: string = '';
}

export class LoginEvents extends BaseReduxEvents<LoginState> {
  get name(): string {
    return 'LoginRedux';
  }

  _isLoginButtonEnabled(email: string, password: string): boolean {
    return ValidationUtils.isNotEmpty(email) && ValidationUtils.isNotEmpty(password);
  }

  createReducers(): Record<string, CaseReducer<LoginState, PayloadAction<any>>> {
    return {
      emailTextFieldChanged: (state: Draft<LoginState>, action: PayloadAction<any>) => {
        return {
          ...state,
          email: action.payload,
          isLoginButtonEnabled: this._isLoginButtonEnabled(action.payload, state.password),
          onPageError: '',
        };
      },
      passwordTextFieldChanged: (state: Draft<LoginState>, action: PayloadAction<any>) => {
        return {
          ...state,
          password: action.payload,
          isLoginButtonEnabled: this._isLoginButtonEnabled(state.email, action.payload),
          onPageError: '',
        };
      },
      loginButtonPressedError: (state: Draft<LoginState>, action: PayloadAction<any>) => {
        return {...state, onPageError: action.payload};
      },
      resetLoginState: (state: Draft<LoginState>, action: PayloadAction<any>) => {
        return {
          ...state,
          email: '',
          password: '',
          isLoginButtonEnabled: false,
          onPageError: '',
        };
      },
    };
  }
}

@injectable()
export class LoginRedux extends BaseRedux<LoginState, LoginEvents> {
  constructor(@inject('AuthUsecase') private _authUsecase: AuthUsecase) {
    super(new LoginState(), new LoginEvents());
  }

  onEmailTextFieldChanged(email: string): void {
    this.dispatchApp(this.slice.actions.emailTextFieldChanged(email));
  }

  onPasswordTextFieldChanged(password: string): void {
    this.dispatchApp(this.slice.actions.passwordTextFieldChanged(password));
  }

  async onLoginButtonPressed(email: string, password: string, onPageError: string): Promise<void> {
    await this.runReduxCatching({
      action: async () => {
        await this._authUsecase.loginUsecase({username: email, password: password});
        if (onPageError === '') this.navigator.showSuccessSnackBar('Login successfully');
        this.dispatchApp(this.slice.actions.resetLoginState(''));
        this.appRedux.onIsLoggedInStatusChanged(true);
      },
      doOnError: async e => {
        this.dispatchApp(this.slice.actions.loginButtonPressedError(e.message));
      },
    });
  }
}
