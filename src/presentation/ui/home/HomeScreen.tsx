import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import {BaseProviderState, appRedux, homeRedux} from 'app/app';
import {useTheme} from 'presentation/presentation';
import {useSelector} from 'react-redux';
import Assets from 'assets/assets';

export const HomeScreen = () => {
  const theme = useTheme();
  const isDarkTheme = useSelector(appRedux.getSelector).isDarkTheme;

  return (
    <BaseProviderState redux={homeRedux}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={Assets.images.app_icon}
            style={{marginBottom: 20, width: (200).rps, height: (200).rps, resizeMode: 'cover'}}
          />
          <Text style={theme.getTheme.textTheme.headlineLarge}>HomeScreen</Text>
        </View>
      </ScrollView>
    </BaseProviderState>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
