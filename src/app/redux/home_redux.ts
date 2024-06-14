import {CaseReducer, PayloadAction, Draft} from '@reduxjs/toolkit';
import {BaseRedux, BaseReduxEvents, BaseReduxState} from 'app/base_redux/base_redux';
import {inject, injectable} from 'tsyringe';

export class HomeState extends BaseReduxState {}

export class HomeEvents extends BaseReduxEvents<HomeState> {
  get name(): string {
    return 'HomeRedux';
  }

  createReducers(): Record<string, CaseReducer<HomeState, PayloadAction<any>>> {
    return {};
  }
}

@injectable()
export class HomeRedux extends BaseRedux<HomeState, HomeEvents> {
  constructor() {
    super(new HomeState(), new HomeEvents());
  }
}
