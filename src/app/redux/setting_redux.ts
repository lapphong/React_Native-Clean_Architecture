import {CaseReducer, PayloadAction, Draft} from '@reduxjs/toolkit';
import {BaseRedux, BaseReduxEvents, BaseReduxState} from 'app/base_redux/base_redux';
import {inject, injectable} from 'tsyringe';

export class SettingState extends BaseReduxState {}

export class SettingEvents extends BaseReduxEvents<SettingState> {
  get name(): string {
    return 'SettingRedux';
  }

  createReducers(): Record<string, CaseReducer<SettingState, PayloadAction<any>>> {
    return {};
  }
}

@injectable()
export class SettingRedux extends BaseRedux<SettingState, SettingEvents> {
  constructor() {
    super(new SettingState(), new SettingEvents());
  }
}
