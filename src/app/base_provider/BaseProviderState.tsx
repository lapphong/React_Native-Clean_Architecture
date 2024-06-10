import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {TouchableWithoutFeedback, SafeAreaView, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppLoading, AppNavigatorImpl, useTheme} from 'presentation/presentation';
import {AppExceptionWrapper, ViewUtils} from 'shared/shared';
import {AppState, BaseProvider, CommonState, Redux} from 'app/app';

interface BaseProviderStateProps<B extends Redux> {
  redux: B;
  isNewAppNavigator?: boolean;
}

export const BaseProviderState: React.FC<React.PropsWithChildren<BaseProviderStateProps<any>>> = ({
  children,
  redux,
  isNewAppNavigator = true,
}) => {
  const theme = useTheme();

  const baseProvider = new BaseProvider(redux);
  redux.commonRedux = baseProvider.commonRedux;
  redux = baseProvider.redux;

  if (isNewAppNavigator) (redux.navigator as AppNavigatorImpl).initialize();

  const appState: AppState = useSelector(redux.appRedux.getSelector);
  const commonState: CommonState = useSelector(redux.commonRedux.getSelector);

  const previousAppExceptionWrapper = useRef<AppExceptionWrapper | null>(null);
  const currentAppExceptionWrapper = commonState.appExceptionWrapper;

  useEffect(() => {
    if (
      previousAppExceptionWrapper.current !== currentAppExceptionWrapper &&
      currentAppExceptionWrapper !== null
    ) {
      baseProvider.handleException(currentAppExceptionWrapper);
    }

    previousAppExceptionWrapper.current = currentAppExceptionWrapper;
    return () => {
      baseProvider.dispose();
    };
  }, [currentAppExceptionWrapper]);

  return (
    <TouchableWithoutFeedback onPress={() => ViewUtils.hideKeyboard()}>
      <SafeAreaView style={[{flex: 1, backgroundColor: theme.getTheme.colorScheme.background}]}>
        <StatusBar
          barStyle={appState.isDarkTheme ? 'light-content' : 'dark-content'}
          backgroundColor={appState.isDarkTheme ? Colors.darker : Colors.light}
        />
        {commonState.isLoading && <AppLoading theme={theme} />}
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
