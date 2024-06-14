import {configureStore, combineReducers} from '@reduxjs/toolkit';
import observerMiddleware from 'app/base_redux/redux_observer';
import {DI_Type, container} from 'initializer/initializer';
import {AppRedux, CommonRedux, HomeRedux, LoginRedux, MainRedux, SettingRedux} from 'app/app';
import {AppNavigator} from 'domain/domain';

export const navigator = container.resolve<AppNavigator>(DI_Type.AppNavigator);
export const commonRedux = container.resolve<CommonRedux>(DI_Type.CommonRedux);
export const appRedux = container.resolve<AppRedux>(DI_Type.AppRedux);
export const loginRedux = container.resolve<LoginRedux>(DI_Type.LoginRedux);
export const mainRedux = container.resolve<MainRedux>(DI_Type.MainRedux);
export const homeRedux = container.resolve<HomeRedux>(DI_Type.HomeRedux);
export const settingRedux = container.resolve<SettingRedux>(DI_Type.SettingRedux);

const storeReducers = combineReducers({
  [commonRedux.slice.name]: commonRedux.slice.reducer,
  [appRedux.slice.name]: appRedux.slice.reducer,
  [loginRedux.slice.name]: loginRedux.slice.reducer,
  [mainRedux.slice.name]: mainRedux.slice.reducer,
  [homeRedux.slice.name]: homeRedux.slice.reducer,
  [settingRedux.slice.name]: settingRedux.slice.reducer,
});

const store = configureStore({
  reducer: storeReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(observerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
