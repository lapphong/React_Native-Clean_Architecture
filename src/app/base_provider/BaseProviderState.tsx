import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {TouchableWithoutFeedback, SafeAreaView, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppLoading, useTheme} from 'presentation/presentation';
import {ViewUtils} from 'shared/shared';
import {
  AppState,
  BaseRedux,
  BaseReduxEvents,
  BaseReduxState,
  CommonState,
  BaseProvider,
  AppRedux,
  CommonRedux,
} from 'app/app';
import {AppNavigator} from 'domain/domain';
import {DI_Type, container} from 'initializer/initializer';

export type Redux<S extends BaseReduxState, E extends BaseReduxEvents<S>> = BaseRedux<S, E>;

interface BaseProviderStateProps<B extends Redux<any, any>> {
  redux: B;
}

export const BaseProviderState = <B extends Redux<any, any>>({
  children,
  redux,
}: React.PropsWithChildren<BaseProviderStateProps<B>>) => {
  const theme = useTheme();

  const navigator: AppNavigator = container.resolve<AppNavigator>(DI_Type.AppNavigator);
  const appRedux: AppRedux = container.resolve<AppRedux>(DI_Type.AppRedux);
  const baseProvider = BaseProvider.getInstance(navigator);

  const commonRedux: CommonRedux = container.resolve<CommonRedux>(DI_Type.CommonRedux);

  const initializer = useRef<boolean>(false);
  const initState = () => {
    if (!initializer.current) {
      commonRedux.navigator = navigator;
      commonRedux.disposeBag = baseProvider.disposeBag;
      commonRedux.appRedux = appRedux;
      commonRedux.exceptionHandler = baseProvider.exceptionHandler;

      redux.navigator = navigator;
      redux.commonRedux = commonRedux;
      redux.appRedux = appRedux;
      redux.exceptionHandler = baseProvider.exceptionHandler;
      redux.disposeBag = baseProvider.disposeBag;

      initializer.current = true;
    }
  };

  const appState: AppState = useSelector(appRedux.getSelector);
  const commonState: CommonState = useSelector(commonRedux.getSelector);

  const appExceptionWrapper = commonState.appExceptionWrapper;
  const handleAsyncException = async () => {
    // Do là Redux trong '[BaseRedux]' chia sẻ các Redux và setter với nhau
    // => Nên chỉ cần đặt 1 cái cao nhất, trong file App.tsx là `[AppRedux]`.
    // Nếu ko thì khi '[setState]' các components children đều sẽ '[handleException]'
    // => Ở đây là dùng dialog để handle,nên nó sẽ bị lặp giao diện,
    // Dialog dùng '[Alert.alert]' nên ko có method kiểm tra (isOpen) hay là method (close)
    // => Tương lai chuyển sang dạng dialog của react-navigation theo kiểu push screen
    if (appExceptionWrapper && redux.slice.name === appRedux.slice.name) {
      await baseProvider.handleException(redux.commonRedux.exceptionHandler, appExceptionWrapper);
    }
  };

  useEffect(() => {
    initState();
    handleAsyncException();

    return () => {
      baseProvider.dispose(redux.disposeBag);
    };
  }, [appExceptionWrapper]);

  return (
    <TouchableWithoutFeedback onPress={() => ViewUtils.hideKeyboard()}>
      <SafeAreaView style={[{flex: 1, backgroundColor: theme.getTheme.colorScheme.background}]}>
        <StatusBar
          barStyle={appState.isDarkTheme ? 'light-content' : 'dark-content'}
          backgroundColor={appState.isDarkTheme ? Colors.darker : Colors.light}
        />
        {commonState.isLoading && redux.slice.name === appRedux.slice.name && (
          <AppLoading theme={theme} />
        )}
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
