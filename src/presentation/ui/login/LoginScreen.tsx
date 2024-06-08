import {BaseProviderState, appRedux} from 'app/app';
import Assets from 'assets/assets';
import {AppButton, AppColors, AppTextField, useTheme} from 'presentation/presentation';
import React from 'react';
import {StyleSheet, View, ScrollView, Image, Switch} from 'react-native';
import {useSelector} from 'react-redux';

export const LoginScreen = () => {
  const theme = useTheme();

  const isDarkTheme = useSelector(appRedux.getSelector).isDarkTheme;

  return (
    <BaseProviderState>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Switch
            trackColor={{false: AppColors.grey2, true: AppColors.purple}}
            thumbColor={theme.getTheme.switchTheme.thumbColor}
            style={{marginBottom: 20}}
            value={isDarkTheme}
            onValueChange={async value => {
              setTimeout(async () => await appRedux._onAppThemeChanged(value));
            }}
          />
          <Image
            source={Assets.images.app_icon}
            style={{marginBottom: 20, width: (150).rps, height: (150).rps, resizeMode: 'cover'}}
          />
          <AppTextField
            theme={theme}
            onChangeText={text => {}}
            onFocus={() => {}}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={''}
          />
          <AppTextField
            theme={theme}
            onChangeText={text => {}}
            onFocus={() => {}}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={''}
            password
          />
          <AppButton
            theme={theme}
            text="Login"
            background={theme.getTheme.elevatedButtonTheme.backgroundColor}
            onPressed={() => {}}
          />
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
