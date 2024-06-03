import React from 'react';
import {View, Text} from 'react-native';

const BaseProviderState = () => {
  // const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  // const devicePixelRatio = PixelRatio.get();

  // const appDimen = AppDimen.of(screenWidth, screenHeight, devicePixelRatio);
  // Log.d(appDimen.toString, {name: 'APP DIMEN'});

  return (
    <View>
      <Text>BaseProviderState</Text>
    </View>
  );
};

export default BaseProviderState;
