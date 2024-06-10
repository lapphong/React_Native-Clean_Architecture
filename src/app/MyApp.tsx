import React, {useEffect, useState} from 'react';
import {Dimensions, PixelRatio, View} from 'react-native';
import {useSelector} from 'react-redux';
import BootSplash from 'react-native-bootsplash';
import {appRedux} from 'app/app';
import {AppInitializer} from 'initializer/initializer';
import {AppDimen, AppLoading, AppRoute, useTheme} from 'presentation/presentation';

export const MyApp = () => {
  if (!AppDimen.current) {
    const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
    const devicePixelRatio = PixelRatio.get();
    AppDimen.of(screenWidth, screenHeight, devicePixelRatio);
  }

  const isLoggedIn = useSelector(appRedux.getSelector).isLoggedIn;

  const [isInitiated, setIsInitiated] = useState(false);

  useEffect(() => {
    if (!isInitiated) {
      const init = async () => {
        await AppInitializer.init();
        await appRedux.onAppInitiated();
      };

      init().finally(async () => {
        await BootSplash.hide({fade: true});
        setIsInitiated(true);
      });
    }
  }, []);

  if (!isInitiated) {
    const theme = useTheme();
    return (
      <View style={{flex: 1, backgroundColor: theme.getTheme.colorScheme.background}}>
        <AppLoading theme={theme} />
      </View>
    );
  }

  return <AppRoute isLogged={isLoggedIn} />;
};
