import React from 'react';
import {useWindowDimensions, View, ActivityIndicator, StyleSheet} from 'react-native';
import {ThemeData} from 'presentation/presentation';

export const AppLoading: React.FC<{theme: ThemeData}> = ({theme}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={[style.container, {width, height}]}>
      <View style={[style.loader, {backgroundColor: theme.getTheme.indicator.backgroundIndicator}]}>
        <ActivityIndicator size="large" color={theme.getTheme.indicator.itemIndicator} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  loader: {
    width: (50).rps,
    height: (50).rps,
    borderRadius: 25,
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
