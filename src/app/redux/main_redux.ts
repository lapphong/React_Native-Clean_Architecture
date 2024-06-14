import {CaseReducer, PayloadAction, Draft} from '@reduxjs/toolkit';
import {BaseRedux, BaseReduxEvents, BaseReduxState} from 'app/base_redux/base_redux';
import {inject, injectable} from 'tsyringe';

export class MainState extends BaseReduxState {}

export class MainEvents extends BaseReduxEvents<MainState> {
  get name(): string {
    return 'MainRedux';
  }

  createReducers(): Record<string, CaseReducer<MainState, PayloadAction<any>>> {
    return {};
  }
}

@injectable()
export class MainRedux extends BaseRedux<MainState, MainEvents> {
  constructor() {
    super(new MainState(), new MainEvents());
  }
}
