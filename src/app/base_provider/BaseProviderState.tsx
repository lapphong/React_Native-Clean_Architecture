import React from 'react';
import {useSelector} from 'react-redux';
import {AppRedux, CommonRedux} from 'app/app';
import {DI_Type, container} from 'initializer/initializer';
import {AppLoading, AppNavigatorImpl, useTheme} from 'presentation/presentation';
import {ViewUtils} from 'shared/shared';
import {TouchableWithoutFeedback, SafeAreaView, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppNavigator} from 'domain/domain';
interface BaseProviderStateProps {
  isAppWidget?: boolean;
}

export const BaseProviderState: React.FC<React.PropsWithChildren<BaseProviderStateProps>> = ({
  children,
}) => {
  const theme = useTheme();

  const appNavigator = container.resolve<AppNavigator>(DI_Type.AppNavigator);
  (appNavigator as AppNavigatorImpl).initialize();

  const appRedux = container.resolve<AppRedux>(DI_Type.AppRedux);
  const appState = useSelector(appRedux.getSelector);

  const commonRedux = container.resolve<CommonRedux>(DI_Type.CommonRedux);
  const commonState = useSelector(commonRedux.getSelector);

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
