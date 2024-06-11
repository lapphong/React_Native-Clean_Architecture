import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View, ScrollView, Image, Switch, Text} from 'react-native';
import Assets from 'assets/assets';
import {BaseProviderState, appRedux, loginRedux} from 'app/app';
import {AppButton, AppColors, AppTextField, useTheme} from 'presentation/presentation';
import {DebounceUtils} from 'shared/shared';

export const LoginScreen = () => {
  const theme = useTheme();

  const loginState = useSelector(loginRedux.getSelector);
  const isDarkTheme = useSelector(appRedux.getSelector).isDarkTheme;
  const debounce = DebounceUtils.getInstance();

  return (
    <BaseProviderState redux={loginRedux}>
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
              debounce.run(async () => await appRedux.onAppThemeChanged(value));
            }}
          />
          <Image
            source={Assets.images.app_icon}
            style={{marginBottom: 20, width: (150).rps, height: (150).rps, resizeMode: 'cover'}}
          />
          <AppTextField
            theme={theme}
            onChangeText={text => debounce.run(() => loginRedux.onEmailTextFieldChanged(text))}
            onFocus={() => {}}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={''}
          />
          <AppTextField
            theme={theme}
            onChangeText={text => debounce.run(() => loginRedux.onPasswordTextFieldChanged(text))}
            onFocus={() => {}}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={''}
            password
          />
          {loginState.onPageError && (
            <Text style={[theme.getTheme.textTheme.labelLarge, {color: AppColors.purple}]}>
              {loginState.onPageError}
            </Text>
          )}
          <AppButton
            theme={theme}
            text="Login"
            background={
              loginState.isLoginButtonEnabled
                ? theme.getTheme.elevatedButtonTheme.backgroundColor
                : theme.getTheme.elevatedButtonTheme.disableBackgroundColor
            }
            onPressed={
              loginState.isLoginButtonEnabled
                ? async () => {
                    await loginRedux.onLoginButtonPressed(
                      loginState.email,
                      loginState.password,
                      loginState.onPageError,
                    );
                  }
                : undefined
            }
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
