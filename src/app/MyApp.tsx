import React, {useEffect, useState} from 'react';
import BootSplash from 'react-native-bootsplash';
import {container, DI_Type} from 'initializer/initializer';
import {AppRedux} from './app';
import {useSelector} from 'react-redux';
import {AppDimen, AppRoute} from 'presentation/presentation';
import {Dimensions, PixelRatio} from 'react-native';

export const MyApp = () => {
  if (!AppDimen.current) {
    const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
    const devicePixelRatio = PixelRatio.get();
    AppDimen.of(screenWidth, screenHeight, devicePixelRatio);
  }

  const appRedux = container.resolve<AppRedux>(DI_Type.AppRedux);
  const isLoggedIn = useSelector(appRedux.getSelector).isLoggedIn;

  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const init = async () => {
      await appRedux._onAppInitiated();
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      setIsInit(true);
    });
  }, []);

  if (!isInit) return null;
  return <AppRoute isLogged={isLoggedIn} />;
};
