import {configureStore, combineReducers} from '@reduxjs/toolkit';
import observerMiddleware from 'app/base_redux/redux_observer';
import {AppRedux, CommonRedux} from 'app/app';
import {DI_Type, container} from 'initializer/initializer';

const commonRedux = container.resolve<CommonRedux>(DI_Type.CommonRedux);
const appRedux = container.resolve<AppRedux>(DI_Type.AppRedux);
const storeReducers = combineReducers({
  [commonRedux.slice.name]: commonRedux.slice.reducer,
  [appRedux.slice.name]: appRedux.slice.reducer,
});

const store = configureStore({
  reducer: storeReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(observerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
