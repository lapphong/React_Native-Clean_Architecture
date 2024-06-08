import React, {useEffect, useState} from 'react';
import BootSplash from 'react-native-bootsplash';
import {AppInitializer} from 'initializer/initializer';
import {appRedux} from 'app/app';
import {useSelector} from 'react-redux';
import {AppDimen, AppLoading, AppRoute, useTheme} from 'presentation/presentation';
import {Dimensions, PixelRatio, View} from 'react-native';

export const MyApp = () => {
  if (!AppDimen.current) {
    const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
    const devicePixelRatio = PixelRatio.get();
    AppDimen.of(screenWidth, screenHeight, devicePixelRatio);
  }

  const isLoggedIn = useSelector(appRedux.getSelector).isLoggedIn;

  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const init = async () => {
      await AppInitializer.init();
      await appRedux._onAppInitiated();
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      setIsInit(true);
    });
  }, []);

  if (!isInit) {
    const theme = useTheme();
    return (
      <View style={{flex: 1, backgroundColor: theme.getTheme.colorScheme.background}}>
        <AppLoading theme={theme} />
      </View>
    );
  }

  return <AppRoute isLogged={isLoggedIn} />;
};
